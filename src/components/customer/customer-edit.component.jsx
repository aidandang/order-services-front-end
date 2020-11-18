import React from 'react';

// components
import withCustomerData from '../api/withCustomerData';
import CustomerForm from './customer-form.component';

// main component
const CustomerEdit = ({
  data
}) => {

  const { byId } = data;

  return <>
    <CustomerForm byId={byId} />
  </>
}

export default withCustomerData(CustomerEdit);