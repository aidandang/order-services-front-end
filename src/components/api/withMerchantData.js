import React, { useEffect, useState } from 'react';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MerchantActionTypes } from '../../state/merchant/merchant.types';
import { getReq } from '../../state/api/api.requests';
import { selectMerchantData } from '../../state/merchant/merchant.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const withMerchantData = (WrapperComponent) => {
  const WithMerchantData = ({ 
    data, 
    getReq,
    alertMessage,
    pathname,
    queryStr,
    component, 
    ...props 
  }) => {

    const [success, setSuccess] = useState(false);
    const fetchSuccess = MerchantActionTypes.MERCHANT_FETCH_SUCCESS

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
    data: selectMerchantData,
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
    ))
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithMerchantData);
}

export default withMerchantData;