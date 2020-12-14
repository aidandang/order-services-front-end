import React from 'react';

// components
import withShippingData from './withShippingData';
import ShippingInfo from './shipping-info.component';

const Shipping = ({
  data
}) => {

  const { byId } = data;

  return <>
    {
      byId && <>
        <ShippingInfo />
      </>
    }
  </>
}

export default withShippingData(Shipping);