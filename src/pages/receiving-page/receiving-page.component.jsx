import React from 'react'

// dependencies
import { Switch, Route, useLocation } from 'react-router-dom'
// components
import Title from '../../components/title/title.component'
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component'
import routes from '../../routes/private/receiving.routes'
// constants
const title = {
  name: 'Receiving',
  message: 'Scan barcode to receive a package. Tracking number can be sorted by couriers.'
}
const titleButtonPath = "/app/receiving/add"

const ReceivingPage = () => {

  const location = useLocation()

  return <>
    <Title 
      title={title} 
      button={location.pathname.match(titleButtonPath) 
        ? undefined
        : { path: titleButtonPath, text: 'Add'}
      } 
    />
    
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
                <Component {...props} />
              </>
            }}
          />
        ))
      }
    </Switch>
  </>
}

export default ReceivingPage