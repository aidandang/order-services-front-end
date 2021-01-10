import React from 'react';

// components
import CustomerForm from './customer-form.component';

// main component
const CustomerAdd = ({
  setActive
}) => {
  return <>
    <CustomerForm setActive={setActive} />
  </>
}

export default CustomerAdd;