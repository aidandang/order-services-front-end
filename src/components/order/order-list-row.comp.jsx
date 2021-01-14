import React from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
import moment from 'moment'
// components
import { acctToStr } from '../utils/acctToStr'
// initial values
const statusColor = {
  'created': 'text-danger',
  'ordered': 'text-dark',
  'cancelled': 'text-muted'
}

const OrderListRow = ({
  order
}) => {

  const { 
    orderNumber, 
    status,
    purchasing,
    selling
  } = order;

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
      <th scope="row">{orderNumber} </th>
      <td><span className={statusColor[status] ? statusColor[status] : null}>{status}</span></td>
      <td>{selling && selling.customer ? `${selling.customer.customerNumber} - ${selling.customer.nickname}` : 'n/a'}</td>
      <td>{purchasing && purchasing.merchant ? purchasing.merchant.name : 'n/a'}</td>
      <td>{purchasing && purchasing.orderNumber ? purchasing.orderNumber : 'n/a'}</td>
      <td>{purchasing && purchasing.orderDate ? moment(purchasing.orderDate).add(8, 'hours').format('MM-DD-YYYY') : 'n/a'}</td>
      <td>{purchasing && purchasing.type ? purchasing.type : 'n/a'}</td>
      <td className="text-right">{purchasing && purchasing.totalCost ? acctToStr(purchasing.totalCost) : '.00'}</td>
    </tr>
  </>
}

export default OrderListRow;