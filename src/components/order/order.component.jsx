import React from 'react';

// components
import withOrderData from './withOrderData';
import OrderInfo from './order-info.component';
import OrderPurchasing from './order-purchasing.component';
import OrderSelling from './order-selling.component';


const Order = ({ data }) => {

  const { byId } = data;

  return <> 
    <OrderInfo byId={byId} />
    <OrderPurchasing byId={byId} />
    <OrderSelling byId={byId} />
  </>
}

export default withOrderData(Order);