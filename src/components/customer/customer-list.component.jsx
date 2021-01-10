import React, { useState } from 'react'

// dependencies
import { useLocation } from 'react-router-dom'
// components
import Search from '../search/search.component'
import CustomerListTable from './customer-list-table.component'
import GetDataById from './get-data-by-id.comp'
import { CloseTask } from '../tag/tag.component'
import { queryState, searchList, defaultFilter, searchTitle } from '../../state/customer/customer.data'

// main component
const CustomerList = () => {

  const location = useLocation()

  const [active, setActive] = useState(null)

  const setCloseTask = () => {
    setActive(null)
  }

  return <>
    <Search
      queryState={queryState}
      searchList={searchList}
      defaultFilter={defaultFilter}
      searchTitle={searchTitle}
    />
    {
      active === null &&
      <CustomerListTable
        queryStr={location.search}
        setActive={setActive}
      />
    }
    { 
      active && active.comp === 'customer-info' && <>
        <CloseTask setCloseTask={setCloseTask} />
        <GetDataById id={active.id}/>
      </>
    }
  </>
}

export default CustomerList