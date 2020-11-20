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

const OrderStatus = ({ 
  data
}) => {

  const { byId } = data;

  const location = useLocation();

  return <>
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
                      <span>{byId.status.type}</span>
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
        <Li>
          <div className="row">
            <div className="col">
              <Link 
                to={`${location.pathname}/update-order-status`}
                className="a-link-cs"
              >
                Place Order
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

export default connect(mapStateToProps)(OrderStatus);