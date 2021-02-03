import React from 'react'

// components
import { Card, Ul, Li } from '../tag/tag.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderComp } from '../../state/order/order.selectors'
import { orderSetComp } from '../../state/order/order.actions'

const PurchasingItemTab = ({
  itemIndex,
  isReselectProduct,
  comp,
  setComp
}) => {

  return <>
    <Card>
      <Ul>
        <Li>
          <div className="row">
            <div className="col-12">
              {
                comp === ''
                ? <span className="mr-1">Item</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mr-1"
                    onClick={e => {
                      e.preventDefault()
                      setComp('')
                    }}
                  >
                    Item
                  </a>
              }
              <span>{' | '}</span>
              {
                comp === 'select-product'
                ? <span className="mx-1">{isReselectProduct ? 'Reselect Product' : 'Select Product'}</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mx-1"
                    onClick={e => {
                      e.preventDefault()
                      setComp('select-product')
                    }}
                  >
                    {isReselectProduct ? 'Reselect Product' : 'Select Product'}
                  </a>
              }
              <span>{' | '}</span>
              {
                comp === 'add-product'
                ? <span className="mx-1">Add Product</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mx-1"
                    onClick={e => {
                      e.preventDefault()
                      setComp('add-product')
                    }}
                  >
                    Add Product
                  </a>
              }
              {
                itemIndex >= 0 && <>
                  <span>{' | '}</span>
                  {
                    comp === 'remove'
                    ? <span className="mx-1">Remove Item</span>
                    : <a
                        href={'/'} 
                        className="a-link-cs mx-1"
                        onClick={e => {
                          e.preventDefault()
                          setComp('remove')
                        }}
                      >
                        Remove Item
                      </a>
                  }
                </>
              }
              <span>{' | '}</span>
              {
                comp === 'receiving'
                ? <span className="mx-1">Receiving</span>
                : <a
                    href={'/'} 
                    className="a-link-cs ml-1"
                    onClick={e => {
                      e.preventDefault()
                      setComp('receiving')
                    }}
                  >
                    Receiving
                  </a>
              }
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  comp: selectOrderComp
})
const mapDispatchToProps = dispatch => ({
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingItemTab)