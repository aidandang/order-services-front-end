import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';

const OrderCustomer = ({ 
  data 
}) => {

  const location = useLocation();
  const { byId } = data;

  let address = null

  if (byId && byId.customer) {
    address = byId.customer.shippingInfo.find(item => item._id === byId.customer.shippingAddress)
  }

  return <>
    <Card width="col" title="Customer Information">
      <Ul>
        {
          byId && byId.customer && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.customer.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.customer.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.customer.fullname}</span><br />
                      <span>{byId.customer.streetAddress1}, {byId.customer.city}, {byId.customer.state}</span><br />
                      <span>Phone# {byId.customer.phone}</span>
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
                      {
                        address
                        ? <>
                          <span>{address.fullname}</span><br />
                          <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                          <span>Phone# {address.phone}</span>
                        </>
                        : 
                        <span>Same as Address</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        <Li>
          <Link 
            to={`${location.pathname}/select-customer`}
            className="a-link-cs"
          >
            {`${byId && byId.customer ? 'Reselect Customer' : 'Select Customer'}`}
          </Link>
        </Li> 
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderCustomer);