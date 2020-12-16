import React, { useEffect, useState } from 'react';

// dependencies
import { useParams } from 'react-router-dom';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { getReq } from '../../state/api/api.requests';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

const withCustomerData = (WrapperComponent) => {
  const WithCustomerData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr,
    clearAlertMessage, 
    ...props 
  }) => {

    let pathname = '/customers';
    const params = useParams();
    const { customerId } = params;

    if (customerId) pathname = pathname + '/' + customerId;

    const component = pathname;

    const [success, setSuccess] = useState(false);
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS

    useEffect(() => {
      batch(() => {
        clearAlertMessage()
        getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
      })
      
      // eslint-disable-next-line
    }, [queryStr])
    
    return <>
      { alertMessage && alertMessage.component === component && <AlertMesg /> }
      { success && Object.keys(data).length > 0 && <WrapperComponent data={data} {...props} /> }  
    </> 
  }

  const mapStateToProps = createStructuredSelector({
    data: selectCustomerData,
    alertMessage: selectAlertMessage
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (
      pathname, 
      fetchSuccess, 
      queryStr, 
      setSuccess,
      component
    ) => dispatch(getReq(
      pathname, 
      fetchSuccess, 
      queryStr, 
      setSuccess,
      component
    )),
    clearAlertMessage: () => dispatch(clearAlertMessage())
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithCustomerData);
}

export default withCustomerData;