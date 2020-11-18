import React, { useEffect, useState } from 'react';

// dependencies
import { useParams } from 'react-router-dom';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProductActionTypes } from '../../state/product/product.types';
import { getReq } from '../../state/api/api.requests';
import { selectProductData } from '../../state/product/product.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

const withProductData = (WrapperComponent) => {
  const WithProductData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr,
    clearAlertMessage,
    ...props 
  }) => {

    let pathname = '/products';
    const params = useParams();
    const { productId } = params;

    if (productId) pathname = pathname + '/' + productId;

    const component = pathname;

    const [success, setSuccess] = useState(false);
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS

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
    data: selectProductData,
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

  return connect(mapStateToProps, mapDispatchToProps)(WithProductData);
}

export default withProductData;