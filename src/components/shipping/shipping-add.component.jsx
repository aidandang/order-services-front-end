import React, { useState } from 'react';

// dependencies
import { useLocation, Redirect } from 'react-router-dom';
import * as Yup from "yup";
// components
import { Card, Ul, Li, DateInput, SelectInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import Consignee from '../consignee/consignee.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectShippingData } from '../../state/shipping/shipping.selectors';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';
import { postReq } from '../../state/api/api.requests';
import { ShippingActionTypes } from '../../state/shipping/shipping.types';

// initial values
const formSchema = Yup.object().shape({
  shptDate: Yup
    .string()
    .required(),
  pkupDate: Yup
    .string()
    .required(),
  sender: Yup
    .string()
    .required()
});
const formState = {
  shptDate: "",
  pkupDate: "",
  sender: ""
}

const ShippingAdd = ({
  data,
  postReq,
  alertMessage,
  warehouseData
}) => {

  const { byId } = data;
  let warehouses = null;
  if (warehouseData.allIds) warehouses = warehouseData.allIds;

  const location = useLocation();
  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = ShippingActionTypes.SHIPPING_FETCH_SUCCESS
    const obj = { ...formData }

    postReq('/shipping', fetchSuccess, obj, setSuccess, 'shippment-add')
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>

    { alertMessage && alertMessage.component === 'shipment-add' && <AlertMesg /> }

    { 
      success &&
      <Redirect to={`${location.pathname.split('/add')[0]}/${byId._id}`} />
    }

    <div className="row">   
      <div className="col-xl-8">
        <Card width="col" title="Create a New Shipment">
          <Ul>
            <Li>
              <div className="row">
                <div className="col-xl-6">
                  <DateInput
                    label="Shipping Date (*)" 
                    name="shptDate"
                    errors={errors}
                    smallText="Shipping date is required."
                    value={formData.shptDate}
                    onChange={onInputChange}
                  />
                </div>
                <div className="col-xl-6">
                  <DateInput
                    label="Pickup Date (*)" 
                    name="pkupDate"
                    errors={errors}
                    smallText="Pickup date is required."
                    value={formData.pkupDate}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </Li>
            <Li>
              <SelectInput
                label="Sender (*)" 
                name="sender"
                errors={errors}
                size="col-xl-6"
                smallText="Select a warehouse, add new if there is no warehouse."
                defaultValue=""
                defaultText="..."
                value={formData.sender ? formData.sender : ""}
                onChange={onInputChange}
                data={warehouses}
                valueKey="_id"
                textKey="name"
              />
            </Li>
            <SubmitOrReset
              buttonName={'Save'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </Ul>
        </Card>
      </div>
      <div className="col-xl-4">
        <Consignee />
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectShippingData,
  alertMessage: selectAlertMessage,
  warehouseData: selectWarehouseData
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdd);