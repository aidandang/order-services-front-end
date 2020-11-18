import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import routes from '../../routes/private/customer.routes';

// initial values
const title = {
  name: 'Customer',
  message: 'Search for customer(s) by account, nickname and address.'
}

const CustomerPage = () => {

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

export default CustomerPage;