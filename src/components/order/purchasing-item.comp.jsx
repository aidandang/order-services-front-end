import React, { useState } from 'react'

// components
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'
import PurchasingItemForm from './purchasing-item-form.comp'
import PurchaseCostForm from './purchasing-cost-form.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { selectProductToOrderItem } from '../../state/order/order.actions'

const PurchasingItem = ({
  notOrderPurchasing,
  data,
  selectProductToOrderItem
}) => {

  // set constants
  const { purchasing, items } = data.byId

  const [isItemForm, setIsItemForm] = useState(null)
  const [isOtherCostForm, setIsOtherCostForm] = useState(false)

  const salesTaxCalc = () => {
    return Number(items.reduce((a, c) => a + c.itemCost * c.purTaxPct / 10000, 0).toFixed(0))
  }

  const totalCalc = () => {
    var total = items.reduce((a, c) => a + c.itemCost, 0)
    total += salesTaxCalc()
    total += purchasing && purchasing.otherCost ? purchasing.otherCost : 0
    
    return total
  }

  return <>
    <div className="table-responsive-sm">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Style#</th>
            <th scope="col">Item/Description</th>
            <th scope="col" className="text-right">Qty</th>
            <th scope="col" className="text-right">$cost</th>
            <th scope="col" className="text-right">%tax</th>
            <th scope="col" className="text-right">$b4tax</th>
          </tr>
        </thead>
        <tbody>
          { 
            items.length > 0 && Object.keys(items[0]).length > 0 && items.map((item, index) => 
              <tr 
                key={index} 
                className={isItemForm === index ? "table-row-no-link-cs" : "table-row-cs"}
                onClick={e => {
                  e.preventDefault()
                  if (isItemForm !== index) {
                    selectProductToOrderItem({
                      product: { ...item.product },
                      color: { ...item.color }
                    })
                    setIsItemForm(index)
                  } 
                }} 
              >
                {
                  isItemForm === index
                  ? <td colSpan="6"><PurchasingItemForm itemIndex={isItemForm} setIsItemForm={setIsItemForm} /></td>
                  : <>
                    <td>{item.product.styleCode}</td>
                    <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{integerMask(item.qty.toString())}</td>
                    <td className="text-right">{acctToStr(item.unitCost)}</td>
                    <td className="text-right">{acctToStr(item.purTaxPct)}</td>
                    <td className="text-right">{acctToStr(item.itemCost)}</td>
                  </>
                }
              </tr>
            )
          }
          {
            notOrderPurchasing &&
            <tr className="table-row-no-link-cs">
              <td colSpan="6">
                {
                  isItemForm === 'add'
                  ? <PurchasingItemForm setIsItemForm={setIsItemForm} />
                  :
                  <a
                    href={'/'}
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault()
                      setIsItemForm('add')
                    }}
                  >
                    Add Item
                  </a>
                }
              </td>
            </tr>
          }
        </tbody>
        { 
          items.length > 0 && Object.keys(items[0]).length > 0 && <>
            <tbody>
              <tr className="table-row-no-link-cs">
                <td colSpan="5" className="text-right">Subtotal</td>
                <td colSpan="1" className="text-right">{`$${acctToStr(items.reduce((a, c) => a + c.itemCost, 0))}`}</td>
              </tr>
              <tr className="table-row-no-link-cs">
                <td colSpan="5" className="text-right">Sales Tax</td>
                <td colSpan="1" className="text-right">{`$${acctToStr(salesTaxCalc())}`}</td>
              </tr>
              <tr className="table-row-no-link-cs">
                <td colSpan="5" className="text-right">Other</td>
                <td colSpan="1" className="text-right">{purchasing && purchasing.otherCost ? `$${acctToStr(purchasing.otherCost)}` : '$-'}</td>
              </tr>      
            </tbody>
            <tbody>
              <tr className="table-row-no-link-cs">
                <th scope="col" colSpan="5" className="text-right">Total</th>
                <th scope="col" colSpan="1" className="text-right">{`$${acctToStr(totalCalc())}`}</th>
              </tr>
              {
                notOrderPurchasing &&
                <tr className="table-row-no-link-cs">
                  <td colSpan="6">
                    { 
                      isOtherCostForm
                      ? <PurchaseCostForm setIsOtherCostForm={setIsOtherCostForm} />
                      : 
                      <a
                        href={'/'}
                        className="a-link-cs"
                        onClick={e => {
                          e.preventDefault()
                          setIsOtherCostForm(true)
                        }}
                      >
                        Update Other Cost
                      </a>
                    }
                  </td>
                </tr> 
              }
            </tbody>
          </>
        }
      </table>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  selectProductToOrderItem: payload => dispatch(selectProductToOrderItem(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingItem)