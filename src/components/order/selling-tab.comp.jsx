import React from 'react'

// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderComp } from '../../state/order/order.selectors'
import { orderSetComp } from '../../state/order/order.actions'

const SellingTab = ({
  isReselect,
  comp,
  setComp
}) => {
  return <>
    <div className="row">
      <div className="col">
        {
          comp === 'select-customer'
          ? <span className="mr-1">{isReselect ? 'Reselect Customer' : 'Select Customer'}</span>
          : <a
              href={'/'} 
              className="a-link-cs mr-1"
              onClick={e => {
                e.preventDefault()
                setComp('select-customer')
              }}
            >
              {isReselect ? 'Reselect Customer' : 'Select Customer'}
            </a>
        }
        <span>{' | '}</span>
        {
          comp === 'customer-add'
          ? <span className="ml-1">Add Customer</span>
          : <a
              href={'/'} 
              className="a-link-cs ml-1"
              onClick={e => {
                e.preventDefault()
                setComp('customer-add')
              }}
            >
              Add Customer
            </a>
        }
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  comp: selectOrderComp
})
const mapDispatchToProps = dispatch => ({
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellingTab)