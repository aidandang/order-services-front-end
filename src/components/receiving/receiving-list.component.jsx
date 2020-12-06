import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import ReceivingListTable from './receiving-list-table.component';
import Search from '../search/search.component';
import { queryState, searchList, defaultFilter, addLink, searchTitle } from '../../state/receiving/receiving.data';

// main component
const ReceivingList = () => {

  const location = useLocation();
  
  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      addLink={addLink}
      searchTitle={searchTitle}
    />
    <ReceivingListTable
      queryStr={location.search}
    />
  </>
}

export default ReceivingList;