import React, { useEffect, useState } from 'react';

// dependencies
import { useParams } from 'react-router-dom';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ItemActionTypes } from '../../state/item/item.types';
import { getReq } from '../../state/api/api.requests';
import { selectItemData } from '../../state/item/item.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const withItemData = (WrapperComponent) => {
  const WithItemData = ({ 
    data, 
    getReq,
    alertMessage,
    queryStr,
    ...props 
  }) => {

    let pathname = '/items';
    const params = useParams();
    const { itemId } = params;

    if (itemId) pathname = pathname + '/' + itemId;

    const component = pathname;

    const [success, setSuccess] = useState(false);
    const fetchSuccess = ItemActionTypes.ITEM_FETCH_SUCCESS

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
    data: selectItemData,
    alertMessage: selectAlertMessage
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
      getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
    )
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithItemData);
}

export default withItemData;