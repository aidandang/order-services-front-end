import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory, useParams } from 'react-router-dom'
// components
import { Card, Ul, CompFrame } from '../tag/tag.comp' 
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

  const getItemDetails = (itemRef) => {
    count += 1

    const item = data.items.find(el => el._id === itemRef)
    const result = `Order#:${item.orderNumber}/Name:${item.product.name}/Color:${item.color.color}/Size:${item.size}/Qty:${integerMask(item.qty.toString())}`
  
    return result
  }

  const formSubmit = () => {
    // set time received synced for both 
    const timeStamp = Date.now()

    const obj = {
      receiving: {
        status: 'processed',
        procDate: timeStamp,
        recvItems: [ ...tracking.recvItems ]
      },
      items: tracking.recvItems.map(el => {
        return {
          _id: el.itemRef,
          receivingNumber: tracking.tracking,
          status: 'received',
          recvDate: timeStamp
        } 
      })
    }

    patchReq(`/inventory/receiving/process/${tracking._id}`, fetchSuccess, obj, setSuccess, component)
  }

  const closeComp = () => {
    setMatch(null)
  }

  useEffect(() => {
    // go back to Received Trackings
    if (success) history.push(location.pathname.split('/process')[0], 'reload')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
    { alertMessage && alertMessage.component === component && <AlertMesg /> }

    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tracking</th>
                <th scope="col">Item Description</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col">Matched</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col" colSpan="4">
                  {tracking.tracking}
                </th>
              </tr>
              {
                tracking && tracking.recvItems.map(item =>
                  <tr 
                    key={item._id}
                    className={match && match.item._id === item._id ? 'table-row-no-link-cs' : 'table-row-cs'}
                    onClick={e => {
                      e.preventDefault()
                      if (match === null) {
                        setMatch({
                          tracking: tracking.tracking,
                          item: item
                        })
                      }
                    }} 
                  >
                    {
                      match && match.item._id === item._id
                      ? <>
                        <td colSpan="4">
                          <CompFrame closeComp={closeComp}>
                            <ReceivedTrackingsMatch match={match} closeComp={closeComp} />
                          </CompFrame>
                        </td>
                      </>
                      : <>
                        <td></td>
                        <td>{item.desc}</td>
                        <td className="text-right">{integerMask(item.qty.toString())}</td>
                        <td>{item.itemRef ? `${getItemDetails(item.itemRef)}` : 'Not matched'}</td>
                      </>
                    }
                  </tr>
                )
              }
            </tbody>
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