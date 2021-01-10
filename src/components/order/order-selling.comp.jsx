import React from 'react'

// dependencies
import { useHistory, useLocation } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import Selling from './selling.comp'
import SellingItem from './selling-item.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'

const OrderSelling = ({
  data
}) => {

  // set constants
  const { selling, items } = data.byId
  const history = useHistory()
  const location = useLocation()
  const sellingUpdatePath = location.pathname + '/selling-update'

  const handleSellingUpdateLink = () => {
    history.push(sellingUpdatePath)
  }

  return <>
    <Card title="Selling Information">
      <Ul>
        { selling && <Selling selling={selling} /> }
      </Ul>
      { 
        items.length > 0 &&  
        <div className="row mt-4 mx-1">
          <div className="col">
            <SellingItem orderSelling={true} />
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
              handleSellingUpdateLink()
            }}
          >
            Selling Update
          </a>
        </Li>
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(OrderSelling)