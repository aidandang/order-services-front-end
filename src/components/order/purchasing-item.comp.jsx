import React, { useState } from 'react'

// components
import { CompFrame, OnClickLink } from '../tag/tag.comp'
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'
import PurchasingItemEdit from './purchasing-item-edit.comp'
import PurchaseCostForm from './purchasing-cost-form.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { selectProductToOrderItem } from '../../state/order/order.actions'

const PurchasingItem = ({
  isPurchasingCalled,
  data,
  selectProductToOrderItem
}) => {

  // set constants
  const { purchasing, items } = data.byId

  const [isItemEdit, setIsItemEdit] = useState(null)
  const [isOtherCostForm, setIsOtherCostForm] = useState(false)

  const totalCalc = () => {
    var total = items.reduce((a, c) => a + c.unitCost * c.qty, 0)
    total += purchasing.shippingCost || 0
    total += purchasing.purSalesTax || 0 
    total += purchasing.otherCost || 0
    total -= purchasing.purDiscount || 0
    
    return total
  }

  const openAddItem = () => {
    setIsItemEdit('add')
  }
  const openEditItem = (item, index) => {
    selectProductToOrderItem({
      product: { ...item.product },
      color: { ...item.color }
    })
    setIsItemEdit(index)
  }
  const closeItemEdit = () => {
    setIsItemEdit(null)
  }
  const openOtherCostForm = () => {
    setIsOtherCostForm(true)
  }
  const closeOtherCostForm = () => {
    setIsOtherCostForm(false)
  }

  return <>
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
          items.length > 0 && items.map((item, index) => 
            <tr 
              key={index} 
              className={isItemEdit === index || isPurchasingCalled ? "table-row-no-link-cs" : "table-row-cs"}
              onClick={e => {
                e.preventDefault()
                if (isItemEdit !== index && !isPurchasingCalled) openEditItem(item, index)
              }} 
            >
              {
                isItemEdit === index
                ? <td colSpan="6">
                    <CompFrame closeComp={closeItemEdit}>
                      <PurchasingItemEdit itemIndex={isItemEdit} closeItemEdit={closeItemEdit} />
                    </CompFrame>
                  </td>
                : <>
                  <td>{item.product.styleCode}</td>
                  <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}${item.recvTracking ? `/recvTracking:${item.recvTracking}` : ''}`}</td>
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
          !isPurchasingCalled &&
          <tr className="table-row-no-link-cs">
            <td colSpan="6">
              {
                isItemEdit === 'add'
                ? 
                <CompFrame closeComp={closeItemEdit}>
                  <PurchasingItemEdit closeItemEdit={closeItemEdit} />
                </CompFrame>              
                : <OnClickLink text={'Add Item'} action={openAddItem} />
              }
            </td>
          </tr>
        }
      </tbody>
      { 
        items.length > 0 && <>
          {
            isOtherCostForm
            ? <>
              <tbody>
                <tr className="table-row-no-link-cs">
                  <td colSpan="6">
                    <CompFrame closeComp={closeOtherCostForm}>
                      <PurchaseCostForm closeComp={closeOtherCostForm} />
                    </CompFrame>
                  </td>
                </tr>
              </tbody>
            </>
            : <>
              <tbody>
                <tr className="table-row-no-link-cs">
                  <td colSpan="5" className="text-right">Subtotal</td>
                  <td colSpan="1" className="text-right">{`$${acctToStr(items.reduce((a, c) => a + c.unitCost * c.qty, 0))}`}</td>
                </tr>
                {
                  purchasing && purchasing.shippingCost > 0 &&
                  <tr className="table-row-no-link-cs">
                    <td colSpan="5" className="text-right">Shipping Cost</td>
                    <td colSpan="1" className="text-right">{`$${acctToStr(purchasing.shippingCost)}`}</td>
                  </tr>
                }
                {
                  purchasing && purchasing.purSalesTax > 0 &&
                  <tr className="table-row-no-link-cs">
                    <td colSpan="5" className="text-right">Sales Tax</td>
                    <td colSpan="1" className="text-right">{`$${acctToStr(purchasing.purSalesTax)}`}</td>
                  </tr>
                }
                {
                  purchasing && purchasing.otherCost > 0 &&
                  <tr className="table-row-no-link-cs">
                    <td colSpan="5" className="text-right">Other Cost</td>
                    <td colSpan="1" className="text-right">{`$${acctToStr(purchasing.otherCost)}`}</td>
                  </tr>
                }
                {
                  purchasing && purchasing.purDiscount > 0 &&
                  <tr className="table-row-no-link-cs">
                    <td colSpan="5" className="text-right">Discount Cost</td>
                    <td colSpan="1" className="text-right">{`$${acctToStr(purchasing.purDiscount)}`}</td>
                  </tr>
                }
              </tbody>
              <tbody>
                <tr className="table-row-no-link-cs">
                  <td>
                    {
                      !isPurchasingCalled &&
                      <OnClickLink text={'Update Total Cost'} action={openOtherCostForm} />
                    }
                  </td>
                  <th scope="col" colSpan="4" className="text-right">Total</th>
                  <th scope="col" colSpan="1" className="text-right">{`$${acctToStr(totalCalc())}`}</th>
                </tr>
              </tbody>
            </>
          }
        </>
      }
    </table>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  selectProductToOrderItem: payload => dispatch(selectProductToOrderItem(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingItem)