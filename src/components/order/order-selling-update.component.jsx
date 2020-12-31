import React, { useState, useEffect } from 'react'

// dependencies
import { useHistory, useLocation, useParams, Redirect, Link } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import OrderSellingItem from './order-selling-item.component'
import OrderPriceForm from './order-price-form.component'
import { acctToStr } from '../utils/acctToStr'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { OrderActionTypes } from '../../state/order/order.types'
import { patchReq } from '../../state/api/api.requests'
import { selectOrderOrder, selectOrderData } from '../../state/order/order.selectors'
import { copyOrderToEdit, updateCustomerInOrder } from '../../state/order/order.actions'
import { selectAlertMessage } from '../../state/alert/alert.selectors'

const OrderSellingUpdate = ({
  data,
  order,
  copyOrderToEdit,
  patchReq,
  alertMessage,
  updateCustomerInOrder
}) => {

  const location = useLocation()
  const history = useHistory()
  const params = useParams()

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-selling-order')[0]

  const [success, setSuccess] = useState(false)
  const [action, setAction] = useState(false)

  const { orderId } = params
  const { byId } = data
  const { selling, items } = order

  let address = null
  if (selling) {
    address = selling.customer.shippingInfo.find(item => item._id === selling.customer.shippingAddress)
  }

  const totalPriceAfterDiscountCalc = () => {
    var total = items.reduce((a, c) => a + c.totalDong, 0)
    if (selling && selling.discount) total = total - selling.discount
    return acctToStr(total).split('.')[0]
  }

  const handleSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const totalPrice = items.reduce((a, c) => a + c.totalDong, 0)
    const shippingPrice = items.reduce((a, c) => a + c.shippingDong, 0)
    const obj = {
      selling: {
        ...selling, 
        totalPrice,
        shippingPrice
      },
      items: [ ...items ]
    }

    obj.status = 'editing'

    patchReq(`/orders/${orderId}`, fetchSuccess, { ...obj }, setSuccess, 'order-selling-update')
  }

  const handleReset = () => {
    copyOrderToEdit(byId)
  }

  useEffect(() => {
    if (success) {
      history.push(parentRoute) 
    } else if (location.state && location.state.customer) {
      updateCustomerInOrder(location.state.customer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])
  
  return <>

    { alertMessage && alertMessage.component === 'order-selling-update' && <AlertMesg /> }

    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} />
      : <>
        <div className="row">
          <div className="col-12 col-xl-8">
            <Card width="col" title="Customer Information">
              <Ul>
                <Li>
                  <Link 
                    to={`${location.pathname}/select-customer`}
                    className="a-link-cs"
                  >
                    {selling ? 'Re-select Customer' : 'Select Customer'}
                  </Link>
                </Li>
                {
                  selling && <>
                    <Li>
                      <div className="row">
                        <div className="col">
                          <div className="row">
                            <div className="col-4">
                              <span>Nickname:</span>
                            </div>
                            <div className="col-8">
                              <span>{selling.customer.nickname}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <span>Account Number:</span>
                            </div>
                            <div className="col-8">
                              <span>{selling.customer.account}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <span>Billing Address:</span>
                            </div>
                            <div className="col-8">
                              <span>{selling.customer.fullname}</span><br />
                              <span>{selling.customer.streetAddress1}, {selling.customer.city}, {selling.customer.state}</span><br />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <span>Phone#</span>
                            </div>
                            <div className="col-8">
                              <span>{selling.customer.phone}</span>
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
                                <span>Same as Billing Address</span>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </Li>
                  </>
                }
              </Ul>
            </Card>
            {/* Item Table */}
            <div className="row mb-2">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Style#</th>
                        <th scope="col">Item/Description</th>
                        <th scope="col" className="text-right">Weight</th>
                        <th scope="col" className="text-right">Shipping</th>
                        <th scope="col" className="text-right">$price</th>
                        <th scope="col" className="text-right">đprice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        items.length > 0 && <>
                          <OrderSellingItem items={items} />
                        </>
                      }
                    </tbody>
                    {
                      items.length > 0 && <>
                        <tbody>
                          <tr className="table-row-no-link-cs">
                            <th scope="col" colSpan="5" className="text-right">Total Shipping</th>
                            <th scope="col" colSpan="1" className="text-right">{acctToStr(items.reduce((a, c) => a + c.shippingDong, 0)).split('.')[0]}</th>
                          </tr>
                          <tr className="table-row-no-link-cs">
                            <td colSpan="5" className="text-right">Discount</td>
                            <td colSpan="1" className="text-right">{selling && selling.discount ? acctToStr(selling.discount).split('.')[0] : '0'}</td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr className="table-row-no-link-cs">
                            <th scope="col" colSpan="5" className="text-right">Total (included Shipping)</th>
                            <th scope="col" colSpan="1" className="text-right">{totalPriceAfterDiscountCalc()}</th>
                          </tr>
                          <tr className="table-row-no-link-cs">
                            <td colSpan="8">
                              <Link
                                to={`${location.pathname}/cost`}
                                className="a-link-cs"
                                onClick={e => {
                                  e.preventDefault()
                                  setAction(!action)
                                }}
                              >
                                { action === false ? "Update Discount" : "Close Update Discount" }
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    }
                  </table>
                </div>
              </div>
            </div>
            {/* End of Item Table */} 
            {
              action === true && <OrderPriceForm setAction={setAction} />
            } 
          </div>
          <div className="col-12 col-xl-4">
            <Card width="col" title="Update">
              <Ul>
                <SubmitOrReset
                  buttonName={'Submit'}
                  buttonDisabled={selling ? false : true}
                  formSubmit={handleSubmit}
                  formReset={handleReset}
                />
              </Ul>
            </Card>
          </div>
        </div>
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  order: selectOrderOrder,
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  copyOrderToEdit: order => dispatch(copyOrderToEdit(order)),
  updateCustomerInOrder: customer => dispatch(updateCustomerInOrder(customer))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSellingUpdate)