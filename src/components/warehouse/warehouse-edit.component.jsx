import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import WarehouseForm from './warehouse-form.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { patchReq } from '../../state/api/api.requests';
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
  _id: "",
  name: "",
  type: ""
};

const WarehouseEdit = ({
  warehouse,
  data,
  patchReq,
  alertMessage,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const warehouseTemp = data.allIds.find(item => item._id === warehouse._id)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(warehouseTemp, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = WarehouseActionTypes.WAREHOUSE_FETCH_SUCCESS;
    const updateWarehouse = { ...formData };

    patchReq('/warehouses/' + warehouse._id, fetchSuccess, updateWarehouse, setSuccess, 'warehouse-edit');
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

    { alertMessage && alertMessage.component === 'warehouse-edit' && <AlertMesg/> }

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
  alertMessage: selectAlertMessage,
  data: selectWarehouseData
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

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseEdit);