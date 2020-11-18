import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductColorForm from './product-color-form.compoent';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { patchReq } from '../../state/api/api.requests';
import { ProductActionTypes } from '../../state/product/product.types'; 

// initial values
const formSchema = Yup.object().shape({
  color: Yup
    .string()
    .required(),
  image: Yup
    .string(),
  url: Yup
    .string()
});

const formState = {
  color: "",
  image: "",
  url: ""
};

const ProductColorAdd = ({
  patchReq,
  data,
  setAction,
  alertMessage
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
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const productTemp = { 
      ...byId,
      colors: [ ...byId.colors, formData]
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp, setSuccess, 'product-color-add');
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

    { alertMessage && alertMessage.component === 'product-color-add' && <AlertMesg/> }
      
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
      <ProductColorForm
        formData={formData} 
        errors={errors} 
        onInputChange={onInputChange}
      />
    </form>
    <SubmitOrReset
      buttonName={'Add Color'}
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
      formReset={formReset}
    /> 
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    componnent
  ) => dispatch(patchReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    componnent
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorAdd);