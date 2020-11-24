import React, { useEffect, useState } from 'react';

// dependencies
import { Redirect, useParams } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { postReq, patchReq } from '../../state/api/api.requests'; 
import { OrderActionTypes } from '../../state/order/order.types';

// initial values
const pathname = '/app/order';

const SaveCustomerToOrder = ({
  data,
  customer,
  postReq,
  patchReq
}) => {

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
        customer,
        status: {
          type: 'created'
        }
      }
      postReq('/orders', fetchSuccess, newOrder, setSuccess, 'order-add')
    }
    // eslint-disable-next-line
  }, [])

  return <>
    {
      success && 
      <Redirect 
        to={orderId ? pathname + '/' + orderId : pathname + '/' + byId._id} 
      />
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