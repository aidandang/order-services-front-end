import React, { useEffect, useState } from 'react'

// components
import { Card, Ul, Li, SelectInput } from '../tag/tag.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectReceivingData } from '../../state/receiving/receiving.selectors'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
import { getReq } from '../../state/api/api.requests'
import { updateItemInOrder } from '../../state/order/order.actions'
// constants
const component = 'purchasing-item-receiving'

const PurchasingItemReceiving = ({
  order, // ownProp
  itemIndex, // ownProp
  closeItemEdit, // ownProp
  data,
  getReq,
  updateItemInOrder
}) => {

  const recvObj = {}
  if (data.allIds) {
    let i = 0;
    for (i = 0; i < data.allIds.length; i++) {
      recvObj[data.allIds[i]._id] = data.allIds[i] 
    }
  }

  const [recvId, setRecvId] = useState('')

  const onInputChange = e => {
    e.preventDefault();
    const id = e.target.value

    if (recvObj[id]) {
      setRecvId(recvObj[id]._id)
    } else {
      setRecvId('')
    }
  }

  const handleReceiving = () => {
    const editItems = order.items.map((item, index) => {
      if (index !== itemIndex) {
        return item
      }
      return { 
        ...item,
        recvTracking: recvId.length > 0 ? recvObj[recvId].tracking : ''
      }
    })

    updateItemInOrder({ ...order, items: editItems })

    closeItemEdit()
  }

  useEffect(() => {
    const pathname = '/receiving'
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS
    const queryStr = '?status=received'

    getReq(pathname, fetchSuccess, queryStr, null, component)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Card>
      <Ul>
        <Li>
          <SelectInput
            label="Tracking Number"
            name="recvId"
            smallText="Scan or select a tracking number."
            defaultValue=""
            defaultText="..."
            value={recvId}
            onChange={onInputChange}
            data={data.allIds ? data.allIds : []}
            valueKey={'_id'}
            textKey={'tracking'}
          />
        </Li>
        <SubmitOrReset
          buttonName={'Save'}
          buttonDisabled={false}
          formSubmit={handleReceiving}
        />
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectReceivingData
})
const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  ),
  updateItemInOrder: order => dispatch(updateItemInOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasingItemReceiving)