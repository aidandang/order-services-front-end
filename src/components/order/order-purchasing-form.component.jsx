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
import Warehouse from '../warehouse/warehouse.component';
import OrderItem from './order-item.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OrderActionTypes } from '../../state/order/order.types';
import { patchReq } from '../../state/api/api.requests';
import { selectMerchantData } from '../../state/merchant/merchant.selectors';
import { selectOrderData } from '../../state/order/order.selectors';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';

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
  type: Yup
    .string()
    .required(),
  warehouse: Yup
    .string()
    .required()
});

const formState = {
  merchant: "",
  orderNumber: "",
  orderDate: "",
  type: "",
  warehouse: ""
}

const OrderPurchasingForm = ({
  data,
  patchReq,
  merchantData,
  warehouseData
}) => {

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-purchasing-info')[0];

  const [success, setSuccess] = useState(false)

  const { orderId } = params;
  const { byId } = data;

  let orderEditing = null;

  if (byId && byId.purchasing) {
    orderEditing = {
      merchant: byId.purchasing.merchant._id,
      orderNumber: byId.purchasing.orderNumber,
      orderDate: moment(byId.purchasing.orderDate).format('yyyy-MM-DD'),
      type: byId.purchasing.type,
      warehouse: byId.purchasing.warehouse._id,
    }
  }

  let merchants = null;
  let warehouses = null;

  if (merchantData.allIds) merchants = merchantData.allIds;
  if (warehouseData.allIds) warehouses = warehouseData.allIds;

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
    const warehouseObj = warehouseData.allIds.find(item => item._id === formData.warehouse)

    const obj = { 
      ...formData,
      merchant: merchantObj,
      warehouse: warehouseObj
    }

    patchReq(`/orders/${orderId}`, fetchSuccess, { purchasing: obj }, setSuccess, 'order-merchant-form')
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
          <Card width="col" title="Purchasing Order">
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
                  label="Type (*)" 
                  name="type"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Online or walk-in."
                  defaultValue=""
                  defaultText="Choose..."
                  value={formData.type ? formData.type : ""}
                  onChange={onInputChange}
                  data={[{ type: 'online'}, { type: 'walk-in'}, { type: 'shipping'}]}
                  valueKey="type"
                  textKey="type" 
                />
              </Li>
              <Li>
                <SelectInput
                  label="Warehouse (*)" 
                  name="warehouse"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Select a warehouse, add new if there is no warehouse."
                  defaultValue=""
                  defaultText="..."
                  value={formData.warehouse ? formData.warehouse : ""}
                  onChange={onInputChange}
                  data={warehouses}
                  valueKey="_id"
                  textKey="name"
                />
              </Li>
            </Ul>
          </Card>
          <OrderItem order={byId} />
        </div>
        <div className="col-12 col-xl-4">
          <Card width="col" title="Update">
            <Ul>
              <SubmitOrReset
                buttonName={'Submit'}
                buttonDisabled={buttonDisabled}
                formSubmit={formSubmit}
                formReset={formReset}
              />
            </Ul>
          </Card>
          <Merchant />
          <Warehouse />
        </div>
      </div>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  merchantData: selectMerchantData,
  warehouseData: selectWarehouseData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPurchasingForm);