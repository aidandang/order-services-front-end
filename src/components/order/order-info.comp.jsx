import React from 'react'

// components
import { Card, Ul, Li } from '../tag/tag.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
// constants
const statusColor = {
  'created': 'text-danger',
  'ordered': 'text-dark',
  'cancelled': 'text-muted'
}

const OrderInfo = ({ 
  data
}) => {

  const { byId } = data

  return <>
    <Card width="col" title="Order">
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

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderInfo)