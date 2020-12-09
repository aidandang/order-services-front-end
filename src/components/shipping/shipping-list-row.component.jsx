import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
// components
import { integerMask } from '../utils/helpers';

const OrderListRow = ({
  shipment
}) => {

  const { courier, waybill, dlvdDate } = shipment;

  const location = useLocation();
  const history = useHistory();

  const handleOnClick = (e, shipment) => {
    e.preventDefault();
    
    history.push(`${location.pathname}/${shipment._id}`)
  }

  return <>
    <tr
      className="table-row-cs" 
      onClick={(e) => handleOnClick(e, shipment)}
    >
      <th scope="row">{shipment.shptNumber} </th>
      <td><span className="text-info">{shipment.status}</span></td>
      <td>{courier ? courier.name : 'Not Available'}</td>
      <td>{waybill ? waybill.name : 'Not Available'}</td>
      <td>{moment(shipment.pkupDate).add(8, 'hours').format('MM-DD-YYYY')}</td>
      <td>{moment(shipment.shptDate).add(8, 'hours').format('MM-DD-YYYY')}</td>
      <td>{dlvdDate ? moment(shipment.dlvdDate).add(8, 'hours').format('MM-DD-YYYY') : 'Not Available'}</td>
      <td className="text-right">{integerMask(shipment.items.reduce((a, c) => a + c.qty, 0).toString())}</td>
      <td className="text-right">{shipment.weight}</td>
      <td className="text-right">{shipment.shptCost}</td>
    </tr>
  </>
}

export default OrderListRow;