import React from 'react'

// dependencies
import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
// components
import withOrderData from './withOrderData'
import { TableFrame } from '../tag/tag.comp'
import PaginationBar from '../pagination-bar/pagination-bar.component'
import OrderListRow from './order-list-row.comp'

const OrderListTable = ({ 
  data
}) => {

  const location = useLocation()
  const history = useHistory()

  const obj = queryString.parse(location.search)

  const { allIds } = data

  // handle search form 
  const onPageChange = (e, page) => {
    e.preventDefault()

    let queryStr = null

    if (obj.page) {
      obj.page = page
      queryStr = '?' + queryString.stringify(obj)
    } else {
      queryStr = location.search ? `${location.search}&page=${page}` : `?page=${page}`
    }
    
    history.push(`${location.pathname}${queryStr}`)
  }

  return <>
    {
      allIds.length > 0
      ? <>
        <PaginationBar  
          numberOfPages={data.info.pages}
          limit={5}
          onPageChange={onPageChange}
          page={obj.page}
        />

        <TableFrame>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Status</th>
                <th scope="col">Customer</th>
                <th scope="col">Merchant</th>
                <th scope="col">Purchase#</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Type</th>
                <th scope="col" className="text-right">Order Cost</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(order => 
                <OrderListRow key={order._id} order={order} />    
              )}
            </tbody>
          </table>
        </TableFrame>

        <PaginationBar  
          numberOfPages={data.info.pages}
          limit={5}
          onPageChange={onPageChange}
          page={obj.page}
        />
      </>
      :
      <div class="alert alert-light" role="alert">
        No orders found.
      </div>
    }
  </>
}

export default withOrderData(OrderListTable)