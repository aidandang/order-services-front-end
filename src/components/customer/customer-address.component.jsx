import React, { useState, useEffect } from 'react';

// dependencies
import { useHistory, useLocation } from 'react-router-dom';

// components
import { Card, Ul } from '../tag/tag.component';
import CustomerAddressAdd from './customer-address-add.component';
import CustomerAddressEdit from './customer-address-edit.component';
import CustomerAddressRemove from './customer-address-remove.component'
import AddressOptions from './address-options.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

const CustomerAddress = ({
  byId,
  patchReq,
  alertMessage
}) => {

  const history = useHistory();
  const location = useLocation();

  const [radio, setRadio] = useState('');
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState('');

  const handleRadioSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    const customerTemp = {
      ...byId,
      shippingAddress: radio
    }

    const reqBody = { ...customerTemp }
    patchReq(`/customers/${byId._id}`, fetchSuccess, reqBody, setSuccess, 'customer-shipping-info');
  }

  const handleRadioOnChange = e => {
    e.stopPropagation();
    setRadio(e.target.value)
  }

  useEffect(() => {
    // remove /shippinginfo from the path to go back to Customer Shippinginfo
    const arr = location.pathname.split(byId._id);
    const pathname = arr[0] + byId._id;

    if (success) history.push(pathname)
    // eslint-disable-next-line
  }, [success])

  return <>
    { alertMessage && alertMessage.component === 'customer-shipping-info' && <AlertMesg/> }

    <Card width="col" title="Shipping Information">
      <Ul>
        {
          action === '' &&
          <AddressOptions
            handleRadioSubmit={handleRadioSubmit}
            handleRadioOnChange={handleRadioOnChange}
            byId={byId}
            setAction={setAction}
          />
        }
        {
          action === 'add' &&
          <CustomerAddressAdd setAction={setAction} />
        }
        {
          action.match(/edit/) &&
          <CustomerAddressEdit action={action} setAction={setAction} />
        }
        {
          action.match(/remove/) &&
          <CustomerAddressRemove action={action} setAction={setAction}/>
        }
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddress);