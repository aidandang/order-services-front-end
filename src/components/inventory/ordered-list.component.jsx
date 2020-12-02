import React, { useState, useEffect } from 'react';

import OrderListItemProcessing from './order-list-item-processing.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectOrderData } from '../../state/order/order.selectors';

const OrderedList = ({
  data,
  getReq
}) => {

  const [success, setSuccess] = useState(false);
  const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
  const { allIds } = data;

  useEffect(() => {
    getReq('/orders', fetchSuccess, '?status=ordered', null, 'ordered-list');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Status</th>
                <th scope="col">Customer</th>
                <th scope="col">Order Number</th>
                <th scope="col">Date</th>
                <th scope="col">Merchant</th>
                <th scope="col" className="text-right">Items</th>
                <th scope="col" className="text-right">Order Cost</th>
              </tr>
            </thead>
            <tbody>
              {
                allIds && allIds.length > 0 
                ? 
                allIds.map(order => 
                  <OrderListItemProcessing 
                    order={order} 
                    key={order._id} 
                    setSuccess={setSuccess}
                  />
                )
                : <>
                  <tr className="table-row-cs">
                    <td colSpan="8">All orders have been processed.</td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderedList);