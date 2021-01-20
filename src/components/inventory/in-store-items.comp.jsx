import React from 'react'

// dependecies
import moment from 'moment'
// components
import { TableFrame } from '../tag/tag.comp'
import { integerMask } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const InStoreItems = ({
  data
}) => {

  const { items } = data

  return <>
    <TableFrame>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order#</th>
            <th scope="col">Item Description</th>
            <th scope="col" className="text-right">Qty</th>
            <th scope="col">Received Date</th>
            <th scope="col">Received Tracking</th>
          </tr>
        </thead>
        <tbody>
          {
            items && items.reduce((a, c) => c.status === 'received' ? a + 1 : a, 0) > 0 
            ? items.map(item => 
              <tr 
                key={item._id}
                className={"table-row-no-link-cs"}
              >
                <td>{item.orderNumber}</td>
                <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                <td className="text-right">{integerMask(item.qty.toString())}</td>
                <td>{moment(item.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
                <td>{item.receivingNumber}</td>
              </tr>
            )
            : <>
              <tr className="table-row-no-link-cs">
                <td colSpan="3">No items in-store.</td>
              </tr>
            </>
          }
        </tbody>
      </table>
    </TableFrame>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(InStoreItems)