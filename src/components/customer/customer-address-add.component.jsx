import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import CustomerAddressForm from './customer-address-form.component';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

// initial values
const formSchema = Yup.object().shape({
  fullname: Yup
    .string()
    .required(),
  othername: Yup
    .string()
    .ensure(),
  country: Yup
    .string()
    .required(),
  streetAddress1: Yup
    .string()
    .required(),
  streetAddress2: Yup
    .string()
    .ensure(),
  city: Yup
    .string()
    .required(),
  state: Yup
    .string()
    .required(),
  zipcode: Yup
    .string()
    .required(),
  phone: Yup
    .string()
    .required()
});

const formState = {
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
};

const CustomerAddressAdd = ({
  data,
  patchReq,
  alertMessage,
  setAction
}) => {

  const { byId } = data;

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    const customerTemp = { 
      ...byId,
      shippingInfo: [ ...byId.shippingInfo, formData]
    }
    patchReq('/customers/' + byId._id, fetchSuccess, customerTemp, setSuccess, 'customer-address-add');
  }

  const formReset = () => {
    const obj = { ...formState }
    setValues(prevState => ({
      ...prevState,
      ...obj
    }))
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  return <>
    { alertMessage && alertMessage.component === 'customer-address-add' && <AlertMesg/> }

    <form>
      <Li>
        <div className="row">
          <div className="col text-right">
            <a
              href="/"
              className="a-link-cs"
              onClick={e => {
                e.preventDefault();
                setAction('')
              }}
            >
              Cancel
            </a>
          </div>  
        </div>
      </Li>
    </form>

    <form>
      <CustomerAddressForm
        formData={formData}
        errors={errors} 
        onInputChange={onInputChange}
      />
    </form>
    <SubmitOrReset
      buttonName={'Add Address'}
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
      formReset={formReset}
    /> 
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(patchReq(
    pathname,
    fetchSuccess,
    reqBody,
    setSuccess,
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressAdd);