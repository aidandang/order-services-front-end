import React from 'react'

// components
import { acctToStr } from '../utils/acctToStr'

const OrderCost = ({
  order
}) => {

  const { items, costing } = order

  const totalCalc = () => {
    var total = items.reduce((a, c) => a + c.itemCost, 0)
    if (costing) {
      total += costing.salesTax ? costing.salesTax : 0
      total += costing.otherCost ? costing.otherCost : 0
    }
    return acctToStr(total)
  }

  return <>
    <tr className="table-row-no-link-cs">
      <td colSpan="4" className="text-right">Subtotal</td>
      <td colSpan="1" className="text-right">{acctToStr(items.reduce((a, c) => a + c.itemCost, 0))}</td>
    </tr>
    <tr className="table-row-no-link-cs">
      <td colSpan="4" className="text-right">Sales Tax</td>
      <td colSpan="1" className="text-right">{costing && costing.salesTax ? acctToStr(costing.salesTax) : '.00'}</td>
    </tr>
    <tr className="table-row-no-link-cs">
      <td colSpan="4" className="text-right">Other</td>
      <td colSpan="1" className="text-right">{costing && costing.otherCost ? acctToStr(costing.otherCost) : '.00'}</td>
    </tr>
    <tr className="table-row-no-link-cs">
      <th scope="col" colSpan="4" className="text-right">Total</th>
      <th scope="col" colSpan="1" className="text-right">{totalCalc()}</th>
    </tr>
  </>
}

export default OrderCost