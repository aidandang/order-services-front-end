import React, { useEffect, useState } from 'react';

// dependencies
import { useParams } from 'react-router-dom';
// components
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ShippingActionTypes } from '../../state/shipping/shipping.types';
import { getReq } from '../../state/api/api.requests';
import { selectShippingData } from '../../state/shipping/shipping.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

const withShippingData = (WrapperComponent) => {
  const WithShippingData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr,
    clearAlertMessage, 
    ...props 
  }) => {

    let pathname = '/shipping';
    const params = useParams();
    const { shipmentId } = params;

    if (shipmentId) pathname = pathname + '/' + shipmentId;

    const component = pathname;

    const [success, setSuccess] = useState(false);
    const fetchSuccess = ShippingActionTypes.SHIPPING_FETCH_SUCCESS

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
    data: selectShippingData,
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

  return connect(mapStateToProps, mapDispatchToProps)(WithShippingData);
}

export default withShippingData;