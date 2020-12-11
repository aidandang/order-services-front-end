import React from 'react'

// dependencies
import { Link, useLocation } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'

// main component
const OrderSelling = ({ 
  byId
}) => {

  const location = useLocation()
  const { selling } = byId

  return <>
    <Card width="col" title="Selling Information">
      <Ul>
        {
          selling && <>
          </>
        }
        <Li>
          <Link 
            to={`${location.pathname}/update-selling-info`}
            className="a-link-cs"
          >
            Update Selling Information
          </Link>
        </Li>
      </Ul>
    </Card>  
  </>
}

export default OrderSelling