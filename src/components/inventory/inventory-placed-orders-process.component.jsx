import React, { useState, useEffect } from 'react'

// components
import { Card, Ul, Li } from '../tag/tag.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { patchReq } from '../../state/api/api.requests'
import { ItemActionTypes } from '../../state/item/item.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'inventory-place-orders-process'

const InventoryPlacedOrdersProcess = ({
  process,
  setProcess,
  alertMessage,
  patchReq
}) => {

  const [success, setSuccess] = useState(false)

  // close the component
  const handleClosingComponent = () => {
    setProcess(null)
  }

  const formSubmit = () => {
    const pathname = `/items/${process}`
    const fetchSuccess = ItemActionTypes.ITEM_FETCH_SUCCESS
    const reqBody = {
      status: 'received'
    }

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }

  const formReset = () => {
    setProcess(null)
  }

  useEffect(() => {
    if (success) setProcess(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    {
      alertMessage && alertMessage.component === component && <AlertMesg />
    }

    <Card 
      width="col" 
      title={'Process Item'}
      action={{
        name: 'Close',
        handleAction: handleClosingComponent
      }}
    >
      <Ul>
        <Li>
          <span>Do you want to process this item?</span>
        </Li>
        <SubmitOrReset
          buttonName={'Submit'}
          buttonDisabled={false}
          formSubmit={formSubmit}
          formReset={formReset}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPlacedOrdersProcess)