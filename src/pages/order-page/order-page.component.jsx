import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import routes from '../../routes/private/order.routes';

// initial values
const title = {
  name: 'Order',
  message: 'Search for orders(s) by order number, data and items.'
}

// main component
const OrderPage = () => {

  return <>
    <Title title={title} />
    
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

export default OrderPage;