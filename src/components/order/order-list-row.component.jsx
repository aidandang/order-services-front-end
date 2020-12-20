import React from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
import moment from 'moment'
// components
import { acctToStr } from '../utils/acctToStr'

const OrderListRow = ({
  order
}) => {

  const { 
    orderNumber, 
    status,
    purchasing,
    selling,
    costing
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
      <td><span className="text-info">{status}</span></td>
      <td>{selling && selling.customer ? `${selling.customer.account} - ${selling.customer.nickname}` : 'n/a'}</td>
      <td>{purchasing && purchasing.merchant ? purchasing.merchant.name : 'n/a'}</td>
      <td>{purchasing && purchasing.orderNumber ? purchasing.orderNumber : 'n/a'}</td>
      <td>{purchasing && purchasing.orderDate ? moment(purchasing.orderDate).add(8, 'hours').format('MM-DD-YYYY') : 'n/a'}</td>
      <td>{purchasing && purchasing.type ? purchasing.type : 'n/a'}</td>
      <td className="text-right">{costing.totalCost === 0 ? '.00' : acctToStr(costing.totalCost)}</td>
    </tr>
  </>
}

export default OrderListRow;