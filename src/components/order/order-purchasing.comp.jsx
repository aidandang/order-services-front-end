import React from 'react'

// dependencies
import { useHistory, useLocation } from 'react-router-dom'
// components
import { Card, Ul, Li, OnClickLink } from '../tag/tag.comp'
import Purchasing from './purchasing.comp'
import PurchasingItem from './purchasing-item.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'

const OrderPurchasing = ({ 
  data
}) => {

  const history = useHistory()
  const location = useLocation()

  const { purchasing, items } = data.byId
  const purchasingUpdatePath = location.pathname + '/purchasing-update'

  const goPurchasingUpdate = () => {
    history.push(purchasingUpdatePath)
  }

  return <>
    <Card width="col" title="Purchasing">
      <Ul>
        { purchasing && <Purchasing purchasing={purchasing} /> }
      </Ul>
      { 
        items.length > 0 && 
        <div className="row mt-4 mx-1">
          <div className="col">
            <div className="table-responsive-sm">
              <PurchasingItem isPurchasingCalled={true} />
            </div>
          </div>
        </div> 
      }
      <Ul>
        <Li>
          <OnClickLink text={'Purchasing Update'} action={goPurchasingUpdate} />
        </Li>
      </Ul>  
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderPurchasing)