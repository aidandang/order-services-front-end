import React, { useState } from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';

// components
import withCustomerData from '../api/withCustomerData';
import { Card, Ul, Li } from '../tag/tag.component';
import SaveCustomerToOrder from '../../components/order/save-customer-to-order.component';

const CustomerInfo = ({
  data
}) => {

  const [save, setSave] = useState(false);

  const location = useLocation();
  const { byId } = data;

  return <>
    {
      save ? <SaveCustomerToOrder customer={byId} />
      : <>
        <Card width="col" title="Customer Information">
          <Ul>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.fullname}</span><br />
                      <span>{byId.streetAddress1}, {byId.city}, {byId.state}</span><br />
                      <span>Phone# {byId.phone}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Link
                        to={`${location.pathname}/edit`}
                        className="a-link-cs"
                      >
                        Edit Customer Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Shipping Address:</span>
                    </div>
                    <div className="col-8 align-self-center">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor='billing'>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="shippingAddress" 
                            value='' 
                            defaultChecked={(byId.shippingAddress === undefined || byId.shippingAddress === '')}
                            disabled={!(byId.shippingAddress === undefined || byId.shippingAddress === '')}
                          />
                            Same as Billing Address
                          </label>
                      </div>
                      {
                        byId.shippingInfo && byId.shippingInfo.map((address, index) => 
                          <div key={index} className="form-check">
                            <label className="form-check-label" htmlFor={address._id}>
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="shippingAddress" 
                                id={address._id}
                                value={address._id}
                                defaultChecked={(byId.shippingAddress === address._id)}
                                disabled={!(byId.shippingAddress === address._id)}
                              />
                                <span>{address.fullname}</span><br />
                                <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                                <span>Phone# {address.phone}</span>
                            </label>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Link
                        to={`${location.pathname}/shipping-info`}
                        className="a-link-cs"
                      >
                        Edit Shipping Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <Link
                    to="/"
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault();
                      setSave(true)
                    }}
                  >
                    Select Customer to Order
                  </Link>
                </div>
              </div>
            </Li>
          </Ul>
        </Card>
      </>
    }
  </>
}

export default withCustomerData(CustomerInfo);