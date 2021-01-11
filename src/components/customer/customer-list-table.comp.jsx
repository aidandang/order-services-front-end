import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

// components
import withCustomerData from './withCustomerData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import CustomerListRow from './customer-list-row.comp';

const CustomerListTable = ({ 
  data,
  setActive
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
    {
      allIds.length > 0
      ? <>
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
                    <th scope="col">Account#</th>
                    <th scope="col">Nickname</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Address</th>
                    <th scope="col" className="text-right">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {allIds.map(customer => 
                    <CustomerListRow 
                      key={customer._id} 
                      customer={customer} 
                      setActive={setActive} // switch from customer list to customer details by Id
                    />
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
      : 
      <div class="alert alert-light" role="alert">
        No customers found.
      </div>
    }
  </>
}

export default withCustomerData(CustomerListTable);