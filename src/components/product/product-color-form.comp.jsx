import React, { useEffect, useState } from 'react'

// dependencies
import * as Yup from "yup"
// components
import { Li, TextInput } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
// redux
import { connect } from 'react-redux'
import { patchReq } from '../../state/api/api.requests'
import { ProductActionTypes } from '../../state/product/product.types' 
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// constants
const formSchema = Yup.object().shape({
  color: Yup
    .string()
    .required(),
  image: Yup
    .string(),
  url: Yup
    .string()
})
const formState = {
  color: "",
  image: "",
  url: ""
}

const ProductColorForm = ({
  byId, // ownProps
  action, // ownProps
  setAction, // ownProps
  component, // ownProps
  colorTemp, // ownProps, undefined if action is 'add'
  patchReq
}) => {

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(colorTemp ? colorTemp : formState, formState, formSchema)

  const formSubmit = e => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS
    const pathname = '/products/' + byId._id

    var reqBody = null

    if (action === 'add') reqBody = { 
      ...byId,
      colors: [ ...byId.colors, formData]
    }

    if (action === 'edit') reqBody = {
      ...byId,
      colors: byId.colors.map(color => {
        if (color._id !== colorTemp._id) {
          return color
        }
        return {
          ...color,
          ...formData
        }
      })
    }

    if (action === 'remove') reqBody = {
      ...byId,
      colors: byId.colors.filter(color => color._id !== colorTemp._id)
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
              label="Color (*)"
              name="color"
              size="col"
              errors={errors}
              smallText="Copy and paste color from the product's website."
              value={formData.color}
              onChange={onInputChange}
            /> 
          </Li>
          <Li>
            <TextInput
              label="Image (*)"
              name="image"
              size="col"
              errors={errors}
              smallText="Copy and paste image address from the product's website."
              value={formData.image}
              onChange={onInputChange}
            /> 
          </Li>      
        </form>
        <SubmitOrReset 
          buttonName={colorTemp ? 'Update' : 'Add'}
          buttonDisabled={buttonDisabled}
          formSubmit={formSubmit}
          formReset={formReset}
        />
      </>
      : <>
        <form>
          <Li>
            <span>Do you want to remove {colorTemp ? colorTemp.color : null}?</span>
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
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(null, mapDispatchToProps)(ProductColorForm)