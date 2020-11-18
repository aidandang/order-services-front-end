import React, { useEffect, useState } from 'react';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BrandActionTypes } from '../../state/brand/brand.types';
import { getReq } from '../../state/api/api.requests';
import { selectBrandData } from '../../state/brand/brand.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const withBrandData = (WrapperComponent) => {
  const WithBrandData = ({ 
    data, 
    getReq,
    alertMessage,
    pathname,
    queryStr,
    ...props 
  }) => {

    const [success, setSuccess] = useState(false);
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS

    const component = 'brand'

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
    data: selectBrandData,
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

  return connect(mapStateToProps, mapDispatchToProps)(WithBrandData);
}

export default withBrandData;