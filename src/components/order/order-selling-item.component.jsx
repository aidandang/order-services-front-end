import React from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { acctToStr } from '../utils/acctToStr'

const OrderSellingItem = ({
  items
}) => {

  const history = useHistory()
  const location = useLocation()

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.weight = item.weight === 0 ? '' : acctToStr(item.weight)
    obj.qty = item.qty
    obj.index = index
    obj.totalPrice = item.totalPrice === 0 ? '' : acctToStr(item.totalPrice)
    obj.shippingPrice = item.shippingPrice === 0 ? '' : acctToStr(item.shippingPrice)
    obj.totalPriceDong = item.totalPriceDong === 0 ? '' : acctToStr(item.totalPriceDong).split('.')

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
          <td className="text-right">{acctToStr(item.weight)}</td>
          <td className="text-right">{acctToStr(item.shippingPrice)}</td>
          <td className="text-right">{acctToStr(item.totalPrice)}</td>
          <td className="text-right">{acctToStr(item.totalPriceDong).split('.')[0]}</td>
        </tr>
      )
    }       
  </>
}

export default OrderSellingItem;