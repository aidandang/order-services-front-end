import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import CustomerListTable from './customer-list-table.component';
import Search from '../search/search.component';
import { queryState, searchList, defaultFilter, addLink } from '../../state/customer/customer.data';

// main component
const CustomerList = () => {

  const location = useLocation();

  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      addLink={addLink}
    />
    <CustomerListTable
      queryStr={location.search}
    />
  </>
}

export default CustomerList;