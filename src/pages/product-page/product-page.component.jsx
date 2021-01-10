import React from 'react'

// dependencies
import { Switch, Route, useLocation } from 'react-router-dom'
// components
import Title from '../../components/title/title.component'
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component'
import routes from '../../routes/private/product.routes'
// constants
const title = {
  name: 'Product',
  message: 'Choose product(s) for an order. Product can be added, edited or deleted.'
}
const titleButtonPath = "/app/product/add"

const ProductPage = () => {

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

export default ProductPage