import React from 'react';

// components
import OrderListItemProcessing from './order-list-item-processing.component';

const OrderedList = ({
  ordereds,
  setSuccess
}) => {

  return <>
    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Status</th>
                <th scope="col">Customer</th>
                <th scope="col">Order Number</th>
                <th scope="col">Date</th>
                <th scope="col">Merchant</th>
                <th scope="col" className="text-right">Items</th>
                <th scope="col" className="text-right">Order Cost</th>
              </tr>
            </thead>
            <tbody>
              {
                ordereds.length > 0 
                ? 
                ordereds.map(order => 
                  <OrderListItemProcessing 
                    order={order} 
                    key={order._id} 
                    setSuccess={setSuccess}
                  />
                )
                : <>
                  <tr className="table-row-cs">
                    <td colSpan="8">All orders have been processed.</td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

export default OrderedList;