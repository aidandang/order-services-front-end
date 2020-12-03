import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import OrderListTable from './order-list-table.component';
import Search from '../search/search.component';
import { queryState, searchList, defaultFilter, addLink } from '../../state/order/order.data';

// main component
const OrderList = () => {

  const location = useLocation();
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      addLink={addLink}
    />
    <OrderListTable
      queryStr={location.search}
    />
  </>
}

export default OrderList;