import React, { useState } from 'react'

// components
import OrderSellingForm from './order-selling-form.component'
import { acctToStr } from '../utils/acctToStr'

const ReceivingCheckingItem = ({
  items
}) => {

  const [itemEdit, setItemEdit] = useState({
    index: null
  })

  const priceCalc = (price, qty) => {
    return price * qty
  }
  const shippingCalc = (shipping, qty) => {
    return shipping * qty
  }
  const totalCalc = (shipping, price, qty) => {
    return (shipping + price) * qty
  }

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.weight = item.weight === 0 ? '' : acctToStr(item.weight)
    obj.index = index
    obj.unitDong = item.unitDong === 0 ? '' : acctToStr(item.unitDong).split('.')[0]
    obj.unitShippingDong = item.unitShippingDong === 0 ? '' : acctToStr(item.unitShippingDong).split('.')[0]
  
    setItemEdit(prevState => ({
      ...prevState, ...obj
    }))
  }

  return <>      
    { 
      items.map((item, index) => 
        <tr 
          key={index} 
          className={itemEdit.index === index ? "table-row-no-link-cs" : "table-row-cs"}
          onClick={e => {
            e.preventDefault()
            if (itemEdit.index !== index) handleItemEdit(item, index)
          }}
        >
          {
            itemEdit.index === index 
            ? <>
              <td colSpan="6">
                <div className="row mb-2">
                  <div className="col text-right">
                    <a
                      href="/"
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault();
                        setItemEdit({
                          index: null
                        })
                      }}
                    >
                      Cancel
                    </a>
                  </div>  
                </div>
                <OrderSellingForm itemEdit={itemEdit} setItemEdit={setItemEdit} />
              </td>
            </>
            : <>
              <td>{item.product.styleCode}</td>
              <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
              <td className="text-right">{acctToStr(item.weight)}</td>
              <td className="text-right">{acctToStr(shippingCalc(item.unitShippingDong, item.qty)).split('.')[0]}</td>
              <td className="text-right">{acctToStr(priceCalc(item.unitDong, item.qty)).split('.')[0]}</td>
              <td className="text-right">{acctToStr(totalCalc(item.unitShippingDong, item.unitDong, item.qty)).split('.')[0]}</td>
            </>
          }
        </tr>
      )
    }       
  </>
}

export default ReceivingCheckingItem;