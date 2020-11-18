import React, { useEffect, useState } from 'react';

//dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import BrandForm from './brand-form.component';

// redux
import { connect } from 'react-redux';
import { postReq } from '../../state/api/api.requests';
import { BrandActionTypes } from '../../state/brand/brand.types';


// initial values
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  preferredName: Yup
    .string()
    .required()
});

const formState = {
  name: "",
  preferredName: ""
};

const BrandAdd = ({
  postReq,
  alertMessage,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    const newBrand = { ...formData}

    postReq('/brands', fetchSuccess, newBrand, setSuccess, 'brand');
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

  // main component
  return <>
    <form onSubmit={formSubmit}>
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
      <BrandForm
        formData={formData} 
        errors={errors} 
        onInputChange={onInputChange}
      />
    </form>
    <SubmitOrReset
      buttonName={'Submit'}
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
      formReset={formReset}
    />
  </>
}

const mapDispatchToProps = dispatch => ({
  postReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(postReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ))
})

export default connect(null, mapDispatchToProps)(BrandAdd);