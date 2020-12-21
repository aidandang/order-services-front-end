import React from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'

const OrderSellingItem = ({
  items
}) => {

  const history = useHistory()
  const location = useLocation()

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.weight = item.weight === 0 ? '' : acctToStr(item.weight)
    obj.qty = integerMask(item.qty.toString())
    obj.index = index
    obj.price = item.price === 0 ? '' : item.price
    obj.shippingPrice = item.shippingPrice === 0 ? '' : item.shippingPrice

    history.push(`${location.pathname}/price`, { ...obj })
  }

  return <>      
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
          <td className="text-right">{acctToStr(item.weight)}</td>
          <td className="text-right">{acctToStr(item.itemCost)}</td>
          <td className="text-right">{acctToStr(item.price)}</td>
          <td className="text-right">{acctToStr(item.shippingPrice)}</td>
          <td className="text-right">{acctToStr(item.price + item.shippingPrice)}</td>
        </tr>
      )
    }       
  </>
}

export default OrderSellingItem;