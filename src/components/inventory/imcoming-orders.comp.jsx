import React, { useState } from 'react'

// dependencies
import { useParams } from 'react-router-dom'
// components
import { TableFrame } from '../tag/tag.comp'
import { integerMask } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const IncomingItems = ({
  data
}) => {

  const params = useParams()
  const { tracking } = params
  const { orders, trackings } = data

  const [isOrderReceiving, setIsOrderReceiving] = useState(null)

  const handleOrderReceiving = (orderId) => {
    if (tracking && trackings.find(el => el.tracking === tracking)) {
      setIsOrderReceiving(orderId)
    }
  }

  return <>
    <TableFrame>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order#</th>
            <th scope="col">Item Description</th>
            <th scope="col" className="text-right">Qty</th>
          </tr>
        </thead>
        
          {
            orders && orders.reduce((a, c) => c.status === 'ordered' ? a + 1 : a, 0) > 0 
            ? orders.map(order => <tbody key={order._id}>
                <tr 
                  key={order._id}
                  className="table-row-cs"
                  onClick={e => {
                    e.preventDefault()
                    handleOrderReceiving(order._id)
                  }}
                >
                  <td colSpan="3">{order.orderNumber}</td>
                </tr>
                {
                  order.items.map(item => <tr key={item._id}>
                      <td></td>
                      <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                      <td className="text-right">{integerMask(item.qty.toString())}</td>
                    </tr>
                  )
                }
              </tbody>
            )
            : <>
              <tbody>
                <tr className="table-row-no-link-cs">
                  <td colSpan="3">No orders needed to process.</td>
                </tr>
              </tbody>
              
            </>
          }
        
      </table>
    </TableFrame>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(IncomingItems)