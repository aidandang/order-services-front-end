import React from 'react'

// dependencies
import { useHistory, useLocation } from 'react-router-dom'
// components
import { Card, Ul, Li, OnClickLink } from '../tag/tag.comp'
import Selling from './selling.comp'
import SellingItem from './selling-item.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'

const OrderSelling = ({
  data
}) => {

  const history = useHistory()
  const location = useLocation()

  const { selling, items } = data.byId
  const sellingUpdatePath = location.pathname + '/selling-update'

  const handleSellingUpdate = () => {
    history.push(sellingUpdatePath)
  }

  return <>
    <Card title="Selling">
      <Ul>
        { selling && <Selling selling={selling} /> }
      </Ul>

      { 
        selling && items.length > 0 &&  
        <div className="row mt-4 mx-1">
          <div className="col">
            <div className="table-responsive-sm">
              <SellingItem orderSelling={true} />
            </div>
          </div>
        </div>
      }

      <Ul>
        <Li>
          <OnClickLink text={'Selling Update'} action={handleSellingUpdate} />
        </Li>
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderSelling)