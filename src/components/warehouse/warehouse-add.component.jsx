import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import WarehouseForm from './warehouse-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { postReq } from '../../state/api/api.requests';
import { WarehouseActionTypes } from '../../state/warehouse/warehouse.types';

// initial values
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  type: Yup
    .string()
    .required()
});

const formState = {
  name: "",
  type: ""
};

const WarehouseAdd = ({
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

  const formSubmit = (e) => {
    const fetchSuccess = WarehouseActionTypes.WAREHOUSE_FETCH_SUCCESS;
    const newWarehouse = { ...formData };

    postReq('/warehouses', fetchSuccess, newWarehouse, setSuccess, 'warehouse-add');
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

    { alertMessage && alertMessage.component === 'warehouse-add' && <AlertMesg /> }
 
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
      <WarehouseForm
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
  alertMessage: selectAlertMessage
})

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

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseAdd);