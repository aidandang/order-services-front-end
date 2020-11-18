import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

// components
import { acctToStr } from '../utils/acctToStr';
import { integerMask } from '../utils/helpers';

const OrderListRow = ({
  order
}) => {

  const { info, items, customer } = order;

  const location = useLocation();
  const history = useHistory();

  const handleOnClick = (e, order) => {
    e.preventDefault();
    
    history.push(`${location.pathname}/${order._id}`)
  }

  return <>
    <tr
      className="table-row-cs" 
      onClick={(e) => handleOnClick(e, order)}
    >
      <th scope="row">{order.orderRef}</th>
      <td>{`${customer.account} - ${customer.nickname}`}</td>
      <td>{info ? info.orderNumber : 'not order'}</td>
      <td>{info ? moment(info.orderDate).format('MM-DD-YYYY') : 'not order'}</td>
      <td>{info ? info.merchant.name : 'not order'}</td>
      <td className="text-right">{integerMask(items.reduce((a, c) => a + c.qty, 0).toString())}</td>
      <td className="text-right">{acctToStr(items.reduce((a, c) => a + c.qty * c.price, 0))}</td>
    </tr>
  </>
}

export default OrderListRow;