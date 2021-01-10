import React from 'react'

// components
import withCustomerData from './withCustomerData'
import CustomerInfo from './customer-info.component'

const GetDataById = ({
  data
}) => {
  return <>
    <CustomerInfo byId={data.byId} />
  </>
}

export default withCustomerData(GetDataById)