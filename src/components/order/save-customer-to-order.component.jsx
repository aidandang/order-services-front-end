import React, { useEffect, useState } from 'react';

// dependencies
import { useLocation, Redirect, useParams } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { postReq, patchReq } from '../../state/api/api.requests'; 
import { OrderActionTypes } from '../../state/order/order.types';

const SaveCustomerToOrder = ({
  data,
  customer,
  postReq,
  patchReq
}) => {

  const location = useLocation();
  const params = useParams();

  const { byId } = data;

  const { orderId } = params;

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;

    if (orderId) {
      let updateOrder = {}
      updateOrder.customer = { ...customer }
      patchReq(`/orders/${orderId}`, fetchSuccess, updateOrder, setSuccess, 'order-edit');
    } else {
      let newOrder = {
        customer
      }
      postReq('/orders', fetchSuccess, newOrder, setSuccess, 'order-add')
    }
    // eslint-disable-next-line
  }, [])

  let pathname = ""

  if (success) {
    if (orderId) {
      pathname = location.pathname.split('/select-customer')[0]
    } else {
      pathname = location.pathname.split('/add')[0] + '/' + byId._id;
    }
  }

  return <>
    {
      success && <Redirect to={pathname} />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveCustomerToOrder);