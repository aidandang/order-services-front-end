import React, { useState, useEffect } from 'react'
 
// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li } from '../tag/tag.component'
import Purchasing from './purchasing.comp'
import PurchasingItem from './purchasing-item.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import PurchasingForm from './purchasing-form.comp'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { OrderActionTypes } from '../../state/order/order.types'
import { patchReq } from '../../state/api/api.requests'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'purchasing-update-submit'

const PurchasingUpdateSubmit = ({
  data,
  patchReq,
  alertMessage
}) => {

  const location = useLocation()
  const history = useHistory()

  // set constants
  const { purchasing, _id, items } = data.byId

  const [success, setSuccess] = useState(false)
  const [isInfoForm, setIsInfoForm] = useState(false)

  const handleSubmitButton = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const pathname = '/orders/' + _id
    const reqBody = { ...data.byId }

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }

  const handleResetButton = () => {
    history.push(`${location.pathname.split('/purchasing-update')[0]}`)
  }

  useEffect(() => {
    if (success) history.push(`${location.pathname.split('/purchasing-update')[0]}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }
    
    <Card width="col-12" title="Purchasing Information">
      {
        isInfoForm 
        ? <PurchasingForm setIsInfoForm={setIsInfoForm} />
        : 
        <Ul>
          <Li>
            <a 
              href={'/'}
              className="a-link-cs"
              onClick={e => {
                e.preventDefault()
                setIsInfoForm(true)
              }}
            >
              { purchasing && purchasing.orderNumber ? 'Update Purchasing Information' : 'Add Purchasing Information' }
            </a>
          </Li>
          {
            purchasing && purchasing.orderNumber && <Purchasing purchasing={purchasing} />
          }
        </Ul>
      }
    </Card>
    <div className="row mb-2">
      <div className="col">
        <PurchasingItem />
      </div>
    </div>
  
    <Card width="col-12" title="Update Purchasing Order">
      <Ul>
        <SubmitOrReset
          buttonName={'Submit'}
          buttonDisabled={purchasing && items.length > 0 ? false : true}
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
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingUpdateSubmit)