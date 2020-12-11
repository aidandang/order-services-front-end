import React from 'react'

// components
import { Card, Ul, Li } from '../tag/tag.component'
// initial values
const statusColor = {
  'created': 'text-info',
  'ordered': 'text-danger'
}

// main component
const OrderInfo = ({ 
  byId
}) => {
  return <>
    <Card width="col" title="Order Information">
      <Ul>
        <Li>
          <div className="row">
            <div className="col-4">
              <span>Order Number:</span>
            </div>
            <div className="col-8">
              <span>{byId.orderNumber}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <span>Status:</span>
            </div>
            <div className="col-8">
              <span className={statusColor[byId.status]}>{byId.status}</span>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>  
  </>
}

export default OrderInfo