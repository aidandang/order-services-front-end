import React from 'react';

// dependencies
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';
// components
import { Card, Ul, Li } from '../tag/tag.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectShippingData } from '../../state/shipping/shipping.selectors';

const ShippingInfo = ({ 
  data
}) => {

  const location = useLocation()

  const { byId } = data

  return <>
    <Card width="col" title="Shipping Information">
      <Ul>
        {
          byId && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Status:</span>
                    </div>
                    <div className="col-8">
                      <span className="text-info">{byId.status}</span>
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
                      <span>Shipping Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.shptNumber}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Pickup Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{moment(byId.info.pkupDate).add(8, 'hours').format('MMM DD, YYYY')}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Shipping Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{moment(byId.info.shptDate).add(8, 'hours').format('MMM DD, YYYY')}</span>
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
                      <span>Warehouse:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.warehouse.name}</span>
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
                      <span>Courier:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.courier.name}</span>
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
                      <span>Consignee:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.consignee.name}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.consignee.streetAddress1}</span><br />
                      <span>{byId.info.consignee.city}, {byId.info.consignee.state}, {byId.info.consignee.zipcode}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Contact Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.info.consignee.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        <Li>
          <Link
            to={`${location.pathname}/update-shipment-info`}
            className="a-link-cs"
          >
            Update Shipping Information
          </Link>
        </Li> 
      </Ul>
    </Card>  
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectShippingData
})

export default connect(mapStateToProps)(ShippingInfo);