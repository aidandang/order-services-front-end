import React, { useState, useEffect } from 'react';

// components
import ReceivedTrackings from './received-trackings.component';
import OrderedList from './ordered-list.component';
import ReceivedList from './received-list.component';
import Tab from '../tab/tab.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/api.requests';
import { InventoryActionTypes } from '../../state/inventory/inventory.types';
import { selectInventoryData } from '../../state/inventory/inventory.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// initial data
const items = [
  {
    name: 'Received Trackings',
    badge: 0
  },
  {
    name: 'Incoming Items',
    badge: 0
  },
  {
    name: 'In-Store Items',
    badge: 0
  },
  {
    name: 'Packed Items',
    badge: 0
  },
  {
    name: 'Shipped Trackings',
    badge: 0
  }
]

const Inventory = ({
  data,
  alertMessage,
  getReq
}) => {

  const { orders, trackings } = data;

  const [action, setAction] = useState('');
  const [success, setSuccess] = useState(false);

  // display notifications in the tab
  if (trackings && trackings.length > 0) {
    items[0].badge = trackings.reduce((a, c) => c.status === 'received' ? a + 1 : a, 0)
  }

  if (orders && orders.length > 0) {
    items[1].badge = orders.reduce((a, c) => c.status === 'ordered' ? a + 1 : a, 0)
  }

  if (orders && orders.length > 0) {
    items[2].badge = orders.reduce((a, c) => c.status === 'received' ? a + 1 : a, 0)
  }

  useEffect(() => {
    const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS;

    getReq('/inventory', fetchSuccess, null, null, 'inventory');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    <Tab items={items} active={action} setActive={setAction} />

    { alertMessage && alertMessage.component === 'inventory' && <AlertMesg /> }
    
    <div className="row">
      <div className="col">
        { 
          action === items[0].name && 
          <ReceivedTrackings 
            setSuccess={setSuccess} 
            receivedTrackings={trackings ? trackings.filter(el => el.status === 'received') : []}
          />
        }
        { 
          action === items[1].name && 
          <OrderedList 
            setSuccess={setSuccess} 
            ordereds={orders ? orders.filter(el => el.status === 'ordered') : []}
          />
        }
        { 
          action === items[2].name && 
          <ReceivedList 
            setSuccess={setSuccess} 
            receiveds={orders ? orders.filter(el => el.status === 'received') : []}
          />
        }
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);