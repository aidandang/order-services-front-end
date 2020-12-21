import React from 'react'

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
// redux
import { connect } from 'react-redux'
import { copyOrderToEdit } from '../../state/order/order.actions'

// main component
const OrderSelling = ({ 
  byId,
  copyOrderToEdit
}) => {

  const location = useLocation()
  const history = useHistory()
  const { selling } = byId

  let address = null
  if (selling) {
    address = selling.customer.shippingInfo.find(item => item._id === selling.customer.shippingAddress)
  }

  const handleUpdateSellingOrder = () => {
    copyOrderToEdit({ ...byId })
    history.push(`${location.pathname}/update-selling-order`)
  }

  return <>
    <Card width="col" title="Selling Information">
      <Ul>
        <Li>
          <Link 
            to={`${location.pathname}/update-selling-order`}
            className="a-link-cs"
            onClick={e => {
              e.preventDefault()
              handleUpdateSellingOrder()
            }}
          >
            Update Selling Information
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
  </>
}

const mapDispatchToProps = dispatch => ({
  copyOrderToEdit: order => dispatch(copyOrderToEdit(order))
})

export default connect(null, mapDispatchToProps)(OrderSelling)