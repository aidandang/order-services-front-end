import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

// components
import withReceivingData from '../api/withReceivingData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import ReceivingListRow from './receiving-list-row.component';

const ReceivingListTable = ({ 
  data
}) => {

  const location = useLocation();
  const history = useHistory();

  const obj = queryString.parse(location.search);

  const { allIds } = data;

  // handle search form 
  const onPageChange = (e, page) => {
    e.preventDefault();

    let queryStr = null;

    if (obj.page) {
      obj.page = page;
      queryStr = '?' + queryString.stringify(obj);
    } else {
      queryStr = location.search ? `${location.search}&page=${page}` : `?page=${page}`
    }
    
    history.push(`${location.pathname}${queryStr}`)
  }

  return <>
    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={obj.page}
    />

    {/* customer table */}
    <div className="row mt-3 mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tracking#</th>
                <th scope="col">Received Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(receiving => 
                <ReceivingListRow key={receiving._id} receiving={receiving} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of customer table --> */}

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={obj.page}
    />
  </>
}

export default withReceivingData(ReceivingListTable);