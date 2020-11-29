import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory, useParams, Redirect } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput, SelectInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import UpdateTrackingToOrder from './update-tracking-to-order.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// inital values
const formSchema = Yup.object().shape({
  type: Yup
    .string()
    .required(),
  code: Yup
    .string()
    .required()
});

const formState = {
  type: "",
  code: ""
};

const types = [
  { 
    value: 'created',
    text: 'created'
  },
  { 
    value: 'ordered',
    text: 'ordered'
  },
  { 
    value: 'received',
    text: 'received'
  },
  { 
    value: 'shipped',
    text: 'shipped'
  },
  { 
    value: 'delivered',
    text: 'delivered'
  },
  { 
    value: 'cancelled',
    text: 'cancelled'
  }
];

// main component
const OrderStatusForm = ({
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
  const parentRoute = location.pathname.split('/update-order-status')[0];

  const [success, setSuccess] = useState(false)

  let orderEditing = null;

  if (byId && byId.status) {
    orderEditing = {
      ...formState,
      type: byId.status.type,
      code: byId.status.code
    }
  }

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;

    const obj = { ...formData }

    patchReq(`/orders/${orderId}`, fetchSuccess, { status: obj }, setSuccess, 'order-status-form')
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) history.push(parentRoute)
  }, [success, history, parentRoute])

  return <>
    { alertMessage && alertMessage.component === 'order-status-form' && <AlertMesg /> }

    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} />
      :
      <div className="row">
        <div className="col-12 col-xl-8">
          <Card width="col" title="Order Status">
            <Ul>
              <Li>
                <SelectInput
                  label="Status (*)" 
                  name="type"
                  errors={errors}
                  smallText="Select a optional status stage of the order."
                  defaultValue=""
                  defaultText="..."
                  value={formData.type ? formData.type : ""}
                  onChange={onInputChange}
                  data={types}
                  valueKey="value"
                  textKey="text"
                />
              </Li>
              {
                formData.type !== 'received' 
                &&  
                <Li>
                  <TextInput
                    label="Status Description (*)" 
                    name="code"
                    errors={errors}
                    smallText="Detail information of the status."
                    value={formData.code}
                    onChange={onInputChange}
                  />
                </Li>
              }
            </Ul>
          </Card> 
        </div>
        <div className="col-12 col-xl-4">
          {
            formData.type !== 'received'
            ? 
            <Card width="col" title="Update Status">
              <Ul>
                <SubmitOrReset
                  buttonName={'Save'}
                  buttonDisabled={buttonDisabled}
                  formSubmit={formSubmit}
                  formReset={formReset}
                />
              </Ul>
            </Card>
            :
            <UpdateTrackingToOrder />
          }
        </div>
      </div> 
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusForm);