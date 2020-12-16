import React from 'react'

// components
import { acctToStr } from '../utils/acctToStr'

const OrderCost = ({
  order
}) => {

  const { items, purchasing } = order

  const totalCalc = () => {
    var total = items.reduce((a, c) => a + c.itemCost, 0)
    if (purchasing) total += purchasing.salesTax + purchasing.otherCost

    return acctToStr(total)
  }

  return <>
    <tr className="table-row-no-link-cs">
      <td colSpan="4" className="text-right">Subtotal</td>
      <td colSpan="1" className="text-right">{acctToStr(items.reduce((a, c) => a + c.itemCost, 0))}</td>
    </tr>
    <tr className="table-row-no-link-cs">
      <td colSpan="4" className="text-right">Sales Tax</td>
      <td colSpan="1" className="text-right">{purchasing ? acctToStr(purchasing.salesTax) : '.00'}</td>
    </tr>
    <tr className="table-row-no-link-cs">
      <td colSpan="4" className="text-right">Other</td>
      <td colSpan="1" className="text-right">{purchasing ? acctToStr(purchasing.otherCost) : '.00'}</td>
    </tr>
    <tr className="table-row-no-link-cs">
      <th scope="col" colSpan="4" className="text-right">Total</th>
      <th scope="col" colSpan="1" className="text-right">{totalCalc()}</th>
    </tr>
  </>
}

export default OrderCost