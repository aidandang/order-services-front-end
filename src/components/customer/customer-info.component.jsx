import React, { useState } from 'react'

// dependencies
import { useParams } from 'react-router-dom'
// components
import { WhiteCard, Card, Ul, Li, CloseTask } from '../tag/tag.component'
import CustomerForm from './customer-form.component'
import CustomerAddress from './customer-address.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCustomerToOrder } from '../../state/order/order.actions'
import { selectOrderData } from '../../state/order/order.selectors'

const CustomerInfo = ({
  byId,
  selectCustomerToOrder,
  orderData
}) => {

  const params = useParams()
  const { orderId } = params

  var address = null
  if (byId.shippingAddress && byId.shippingAddress.length > 0) {
    address = byId.shippingInfo.find(el => el._id === byId.shippingAddress)
  }

  const [active, setActive]  = useState(null)

  const setCloseTask = () => {
    setActive(null)
  }

  return <>
    <div className="row">
      <div className="col-xl-8">
        <Card width="col" title="Customer Information">
          <Ul>
            <Li>
              {
                active === 'customer-form'
                ? <>
                  <div className="row">
                    <div className="col">
                      <CloseTask setCloseTask={setCloseTask} />
                      <WhiteCard width="col" title={'Edit'}>
                        <Ul>
                          <CustomerForm 
                            customerTemp={byId}
                            setActive={setActive}
                          />
                        </Ul>
                      </WhiteCard>
                    </div>
                  </div>
                </>
                : <>
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
                          <a
                            href="/"
                            className="a-link-cs"
                            onClick={e => {
                              e.preventDefault()
                              setActive('customer-form')
                            }}
                          >
                            Edit Customer Information
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
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
            {
              orderId && orderData.byId && orderId === orderData.byId._id && 
              <Li>
                <div className="row">
                  <div className="col">
                    <a
                      href="/"
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault()
                        selectCustomerToOrder({
                          selling: {
                            customer: byId
                          }
                        })
                      }}
                    >
                      Select Customer to Order
                    </a>
                  </div>
                </div>
              </Li>
            }
          </Ul>
        </Card>
      </div>
      <div className="col-xl-4">
        <CustomerAddress customerTemp={byId} />
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  orderData: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  selectCustomerToOrder: payload => dispatch(selectCustomerToOrder(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo)