import React from 'react'

// components
import { Card, Ul, Li } from '../tag/tag.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { patchReq } from '../../state/api/api.requests'
import { OrderActionTypes } from '../../state/order/order.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// initial values
const statusColor = {
  'created': 'text-danger',
  'editing': 'text-warning',
  'ordered': 'text-success'
}

// main component
const OrderInfo = ({ 
  byId,
  alertMessage,
  patchReq
}) => {

  const handlePlaceOrder = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const obj = { 
      ...byId,
      status: 'ordered',
      items: byId.items.map(item => {
        item.status = 'ordered'
        return item
      }) 
    }
  
    patchReq(`/orders/${byId._id}`, fetchSuccess, { ...obj }, null, 'order-info')
  }

  return <>

    { alertMessage && alertMessage.component === 'order-info' && <AlertMesg /> }

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
        {
          byId.status !== 'ordered' && byId.purchasing &&
          <SubmitOrReset
            buttonName="Place Order"
            buttonDisabled={false}
            formSubmit={handlePlaceOrder}
          />
        }
      </Ul>
    </Card>  
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, componenent) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, componenent)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo)