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
import { CourierActionTypes } from '../../state/courier/courier.types'; 

// form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required()
});
// form state
const formState = {
  name: ''
}

const CourierForm = ({
  courier,
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
  ] = useForm(courier ? courier : formState, formState, formSchema);

  const formSubmit = (e) => {
    const fetchSuccess = CourierActionTypes.COURIER_FETCH_SUCCESS;
    const obj = { ...formData }

    if (action === 'add') {
      postReq('/couriers', fetchSuccess, obj, setSuccess, 'courier');
    }
    if (action === 'edit') {
      patchReq('/couriers/' + courier._id, fetchSuccess, obj, setSuccess, 'courier');
    }
    if (action === 'remove') {
      deleteReq('/couriers/' + courier._id, fetchSuccess, setSuccess, 'courier');
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
              smallText="Name of the courier."
              value={formData.name}
              onChange={onInputChange}
            />
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

export default connect(null, mapDispatchToProps)(CourierForm)