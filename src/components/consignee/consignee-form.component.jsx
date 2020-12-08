import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import InputMask from 'react-input-mask';
// components
import { Li, TextInput, SelectInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import { stateList, provinceList } from '../../state/data/data';
// redux
import { connect } from 'react-redux';
import { postReq, patchReq, deleteReq } from '../../state/api/api.requests';
import { ConsigneeActionTypes } from '../../state/consignee/consignee.types'; 

// form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
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
// form state
const formState = {
  name: '',
  country: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  state: '',
  zipcode: '',
  phone: ''
}
// initial values
const country = [
  {
    name: 'Vietnam'
  },
  {
    name: 'United States'
  }
]

const ConsigneeForm = ({
  consignee,
  action,
  setAction,
  postReq,
  patchReq,
  deleteReq
}) => {

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(consignee ? consignee : formState, formState, formSchema);

  let state = []
  if (formData.country === 'Vietnam') {
    state = provinceList;
  } 
  if (formData.country === 'United States') {
    state = stateList;
  }

  const formSubmit = (e) => {
    const fetchSuccess = ConsigneeActionTypes.CONSIGNEE_FETCH_SUCCESS;
    const obj = { ...formData }

    if (action === 'add') {
      postReq('/consignees', fetchSuccess, obj, setSuccess, 'consignee');
    }
    if (action === 'edit') {
      patchReq('/consignees/' + consignee._id, fetchSuccess, obj, setSuccess, 'consignee');
    }
    if (action === 'remove') {
      deleteReq('/consignees/' + consignee._id, fetchSuccess, setSuccess, 'consignee');
    }
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
      {
        (action === 'add' || action === 'edit') && <>
          <Li>
            <TextInput
              label="Name (*)" 
              name="name"
              errors={errors}
              size="col"
              smallText="Name of the consignee."
              value={formData.name}
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
        </>
      }
      {
        action === 'remove' &&
        <Li>
          <span>Do you want to remove?</span>
        </Li>
      }        
    </form>
    <SubmitOrReset
      buttonName={action === 'remove' ? 'Remove' : 'Submit'}
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
      formReset={action === 'remove' ? null : formReset}
    />
  </>
}

const mapDispatchToProps = dispatch => ({
  deleteReq: (pathname, fetchSuccess, setSuccess, component) => dispatch(
    deleteReq(pathname, fetchSuccess, setSuccess, component)
  ),
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(null, mapDispatchToProps)(ConsigneeForm)