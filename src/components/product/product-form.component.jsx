import React, { useEffect, useState } from 'react'

// dependencies
import * as Yup from "yup"
import { useHistory, useLocation } from 'react-router-dom'
// components
import { Li, TextInput, TextareaInput, SelectInput } from '../tag/tag.component'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { patchReq, postReq } from '../../state/api/api.requests'
import { ProductActionTypes } from '../../state/product/product.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { selectBrandData } from '../../state/brand/brand.selectors'
// constants
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  brandId: Yup
    .string()
    .required(),
  styleCode: Yup
    .string()
    .required(),
  styleImage: Yup
    .string()
    .required(),
  sku: Yup
    .string(),
  desc: Yup
    .string()
    .required(),
  url: Yup
    .string()
})
const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  styleImage: "",
  sku: "",
  desc: "",
  url: ""
}

const ProductForm = ({
  productTemp,
  setIsProductForm,
  brandData,
  alertMessage,
  patchReq,
  postReq
}) => {
  
  const history = useHistory()
  const location = useLocation()

  const { allIds } = brandData

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(productTemp ? { ...productTemp } : formState, formState, formSchema)

  const goBackIfSuccess = () => {
    setIsProductForm(false)
  }

  const formSubmit = () => {

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS

    if (productTemp) {
      const updatedProduct = { 
        ...formData,
        brand: allIds.find(element => element._id === formData.brandId)
      }
      delete updatedProduct.brandId
      patchReq('/products/' + updatedProduct._id, fetchSuccess, updatedProduct, goBackIfSuccess, 'product-edit') 
    } else {
      const newProduct = { 
        ...formData,
        brand: allIds.find(element => element._id === formData.brandId)
      }
      delete newProduct.brandId
      postReq('/products', fetchSuccess, newProduct, setSuccess, 'product-add')
    }
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    const pathname = location.pathname.split('/add')[0]
    if (success) history.push(pathname)
    // eslint-disable-next-line
  }, [success])

  return <>
    
    { alertMessage && (alertMessage.component === 'product-edit' || alertMessage.component === 'product-add') && <AlertMesg/> }
    
    <Li>
      <TextInput
        label="Name (*)" 
        name="name"
        errors={errors}
        size="col"
        smallText="Name is required and should be unique."
        value={formData.name}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      {
        allIds &&
        <SelectInput
          label="Brand (*)" 
          name="brandId"
          errors={errors}
          size="col"
          smallText="Select a brand, add new if there is no brand."
          defaultValue=""
          defaultText="..."
          value={formData.brandId ? formData.brandId : ""}
          onChange={onInputChange}
          data={allIds}
          valueKey="_id"
          textKey="name"
        />
      }
    </Li>
    <Li>
      <TextInput
        label="Style Code (*)" 
        name="styleCode"
        errors={errors}
        size="col"
        smallText="Style code is required."
        value={formData.styleCode}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <TextInput
        label="SKU" 
        name="sku"
        errors={errors}
        size="col"
        smallText="SKU can be scanned from the product label."
        value={formData.sku}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <TextareaInput
        label="Description (*)" 
        name="desc"
        errors={errors}
        size="col"
        smallText="Copy a short description of the product in here."
        value={formData.desc}
        onChange={onInputChange} 
      />
    </Li>
    <Li>
      <TextInput
        label="Image URL (*)" 
        name="styleImage"
        errors={errors}
        size="col"
        smallText="Copy image hyperlink in here."
        value={formData.styleImage}
        onChange={onInputChange}
      />
    </Li>
    <Li>
      <TextInput
        label="Reference URL" 
        name="url"
        errors={errors}
        size="col"
        smallText="Copy product hyperlink of the website in here."
        value={formData.url}
        onChange={onInputChange} 
      />
    </Li>
    <SubmitOrReset 
      buttonName={'Update'}
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
      formReset={formReset}
    /> 
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  brandData: selectBrandData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)