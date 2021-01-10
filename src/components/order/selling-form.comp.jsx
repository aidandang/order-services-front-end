import React, { useState } from 'react'

// components
import { CloseTask } from '../tag/tag.component'
import CustomerList from '../customer/customer-list.component'
import CustomerAdd from '../customer/customer-add.component'
import UpdateCustomerTab from './update-customer-tab.comp'
// redux
import { connect } from 'react-redux'
import { setIsSelectedCustomer } from '../../state/order/order.actions'

const SellingForm = ({
  setIsSelectedCustomer
}) => {

  const [active, setActive] = useState('customer-list')

  const setCloseTask = () => {
    setIsSelectedCustomer(true)
  }

  return <>
    <div className="row mt-2 mx-1">
      <div className="col">
        <CloseTask setCloseTask={setCloseTask} />

        <UpdateCustomerTab active={active} setActive={setActive} />

        {
          active === 'customer-list' && <CustomerList setActive={setActive} />
        }
        {
          active === 'add-customer' && <CustomerAdd setActive={setActive}/>
        }
        
      </div>
    </div>
  </>
}

const mapDispatchToProps = dispatch => ({
  setIsSelectedCustomer: payload => dispatch(setIsSelectedCustomer(payload))
})

export default connect(null, mapDispatchToProps)(SellingForm)