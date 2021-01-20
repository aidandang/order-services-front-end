import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory } from 'react-router-dom'
// components
import { Card, Ul, Li, TableFrame, CompFrame } from '../tag/tag.comp'
import Selling from './selling.comp'
import SellingItem from './selling-item.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import CustomerList from '../customer/customer-list.comp'
import CustomerAdd from '../customer/customer-add.comp'
import SellingTab from './selling-tab.comp'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData, selectOrderComp } from '../../state/order/order.selectors'
import { OrderActionTypes } from '../../state/order/order.types'
import { patchReq } from '../../state/api/api.requests'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { orderSetComp } from '../../state/order/order.actions'
// constants
const component = 'selling-update-submit'

const SellingUpdateSubmit = ({
  data,
  patchReq,
  alertMessage,
  comp,
  setComp
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

  const closeComp = () => {
    setComp('')
  }
  const goBack = () => {
    history.push(`${location.pathname.split('/selling-update')[0]}`)
  }

  useEffect(() => {
    if (success) goBack()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    { alertMessage && alertMessage.component === component && <AlertMesg /> }

    <Card width="col-12" title="Customer Information">
      <Ul>
        <Ul>
          {
            comp === '' && <>
              <Li>
                <SellingTab isReselect={selling && selling.customer ? true : false} />
              </Li>
              {
                selling && selling.customer && 
                <Selling selling={selling} />
              }
            </>
          }

          {
            comp === 'select-customer' &&
            <Li>
              <CompFrame closeComp={closeComp}>
              <CustomerList />
              </CompFrame>
            </Li>
            
          }

          {
            comp === 'customer-add' &&
            <Li>
              <CompFrame closeComp={closeComp}>
              <CustomerAdd isOrderCalled={true} />
              </CompFrame>
            </Li>
          }
        </Ul>
      </Ul>
    </Card>

    <TableFrame>
      <SellingItem />
    </TableFrame>

    <Card width="col-12" title="Update Selling Order">
      <Ul>
        <SubmitOrReset
          buttonName={'Submit'}
          buttonDisabled={selling && items.length > 0 ? false : true}
          formSubmit={handleSubmitButton}
          formReset={goBack}
          secondButtonName={'Cancel'}
        />
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData,
  alertMessage: selectAlertMessage,
  comp: selectOrderComp
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  setComp: comp => dispatch(orderSetComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellingUpdateSubmit)