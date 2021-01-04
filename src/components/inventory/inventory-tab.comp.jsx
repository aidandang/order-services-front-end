import React, { useEffect } from 'react'

// dependencies
import { useLocation } from 'react-router-dom'
// components
import Tab from '../tab/tab.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getReq } from '../../state/api/api.requests'
import { InventoryActionTypes } from '../../state/inventory/inventory.types'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const tabItems = [
  {
    name: 'Received Trackings',
    link: '/app/inventory/received-trackings',
    badge: 0
  },
  {
    name: 'Incoming Items',
    link: '/app/inventory/incoming-items',
    badge: 0
  },
  {
    name: 'In-Store Items',
    link: '/app/inventory/in-store-items',
    badge: 0
  }
]

const InventoryTab = ({
  data,
  alertMessage,
  getReq
}) => {

  const location = useLocation()
  const { trackings, items } = data

  // display notifications in the tab item 0
  if (trackings) {
    tabItems[0].badge = trackings.length
  }

  // display notifications in the tab item 1
  if (items) {
    tabItems[1].badge = items.length
  }

  // display notifications in the tab item 1
  if (items) {
    tabItems[2].badge = items.length
  }

  useEffect(() => {
    const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS

    getReq('/inventory', fetchSuccess, null, null, 'inventory')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Tab items={tabItems} active={location.pathname} />

    { alertMessage && alertMessage.component === 'inventory' && <AlertMesg /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTab)