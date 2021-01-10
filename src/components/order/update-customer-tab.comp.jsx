import React from 'react'

// components
import { WhiteCard, Ul, Li } from '../tag/tag.component'

const UpdateCustomerTab = ({
  active,
  setActive
}) => {
  return <>
    <WhiteCard>
      <Ul>
        <Li>
          <div className="row">
            <div className="col-12">
              {
                active === 'customer-list'
                ? <span className="mr-1">Customer List</span>
                : <a
                    href={'/'} 
                    className="a-link-cs mr-1"
                    onClick={e => {
                      e.preventDefault()
                      setActive('customer-list')
                    }}
                  >
                    Customer List
                  </a>
              }
              <span>{' | '}</span>
              {
                active === 'add-customer'
                ? <span className="ml-1">Add Customer</span>
                : <a
                    href={'/'} 
                    className="a-link-cs ml-1"
                    onClick={e => {
                      e.preventDefault()
                      setActive('add-customer')
                    }}
                  >
                    Add Customer
                  </a>
              }
            </div>
          </div>
        </Li>
      </Ul>
    </WhiteCard>
  </>
}

export default UpdateCustomerTab