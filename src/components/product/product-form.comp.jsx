import React, { useEffect, useState } from 'react'

// dependencies
import * as Yup from "yup"
import { useHistory, useLocation } from 'react-router-dom'
// components
import { Card, Ul, Li, TextInput, TextareaInput, SelectInput } from '../tag/tag.comp'
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
import { orderSetComp } from '../../state/order/order.actions'
// constants
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  brand: Yup
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
  brand: "",
  styleCode: "",
  styleImage: "",
  sku: "",
  desc: "",
  url: ""
}

// This component is a form of product fields (not included Color object).
// The form if valid will be submitted as 2 cases:
// - Add new product and update an existing product.

// There are 2 state callback functions, either will be called when the submission is success:
// - setIsProductForm, a local state function passed by ProductInfo 
// which is set to go back to the product information.
// - setPurcItemTabActive, a global state function is set to go the product list
// in Order Purchasing components.

// useEffect hook is called to decide where to go back when "adding" submission successed:
// - if the case is in Product then go back to ProductList called by ProductPage,
// - if the case is in Order Purchasing then go back to ProductList 
// called by PurchasingItemsForm and checked by argument named isOrderCalled.

const ProductForm = ({
  isOrderCalled, // ownProps
  productTemp, // ownProps
  setIsProductForm, // ownProps
  brandData,
  patchReq,
  postReq,
  setComp,
  alertMessage,
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

  // go back to ProductInfo if the editing is successed
  const goBackIfSuccess = () => {
    setIsProductForm(false)
  }

  const formSubmit = () => {

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS

    // check the method to submit, either add or update
    if (productTemp) {
      const updatedProduct = { 
        ...formData,
        brand: allIds.find(element => element._id === formData.brand)
      }
      patchReq('/products/' + updatedProduct._id, fetchSuccess, updatedProduct, goBackIfSuccess, 'product-form') 
    } else {
      const newProduct = { 
        ...formData,
        brand: allIds.find(element => element._id === formData.brand)
      }
      delete newProduct.brandId
      postReq('/products', fetchSuccess, newProduct, setSuccess, 'product-form')
    }
  }

  const formReset = () => {
    setValues(formState)
  }

  useEffect(() => {
    if (success) {
      if (isOrderCalled) {
        setComp('select-product')
      } else {
        history.push(location.pathname.split('/add')[0])
      }
    } 
    // eslint-disable-next-line
  }, [success])

  return <>
    { alertMessage && alertMessage.component === 'product-form' && <AlertMesg/> }
    
    <Card width="col" title={productTemp ? 'Edit' : 'Add Product'}>
      <Ul>
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
              name="brand"
              errors={errors}
              size="col"
              smallText="Select a brand, add new if there is no brand."
              defaultValue=""
              defaultText="..."
              value={formData.brand ? formData.brand : ""}
              onChange={onInputChange}
              data={allIds}
              valueKey="_id"
              textKey="preferredName"
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
      </Ul>
    </Card>
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
  ),
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)