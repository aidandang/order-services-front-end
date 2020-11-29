import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { getReq } from '../../state/api/api.requests';
import { ReceivingActionTypes } from '../../state/receiving/receiving.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectReceivingData } from '../../state/receiving/receiving.selectors';

// inital values
const formSchema = Yup.object().shape({
  tracking: Yup
    .string()
    .required()
});

const formState = {
  tracking: ""
};

const UpdateTrackingToOrder = ({
  data,
  alertMessage,
  getReq,
  receivingData
}) => {

  const { byId } = data;
  const { allIds } = receivingData;

  const [success, setSuccess] = useState(false);

  let orderEditing = null;

  if (byId && byId.receiving) {
    orderEditing = {
      ...formState, ...byId.receiving
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
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS;

    const obj = { ...formData }
    getReq(`/receiving`, fetchSuccess, `?tracking=${obj.code}`, setSuccess, 'update-tracking-to-order')
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>

    { alertMessage && alertMessage.component === 'update-tracking-to-order' && <AlertMesg /> }

    { 
      success 
      ? <>
        <span>{allIds[0]}</span>
      </>
      : <>
        <Card width="col" title="Tracking Number">
          <Ul>
            <Li>
              <TextInput
                label="Tracking (*)" 
                name="code"
                errors={errors}
                smallText="Scan tracking of the order."
                value={formData.code}
                onChange={onInputChange}
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
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  alertMessage: selectAlertMessage,
  receivingData: selectReceivingData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTrackingToOrder);