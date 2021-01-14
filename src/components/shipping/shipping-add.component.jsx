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
  shptDate: Yup
    .string()
    .required(),
  pkupDate: Yup
    .string()
    .required(),
  warehouse: Yup
    .string()
    .required(),
  courier: Yup
    .string()
    .required(),
  consignee: Yup
    .string()
    .required()
});
const formState = {
  shptDate: "",
  pkupDate: "",
  warehouse: "",
  courier: "",
  consignee: "",
}

const ShippingAdd = ({
  data,
  postReq,
  alertMessage,
  whseData,
  cneeData,
  courData
}) => {

  const { byId } = data;

  let cnees = null;
  if (cneeData.allIds) cnees = cneeData.allIds;
  let whses = null;
  if (whseData.allIds) whses = whseData.allIds;
  let cours = null;
  if (courData.allIds) cours = courData.allIds

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
    obj.warehouse = whses.find(el => el._id === formData.warehouse)
    obj.courier = cours.find(el => el._id === formData.courier)
    obj.consignee = cnees.find(el => el._id === formData.consignee)

    postReq('/shipping', fetchSuccess, { info: obj }, setSuccess, 'shippment-add')
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

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdd);