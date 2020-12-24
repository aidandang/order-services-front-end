import React from 'react'

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import { acctToStr } from '../utils/acctToStr'
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
  const { selling, items } = byId

  let address = null
  if (selling) {
    address = selling.customer.shippingInfo.find(item => item._id === selling.customer.shippingAddress)
  }

  const priceInUsdCalc = (value, ex) => {
    const price = value / ex
    return acctToStr(Number(price.toFixed(0)))
  }

  const totalPriceAfterDiscountCalc = () => {
    const total = items.reduce((a, c) => a + c.totalDong, 0) - selling.discount
    return acctToStr(total).split('.')[0]
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
    {
      selling &&
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
                  items.map((item, index) => 
                    <tr 
                      key={index} 
                      className="table-row-no-link-cs"
                    >
                      <td>{item.product.styleCode}</td>
                      <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                      <td className="text-right">{acctToStr(item.weight)}</td>
                      <td className="text-right">{acctToStr(item.shippingDong).split('.')[0]}</td>
                      <td className="text-right">{priceInUsdCalc(item.totalDong, item.exRate)}</td>
                      <td className="text-right">{acctToStr(item.totalDong).split('.')[0]}</td>
                    </tr>
                  )
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
                  </tbody>
                </>
              }
            </table>
          </div>
        </div>
      </div>
    }
  </>
}

const mapDispatchToProps = dispatch => ({
  copyOrderToEdit: order => dispatch(copyOrderToEdit(order))
})

export default connect(null, mapDispatchToProps)(OrderSelling)