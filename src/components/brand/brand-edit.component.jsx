import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import BrandForm from './brand-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBrandData } from '../../state/brand/brand.selectors';
import { patchReq } from '../../state/api/api.requests';
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
  _id: "",
  name: "",
  preferredName: ""
};

const BrandEdit = ({
  brand,
  data,
  patchReq,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const brandTemp = data.allIds.find(item => item._id === brand._id)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(brandTemp, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    const updatedBrand = { ...formData }

    patchReq(`/brands/${updatedBrand._id}`, fetchSuccess, updatedBrand, setSuccess, 'brand');
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

const mapStateToProps = createStructuredSelector({
  data: selectBrandData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(patchReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandEdit);