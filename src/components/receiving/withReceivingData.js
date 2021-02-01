import React, { useEffect, useState } from 'react'

// components
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect, batch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
import { getReq } from '../../state/api/api.requests'
import { selectReceivingData } from '../../state/receiving/receiving.selectors'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { clearAlertMessage } from '../../state/alert/alert.actions'

const withReceivingData = (WrapperComponent) => {
  const WithReceivingData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr,
    clearAlertMessage, 
    id,
    ...props 
  }) => {

    let pathname = '/receiving'

    if (id) pathname = pathname + '/' + id

    const component = pathname

    const [success, setSuccess] = useState(false)
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS

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
    data: selectReceivingData,
    alertMessage: selectAlertMessage
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
      getReq(pathname, fetchSuccess, queryStr, setSuccess, component
    )),
    clearAlertMessage: () => dispatch(clearAlertMessage())
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithReceivingData)
}

export default withReceivingData