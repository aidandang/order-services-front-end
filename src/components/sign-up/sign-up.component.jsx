import React from 'react';

// dependencies
import * as Yup from "yup";
// customs and utils
import { useForm } from '../hook/use-form';
// components
import SignUpForm from './sign-up-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// firebase
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors'; 
import { setAlertMessage } from '../../state/alert/alert.actions';

// set form schema
const formSchema = Yup.object().shape({
  displayName: Yup
    .string()
    .required("Please provide your name"),
  email: Yup
    .string()
    .email("This must be a valid email address.")
    .required("Please provide your email."),
  password: Yup
    .string()
    .required("Please provide your password."),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
});
// set form state
const formState = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

const SignUp = ({
  alertMessage,
  setAlertMessage
}) => {
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = async e => {
    e.preventDefault();

    const { displayName, email, password } = formData;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      setAlertMessage({ message: error.message, color: 'danger' })
    }
  }

  return <>
    {alertMessage && <AlertMesg />}

    <SignUpForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  setAlertMessage: (payload) => dispatch(setAlertMessage(payload)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);