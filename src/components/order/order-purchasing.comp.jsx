import React from 'react'

// dependencies
import { useHistory, useLocation } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import Purchasing from './purchasing.comp'
import PurchasingItem from './purchasing-item.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'

const OrderPurchasing = ({ 
  data
}) => {

  // set constants
  const { purchasing, items } = data.byId
  const history = useHistory()
  const location = useLocation()
  const purchasingUpdatePath = location.pathname + '/purchasing-update'

  const handlePurchasingUpdateButton = () => {
    history.push(purchasingUpdatePath)
  }

  return <>
    <Card width="col" title="Purchasing Information">
      <Ul>
        { purchasing && <Purchasing purchasing={purchasing} /> }
      </Ul>
      { 
        // check if no items has been added to the order
        // in MongoDB, a nested joint would return an array with 1 element
        // which is an empty object that makes the app is crashed.
        items.length > 0 && Object.keys(items[0]).length > 0 && 
        <div className="row mt-4 mx-1">
          <div className="col">
            <PurchasingItem notOrderPurchasing={false} />
          </div>
        </div> 
      }
      <Ul>
        <Li>
          <a
            href="/"
            className="a-link-cs"
            onClick={e => {
              e.preventDefault()
              handlePurchasingUpdateButton()
            }}
          >
            Purchasing Update
          </a>
        </Li>
      </Ul>  
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderPurchasing)