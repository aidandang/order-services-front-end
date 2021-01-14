import React from 'react'

// dependencies
import { useLocation } from 'react-router-dom'
// components
import OrderListTable from './order-list-table.comp'
import Search from '../search/search.component'
import { queryState, searchList, defaultFilter, searchTitle } from '../../state/order/order.data'

// main component
const OrderList = () => {

  const location = useLocation()
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      searchTitle={searchTitle}
    />
    <OrderListTable
      queryStr={location.search}
    />
  </>
}

export default OrderList