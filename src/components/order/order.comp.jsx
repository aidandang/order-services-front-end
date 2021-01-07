import React from 'react'

// components
import withOrderData from './withOrderData'
import OrderInfo from './order-info.comp'
import OrderPurchasing from './order-purchasing.comp'

const Order = () => {

  return <> 
    <OrderInfo />
    <OrderPurchasing />
  </>
}

export default withOrderData(Order)