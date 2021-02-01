import React from 'react'

// dependencies
import { useLocation } from 'react-router-dom'
// components
import Tab from '../tab/tab.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
// constants
const tabItemObj = {
  'received-trackings': {
    name: 'Received Trackings',
    link: '/app/inventory/received-trackings',
    badge: 0
  },
  'incomming-orders': {
    name: 'Incoming Orders',
    link: '/app/inventory/incoming-orders',
    badge: 0
  },
  'in-store-orders': {
    name: 'In-Store Orders',
    link: '/app/inventory/in-store-orders',
    badge: 0
  }
}

const InventoryTab = ({
  data
}) => {

  const location = useLocation()
  const { trackings, orders } = data

  // display notifications in the tab item 0
  if (trackings) {
    tabItemObj['received-trackings'].badge = trackings.length
  }

  // display notifications in the tab item 1
  if (orders.length > 0) {
    tabItemObj['incomming-orders'].badge = orders.reduce((a, c) => c.status === 'ordered' ? a + 1 : a, 0)
    tabItemObj['in-store-orders'].badge = orders.reduce((a, c) => c.status === 'received' ? a + 1 : a, 0)
  }

  return <>
    <Tab itemObj={tabItemObj} active={location.pathname} />
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(InventoryTab)