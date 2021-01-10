import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import Selling from './selling.comp'
import SellingItem from './selling-item.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import SellingForm from './selling-form.comp'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData, selectIsSelectedCustomer } from '../../state/order/order.selectors'
import { OrderActionTypes } from '../../state/order/order.types'
import { patchReq } from '../../state/api/api.requests'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { setIsSelectedCustomer } from '../../state/order/order.actions'
// constants
const component = 'selling-update-submit'

const SellingUpdateSubmit = ({
  data,
  patchReq,
  alertMessage,
  isSelectedCustomer,
  setIsSelectedCustomer
}) => {

  const location = useLocation()
  const history = useHistory()

  // set constants
  const { selling, _id, items } = data.byId

  const [success, setSuccess] = useState(false)
  
  const handleSubmitButton = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const pathname = '/orders/' + _id
    const reqBody = { ...data.byId }

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }

  const handleResetButton = () => {
    history.push(`${location.pathname.split('/selling-update')[0]}`)
  }

  useEffect(() => {
    if (success) history.push(`${location.pathname.split('/selling-update')[0]}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }

    <Card width="col-12" title="Customer Information">
      {
        isSelectedCustomer === false
        ? <SellingForm />
        : 
        <Ul>
          <Li>
            <a 
              href={'/'}
              className="a-link-cs"
              onClick={e => {
                e.preventDefault()
                setIsSelectedCustomer(false)
              }}
            >
              { selling && selling.customer ? 'Reselect Customer' : 'Select Customer' }
            </a>
          </Li>
          {
            selling && selling.customer && <Selling selling={selling} />
          }
        </Ul>
      }
    </Card>

    <div className="row mb-2">
      <div className="col">
        <SellingItem />
      </div>
    </div>

    <Card width="col-12" title="Update Selling Order">
      <Ul>
        <SubmitOrReset
          buttonName={'Submit'}
          buttonDisabled={selling && items.length > 0 ? false : true}
          formSubmit={handleSubmitButton}
          formReset={handleResetButton}
          secondButtonName={'Cancel'}
        />
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  alertMessage: selectAlertMessage,
  isSelectedCustomer: selectIsSelectedCustomer
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  setIsSelectedCustomer: payload => dispatch(setIsSelectedCustomer(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellingUpdateSubmit)