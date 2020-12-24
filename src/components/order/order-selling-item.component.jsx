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

  const priceInUsdCalc = (value, ex) => {
    const price = value / ex
    return acctToStr(Number(price.toFixed(0)))
  }

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.weight = item.weight === 0 ? '' : acctToStr(item.weight)
    obj.index = index
    obj.totalDong = item.totalDong === 0 ? '' : acctToStr(item.totalDong)
  
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
          <td className="text-right">{acctToStr(item.shippingDong).split('.')[0]}</td>
          <td className="text-right">{priceInUsdCalc(item.totalDong, item.exRate)}</td>
          <td className="text-right">{acctToStr(item.totalDong).split('.')[0]}</td>
        </tr>
      )
    }       
  </>
}

export default OrderSellingItem;