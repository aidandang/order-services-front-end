import React, { useState, useEffect } from 'react';

// dependencies
import { useLocation, Redirect, useHistory, useParams } from 'react-router-dom';
import * as Yup from "yup";
import moment from 'moment';
// components
import { Card, Ul, Li, DateInput, SelectInput, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import Consignee from '../consignee/consignee.component';
import Warehouse from '../warehouse/warehouse.comp';
import Courier from '../courier/courier.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectShippingData } from '../../state/shipping/shipping.selectors';
import { selectConsigneeData } from '../../state/consignee/consignee.selectors';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';
import { selectCourierData } from '../../state/courier/courier.selectors';
import { postReq } from '../../state/api/api.requests';
import { ShippingActionTypes } from '../../state/shipping/shipping.types';

// initial values
const formSchema = Yup.object().shape({
  warehouse: Yup
    .string()
    .required(),
  consignee: Yup
    .string()
    .required(),
  courier: Yup
    .string()
    .required(),
  shptRef: Yup
    .string(),
  shptDate: Yup
    .string()
    .required(),
  pkupDate: Yup
    .string()
    .required(),
  dlvDate: Yup
    .string(),
  weight: Yup
    .string()
});
const formState = {
  warehouse: "",
  consignee: "",
  courier: "",
  shptRef: "",
  shptDate: "",
  pkupDate: "",
  dlvdDate: "",
  weight: ""
}

const ShippingInfoForm = ({
  data,
  postReq,
  alertMessage,
  whseData,
  cneeData,
  courData
}) => {

  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-shipment-info')[0];

  const [success, setSuccess] = useState(false)

  const { shipmentId } = params;
  const { byId } = data;

  let shippingEditing = null;

  if (byId && byId.info) {
    shippingEditing = {
      warehouse: byId.info.warehouse._id,
      consignee: byId.info.consignee._id,
      courier: byId.info.courier._id,
      shptRef: byId.info.shptRef ? byId.info.shptRef : '',
      shptDate: moment(byId.info.shptDate).format('yyyy-MM-DD'),
      pkupDate: moment(byId.info.pkupDate).format('yyyy-MM-DD'),
      dlvdDate: byId.info.dlvdDate ? moment(byId.info.pkupDate).format('yyyy-MM-DD') : '',
      weight: byId.info.weight
    }
  }

  let cnees = null;
  if (cneeData.allIds) cnees = cneeData.allIds;
  let whses = null;
  if (whseData.allIds) whses = whseData.allIds;
  let cours = null;
  if (courData.allIds) cours = courData.allIds

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(shippingEditing ? shippingEditing : formState, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = ShippingActionTypes.SHIPPING_FETCH_SUCCESS
    const obj = { ...formData }
    obj.warehouse = whses.find(el => el._id === formData.warehouse)
    obj.courier = cours.find(el => el._id === formData.courier)
    obj.consignee = cnees.find(el => el._id === formData.consignee)

    postReq('/shipping', fetchSuccess, { info: obj }, setSuccess, 'shippment-add')
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) history.push(parentRoute)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'shipment-add' && <AlertMesg /> }

    {
      shipmentId && !byId
      ?
      <Redirect to={parentRoute} />
      :
      <div className="row">   
        <div className="col-xl-8">
          <Card width="col" title="Update Shipment Information">
            <Ul>
              <Li>
                <SelectInput
                  label="Warehouse (*)" 
                  name="warehouse"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Select a cnee, add new if there is no cnee."
                  defaultValue=""
                  defaultText="..."
                  value={formData.warehouse ? formData.warehouse : ""}
                  onChange={onInputChange}
                  data={whses}
                  valueKey="_id"
                  textKey="name"
                />
              </Li>
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
                <DateInput
                  label="Delivered Date" 
                  name="dlvdDate"
                  errors={errors}
                  size="col-xl-6"
                  smallText="The day shipment is delivered."
                  value={formData.dlvdDate}
                  onChange={onInputChange}
                />
              </Li>
              <Li>
                <SelectInput
                  label="Courier (*)" 
                  name="courier"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Select a cnee, add new if there is no cnee."
                  defaultValue=""
                  defaultText="..."
                  value={formData.courier ? formData.courier : ""}
                  onChange={onInputChange}
                  data={cours}
                  valueKey="_id"
                  textKey="name"
                />
              </Li>
              <Li>
                <div className="row">
                  <div className="col-xl-6">
                    <TextInput
                      label="Shipping Reference" 
                      name="shptRef"
                      errors={errors}
                      smallText="Shipping number provided by the courier."
                      value={formData.shptRef}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-xl-6">
                    <TextInput
                      label="Weight (kg)" 
                      name="weight"
                      errors={errors}
                      smallText="Weight of the shipment."
                      value={formData.weight}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </Li>
              <Li>
                <SelectInput
                  label="Consignee (*)" 
                  name="consignee"
                  errors={errors}
                  size="col-xl-6"
                  smallText="Select a cnee, add new if there is no cnee."
                  defaultValue=""
                  defaultText="..."
                  value={formData.consignee ? formData.consignee : ""}
                  onChange={onInputChange}
                  data={cnees}
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
          <Warehouse />
          <Consignee />
          <Courier />
        </div>
      </div>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectShippingData,
  alertMessage: selectAlertMessage,
  cneeData: selectConsigneeData,
  whseData: selectWarehouseData,
  courData: selectCourierData
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInfoForm);