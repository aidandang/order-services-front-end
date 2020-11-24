import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

const OrderAdd = () => {

  const location = useLocation();

  return <>
    <Card width="col" title="Customer Information">
      <Ul>
        <Li>
          <Link 
            to={`${location.pathname}/select-customer`}
            className="a-link-cs"
          >
            Select Customer
          </Link>
        </Li> 
      </Ul>
    </Card>
  </>
}

export default OrderAdd;