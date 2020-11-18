import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory, useParams, Redirect } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData, selectOrderItem } from '../../state/order/order.selectors';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// inital values
const formSchema = Yup.object().shape({
  salePrice: Yup
    .string()
    .required(),
  shippingPrice: Yup
    .string(),
  int: Yup
    .string(),
  weight: Yup
    .string()
    .required()
});

const formState = {
  salePrice: "",
  shippingPrice: "",
  int: "",
  weight: ""
}

// main component
const OrderSaleForm = ({
  data,
  item,
  patchReq,
  alertMessage
}) => {

  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const { byId } = data;
  const { orderId } = params;

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-sale-price')[0];

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(Object.keys(item).length > 0 ? item : formState, formState, formSchema);

  const shippingPriceCalc = (weight) => {
    const price = 1;

    const shippingPrice = price * weight
    return acctToStr(shippingPrice)
  }

  const salePriceCalc = (price, int) => {
    const p = int/10000
    const salePrice = price * (1 + p)
    const s = salePrice.toFixed(0)
    
    return acctToStr(Number(s))
  }
  
  const formSubmit = () => {

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;

    const obj = { ...formData }
    delete obj.int;

    const salePrice = strToAcct(obj.salePrice);
    obj.salePrice = salePrice;
    const shippingPrice = strToAcct(obj.shippingPrice);
    obj.shippingPrice = shippingPrice;
    const weight = strToAcct(obj.weight);
    obj.weight = weight;
    
    const updateItems = byId.items.map(item => {
      if (item._id !== obj._id) {
        return item
      }
      return {
        ...item,
        ...obj
      }
    })
    
    patchReq(`/orders/${orderId}`, fetchSuccess, { items: updateItems }, setSuccess, 'order-sale-form')
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) history.push(parentRoute)
  }, [success, history, parentRoute])

  return <>
    { alertMessage && alertMessage.component === 'order-sale-form' && <AlertMesg /> }

    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} /> 
      :
      <Card width="col" title="Update Sale Price">
        <Ul>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="% Interest" 
                  name="int"
                  id="currencyMask-order-sale-item-form-int"
                  errors={errors}
                  smallText={`Estimated Sale Price: $${salePriceCalc(item.price, strToAcct(formData.int))}`}
                  value={formData.int}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Actual Sale Price" 
                  name="salePrice"
                  id="currencyMask-order-sale-item-form-sale-price"
                  errors={errors}
                  smallText="Sale price if other than estimated."
                  value={formData.salePrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Li>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="Weight" 
                  name="weight"
                  id="currencyMask-order-sale-item-form-weight"
                  errors={errors}
                  smallText={`Estimated Shipping Price: $${shippingPriceCalc(strToAcct(formData.weight))}`}
                  value={formData.weight}
                  onChange={onInputChange}
                />
              </div>
              <div className="col-xl-4">
                <TextInput
                  label="Actual Shipping Price" 
                  name="shippingPrice"
                  id="currencyMask-order-sale-item-form-shipping-price"
                  errors={errors}
                  smallText="Sale price if other than estimated."
                  value={formData.shippingPrice}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Li>
          <SubmitOrReset
            buttonName={'Save'}
            buttonDisabled={buttonDisabled}
            formSubmit={formSubmit}
            formReset={formReset}
          />
        </Ul>
      </Card>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  item: selectOrderItem,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSaleForm);