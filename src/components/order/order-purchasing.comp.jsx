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

  const handlePurchasingUpdateLink = () => {
    history.push(purchasingUpdatePath)
  }

  return <>
    <Card width="col" title="Purchasing Information">
      <Ul>
        { purchasing && <Purchasing purchasing={purchasing} /> }
      </Ul>
      { 
        items.length > 0 && 
        <div className="row mt-4 mx-1">
          <div className="col">
            <PurchasingItem orderPurchasing={true} />
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
              handlePurchasingUpdateLink()
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