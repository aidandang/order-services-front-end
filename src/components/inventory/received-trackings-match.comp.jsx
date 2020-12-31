import React, { useState } from 'react'

// components
import { integerMask } from '../utils/helpers'
import CloseTask from '../close-task/close-task.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { matchItems } from '../../state/inventory/inventory.actions'

const ReceivedTrackingsMatch = ({
  match,
  setMatch,
  data,
  matchItems
}) => {

  const { orders, trackings } = data
  const { tracking, item } = match

  const [pair, setPair] = useState(null)

  const setClose = () => {
    setMatch(null)
  }

  const formSubmit = () => {
    const obj = {
      itemRef: pair.item._id
    }

    const receiving = trackings.find(el => el.tracking === tracking)

    const items = receiving.items.map(el => {
      if (el._id !== item._id) {
        return el
      }
      return { ...el, ...obj }
    })
    
    matchItems({
      tracking: tracking,
      items: items
    })
    
    setMatch(null)
  }
  
  return <>
    <CloseTask setClose={setClose} />
    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tracking</th>
                <th scope="col">Item Description</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody> 
              <tr>
                <th scope="col">{tracking}</th>
                <td>{item.desc}</td>
                <td className="text-right">{integerMask(item.qty.toString())}</td>
                <td></td>
              </tr>
              {
                pair &&
                <tr className="table-row-no-link-cs">
                  <td>{pair.orderNumber}</td>
                  <td>{`${pair.item.product.name}/Color:${pair.item.color.color}/Size:${pair.item.size}${pair.item.note && `/${pair.item.note}`}`}</td>
                  <td className="text-right">{integerMask(pair.item.qty.toString())}</td>
                  <td className="text-right">
                    <a
                      href="/"
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault()
                        formSubmit()
                      }}
                    >
                      Match
                    </a>
                  </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

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
                          setPair({
                            orderNumber: order._id,
                            item: item
                          })
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

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})
const mapDispatchToProps = dispatch => ({
  matchItems: items => dispatch(matchItems(items))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTrackingsMatch)