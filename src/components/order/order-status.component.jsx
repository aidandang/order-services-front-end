import React from 'react';

// dependencies
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
  const { status, info, items, cost } = data.byId;

  const handlePlaceOrder = () => {
    const status = {
      type: 'ordered',
      code: 'Not available'
    }

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    patchReq(`/orders/${data.byId._id}`, fetchSuccess, { status }, null, 'order-status')
  }

  return <>

    { alertMessage && alertMessage.component === 'order-status' && <AlertMesg /> }

    <Card width="col" title="Order Status">
      <Ul>
        {
          status && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Status:</span>
                    </div>
                    <div className="col-8">
                      <span className="text-info">{status.type}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Status Details:</span>
                    </div>
                    <div className="col-8">
                      <span>{status.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
       
        {
          status && status.type === 'created' && info && items.length > 0 && cost &&
          <Li>
            <div className="row">
              <div className="col">
                <Link 
                  to={`${location.pathname}`}
                  className="a-link-cs"
                  onClick={e => {
                    e.preventDefault();
                    handlePlaceOrder();
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