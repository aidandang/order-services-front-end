import React, { useState } from 'react';

// dependencies
import moment from 'moment';

// components
import { Button } from '../tag/tag.component';
import { acctToStr } from '../utils/acctToStr';
import { integerMask } from '../utils/helpers';

// redux
import { connect } from 'react-redux';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';

const OrderListItemProcessing = ({
  order,
  setSuccess,
  patchReq
}) => {

  const { items } = order;
  const [itemProcessing, setItemProcessing] = useState(false);

  let i = null
  const formState = {}
  for (i = 0; i < items.length; i++) {
    formState[i] = items[i].tracking ? items[i].tracking : ""
  }

  const [formData, setFormData] = useState(formState);

  const onInputChange = e => {
    e.persist();
    setFormData(prevState => ({...prevState, [e.target.name]: e.target.value }))    
  }

  const formSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS

    let j = null;
    let isReceived = true
    for (j = 0; j < items.length; j++) {
      items[j].tracking = formData[j]
      if (formData[j].length === 0) isReceived = false
    }

    const obj = {
      items: items
    }

    if (isReceived) {
      obj.status = 'received'
    } else {
      obj.status = 'ordered'
    }

    patchReq(`/orders/${order._id}`, fetchSuccess, obj, setSuccess, 'ordered-list')
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
                      value={formData[index]}
                      onChange={onInputChange}
                    />
                    <small>Scan or type tracking number here.</small>
                  </div>
                </div>
              </div>
            )
          }
          <div className="row mx-0 mb-2">
            <div className="col">
              <Button
                onClick={e => {
                  e.preventDefault()
                  formSubmit()
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </td>
      </tr>
    }
  </>
}

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(null, mapDispatchToProps)(OrderListItemProcessing);