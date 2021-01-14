import React from 'react'

// components
import { Li } from '../tag/tag.component'

const Selling = ({
  selling
}) => {

  const { customer } = selling

  var address = null
  if (customer.shippingAddress && customer.shippingAddress.length > 0) {
    address = customer.shippingInfo.find(el => el._id === customer.shippingAddress)
  }

  return <>
    <Li>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-4">
              <span>Nickname:</span>
            </div>
            <div className="col-8">
              <span>{customer.nickname}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <span>Account Number:</span>
            </div>
            <div className="col-8">
              <span>{customer.customerNumber}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <span>Billing Address:</span>
            </div>
            <div className="col-8">
              <span>{customer.fullname}</span><br />
              <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
              <span>Phone# {customer.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </Li>
    <Li>
      <div className="row">
        <div className="col-4">
          <span>Shipping Address:</span>
        </div>
        <div className="col-8 align-self-center">
          {
            !address
            ? <span>Same as Billing Address</span>
            : <>
              <span>{address.fullname}</span><br />
              <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
              <span>Phone# {address.phone}</span>
            </> 
          }
        </div>
      </div>
    </Li>
  </>
}

export default Selling