import React, { useEffect, useState } from 'react';

// dependencies
import { useParams } from 'react-router-dom';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OrderActionTypes } from '../../state/order/order.types';
import { getReq } from '../../state/api/api.requests';
import { selectOrderData } from '../../state/order/order.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

const withOrderData = (WrapperComponent) => {
  const WithOrderData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr,
    clearAlertMessage, 
    ...props 
  }) => {

    let pathname = '/orders';
    const params = useParams();
    const { orderId } = params;

    if (orderId) pathname = pathname + '/' + orderId;

    const component = pathname;

    const [success, setSuccess] = useState(false);
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS

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
    data: selectOrderData,
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

  return connect(mapStateToProps, mapDispatchToProps)(WithOrderData);
}

export default withOrderData;