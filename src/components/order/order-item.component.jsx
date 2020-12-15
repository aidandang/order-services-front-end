import React from 'react'

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom'
// components
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'

const OrderItem = ({
  order
}) => {

  const history = useHistory()
  const location = useLocation()

  const { items } = order

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.unitCost = acctToStr(item.unitCost)
    obj.itemCost = acctToStr(item.itemCost)
    obj.qty = integerMask(item.qty.toString())
    obj.index = index

    history.push(`${location.pathname}/item`, { ...obj })
  }

  return <>
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
                items && items.length > 0 
                ? <>
                  { 
                    items.map((item, index) => 
                      <tr 
                        key={index} 
                        className="table-row-no-link-cs span-link-cs"
                        onClick={e => {
                          e.preventDefault()
                          handleItemEdit(item, index)
                        }}
                      >
                        <td>{item.product.styleCode}</td>
                        <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                        <td className="text-right">{integerMask(item.qty.toString())}</td>
                        <td className="text-right">{acctToStr(item.unitCost)}</td>
                        <th scope="row" className="text-right">{acctToStr(item.itemCost)}</th>
                      </tr>
                    )
                  } 
                </>
                : <>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="6">
                      <Link
                        to={`${location.pathname}/item`}
                        className="a-link-cs"
                      >
                        Add Item
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
  </>
}

export default OrderItem;