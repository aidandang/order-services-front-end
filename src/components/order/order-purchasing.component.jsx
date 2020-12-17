import React from 'react'

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom'
import moment from 'moment'
// components
import { Card, Ul, Li } from '../tag/tag.component'
// redux
import { connect } from 'react-redux'
import { copyOrderToEdit } from '../../state/order/order.actions'

// main component
const OrderPurchasing = ({ 
  byId,
  copyOrderToEdit
}) => {

  const location = useLocation()
  const history = useHistory()
  const { purchasing } = byId

  const handleUpdatePurchasingOrder = () => {
    copyOrderToEdit({ ...byId })
    history.push(`${location.pathname}/update-purchasing-order`)
  }

  return <>
    <Card width="col" title="Purchasing Order">
      <Ul>
        <Li>
          <Link 
            to={`${location.pathname}/update-purchasing-order`}
            className="a-link-cs"
            onClick={e => {
              e.preventDefault()
              handleUpdatePurchasingOrder()
            }}
          >
            Update Purchasing Order
          </Link>
        </Li>
        {
          purchasing && <>
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
  </>
}

const mapDispatchToProps = dispatch => ({
  copyOrderToEdit: order => dispatch(copyOrderToEdit(order))
})

export default connect(null, mapDispatchToProps)(OrderPurchasing)