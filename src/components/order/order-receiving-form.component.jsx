import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import moment from 'moment';
import { useLocation, useHistory, useParams, Redirect } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput, SelectInput, DateInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import Warehouse from '../warehouse/warehouse.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';
import { selectOrderData } from '../../state/order/order.selectors';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// inital values
const formSchema = Yup.object().shape({
  status: Yup
    .string()
    .required(),
  tracking: Yup
    .string(),
  recvDate: Yup
    .string(),
  warehouse: Yup
    .string()
    .required()
});

const formState = {
  status: "",
  tracking: "",
  recvDate: "",
  warehouse: ""
}

// main component
const OrderReceivingForm = ({
  warehouseData,
  data,
  alertMessage,
  patchReq
}) => {

  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const { byId } = data;
  const { orderId } = params;

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-order-receiving')[0];

  const [success, setSuccess] = useState(false)

  let orderEditing = null;

  if (byId && byId.receiving) {
    orderEditing = {
      ...formState,
      status: byId.receiving.status,
      tracking: byId.receiving.tracking,
      recvDate: moment(byId.receiving.recvDate).format('yyyy-MM-DD'),
      warehouse: byId.receiving.warehouse._id
    }
  }

  let warehouses = null;

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
    
    const warehouseObj = warehouseData.allIds.find(item => item._id === formData.warehouse)

    const obj = { 
      ...formData,
      warehouse: warehouseObj,
    }

    patchReq(`/orders/${orderId}`, fetchSuccess, { receiving: obj }, setSuccess, 'order-receiving-form')
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) history.push(parentRoute)
  }, [success, history, parentRoute])

  return <>
    { alertMessage && alertMessage.component === 'order-cost' && <AlertMesg /> }

    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} />
      :
      <div className="row">
        <div className="col-12 col-xl-8">
          <Card width="col" title="Order Receiving">
            <Ul>
              <Li>
                <TextInput
                  label="Status (*)" 
                  name="status"
                  errors={errors}
                  smallText="Status of the order is required."
                  value={formData.status}
                  onChange={onInputChange}
                />
              </Li>
              <Li>
                <div className="row">
                  <div className="col-xl-6">
                    <TextInput
                      label="Tracking Number" 
                      name="tracking"
                      errors={errors}
                      smallText="Tracking is optional."
                      value={formData.tracking}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-6">
                    <DateInput
                      label="Received Date" 
                      name="recvDate"
                      errors={errors}
                      smallText="Received date is optional."
                      value={formData.recvDate}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
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
          <Card width="col" title="Update Warehouses">
            <Ul>
              <Warehouse
                pathname={'/warehouses'}
                component={'warehouse'}
              />
            </Ul>
          </Card>
        </div>
      </div> 
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  warehouseData: selectWarehouseData,
  data: selectOrderData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderReceivingForm);