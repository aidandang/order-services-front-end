import React from 'react';

// components
import withCustomerData from './withCustomerData';
import CustomerAddress from './customer-address.component';

const CustomerShippingInfo = ({
  data
}) => {

  const { byId } = data; 

  return <>
    <CustomerAddress byId={byId} />
  </>
}

export default withCustomerData(CustomerShippingInfo);