import React from 'react';

// components
import OrderStatus from './order-status.component';
import OrderInfo from './order-info.component';
import OrderItem from './order-item.component';
import OrderCustomer from './order-customer.component';
import OrderSale from './order-sale.component';
import withOrderData from '../api/withOrderData';

const Order = ({
  data
}) => {

  const { byId } = data;

  return <>
    {
      byId && <>
        <OrderStatus />
        <OrderInfo />
        <OrderItem />
        <OrderCustomer />
        <OrderSale />
      </>
    }
  </>
}

export default withOrderData(Order);