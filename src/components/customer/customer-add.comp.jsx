import React from 'react';

// components
import CustomerForm from './customer-form.comp';

// main component
const CustomerAdd = ({
  isOrderCalled
}) => {
  return <>
    <CustomerForm isOrderCalled={isOrderCalled ? true : false} />
  </>
}

export default CustomerAdd;