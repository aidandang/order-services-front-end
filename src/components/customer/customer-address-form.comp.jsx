import React, { useState, useEffect } from 'react'

// dependecies
import * as Yup from "yup"
import InputMask from 'react-input-mask'
// component
import { Li, TextInput, SelectInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { stateList, provinceList } from '../../state/data/data'
// redux
import { connect } from 'react-redux'
import { patchReq } from '../../state/api/api.requests'
import { CustomerActionTypes } from '../../state/customer/customer.types'
// constants
const formSchema = Yup.object().shape({
  fullname: Yup
    .string()
    .required(),
  note: Yup
    .string(),
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
})
const formState = {
  fullname: "",
  note: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
}
const country = [
  {
    name: 'Vietnam'
  },
  {
    name: 'United States'
  }
]

const CustomerAddressForm = ({
  byId,
  action,
  setAction,
  component,
  addressTemp,
  patchReq
}) => {

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(addressTemp ? addressTemp : formState, formState, formSchema)

  let state = []

  if (formData.country === 'Vietnam') {
    state = provinceList
  } 

  if (formData.country === 'United States') {
    state = stateList
  }

  const formSubmit = e => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS
    const pathname = '/customers/' + byId._id

    var reqBody = null

    if (action === 'add') reqBody = { 
      ...byId,
      shippingInfo: [ ...byId.shippingInfo, formData]
    }

    if (action === 'edit') reqBody = {
      ...byId,
      shippingInfo: byId.shippingInfo.map(address => {
        if (address._id !== addressTemp._id) {
          return address
        }
        return {
          ...address,
          ...formData
        }
      })
    }

    if (action === 'remove') reqBody = {
      ...byId,
      shippingInfo: byId.shippingInfo.filter(address => address._id !== addressTemp._id)
    }
    
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
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
    <form>
      <Li>
        <div className="row">
          <div className="col text-right">
            <a
              href="/"
              className="a-link-cs"
              onClick={e => {
                e.preventDefault()
                setAction('')
              }}
            >
              Cancel
            </a>
          </div>  
        </div>
      </Li>
    </form>
    {
      action !== 'remove'
      ? <>
        <form>
          <Li>
            <TextInput
              label="Full Name (*)" 
              name="fullname"
              errors={errors}
              smallText="Othername is optional but fullname is must."
              value={formData.fullname}
              onChange={onInputChange}
            />
          </Li>
          <Li>
            <TextInput
              label="Note"
              name="note"
              errors={errors}
              smallText="Some special information."
              value={formData.note}
              onChange={onInputChange} 
            />
          </Li>
          <Li>
            <SelectInput
              label="Country (*)" 
              name="country"
              errors={errors}
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
              smallText="City is for United States, District is for Vietnam."
              value={formData.city}
              onChange={onInputChange}
            />
            <SelectInput
              label="State/Province (*)" 
              name="state"
              errors={errors}
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
        </form>
        <SubmitOrReset 
          buttonName={addressTemp ? 'Update' : 'Add'}
          buttonDisabled={buttonDisabled}
          formSubmit={formSubmit}
          formReset={formReset}
        />
      </>
      : <>
        <form>
          <Li>
            <span>Do you want to remove {addressTemp ? addressTemp.streetAddress1 : null}?</span>
          </Li>
        </form>
        <SubmitOrReset
          buttonName={'Remove'}
          buttonDisabled={false}
          formSubmit={formSubmit}
        />
      </>
    }
    
  </>
}

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component))
})

export default connect(null, mapDispatchToProps)(CustomerAddressForm)