import React, { useState, useEffect } from 'react'
 
// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li, CompFrame, TableFrame, OnClickLink } from '../tag/tag.comp'
import Purchasing from './purchasing.comp'
import PurchasingItem from './purchasing-item.comp'
import PurchasingForm from './purchasing-form.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { OrderActionTypes } from '../../state/order/order.types'
import { patchReq } from '../../state/api/api.requests'
// constants
const component = 'purchasing-update-submit'

const PurchasingUpdateSubmit = ({
  data,
  patchReq,
  alertMessage
}) => {

  const location = useLocation()
  const history = useHistory()

  const { purchasing, _id, items } = data.byId

  const [success, setSuccess] = useState(false)
  const [isPurchasingForm, setIsPurchasingForm] = useState(false)

  const salesTaxCalc = () => {
    return Number(items.reduce((a, c) => a + c.itemCost * c.purTaxPct / 10000, 0).toFixed(0))
  }
  const totalCalc = () => {
    var total = items.reduce((a, c) => a + c.itemCost, 0)
    total += salesTaxCalc()
    total += purchasing && purchasing.otherCost ? purchasing.otherCost : 0
    
    return total
  }

  const handleSubmit = () => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    const pathname = '/orders/' + _id

    // check if item status to change the order status
    var orderStatus = 'ordered'
    if (data.byId.items.length === data.byId.items.reduce((a, c) => c.recvTracking.length > 0 ? a + 1 : a, 0)) {
      orderStatus = 'received'
    } else if (data.byId.items.reduce((a, c) => c.recvTracking.length > 0 ? a + 1 : a, 0) > 0) {
      orderStatus = 'partial-received'
    }
  
    const reqBody = { 
      ...data.byId, 
      status: orderStatus,
      purchasing: { 
        ...data.byId.purchasing, 
        totalCost: totalCalc()
      } 
    }

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }

  const openPurchasingForm = () => {
    setIsPurchasingForm(true)
  }
  const closeComp = () => {
    setIsPurchasingForm(false)
  }
  const goBack = () => {
    const path = location.pathname.split('/purchasing-update')[0]
    history.push(path)
  }

  useEffect(() => {
    if (success) goBack()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    { alertMessage && alertMessage.component === component && <AlertMesg /> }
    
    <Card width="col" title="Purchasing Order">
      <Ul>
        { purchasing && purchasing.orderNumber && <Purchasing purchasing={purchasing} />}
        <Li>
          {
            isPurchasingForm === false && <>
              <OnClickLink 
                text={purchasing && purchasing.orderNumber ? 'Update Purchasing Order' : 'Create a Purchasing Order'}
                action={openPurchasingForm}
              />
            </>
          }
          {
            isPurchasingForm === true && <>
              <CompFrame closeComp={closeComp}>
                <PurchasingForm closeComp={closeComp} />
              </CompFrame>
              <div className="mb-2"></div>
            </>
          }
        </Li>
      </Ul>
    </Card>

    <div className="mb-4"></div>
    
    <TableFrame>
      <PurchasingItem />
    </TableFrame>
  
    <div className="mb-2"></div>

    <Card>
      <Ul>
        <SubmitOrReset
          buttonName={'Submit'}
          buttonDisabled={purchasing && purchasing.orderNumber && items.length > 0 ? false : true}
          formSubmit={handleSubmit}
          formReset={goBack}
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