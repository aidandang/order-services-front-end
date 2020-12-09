import React, { useEffect, useState } from 'react';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ConsigneeActionTypes } from '../../state/consignee/consignee.types';
import { getReq } from '../../state/api/api.requests';
import { selectConsigneeData } from '../../state/consignee/consignee.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const withConsigneeData = (WrapperComponent) => {
  const WithConsigneeData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr, 
    ...props 
  }) => {

    const [success, setSuccess] = useState(false);
    const pathname = '/consignees'
    const fetchSuccess = ConsigneeActionTypes.CONSIGNEE_FETCH_SUCCESS
    const component = 'consignee'

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
    data: selectConsigneeData,
    alertMessage: selectAlertMessage
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
      getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
    )
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithConsigneeData);
}

export default withConsigneeData;