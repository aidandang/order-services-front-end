import React from 'react';

// dependencies
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

// customs and utils
import { useForm } from '../custom-hooks/use-form';

// components
import ResetPasswordForm from './reset-password-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postUserAuthReq } from '../../state/api/auth-requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// set form schema
const formSchema = Yup.object().shape({
  password: Yup
    .string()
    .required("Please provide your password."),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Confirmed password does NOT match.')
});

// set form state
const formState = {
  password: "",
  passwordConfirm: ""
};

const ResetPassword = ({ 
  postUserAuthReq, 
  alertMessage
}) => {

  const params = useParams();

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    postUserAuthReq(`/users/reset-password/${params.token}`, formData);
  }

  return <>
    {
      alertMessage 
      ? <AlertMesg />
      : <ResetPasswordForm 
        formData={formData} 
        formSubmit={formSubmit} 
        errors={errors} 
        onInputChange={onInputChange} 
        buttonDisabled={buttonDisabled}
      />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postUserAuthReq: (endpoint, reqBody) => dispatch(postUserAuthReq(endpoint, reqBody))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);