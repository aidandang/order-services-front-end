import React, { useState, useEffect } from 'react'

// components
import AddressOptions from './address-options.comp'
import { Card, Ul, Li } from '../tag/tag.comp'
import CustomerAddressForm from './customer-address-form.comp'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCustomerData } from '../../state/customer/customer.selectors'
import { patchReq } from '../../state/api/api.requests'
import { CustomerActionTypes } from '../../state/customer/customer.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'customer-address'

const CustomerAddress = ({
  data,
  patchReq,
  alertMessage
}) => {

  const { byId } = data
  const { shippingInfo } = data.byId

  const [radio, setRadio] = useState(byId.shippingAddress.length > 0 ? byId.shippingAddress : '')
  const [success, setSuccess] = useState(false)
  const [action, setAction] = useState('')

  const addressTemp = shippingInfo.find(el => el._id === radio)

  const handleRadioSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS

    const obj = {
      ...byId,
      shippingAddress: radio
    }

    const reqBody = { ...obj }
    patchReq(`/customers/${byId._id}`, fetchSuccess, reqBody, setSuccess, component)
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
    { alertMessage && alertMessage.component === component && <AlertMesg/> }

    <Card title="Shipping Addresses">
      <Ul>
        {
          action === ''
          ? <>
            <AddressOptions
              handleRadioSubmit={handleRadioSubmit}
              handleRadioOnChange={handleRadioOnChange}
              byId={byId}
              setAction={setAction}
              radio={radio}
            />
            <Li>
              <div className="row">
                <div className="col">
                  <a
                    href="/"
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault()
                      setAction('add')
                    }}
                  >
                    ( + ) Add a New Address
                  </a>
                </div>  
              </div>
            </Li>
          </>
          :
          <CustomerAddressForm 
            byId={byId} 
            action={action}
            setAction={setAction} 
            component={component}
            addressTemp={action === 'add' ? undefined : addressTemp} 
          /> 
        }
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData,
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddress)