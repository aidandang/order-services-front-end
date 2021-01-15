import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory, useParams } from 'react-router-dom'
// components
import { Card, Ul } from '../tag/tag.component' 
import { integerMask } from '../utils/helpers'
import ReceivedTrackingsMatch from './received-trackings-match.comp'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { patchReq } from '../../state/api/api.requests'
import { InventoryActionTypes } from '../../state/inventory/inventory.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'received-trackings-process'
const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS
 
const ReceivedTrackingsProcess = ({
  data,
  orders,
  alertMessage,
  patchReq
}) => {

  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const tracking = data.trackings.find(el => el._id === params.trackingId)

  const [match, setMatch] = useState(null)
  const [success, setSuccess] = useState(false)

  // counted if each item has been matched with an ordered item
  var count = 0

  const getItemDetails = (itemRef, orderRef) => {
    // function has been called twice per each item matched
    // so .5 x 2 = 1
    count += 0.5

    const order = orders.find(el => el._id === orderRef)
    const item = order.items.find(el => el._id === itemRef)

    const desc = `${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`
    
    return {
      desc: desc,
      qty: integerMask(item.qty.toString())
    }
  }

  const formSubmit = () => {
    // set time received synced for both 
    const timeStamp = Date.now()

    const obj = {
      receiving: {
        status: 'processed',
        procDate: timeStamp,
        items: [...tracking.items]
      },
      items: tracking.items.map(el => {
        return {
          _id: el.itemRef,
          receivingNumber: tracking.tracking,
          status: 'received',
          recvDate: timeStamp
        } 
      })
    }

    patchReq(`/inventory/receiving/${tracking._id}`, fetchSuccess, obj, setSuccess, component)
  }

  useEffect(() => {
    // go back to Received Trackings
    if (success) history.push(location.pathname.split(`/${params.trackingId}`)[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }

    {
      match !== null 
      ? <ReceivedTrackingsMatch match={match} setMatch={setMatch} />
      : <>
        <div className="row mb-2">
          <div className="col">
            <div className="table-responsive-sm">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tracking</th>
                    <th scope="col">Item Description</th>
                    <th scope="col" className="text-right">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col" colSpan="3">
                      {tracking.tracking}
                    </th>
                  </tr>
                </tbody>
                {
                  tracking && tracking.recvItems.map(item => 
                    <tbody key={item._id} >
                      <tr 
                        className="table-row-cs"
                        onClick={e => {
                          e.preventDefault()
                          setMatch({
                            tracking: tracking.tracking,
                            item: item
                          })
                        }} 
                      >
                        <td></td>
                        <td>{item.desc}</td>
                        <td className="text-right">{integerMask(item.qty.toString())}</td>
                      </tr>
                      {
                        item.itemRef &&
                        <tr>
                          <td>{item.orderRef}</td>
                          <td>{getItemDetails(item.itemRef, item.orderRef).desc}</td>
                          <td className="text-right">{getItemDetails(item.itemRef, item.orderRef).qty}</td>
                        </tr>
                      }
                    </tbody>
                  )
                }
              </table>
            </div>
          </div>
        </div>
        <Card width="col" title="Process Received Tracking">
          <Ul>
            <SubmitOrReset
              buttonName="Process"
              buttonDisabled={tracking.recvItems.length === count ? false : true}
              formSubmit={formSubmit}
            />
          </Ul>
        </Card>
      </>
    }
  </>
}

const mapsStateToProps = createStructuredSelector({
  data: selectInventoryData,
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapsStateToProps, mapDispatchToProps)(ReceivedTrackingsProcess)