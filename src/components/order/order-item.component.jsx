import React from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { acctToStr } from '../utils/acctToStr'
import { integerMask } from '../utils/helpers'

const OrderItem = ({
  items
}) => {

  const history = useHistory()
  const location = useLocation()

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.unitCost = acctToStr(item.unitCost)
    obj.itemCost = acctToStr(item.itemCost)
    obj.qty = integerMask(item.qty.toString())
    obj.index = index

    history.push(`${location.pathname}/item`, { ...obj })
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
          <td className="text-right">{acctToStr(item.unitCost)}</td>
          <th scope="row" className="text-right">{acctToStr(item.itemCost)}</th>
        </tr>
      )
    }       
  </>
}

export default OrderItem;