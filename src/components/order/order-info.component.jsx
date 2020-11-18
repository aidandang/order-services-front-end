import React from 'react';

// components
import OrderMerchant from './order-merchant.component';
import OrderItem from './order-item.component';
import OrderReceiving from './order-receiving.component';
import OrderCustomer from './order-customer.component';
import OrderSale from './order-sale.component';
import withOrderData from '../api/withOrderData';

const OrderInfo = ({
  data
}) => {

  const { byId } = data;

  return <>
    {
      byId && <>
        <OrderMerchant />
        <OrderItem />
        <OrderReceiving />
        <OrderCustomer />
        <OrderSale />
      </>
    }
  </>
}

export default withOrderData(OrderInfo);