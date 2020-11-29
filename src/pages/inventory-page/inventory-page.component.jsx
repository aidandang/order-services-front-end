import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import routes from '../../routes/private/inventory.routes';

// initial values
const title = {
  name: 'Inventory',
  message: 'Keep track orders. Process orders in the warehouse.'
}

const InventoryPage = () => {

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

export default InventoryPage;