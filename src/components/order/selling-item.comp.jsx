import React, { useState } from 'react'

// components
import { acctToStr } from '../utils/acctToStr'
import SellingItemForm from './selling-item-form.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'

const SellingItem = ({
  orderSelling,
  data
}) => {

  // set constants
  const { selling, items } = data.byId

  const [isItemForm, setIsItemForm] = useState(null)

  const totalPriceAfterDiscountCalc = () => {
    var total = items.reduce((a, c) => a + c.unitDong * c.qty + c.unitShippingDong * c.qty, 0)
    if (selling && selling.discount) total = total - selling.discount
    return acctToStr(total).split('.')[0]
  }

  return <>
    <div className="table-responsive-sm">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Style#</th>
            <th scope="col">Item/Description</th>
            <th scope="col" className="text-right">Weight</th>
            <th scope="col" className="text-right">đShipping</th>
            <th scope="col" className="text-right">đprice</th>
            <th scope="col" className="text-right">đsubtotal</th>
          </tr>
        </thead>
        <tbody>
          { 
            items.map((item, index) => 
              <tr 
                key={index} 
                className={isItemForm === index || orderSelling ? "table-row-no-link-cs" : "table-row-cs"}
                onClick={e => {
                  e.preventDefault()
                  if (isItemForm !== index && !orderSelling) {
                    setIsItemForm(index)
                  } 
                }} 
              >
                {
                  isItemForm === index
                  ? <td colSpan="6"><SellingItemForm itemIndex={isItemForm} setIsItemForm={setIsItemForm} /></td>
                  : <>
                    <td>{item.product.styleCode}</td>
                    <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{acctToStr(item.weight)}</td>
                    <td className="text-right">{acctToStr(item.unitShippingDong * item.qty).split('.')[0]}</td>
                    <td className="text-right">{acctToStr(item.unitDong * item.qty).split('.')[0]}</td>
                    <td className="text-right">{acctToStr(item.unitShippingDong * item.qty + item.unitDong * item.qty).split('.')[0]}</td>
                  </>
                }
              </tr>
            )
          }      
        </tbody>
        {
          items.length > 0 && <>
            <tbody>
              <tr className="table-row-no-link-cs">
                <th scope="col" colSpan="5" className="text-right">Total Shipping</th>
                <th scope="col" colSpan="1" className="text-right">{acctToStr(items.reduce((a, c) => a + c.unitShippingDong * c.qty, 0)).split('.')[0]}</th>
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
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(SellingItem)