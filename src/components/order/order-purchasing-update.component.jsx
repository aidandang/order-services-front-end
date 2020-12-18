import React, { useState, useEffect } from 'react'

// dependencies
import { useHistory, useLocation, useParams, Redirect, Link } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import moment from 'moment'
import OrderItem from './order-item.component'
import OrderCost from './order-cost.component'
import OrderCostForm from './order-cost-form.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { OrderActionTypes } from '../../state/order/order.types'
import { patchReq } from '../../state/api/api.requests'
import { selectOrderOrder, selectOrderData } from '../../state/order/order.selectors'
import { copyOrderToEdit } from '../../state/order/order.actions'

const OrderPurchasingUpdate = ({
  data,
  order,
  copyOrderToEdit,
  patchReq
}) => {

  const location = useLocation()
  const history = useHistory()
  const params = useParams()

  // back to parent's route when update was success 
  // or history's action was POP leaded to no byId
  const parentRoute = location.pathname.split('/update-purchasing-order')[0]

  const [success, setSuccess] = useState(false)
  const [action, setAction] = useState(false)

  const { orderId } = params
  const { byId } = data
  const { purchasing, items, costing } = order

  const handleSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const obj = {
      purchasing: { ...purchasing },
      costing: { ...costing },
      items: [ ...items ]
    }
  
    patchReq(`/orders/${orderId}`, fetchSuccess, { ...obj }, setSuccess, 'order-purchasing-update')
  }

  const handleReset = () => {
    copyOrderToEdit(byId)
  }

  useEffect(() => {
    if (success) history.push(parentRoute)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])
  
  return <>
    { 
      orderId && !byId 
      ? 
      <Redirect to={parentRoute} />
      : <>
        <div className="row">
          <div className="col-12 col-xl-8">
            <Card width="col" title="Purchasing Information">
              <Ul>
                <Li>
                  <Link 
                    to={`${location.pathname}/info`}
                    className="a-link-cs"
                  >
                    Update Purchasing Information
                  </Link>
                </Li>
                {
                  purchasing && Object.keys(purchasing).length > 0 && <>
                    <Li>
                      <div className="row">
                        <div className="col-4">
                          <span>Merchant:</span>
                        </div>
                        <div className="col-8">
                          <span>{purchasing.merchant.name}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Website:</span>
                        </div>
                        <div className="col-8">
                          <a 
                            target="_blank" 
                            rel="noreferrer" 
                            href={purchasing.merchant.url}
                            className="a-link-cs"
                          >{purchasing.merchant.url}</a>
                        </div>
                      </div>
                    </Li>
                    <Li>
                      <div className="row">
                        <div className="col-4">
                          <span>Order Number:</span>
                        </div>
                        <div className="col-8">
                          <span>{purchasing.orderNumber}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Order Date:</span>
                        </div>
                        <div className="col-8">
                          <span>{moment(purchasing.orderDate).add(8, 'hours').format('MMM Do, YYYY')}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Type:</span>
                        </div>
                        <div className="col-8">
                          <span className="text-capitalize">{purchasing.type}</span>
                        </div>
                      </div>
                    </Li>
                    <Li>
                      <div className="row">
                        <div className="col-4">
                          <span>Warehouse: </span>
                        </div>
                        <div className="col-8">
                          <span>{purchasing.warehouse.name}</span>
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
                        <th scope="col" className="text-right">Qty</th>
                        <th scope="col" className="text-right">Item Cost</th>
                        <th scope="col" className="text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        items.length > 0 && <>
                          <OrderItem items={items} />
                        </>
                      }
                      <tr className="table-row-no-link-cs">
                        <td colSpan="5">
                          <Link
                            to={`${location.pathname}/item`}
                            className="a-link-cs"
                          >
                            Add Item
                          </Link>
                        </td>
                      </tr>
                      {
                        items.length > 0 && <>
                          <OrderCost order={order} />
                          <tr className="table-row-no-link-cs">
                            <td colSpan="5">
                              <Link
                                to={`${location.pathname}/cost`}
                                className="a-link-cs"
                                onClick={e => {
                                  e.preventDefault()
                                  setAction(!action)
                                }}
                              >
                                { action === false ? "Update Sales Tax and Other" : "Close the update" }
                              </Link>
                            </td>
                          </tr>
                        </>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* End of Item Table */} 
            {
              action === true && <OrderCostForm setAction={setAction} />
            } 
          </div>
          <div className="col-12 col-xl-4">
            <Card width="col" title="Update">
              <Ul>
                <SubmitOrReset
                  buttonName={'Submit'}
                  buttonDisabled={
                    costing && purchasing && items.length > 0 ? false : true
                  }
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
  order: selectOrderOrder
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  copyOrderToEdit: order => dispatch(copyOrderToEdit(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPurchasingUpdate)