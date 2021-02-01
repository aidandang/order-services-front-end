import React, { useState } from 'react'

// components
import { integerMask } from '../utils/helpers'
import IncomingOrders from './imcoming-orders.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { matchItems } from '../../state/inventory/inventory.actions'

const ReceivedTrackingsMatch = ({
  match, // ownProps
  closeComp, // ownProps
  data,
  matchItems
}) => {

  const { trackings } = data
  const { tracking, item } = match

  const [pair, setPair] = useState(null)

  const formSubmit = () => {
    const obj = {
      itemRef: pair._id
    }

    const receiving = trackings.find(el => el.tracking === tracking)

    const recvItems = receiving.recvItems.map(el => {
      if (el._id !== item._id) {
        return el
      }
      return { ...el, ...obj }
    })
    
    matchItems({
      tracking,
      recvItems
    })
    
    closeComp()
  }
  
  return <>
    <div className="row">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <tbody> 
              <tr className="table-row-no-link-cs">
                <th scope="col">{tracking}</th>
                <td>{item.desc}</td>
                <td className="text-right">{integerMask(item.qty.toString())}</td>
                <td></td>
              </tr>
              {
                pair &&
                <tr className="table-row-no-link-cs">
                  <td>{pair.orderNumber}</td>
                  <td>{`${pair.product.name}/Color:${pair.color.color}/Size:${pair.size}${pair.note && `/${pair.note}`}`}</td>
                  <td className="text-right">{integerMask(pair.qty.toString())}</td>
                  <td className="text-right">
                    <a
                      href="/"
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
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

    <IncomingOrders setPair={setPair} />
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})
const mapDispatchToProps = dispatch => ({
  matchItems: items => dispatch(matchItems(items))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTrackingsMatch)