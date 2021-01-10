import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import { Link, useLocation, useHistory, useParams, Redirect } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import { integerStrToNum } from '../utils/helpers';
import { strToAcct } from '../utils/strToAcct';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData, selectOrderItem } from '../../state/order/order.selectors';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// initial form state
const formSchema = Yup.object().shape({
  product: Yup
    .object(),
  color: Yup
    .object(),
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  price: Yup
    .string()
    .required(),
  note: Yup
    .string()
})

const formState = {
  product: null,
  color: null,
  size: "",
  qty: "",
  price: "",
  note: ""
}

// main component
const OrderItemForm = ({
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
  const parentRoute = location.pathname.split('/update-order-item')[0];

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(Object.keys(item).length > 0 ? item : formState, formState, formSchema);

  const { product, color } = formData;

  const formSubmit = () => {

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;

    const obj = { ...formData };

    const qty = integerStrToNum(obj.qty);
    obj.qty = qty;
    const price = strToAcct(obj.price);
    obj.price = price;

    let updateItems = null

    if (obj._id) {
      updateItems = byId.items.map(item => {
        if (item._id !== obj._id) {
          return item
        }
        return {
          ...item,
          ...obj
        }
      })
    } else {
      updateItems = [ ...byId.items, obj ]
    }

    patchReq(`/orders/${orderId}`, fetchSuccess, { items: updateItems }, setSuccess, 'order-item-form')
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) {
      history.push(parentRoute)
    } else {
      if (location.state) setValues(prevState => ({
        ...prevState, ...location.state
      }))
    }
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'order-item-form' && <AlertMesg /> }

    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} /> 
      :
      <Card width="col" title={`${formData.index ? 'Edit Item' : 'Add Item'}`}>
        <Ul>
          <Li>
            <div className="row">
              <div className="col-12">
                <Link 
                  to={`${location.pathname}/select-product`} 
                  className="a-link-cs"
                >
                  {formData.product ? 'Reselect Product' : 'Select Product'}
                </Link>
              </div>
            </div>
          </Li>
          {
            formData.product && <>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Name:</span></div>
                  <div className="col-8">{product.name}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Brand:</span></div>
                  <div className="col-8">{product.brand.name}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Style No:</span></div>
                  <div className="col-8">{product.styleCode}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Color:</span></div>
                  <div className="col-8">{color.color}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Description:</span></div>
                  <div className="col-8">{product.desc}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-xl-4">
                    <TextInput
                      label="Size (*)" 
                      name="size"
                      errors={errors}
                      smallText="Size of the product."
                      value={formData.size}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-4">
                    <TextInput
                      label="Qty (*)" 
                      name="qty"
                      id="integerMask-order-item-form-qty"
                      errors={errors}
                      smallText="Qty of the item."
                      value={formData.qty}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-4">
                    <TextInput
                      label="Price (*)" 
                      name="price"
                      id="currencyMask-order-item-form-price"
                      errors={errors}
                      smallText="Price per unit."
                      value={formData.price}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </Li>
              <Li>
                <TextInput
                  label="Note" 
                  name="note"
                  errors={errors}
                  smallText="Additional note to the item."
                  value={formData.note}
                  onChange={onInputChange}
                />
              </Li>
              <SubmitOrReset
                buttonName={'Save'}
                buttonDisabled={buttonDisabled}
                formSubmit={formSubmit}
                formReset={formReset}
              />
            </>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemForm);