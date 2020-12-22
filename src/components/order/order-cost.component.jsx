import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory, useParams, Redirect } from 'react-router-dom';

// components
import { Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import OrderCostForm from './order-cost-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectOrderData } from '../../state/order/order.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// initial form state
const formSchema = Yup.object().shape({
  shippingCost: Yup
    .string(),
  saleTax: Yup
    .string()
})

const formState = {
  shippingCost: "",
  saleTax: ""
}

// main component
const OrderCost = ({
  data,
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
  const parentRoute = location.pathname.split('/update-order-cost')[0];

  const [success, setSuccess] = useState(false)

  let orderEditing = null;

  if (byId && byId.cost) {
    orderEditing = {
      ...formState,
      shippingCost: acctToStr(byId.cost.shippingCost),
      saleTax: acctToStr(byId.cost.saleTax)
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

    const shippingCost = strToAcct(obj.shippingCost);
    obj.shippingCost = shippingCost;
    const saleTax = strToAcct(obj.saleTax);
    obj.saleTax = saleTax;

    patchReq(`/orders/${orderId}`, fetchSuccess, { cost: obj }, setSuccess, 'order-cost')
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
      <Card width="col" title="Local Costs">
        <Ul>
          <form onSubmit={formSubmit}>
            <OrderCostForm
              formData={formData}
              errors={errors} 
              onInputChange={onInputChange}
            />
            <SubmitOrReset
              buttonName={'Save'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </form>
        </Ul>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderCost);