import React from 'react';

// dependencies
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { patchReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const OrderStatus = ({ 
  data,
  patchReq,
  alertMessage
}) => {

  const location = useLocation();

  const { byId } = data;

  const handlePlaceOrder = (orderId) => {

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;

    const obj = { 
      status: {
        type: 'ordered'
      }
    };

    patchReq(`/orders/${orderId}`, fetchSuccess, obj, null, 'order-item-form')
  }

  return <>

    { alertMessage && alertMessage.component === 'order-status' && <AlertMesg /> }

    <Card width="col" title="Order Status">
      <Ul>
        {
          byId && byId.status && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Status:</span>
                    </div>
                    <div className="col-8">
                      <span className="text-info">{byId.status.type}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Updated Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{moment(byId.status.date).format('MMM DD, YYYY')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        { 
          byId && byId.status && byId.status.type === 'created' &&
          <Li>
            <div className="row">
              <div className="col">
                <Link 
                  to={`${location.pathname}`}
                  className="a-link-cs"
                  onClick={e => {
                    e.preventDefault();
                    if (byId && byId.status && byId.status.type === 'created') {
                      handlePlaceOrder(byId._id)
                    } 
                  }}
                >
                  Place Order
                </Link>
              </div>
            </div> 
          </Li> 
        }
      </Ul>
    </Card>  
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);