import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom'
// components
import withItemData from './withItemData'

const OrderItem = ({
  data
}) => {

  const location = useLocation()
  const { allIds } = data

  return <>
    {/* Item Table */}
    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Style#</th>
                <th scope="col">Item/Description</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col" className="text-right">Item Cost</th>
                <th scope="col" className="text-right">Sales Tax</th>
                <th scope="col" className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                allIds && allIds.length > 0 
                ? <>
                </>
                : <>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="6">
                      <Link
                        to={`${location.pathname}/item`}
                        className="a-link-cs"
                      >
                        Add Item
                      </Link>
                    </td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */}
  </>
}

export default withItemData(OrderItem)