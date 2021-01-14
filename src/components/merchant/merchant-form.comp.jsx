import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
// components
import { Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
// redux
import { connect } from 'react-redux';
import { postReq, patchReq, deleteReq } from '../../state/api/api.requests';
import { MerchantActionTypes } from '../../state/merchant/merchant.types'; 

// initial values
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  url: Yup
    .string()
    .required()
});
const formState = {
  name: "",
  url: ""
};

const MerchantForm = ({
  merchant,
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
  ] = useForm(merchant ? merchant : formState, formState, formSchema);

  const formSubmit = (e) => {
    const fetchSuccess = MerchantActionTypes.MERCHANT_FETCH_SUCCESS;
    const obj = { ...formData }

    if (action === 'add') {
      postReq('/merchants', fetchSuccess, obj, setSuccess, 'merchant');
    }
    if (action === 'edit') {
      patchReq('/merchants/' + merchant._id, fetchSuccess, obj, setSuccess, 'merchant');
    }
    if (action === 'remove') {
      deleteReq('/merchants/' + merchant._id, fetchSuccess, setSuccess, 'merchant');
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
              smallText="Name of the merchant."
              value={formData.name}
              onChange={onInputChange}
            />
          </Li>
          <Li>
            <TextInput
              label="Official Website" 
              name="url"
              errors={errors}
              size="col"
              smallText="The link to merchant's website."
              value={formData.url}
              onChange={onInputChange}
            />
          </Li>
        </>
      }
      {
        action === 'remove' &&
        <Li>
          <span>Do you want to remove {`${merchant ? merchant.name : null}`}?</span>
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

export default connect(null, mapDispatchToProps)(MerchantForm);