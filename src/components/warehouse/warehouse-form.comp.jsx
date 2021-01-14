import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
// components
import { Li, TextInput, SelectInput } from '../tag/tag.comp';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
// redux
import { connect } from 'react-redux';
import { postReq, patchReq, deleteReq } from '../../state/api/api.requests';
import { WarehouseActionTypes } from '../../state/warehouse/warehouse.types'; 

// form schema
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

const WarehouseForm = ({
  warehouse,
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
  ] = useForm(warehouse ? warehouse : formState, formState, formSchema);

  const formSubmit = (e) => {
    const fetchSuccess = WarehouseActionTypes.WAREHOUSE_FETCH_SUCCESS;
    const obj = { ...formData }

    if (action === 'add') {
      postReq('/warehouses', fetchSuccess, obj, setSuccess, 'warehouse');
    }
    if (action === 'edit') {
      patchReq('/warehouses/' + warehouse._id, fetchSuccess, obj, setSuccess, 'warehouse');
    }
    if (action === 'remove') {
      deleteReq('/warehouses/' + warehouse._id, fetchSuccess, setSuccess, 'warehouse');
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
              smallText="Name of the warehouse."
              value={formData.name}
              onChange={onInputChange}
            />
          </Li>
          <Li>
            <SelectInput
              label="Warehouse Type" 
              name="type"
              errors={errors}
              size="col"
              smallText="Company or Customer warehouse."
              defaultValue=""
              defaultText="Choose..."
              value={formData.type ? formData.type : ""}
              onChange={onInputChange}
              data={[{ type: 'Company'}, { type: 'Customer'}]}
              valueKey="type"
              textKey="type" 
            />
          </Li>
        </>
      }
      {
        action === 'remove' &&
        <Li>
          <span>Do you want to remove {`${warehouse ? warehouse.name : null}`}?</span>
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

export default connect(null, mapDispatchToProps)(WarehouseForm);