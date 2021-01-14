import React, { useState, useEffect } from 'react'

// dependecies
import * as Yup from "yup"
import InputMask from 'react-input-mask'
import { useHistory, useLocation } from 'react-router-dom'
// component
import { Card, Ul, Li, TextInput, SelectInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import { stateList, provinceList } from '../../state/data/data'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { postReq, patchReq } from '../../state/api/api.requests'
import { CustomerActionTypes } from '../../state/customer/customer.types'
import { orderSetComp } from '../../state/order/order.actions'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const formSchema = Yup.object().shape({
  nickname: Yup
    .string()
    .required(),
  fullname: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email(),
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
    .required(),
  note: Yup
    .string()
})
const formState = {
  email: "",
  nickname: "",
  fullname: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
  note: ""
}

// This component is a form of customer fields (not included shippingInfo object).
// The form if valid will be submitted as 2 cases:
// - Add new customer and update an existing customer.

const CustomerForm = ({
  isOrderCalled, // ownProps
  customerTemp, // ownProps
  setIsCustomerForm, // ownProps
  patchReq,
  postReq,
  alertMessage,
  setComp
}) => {

  const history = useHistory()
  const location = useLocation()

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(customerTemp ? customerTemp : formState, formState, formSchema)

  const country = [
    {
      name: 'Vietnam'
    },
    {
      name: 'United States'
    }
  ]

  var state = []

  if (formData.country === 'Vietnam') {
    state = [ ...provinceList ]
  } 

  if (formData.country === 'United States') {
    state = [ ...stateList ]
  }

  // go back to CustomerInfo if the editing is successed
  const goBackIfSuccess = () => {
    setIsCustomerForm(false)
  }

  const formSubmit = () => {
    
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS
    const reqBody = { ...formData }

    if (customerTemp) {
      patchReq(`/customers/${customerTemp._id}`, fetchSuccess, reqBody, goBackIfSuccess, 'customer-form')
    } else {
      postReq('/customers', fetchSuccess, reqBody, setSuccess, 'customer-form')
    }
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (success) {
      if (isOrderCalled) {
        setComp('select-customer')
      } else {
        history.push(location.pathname.split('/add')[0])
      }
    }
    // eslint-disable-next-line
  }, [success])
  
  return <>
    { alertMessage && alertMessage.component === 'customer-form' && <AlertMesg /> }
 
    <Card width="col" title={customerTemp ? 'Edit' : 'Add Customer'}>
      <Ul>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="Nickname (*)" 
                name="nickname"
                errors={errors}
                size="col"
                smallText="Nickname is required."
                value={formData.nickname}
                onChange={onInputChange} 
              />
            </div>
            <div className="col-xl-6">
              <TextInput
                label="Full Name (*)" 
                name="fullname"
                errors={errors}
                size="col"
                smallText="Fullname is required."
                value={formData.fullname}
                onChange={onInputChange}
              />
            </div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="Email" 
                name="email"
                errors={errors}
                size="col"
                smallText="Email is not required."
                value={formData.email}
                onChange={onInputChange} 
              />
            </div>
            <div className="col-xl-6">
              <TextInput
                label="Note" 
                name="note"
                errors={errors}
                smallText="Some details about the customer."
                value={formData.note}
                onChange={onInputChange}
              />
            </div>
          </div>
        </Li>
        <Li>
          <SelectInput
            label="Country (*)" 
            name="country"
            errors={errors}
            size="col-xl-6"
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
          <div className="row">
            <div className="col-xl-8">
              <TextInput
                label="Street Address (*)" 
                name="streetAddress1"
                errors={errors}
                size="col"
                smallText="Including 'Phuong' if needed."
                value={formData.streetAddress1}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-4">
              <TextInput
                label="Apt, Suite, Build" 
                name="streetAddress2"
                errors={errors}
                size="col"
                smallText="This field is optional."
                value={formData.streetAddress2}
                onChange={onInputChange}
              />
            </div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="City/District (*)" 
                name="city"
                errors={errors}
                size="col"
                smallText="City is for United States, District is for Vietnam."
                value={formData.city}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-6">
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
            </div>
          </div> 
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
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
            <div className="col-xl-6">
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
        <SubmitOrReset 
          buttonName={'Update'}
          buttonDisabled={buttonDisabled}
          formSubmit={formSubmit}
          formReset={formReset}
        />
      </Ul>
    </Card>
    
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
  ),
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)