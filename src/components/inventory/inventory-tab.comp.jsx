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
  'incomming-items': {
    name: 'Incoming Items',
    link: '/app/inventory/incoming-items',
    badge: 0
  },
  'in-store-items': {
    name: 'In-Store Items',
    link: '/app/inventory/in-store-items',
    badge: 0
  }
}

const InventoryTab = ({
  data
}) => {

  const location = useLocation()
  const { trackings, items } = data

  // display notifications in the tab item 0
  if (trackings) {
    tabItemObj['received-trackings'].badge = trackings.length
  }

  // display notifications in the tab item 1
  if (items) {
    tabItemObj['incomming-items'].badge = items.length
  }

  // display notifications in the tab item 1
  if (items) {
    tabItemObj['in-store-items'].badge = items.length
  }

  return <>
    <Tab itemObj={tabItemObj} active={location.pathname} />
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(InventoryTab)