import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import routes from '../../routes/private/product.routes';


// initial values
const title = {
  name: 'Product',
  message: 'Choose product(s) for an order. Product can be added, edited or deleted.'
}

const ProductPage = () => {

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

export default ProductPage;