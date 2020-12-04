import React, { useState, useEffect } from 'react';

// components
import ScannedTrackings from './scanned-trackings.component';
import OrderedList from './ordered-list.component';
import Tab from '../tab/tab.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/api.requests';
import { InventoryActionTypes } from '../../state/inventory/inventory.types';
import { INVENTORY_QUERY_STRING } from '../../state/inventory/inventory.data';
import { selectInventoryData } from '../../state/inventory/inventory.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// initial data
const items = [
  {
    name: 'Scanned',
    badge: 0
  },
  {
    name: 'Ordered',
    badge: 0
  }
]

const Inventory = ({
  data,
  alertMessage,
  getReq
}) => {

  const { orders, trackings } = data;

  const [action, setAction] = useState('Scanned');
  const [success, setSuccess] = useState(false);

  if (trackings && trackings.length > 0) {
    items[0].badge = trackings.reduce((a, c) => c.status === 'scanned' ? a + 1 : a, 0)
  }

  if (orders && orders.length > 0) {
    items[1].badge = orders.reduce((a, c) => c.status === 'ordered' ? a + 1 : a, 0)
  }

  const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS;
  useEffect(() => {
    getReq('/inventory', fetchSuccess, INVENTORY_QUERY_STRING, null, 'inventory');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    <Tab items={items} active={action} setActive={setAction} />

    { alertMessage && alertMessage.component === 'inventory' && <AlertMesg /> }
    
    <div className="row">
      <div className="col">
        { 
          action === 'Scanned' && 
          <ScannedTrackings 
            setSuccess={setSuccess} 
            scanneds={trackings ? trackings.filter(el => el.status === 'scanned') : []}
          />
        }
        { 
          action === 'Ordered' && 
          <OrderedList 
            setSuccess={setSuccess} 
            ordereds={orders ? orders.filter(el => el.status === 'ordered') : []}
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