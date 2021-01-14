import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.comp'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { postReq } from '../../state/api/api.requests' 
import { OrderActionTypes } from '../../state/order/order.types'
import { selectOrderData } from '../../state/order/order.selectors'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'order-add'

const OrderAdd = ({
  data,
  postReq,
  alertMessage
}) => {

  const history = useHistory()
  const location = useLocation()
  const { byId } = data
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const reqBody = { 
      status: 'created'
    }

    postReq('/orders', fetchSuccess, reqBody, setSuccess, component)
  }

  const handleCancel = () => {
    history.push(location.pathname.split('/add')[0])
  }

  useEffect(() => {
    if (success && byId) history.push(`${location.pathname.split('/add')[0]}/${byId._id}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }

    <Card width="col" title="Create a New Order">
      <Ul>
        <Li>
          <span>A new Order Number will be created. Do you want to continue?</span>
        </Li>
        <SubmitOrReset
          buttonName={'Add Order'}
          buttonDisabled={false}
          formSubmit={handleSubmit}
          formReset={handleCancel}
          secondButtonName={'Cancel'}
        />
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderAdd)