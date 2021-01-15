import React, { useEffect } from 'react'

// dependencies
import { Switch, Route, useLocation } from 'react-router-dom'
// components
import Title from '../../components/title/title.component'
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component'
import routes from '../../routes/private/inventory.routes'
import InventoryTab from '../../components/inventory/inventory-tab.comp'
import AlertMesg from '../../components/alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getReq } from '../../state/api/api.requests'
import { InventoryActionTypes } from '../../state/inventory/inventory.types'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const title = {
  name: 'Inventory',
  message: 'Keep track orders. Process orders in the warehouse.'
}

const InventoryPage = ({
  data,
  getReq,
  alertMessage
}) => {

  const location = useLocation()

  useEffect(() => {
    const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS

    getReq('/inventory', fetchSuccess, null, null, 'inventory')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  return <>
    <Title title={title} />

    { alertMessage && alertMessage.component === 'inventory' && <AlertMesg /> }

    {
      Object.keys(data).length > 0 &&
      <Switch>
        { 
          routes.map(({ path, Component }, index) => (
            <Route
              exact
              path={path}
              key={index}
              render={props => {
                return <>
                  <Breadcrumb routes={routes} message={title.message} {...props} />
                  <InventoryTab />
                  <Component {...props} />
                </>
              }}
            />
          ))
        }
      </Switch>
    }
    
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage)