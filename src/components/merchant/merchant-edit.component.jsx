import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import MerchantForm from './merchant-form.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMerchantData } from '../../state/merchant/merchant.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { patchReq } from '../../state/api/api.requests';
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

const MerchantEdit = ({
  merchant,
  data,
  patchReq,
  alertMessage,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const merchantTemp = data.allIds.find(item => item._id === merchant._id)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(merchantTemp, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = MerchantActionTypes.MERCHANT_FETCH_SUCCESS;
    const updateMerchant = { ...formData };

    patchReq('/merchants/' + merchant._id, fetchSuccess, updateMerchant, setSuccess, 'merchant-edit');
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

    { alertMessage && alertMessage.component === 'merchant-edit' && <AlertMesg/> }

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
      <MerchantForm
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
  alertMessage: selectAlertMessage,
  data: selectMerchantData
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

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEdit);