import React, { useState, useEffect } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Li, TextInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { postReq, patchReq, deleteReq } from '../../state/api/api.requests'
import { BrandActionTypes } from '../../state/brand/brand.types' 
// constants
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  preferredName: Yup
    .string()
    .required()
})
const formState = {
  name: "",
  preferredName: ""
}

const BrandForm = ({ 
  brand,
  action,
  setAction,
  postReq,
  patchReq, 
  deleteReq 
}) => {

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(brand ? brand : formState, formState, formSchema)

  const formSubmit = () => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS
    const obj = { ...formData }

    if (action === 'add') {
      postReq('/brands', fetchSuccess, obj, setSuccess, 'brand')
    }
    if (action === 'edit') {
      patchReq('/brands/' + brand._id, fetchSuccess, obj, setSuccess, 'brand')
    }
    if (action === 'remove') {
      deleteReq('/brands/' + brand._id, fetchSuccess, setSuccess, 'brand')
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
    <form>
      {
        (action === 'add' || action === 'edit') && <>
          <Li>
            <TextInput
              label="Name (*)"
              name="name"
              size="col"
              errors={errors}
              smallText="Name should be unique."
              value={formData.name}
              onChange={onInputChange}
            /> 
          </Li>
          <Li>
            <TextInput
              label="Preferred Name"
              name="preferredName"
              size="col"
              errors={errors}
              smallText="Preferred name for the brand."
              value={formData.preferredName}
              onChange={onInputChange}
            /> 
          </Li>
        </>
      }
      {
        action === 'remove' &&
        <Li>
          <span>Do you want to remove {`${brand ? brand.preferredName : null}`}?</span>
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

export default connect(null, mapDispatchToProps)(BrandForm)