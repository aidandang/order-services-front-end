import React from 'react'

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom'
import moment from 'moment'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'
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
  const { purchasing, items, costing } = byId

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
    { 
      items.length > 0 && <>
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
                    items.map((item, index) => 
                      <tr 
                        key={index} 
                        className="table-row-no-link-cs"
                      >
                        <td>{item.product.styleCode}</td>
                        <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                        <td className="text-right">{integerMask(item.qty.toString())}</td>
                        <td className="text-right">{acctToStr(item.unitCost)}</td>
                        <td className="text-right">{acctToStr(item.itemCost)}</td>
                      </tr>
                    )
                  } 
                  
                </tbody>
                <tbody>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="4" className="text-right">Subtotal</td>
                    <td colSpan="1" className="text-right">{acctToStr(items.reduce((a, c) => a + c.itemCost, 0))}</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="4" className="text-right">Sales Tax</td>
                    <td colSpan="1" className="text-right">{costing.salesTax === 0 ? '.00' : acctToStr(costing.salesTax)}</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="4" className="text-right">Other</td>
                    <td colSpan="1" className="text-right">{costing.otherCost === 0 ? '.00' : acctToStr(costing.otherCost)}</td>
                  </tr>      
                </tbody>
                <tbody>
                  <tr className="table-row-no-link-cs">
                    <th scope="col" colSpan="4" className="text-right">Total</th>
                    <th scope="col" colSpan="1" className="text-right">{costing.totalCost === 0 ? '.00' : acctToStr(costing.totalCost)}</th>
                  </tr> 
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End of Item Table */} 
      </>
    }  
  </>
}

const mapDispatchToProps = dispatch => ({
  copyOrderToEdit: order => dispatch(copyOrderToEdit(order))
})

export default connect(null, mapDispatchToProps)(OrderPurchasing)