import React from 'react';

// dependencies
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

// components
import withShippingData from './withShippingData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import ShippingListRow from './shipping-list-row.component'

const ShippingListTable = ({ 
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

    {/* shipping list table */}
    <div className="row mt-3 mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Shipment#</th>
                <th scope="col">Status</th>
                <th scope="col">Courier</th>
                <th scope="col">Waybill</th>
                <th scope="col">Pkup Date</th>
                <th scope="col">Shpt Date</th>
                <th scope="col">Dlvd Date</th>
                <th scope="col" className="text-right">Items</th>
                <th scope="col" className="text-right">Weight</th>
                <th scope="col" className="text-right">Cost</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(shipment => 
                <ShippingListRow key={shipment._id} shipment={shipment} />    
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of shipping list table --> */}

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={obj.page}
    />
  </>
}

export default withShippingData(ShippingListTable);