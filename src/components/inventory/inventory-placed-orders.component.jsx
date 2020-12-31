import React, { useState } from 'react'

// dependencies
import { useLocation, Redirect } from 'react-router-dom'
// components
import { integerMask } from '../utils/helpers'
import InventoryPlacedOrdersProcess from './inventory-placed-orders-process.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const InventoryPlacedOrders = ({
  data
}) => {

  const location = useLocation()
  const [process, setProcess] = useState(null)

  // get previous pathname for going back
  const prevPath = location.pathname.split('/placed-orders')[0]

  const { orders } = data

  return <>

    {
      !orders && <Redirect to={prevPath} />
    }

    {
      process !== null
      ? <InventoryPlacedOrdersProcess process={process} setProcess={setProcess} />
      : <>
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
                  orders.map(order =>
                    <tbody key={order._id}>
                      <tr>
                        <th scope="col" colSpan="3">
                          {order._id}
                        </th>
                      </tr>
                      {
                        order.items.map(item => 
                          <tr 
                            key={item._id}
                            className="table-row-cs"
                            onClick={e => {
                              e.preventDefault()
                              setProcess(item._id)
                            }} 
                          >
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
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(InventoryPlacedOrders)