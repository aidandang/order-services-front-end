import React, { useState, useEffect } from 'react';

// dependencies
import moment from 'moment';

// components
import { acctToStr } from '../utils/acctToStr';
import { integerMask } from '../utils/helpers';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq, patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectOrderData } from '../../state/order/order.selectors';

const OrderedList = ({
  data,
  getReq,
  patchReq
}) => {

  const [success, setSuccess] = useState(false);
  const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
  const { allIds } = data;

  const handleOrdered = (e, id) => {
    e.preventDefault();

    const obj = {
      status: {
        type: 'received'
      }
    }

    patchReq(`/orders/${id}`, fetchSuccess, obj, setSuccess, 'ordered-list');
  }

  useEffect(() => {
    getReq('/orders', fetchSuccess, '?status=ordered', null, 'ordered-list');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    {/* customer table */}
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
                  <tr
                    key={order._id}
                    className="table-row-cs" 
                    onClick={(e) => handleOrdered(e, order._id)}
                  >
                    <th scope="row">{order.orderRef} </th>
                    <td><span className="text-info">{order.status}</span></td>
                    <td>{`${order.customer.account} - ${order.customer.nickname}`}</td>
                    <td>{order.info ? order.info.orderNumber : 'not order'}</td>
                    <td>{order.info ? moment(order.info.orderDate).add(8, 'hours').format('MM-DD-YYYY') : 'not order'}</td>
                    <td>{order.info ? order.info.merchant.name : 'not order'}</td>
                    <td className="text-right">{integerMask(order.items.reduce((a, c) => a + c.qty, 0).toString())}</td>
                    <td className="text-right">{acctToStr(order.items.reduce((a, c) => a + c.qty * c.price, order.cost && order.cost.shippingCost + order.cost.saleTax))}</td>
                  </tr>
                )
                : <>
                  <tr className="table-row-cs">
                    <td colSpan="3">All orders have been processed.</td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of customer table --> */}
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderedList);