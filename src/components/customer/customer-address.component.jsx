import React, { useState, useEffect } from 'react'

// components
import { Card, Ul } from '../tag/tag.component'
import CustomerAddressAdd from './customer-address-add.component'
import CustomerAddressEdit from './customer-address-edit.component'
import CustomerAddressRemove from './customer-address-remove.component'
import AddressOptions from './address-options.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { patchReq } from '../../state/api/api.requests'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { CustomerActionTypes } from '../../state/customer/customer.types'

const CustomerAddress = ({
  customerTemp,
  setActive,
  patchReq,
  alertMessage
}) => {

  const [radio, setRadio] = useState('')
  const [success, setSuccess] = useState(false)
  const [action, setAction] = useState('')

  const handleRadioSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS

    const obj = {
      ...customerTemp,
      shippingAddress: radio
    }

    const reqBody = { ...obj }
    patchReq(`/customers/${customerTemp._id}`, fetchSuccess, reqBody, setSuccess, 'customer-shipping-info')
  }

  const handleRadioOnChange = e => {
    e.stopPropagation()
    setRadio(e.target.value)
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  return <>
    { alertMessage && alertMessage.component === 'customer-shipping-info' && <AlertMesg/> }

    <Card title="Update Shipping Address">
      <Ul>
        {
          action === '' &&
          <AddressOptions
            handleRadioSubmit={handleRadioSubmit}
            handleRadioOnChange={handleRadioOnChange}
            byId={customerTemp}
            setAction={setAction}
          />
        }
        {
          action === 'add' &&
          <CustomerAddressAdd setAction={setAction} />
        }
        {
          action.match(/edit/) &&
          <CustomerAddressEdit action={action} setAction={setAction} />
        }
        {
          action.match(/remove/) &&
          <CustomerAddressRemove action={action} setAction={setAction}/>
        }
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddress)