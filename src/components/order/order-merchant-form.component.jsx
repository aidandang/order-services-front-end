import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import moment from 'moment';
import { useHistory, useLocation, useParams, Redirect } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput, SelectInput, DateInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import Merchant from '../merchant/merchant.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OrderActionTypes } from '../../state/order/order.types';
import { patchReq } from '../../state/api/api.requests';
import { selectMerchantData } from '../../state/merchant/merchant.selectors';
import { selectOrderData } from '../../state/order/order.selectors';

// inital values
const formSchema = Yup.object().shape({
  merchant: Yup
    .string()
    .required(),
  orderNumber: Yup
    .string()
    .required(),
  orderDate: Yup
    .string()
    .required(),
  orderType: Yup
    .string()
    .required()
});

const formState = {
  merchant: "",
  orderNumber: "",
  orderDate: "",
  orderType: ""
}

const OrderMerchantForm = ({
  data,
  patchReq,
  merchantData
}) => {

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-order-merchant')[0];

  const [success, setSuccess] = useState(false)

  const { orderId } = params;
  const { byId } = data;

  let orderEditing = null;

  if (byId && byId.info) {
    orderEditing = {
      merchant: byId.info.merchant._id,
      orderNumber: byId.info.orderNumber,
      orderDate: moment(byId.info.orderDate).format('yyyy-MM-DD'),
      orderType: byId.info.orderType
    }
  }

  let merchants = null;

  if (merchantData.allIds) merchants = merchantData.allIds;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    
    const merchantObj = merchantData.allIds.find(item => item._id === formData.merchant)

    const obj = { 
      ...formData,
      merchant: merchantObj,
    }

    patchReq(`/orders/${orderId}`, fetchSuccess, { info: obj }, setSuccess, 'order-merchant-form')
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) history.push(parentRoute)
  }, [success, history, parentRoute])

  return <>
    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} />
      : 
      <div className="row">
        <div className="col-12 col-xl-8">
          <Card width="col" title="Merchant's Order">
            <Ul>
              <Li>
                <SelectInput
                  label="Merchant (*)" 
                  name="merchant"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Select a merchant, add new if there is no merchant."
                  defaultValue=""
                  defaultText="..."
                  value={formData.merchant ? formData.merchant : ""}
                  onChange={onInputChange}
                  data={merchants}
                  valueKey="_id"
                  textKey="name"
                />
              </Li>
              <Li>
                <div className="row">
                  <div className="col-xl-6">
                    <TextInput
                      label="Order Number (*)" 
                      name="orderNumber"
                      errors={errors}
                      smallText="Order number is required."
                      value={formData.orderNumber}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-6">
                    <DateInput
                      label="Order Date (*)" 
                      name="orderDate"
                      errors={errors}
                      smallText="Order date is required."
                      value={formData.orderDate}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </Li>
              <Li>
                <SelectInput
                  label="Order Type (*)" 
                  name="orderType"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Online or walk-in."
                  defaultValue=""
                  defaultText="Choose..."
                  value={formData.orderType ? formData.orderType : ""}
                  onChange={onInputChange}
                  data={[{ type: 'Online'}, { type: 'Walk-in'}]}
                  valueKey="type"
                  textKey="type" 
                />
              </Li>
              <SubmitOrReset
                buttonName={'Save'}
                buttonDisabled={buttonDisabled}
                formSubmit={formSubmit}
                formReset={formReset}
              />
            </Ul>
          </Card>
        </div>
        <div className="col-12 col-xl-4">
          <Card width="col" title="Update Merchants">
            <Ul>
              <Merchant
                pathname={'/merchants'}
                component={'merchant'}
              />
            </Ul>
          </Card>
        </div>
      </div>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  merchantData: selectMerchantData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderMerchantForm);