import React, { useEffect, useState } from 'react';

// components
import { Li, Button } from '../tag/tag.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors'


const CustomerAddressRemove = ({
  patchReq,
  data,
  setAction,
  alertMessage,
  action
}) => {

  const { byId } = data;

  const id = action.split('/')[1]

  const [success, setSuccess] = useState(false);

  const formSubmit = () => {

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    const customerTemp = { 
      ...byId,
      shippingInfo: byId.shippingInfo.filter(address => address._id !== id)
    }
    patchReq('/customers/' + byId._id, fetchSuccess, customerTemp, setSuccess, 'customer-address-remove');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'customer-address-remove' && <AlertMesg/> }

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
      <Li>
        <span>Do you want to remove?</span>
      </Li>
    </form>

    <Li>
      <div className="row">
        <div className="col my-3">
          <Button 
            onClick={e => {
              e.preventDefault();
              formSubmit()
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </Li>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectCustomerData
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressRemove);