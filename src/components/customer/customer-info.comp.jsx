import React, { useState } from 'react'

// dependencies
import { useParams } from 'react-router-dom'
// components
import { Card, Ul, Li, CloseTask, OnClickLink } from '../tag/tag.comp'
import CustomerForm from './customer-form.comp'
import CustomerAddress from './customer-address.comp'
// redux
import { connect, batch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCustomerToOrder, orderSetComp } from '../../state/order/order.actions'
import { selectOrderData } from '../../state/order/order.selectors'

const CustomerInfo = ({
  byId, // onwProps
  orderData,
  selectCustomerToOrder,
  setComp
}) => {

  const params = useParams()
  const { orderId } = params

  var address = null
  if (byId.shippingAddress && byId.shippingAddress.length > 0) {
    address = byId.shippingInfo.find(el => el._id === byId.shippingAddress)
  }

  const [isCustomerForm, setIsCustomerForm]  = useState(false)

  const setCloseTask = () => {
    setIsCustomerForm(null)
  }

  const handleSelectCustomerToOrder = () => {
    batch(() => {
      selectCustomerToOrder({
        selling: {
          customer: byId
        }
      })
      setComp('')
    })
  }

  return <>
    <div className="row">
      <div className="col-xl-8">
        <Card width="col" title="Customer Information">
          <Ul>
            <Li>
              {
                isCustomerForm
                ? <>
                  <div className="row">
                    <div className="col">
                      <CloseTask setCloseTask={setCloseTask} />
                      <CustomerForm 
                        customerTemp={byId}
                        setIsCustomerForm={setIsCustomerForm}
                      />
                    </div>
                  </div>
                </>
                : <>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-4">
                          <span className="font-weight-bold">Nickname:</span>
                        </div>
                        <div className="col-8">
                          <span>{byId.nickname}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span className="font-weight-bold">Account Number:</span>
                        </div>
                        <div className="col-8">
                          <span className="font-weight-bold">{byId.customerNumber}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span className="font-weight-bold">Billing Address:</span>
                        </div>
                        <div className="col-8">
                          <span>{byId.fullname}</span><br />
                          <span>{byId.streetAddress1}, {byId.city}</span><br />
                          <span>{byId.state}{byId.country === 'United States' && ', ' + byId.zipcode}</span><br />
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
                              setIsCustomerForm(true)
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
                  <span className="font-weight-bold">Shipping Address:</span>
                </div>
                <div className="col-8 align-self-center">
                  {
                    !address
                    ? <span>Same as Billing Address</span>
                    : <>
                      <span>{address.fullname}</span><br />
                      <span>{address.streetAddress1}, {address.city}</span><br />
                      <span>{address.state}{address.country === 'United States' && ', ' + address.zipcode}</span><br />
                      <span>Phone# {address.phone}</span>
                    </> 
                  }
                </div>
              </div>
            </Li>
            {
              orderId && orderData.byId && orderId === orderData.byId._id && 
              <Li>
                <OnClickLink text={'Select Customer to Order'} action={handleSelectCustomerToOrder} />             
              </Li>
            }
          </Ul>
        </Card>
      </div>
      <div className="col-xl-4">
        <CustomerAddress />
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  orderData: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  selectCustomerToOrder: payload => dispatch(selectCustomerToOrder(payload)),
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo)