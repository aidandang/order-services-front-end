import React, { useState, useEffect } from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
// components
import { Card, Ul, Li, Button } from '../tag/tag.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postReq } from '../../state/api/api.requests'; 
import { OrderActionTypes } from '../../state/order/order.types';
import { selectOrderData } from '../../state/order/order.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

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
      status: 'created',
      costing: {} 
    }
    const component = 'order-add'

    postReq('/orders', fetchSuccess, reqBody, setSuccess, component)
  }

  useEffect(() => {
    if (success && byId) history.push(`${location.pathname.split('/add')[0]}/${byId._id}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'order-add' && <AlertMesg /> }

    <Card width="col" title="Create a New Order">
      <Ul>
        <Li>
          <span>A new Order Number will be created. Do you want to continue?</span>
        </Li>
        <Li>
          <div className="row">
            <div className="col my-2">
              <Button
                onClick={e => {
                  e.preventDefault();
                  handleSubmit()
                }}
              >
                Add Order
              </Button>
              <span className="mr-3"></span>
              <Button
                onClick={e => {
                  e.preventDefault();
                  history.push(`${location.pathname.split('/add')[0]}`)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Li>  
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderAdd);