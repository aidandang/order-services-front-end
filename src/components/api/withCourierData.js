import React, { useEffect, useState } from 'react';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CourierActionTypes } from '../../state/courier/courier.types';
import { getReq } from '../../state/api/api.requests';
import { selectCourierData } from '../../state/courier/courier.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const withCourierData = (WrapperComponent) => {
  const WithCourierData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr, 
    ...props 
  }) => {

    const [success, setSuccess] = useState(false);
    const pathname = '/couriers'
    const fetchSuccess = CourierActionTypes.COURIER_FETCH_SUCCESS
    const component = 'courier'

    useEffect(() => {
      getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
      // eslint-disable-next-line
    }, [queryStr])
    
    return <>
      { alertMessage && alertMessage.component === component && <AlertMesg /> }
      { success && Object.keys(data).length > 0 && <WrapperComponent data={data} {...props} /> }  
    </> 
  }

  const mapStateToProps = createStructuredSelector({
    data: selectCourierData,
    alertMessage: selectAlertMessage
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
      getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
    )
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithCourierData);
}

export default withCourierData;