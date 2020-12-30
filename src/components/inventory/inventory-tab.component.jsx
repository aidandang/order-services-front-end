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
const items = [
  {
    name: 'Received Trackings',
    link: '/app/inventory/received-trackings',
    badge: 0
  },
]

const InventoryTab = ({
  data,
  alertMessage,
  getReq
}) => {

  const location = useLocation()
  const { trackings } = data

  // display notifications in the tab
  if (trackings && trackings.length > 0) {
    items[0].badge = trackings.reduce((a, c) => c.status === 'received' ? a + 1 : a, 0)
  }

  useEffect(() => {
    const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS

    getReq('/inventory', fetchSuccess, null, null, 'inventory')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Tab items={items} active={location.pathname} />

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