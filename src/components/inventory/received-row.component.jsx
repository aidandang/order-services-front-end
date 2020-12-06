import React, { useState } from 'react';

// dependencies
import moment from 'moment';

// components
import { acctToStr } from '../utils/acctToStr';
import { integerMask } from '../utils/helpers';

const ReceivedRow = ({
  order
}) => {

  const { items } = order;
  const [itemProcessing, setItemProcessing] = useState(false);

  let i = null
  const formState = {}
  for (i = 0; i < items.length; i++) {
    formState[i] = items[i].tracking ? items[i].tracking : ""
  }

  return <>
    <tr
      key={order._id}
      className="table-row-cs" 
      onClick={(e) => {
        e.preventDefault();
        setItemProcessing(!itemProcessing)
      }}
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
    {
      itemProcessing && 
      <tr className="table-row-cs">
        <td colSpan="8">
          {
            items.map((item, index) => 
              <div className="row mx-0" key={item._id}>
                <div className='col-xl-6'>
                  <div className="form-group">
                    <label htmlFor={index}>{`${item.product.name}/qty:${item.qty}`}</label>
                    <input
                      name={index} 
                      type="text"
                      className="form-control"
                      value={item.shipmentNumber ? item.shipmentNumber : ''}
                      readOnly
                    />
                    <small>Shipment number. Go to Shipping to update.</small>
                  </div>
                </div>
              </div>
            )
          }
        </td>
      </tr>
    }
  </>
}

export default ReceivedRow;