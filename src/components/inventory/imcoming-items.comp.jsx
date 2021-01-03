import React from 'react'

// components
import { integerMask } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const IncomingItems = ({
  data
}) => {

  const { orders } = data

  return <>
    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Item Description</th>
                <th scope="col" className="text-right">Qty</th>
              </tr>
            </thead>
            {
              orders && orders.length > 0 
              ? 
              orders.map(order => {
                if (order.itemStatus.find(el => el === 'ordered')) {
                  return <tbody key={order._id}>
                    <tr>
                      <th scope="col" colSpan="3">
                        {order._id}
                      </th>
                    </tr>
                    {
                      order.items.map(item => {
                        if (item.status === 'ordered') {
                          return <tr 
                            key={item._id}
                            className="table-row-no-link-cs"
                          >
                            <td></td>
                            <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                            <td className="text-right">{integerMask(item.qty.toString())}</td>
                          </tr>
                        } else {
                          return null
                        }
                      })
                    }
                  </tbody>
                } else {
                  return null
                }
              })
              : <>
                <tbody>
                  <tr className="table-row-cs">
                    <td colSpan="3">No orders needed to process.</td>
                  </tr>
                </tbody>
              </>
            }
          </table>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(IncomingItems)