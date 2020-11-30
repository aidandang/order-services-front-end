import React, { useState } from 'react';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import ScannedTrackings from './scanned-trackings.component';
import OrderedList from './ordered-list.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectReceivingData } from '../../state/receiving/receiving.selectors';
import { selectOrderData } from '../../state/order/order.selectors';

const Inventory = ({
  receivingData,
  orderData
}) => {

  const [action, setAction] = useState('scanned-trackings');

  let unprocessedTrackings = 0;
  if (receivingData.allIds && receivingData.allIds.length > 0) {
    unprocessedTrackings = receivingData.allIds.reduce((a, c) => c.status === 'scanned' ? a + 1 : a, 0)
  }

  const handleScannedTrackings = () => {
    setAction('scanned-trackings')
  }

  let unprocessedOrders = 0;
  if (orderData.allIds && orderData.allIds.length > 0) {
    unprocessedOrders = orderData.allIds.reduce((a, c) => c.status === 'ordered' ? a + 1 : a, 0)
  }

  const handleOrderedList = () => {
    setAction('ordered-list')
  }

  return <>
    <div className="row">
      <div className="col-xl-8">
        { action === 'scanned-trackings' && <ScannedTrackings />}
        { action === 'ordered-list' && <OrderedList />}
      </div>
      <div className="col-xl-4">
        <Card width="col" title="Menu">
          <Ul>
            <Li>
              { 
                action === 'scanned-trackings' 
                ? <>
                  <span>Scanned Trackings</span>
                  {
                    unprocessedTrackings > 0 && <>
                      <span>{' '}</span>
                      <span className="badge badge-pill badge-danger">{unprocessedTrackings}</span>
                    </>
                  }
                </>
                 
                : <>
                  <a
                    href="/"
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault();
                      handleScannedTrackings()
                    }}
                  >
                    Scanned Trackings
                  </a>
                </>
              }
            </Li>
            <Li>
              { 
                action === 'ordered-list' 
                ? <>
                  <span>Ordered List</span>
                </>
                : <>
                  <a
                    href="/"
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault();
                      handleOrderedList()
                    }}
                  >
                    Ordered
                  </a>
                </>
              }
              {
                unprocessedOrders > 0 && <>
                  <span>{' '}</span>
                  <span className="badge badge-pill badge-danger">{unprocessedOrders}</span>
                </>
              }
            </Li>
          </Ul>
        </Card>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  receivingData: selectReceivingData,
  orderData: selectOrderData
})

export default connect(mapStateToProps)(Inventory);