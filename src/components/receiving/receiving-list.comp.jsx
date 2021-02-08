import React, { useState } from 'react'

// dependencies
import { useLocation } from 'react-router-dom'
// components
import Search from '../search/search.component'
import ReceivingListTable from './receiving-list-table.comp'
import ReceivingInfo from './receiving-info.comp'
import { CloseTask } from '../tag/tag.comp'
import { queryState, searchList, defaultFilter, searchTitle } from '../../state/receiving/receiving.data'

// main component
const ReceivingList = () => {

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
      <ReceivingListTable
        queryStr={location.search}
        setActive={setActive} 
      />
    }
    {
      active && active.comp === 'receiving-info' && <>
        <CloseTask setCloseTask={setCloseTask} />
        <ReceivingInfo id={active.id} setCloseTask={setCloseTask} />
      </>
    }
    
  </>
}

export default ReceivingList