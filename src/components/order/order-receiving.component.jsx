import React from 'react';

// dependencies
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';

const OrderReceiving = ({ 
  data
}) => {

  const { byId } = data;

  const location = useLocation();

  return <>
    <Card width="col" title="Receiving Information">
      <Ul>
        {
          byId && byId.receiving && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Status:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.receiving.status}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Tracking Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.receiving.tracking.length > 0 ? byId.receiving.tracking : 'Not Available'}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Received Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.receiving.recvDate.length > 0 ? moment(byId.receiving.recvDate).format('MMM DD, YYYY') : 'Not Available'}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Warehouse:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.receiving.warehouse.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        <Li>
          <div className="row">
            <div className="col">
              <Link 
                to={`${location.pathname}/update-order-receiving`}
                className="a-link-cs"
              >
                Update Information
              </Link>
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

export default connect(mapStateToProps)(OrderReceiving);