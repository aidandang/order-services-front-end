import React from 'react'

// dependencies
import queryString from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'
// components
import withReceivingData from './withReceivingData'
import { TableFrame } from '../tag/tag.comp'
import PaginationBar from '../pagination-bar/pagination-bar.component'
import ReceivingListRow from './receiving-list-row.comp'

const ReceivingListTable = ({ 
  data,
  setActive
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
                <th scope="col">Tracking#</th>
                <th scope="col">Status</th>
                <th scope="col">Received Date</th>
                <th scope="col">Processed Date</th>
                <th scope="col">Returned Date</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(receiving => 
                <ReceivingListRow key={receiving._id} receiving={receiving} setActive={setActive} />
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
        No trackings found.
      </div>
    }
  </>
}

export default withReceivingData(ReceivingListTable)