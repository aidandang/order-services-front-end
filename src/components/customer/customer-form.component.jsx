import React, { useState, useEffect } from 'react';

// dependecies
import * as Yup from "yup";
import InputMask from 'react-input-mask';
import { useHistory, useLocation } from 'react-router-dom';

// component
import { Card, Ul, Li, TextInput, SelectInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { postReq, patchReq } from '../../state/api/api.requests';
import { CustomerActionTypes } from '../../state/customer/customer.types';

// initial data
import { stateList, provinceList } from '../../state/data/data';

// initial values
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
  nickname: Yup
    .string()
    .required(),
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
  email: "",
  nickname: "",
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
}

// main component
const CustomerForm = ({
  byId,
  patchReq,
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
  ] = useForm(byId ? byId : formState, formState, formSchema);

  const country = [
    {
      name: 'Vietnam'
    },
    {
      name: 'United States'
    }
  ]

  let state = []

  if (formData.country === 'Vietnam') {
    state = provinceList;
  } 

  if (formData.country === 'United States') {
    state = stateList;
  }

  const formSubmit = () => {
    
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    const reqBody = { ...formData };

    if (byId) {
      patchReq(`/customers/${byId._id}`, fetchSuccess, reqBody, setSuccess, 'customer-edit');
    } else {
      postReq('/customers', fetchSuccess, reqBody, setSuccess, 'customer-add');
    }
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    let pathname = '';

    if (byId) {
      // remove /edit from the path to go back to Customer Info
      pathname = location.pathname.split(byId._id)[0] + byId._id;
    } else {
      // remove /add from the path to go back to Customer List
      pathname = location.pathname.slice(-4)
    }

    if (success) history.push(pathname)
    // eslint-disable-next-line
  }, [success])
  
  return <>

    { alertMessage && (alertMessage.component === 'customer-add' || alertMessage.component === 'customer-edit') && <AlertMesg /> }

    <div className="row">
      <div className="col-xl-8">
        <Card width="col" title={'Add a new customer'}>
          <Ul>  
            <Li>
              <TextInput
                label="Email (*)" 
                name="email"
                errors={errors}
                size="col"
                smallText="Email is required."
                value={formData.email}
                onChange={onInputChange} 
              />
            </Li>
            <Li>
              <TextInput
                label="Nickname (*)" 
                name="nickname"
                errors={errors}
                size="col"
                smallText="Nickname is required."
                value={formData.nickname}
                onChange={onInputChange} 
              />
            </Li>
            <Li>
              <TextInput
                label="Full Name (*)" 
                name="fullname"
                errors={errors}
                size="col"
                smallText="Fullname is required."
                value={formData.fullname}
                onChange={onInputChange}
              />
            </Li>
            <Li>
              <TextInput
                label="Other Name" 
                name="othername"
                errors={errors}
                size="col"
                smallText="Special information can be fill in here."
                value={formData.othername}
                onChange={onInputChange}
              />
            </Li>
            <Li>
              <SelectInput
                label="Country (*)" 
                name="country"
                errors={errors}
                size="col"
                smallText="Choose country before state/province."
                defaultValue=""
                defaultText="Choose..."
                value={formData.country ? formData.country : ""}
                onChange={onInputChange}
                data={country}
                valueKey="name"
                textKey="name" 
              />
            </Li>
            <Li>
              <TextInput
                label="Street Address (*)" 
                name="streetAddress1"
                errors={errors}
                size="col"
                smallText="Including 'Phuong' if needed."
                value={formData.streetAddress1}
                onChange={onInputChange}
              />
            </Li>
            <Li>
              <TextInput
                label="Apt, Suite, Build" 
                name="streetAddress2"
                errors={errors}
                size="col"
                smallText="This field is optional."
                value={formData.streetAddress2}
                onChange={onInputChange}
              />
            </Li>
            <Li>
              <TextInput
                label="City/District (*)" 
                name="city"
                errors={errors}
                size="col"
                smallText="City is for United States, District is for Vietnam."
                value={formData.city}
                onChange={onInputChange}
              />
            </Li>
            <Li> 
              <SelectInput
                label="State/Province (*)" 
                name="state"
                errors={errors}
                size="col"
                smallText="Choose country before state/province."
                defaultValue=""
                defaultText="Choose..."
                value={formData.state ? formData.state : ""}
                onChange={onInputChange}
                data={state}
                valueKey="name"
                textKey="name" 
              />
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="zipcode">Zip Code/Postal Code (*)</label>
                    <InputMask
                      mask="99999"
                      maskChar=" " 
                      type="text" 
                      className="form-control" 
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={onInputChange} 
                    />
                    <small>If country is Vietnam then Zipcode is 10000.</small>
                    {errors.zipcode.length > 0 ? <p className="mt-2 text-danger">{errors.zipcode}</p> : null}
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phone">Phone (*)</label>
                    <InputMask
                      mask="999-999-9999"
                      maskChar=" "
                      type="text" 
                      className="form-control" 
                      name="phone"
                      value={formData.phone}
                      onChange={onInputChange} 
                    />
                    <small>Hanoi home phone is 246-666-6666.</small>
                    {errors.phone.length > 0 ? <p className="mt-2 text-danger">{errors.phone}</p> : null}
                  </div>
                </div>
              </div>
            </Li>
          </Ul>
        </Card>
      </div>
      <div className="col-xl-4">
        <Card width="col" title={'Update Customer'}>
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
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);