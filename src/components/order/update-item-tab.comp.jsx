import React from 'react'

// components
import { WhiteCard, Ul, Li } from '../tag/tag.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectPurcItemTabActive } from '../../state/order/order.selectors'
import { setPurcItemTabActive } from '../../state/order/order.actions'

const UpdateItemTab = ({
  isReselectProduct,
  active,
  setActive,
  itemIndex
}) => {
  return <>
    <WhiteCard>
      <Ul>
        <Li>
          <div className="row">
            <div className="col-12">
              {
                active === 'item'
                ? <span className="mr-1">Item</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mr-1"
                    onClick={e => {
                      e.preventDefault()
                      setActive('item')
                    }}
                  >
                    Item
                  </a>
              }
              <span>{' | '}</span>
              {
                active === 'select-product'
                ? <span className="mx-1">{isReselectProduct ? 'Reselect Product' : 'Select Product'}</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mx-1"
                    onClick={e => {
                      e.preventDefault()
                      setActive('select-product')
                    }}
                  >
                    {isReselectProduct ? 'Reselect Product' : 'Select Product'}
                  </a>
              }
              <span>{' | '}</span>
              {
                active === 'add-product'
                ? <span className="mx-1">Add Product</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mx-1"
                    onClick={e => {
                      e.preventDefault()
                      setActive('add-product')
                    }}
                  >
                    Add Product
                  </a>
              }
              {
                itemIndex && <>
                  <span>{' | '}</span>
                  {
                    active === 'remove'
                    ? <span className="ml-1">Remove</span>
                    : <a
                        href={'/'} 
                        className="a-link-cs ml-1"
                        onClick={e => {
                          e.preventDefault()
                          setActive('remove')
                        }}
                      >
                        Remove Item
                      </a>
                  }
                </>
              }
            </div>
          </div>
        </Li>
      </Ul>
    </WhiteCard>
  </>
}

const mapStateToProps = createStructuredSelector({
  active: selectPurcItemTabActive
})
const mapDispatchToProps = dispatch => ({
  setActive: payload => dispatch(setPurcItemTabActive(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemTab)