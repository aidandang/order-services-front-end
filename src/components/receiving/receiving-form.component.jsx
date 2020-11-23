import React, { useState, useEffect } from 'react';

// dependecies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';

// component
import { Card, Ul, Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { postReq } from '../../state/api/api.requests';
import { ReceivingActionTypes } from '../../state/receiving/receiving.types';

// initial values
const formSchema = Yup.object().shape({
  tracking: Yup
    .string()
    .required()
});

const formState = {
  tracking: ""
}

// main component
const ReceivingForm = ({
  postReq,
  alertMessage
}) => {

  const history = useHistory();
  const location = useLocation();

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS;
    const reqBody = { ...formData };

    postReq('/customers', fetchSuccess, reqBody, setSuccess, 'customer-add');
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    const pathname = location.pathname.split('/add')[0];
    if (success) history.push(pathname)
    // eslint-disable-next-line
  }, [success])
  
  return <>

    { alertMessage && alertMessage.component === 'receiving-add' && <AlertMesg /> }

    <div className="row">
      <div className="col-xl-8">
        <Card width="col" title={'Scan Tracking Numbers'}>
          <Ul>  
            <Li>
              <TextInput
                label="Tracking (*)" 
                name="tracking"
                errors={errors}
                size="col"
                smallText="Input tracking numbers either by scanning or typing."
                value={formData.tracking}
                onChange={onInputChange} 
              />
            </Li>
          </Ul>
        </Card>
      </div>
      <div className="col-xl-4">
        <Card width="col" title={'Update Tracking'}>
          <Ul>
            <SubmitOrReset 
              buttonName={'Update'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </Ul>
        </Card>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivingForm);