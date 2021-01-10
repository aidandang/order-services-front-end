import React from 'react'

// components
import withOrderData from './withOrderData'
import OrderInfo from './order-info.comp'
import OrderPurchasing from './order-purchasing.comp'
import OrderSelling from './order-selling.comp'

const Order = () => {

  return <> 
    <OrderInfo />
    <OrderPurchasing />
    <OrderSelling />
  </>
}

export default withOrderData(Order)