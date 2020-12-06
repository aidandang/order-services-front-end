import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import ShippingListTable from './shipping-list-table.component';
import Search from '../search/search.component';
import { queryState, searchList, defaultFilter, addLink, searchTitle } from '../../state/shipping/shipping.data';

// main component
const ShippingList = () => {

  const location = useLocation();
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      addLink={addLink}
      searchTitle={searchTitle}
    />
    <ShippingListTable
      queryStr={location.search}
    />
  </>
}

export default ShippingList;