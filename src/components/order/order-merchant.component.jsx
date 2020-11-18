import React from 'react';

// dependencies
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';

const OrderMerchant = ({ 
  data
}) => {

  const location = useLocation()

  const { byId } = data

  return <>
    <Card width="col" title="Merchant's Order">
      <Ul>
        {
          byId.info && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Order Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.orderNumber}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Order Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{moment(byId.info.orderDate).format('MMM DD, YYYY')}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Order Type:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.orderType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Merchant:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.merchant.name}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Official Website:</span>
                    </div>
                    <div className="col-8">
                      <a 
                        href={byId.info.merchant.url}
                        className="a-link-cs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {byId.info.merchant.url}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        <Li>
          <Link
            to={`${location.pathname}/update-order-merchant`}
            className="a-link-cs"
          >
            Update Merchant's Order
          </Link>
        </Li> 
      </Ul>
    </Card>  
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderMerchant);