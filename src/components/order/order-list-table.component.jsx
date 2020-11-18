import React from 'react';

// dependencies
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

// components
import withOrderData from '../api/withOrderData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import OrderListRow from './order-list-row.component'

const OrderListTable = ({ 
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

    {/* order list table */}
    <div className="row mt-3 mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Customer</th>
                <th scope="col">Order Number</th>
                <th scope="col">Date</th>
                <th scope="col">Merchant</th>
                <th scope="col" className="text-right">Items</th>
                <th scope="col" className="text-right">Order Cost</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(order => 
                <OrderListRow key={order._id} order={order} />    
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of order list table --> */}

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={obj.page}
    />
  </>
}

export default withOrderData(OrderListTable);