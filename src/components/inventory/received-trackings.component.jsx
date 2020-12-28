import React, { useState, useEffect } from 'react';

// dependencies
import moment from 'moment'
// components
import ReceivedTrackingsForm from './received-trackings-form.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import { integerMask } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
import { patchReq } from '../../state/api/api.requests'
import { selectCheckingItems } from '../../state/inventory/inventory.selectors'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const pathname = '/items'
const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS
const component = 'received-trackings'

const ReceivedTrackings = ({
  receivedTrackings,
  checkingItems,
  patchReq,
  alertMessage,
  setChecked
}) => {

  const [checking, setChecking] = useState(null)
  const [idx, setIdx] = useState(null)
  const [success, setSuccess] = useState(false)

  // const formSubmit = () => {
  //   const id = receivedTrackings.find(el => el.tracking === checking.tracking)[0]._id
  //   const obj = { ...checkingItems }

  //   patchReq(pathname + `/${id}`, fetchSuccess, obj, setSuccess, component)
  // }

  useEffect(() => {
    if (success) setChecked(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }

    {
      checking
      ? <>
        <div className="row mb-2">
          <div className="col">
            <div className="table-responsive-sm">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tracking</th>
                    <th scope="col">Item Description</th>
                    <th scope="col">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    checkingItems.length > 0 
                    ? 
                    checkingItems.map((item, index) => 
                      <tr 
                        key={index} 
                        className="table-row-cs"
                        onClick={e => {
                          e.preventDefault()
                          setIdx(index)
                        }} 
                      >
                        <th scope="row">{checking.tracking}</th>
                        <td>{item.desc}</td>
                        <td>{integerMask(item.qty.toString())}</td>
                      </tr>
                    )
                    : <>
                      <tr className="table-row-cs">
                        <td colSpan="3">No item checked.</td>
                      </tr>
                    </>
                  }
                  <tr className="table-row-cs">
                    <td colSpan="3">
                      <a
                        href="/"
                        className="a-link-cs"
                        onClick={e => {
                          e.preventDefault()
                          setIdx('add')
                        }}
                      >
                        Add Items
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {
          idx && <ReceivedTrackingsForm index={idx} />
        }
      </>
      : <>
        <div className="row mb-2">
          <div className="col">
            <div className="table-responsive-sm">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tracking#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Received Date</th>
                    <th scope="col">Processed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    receivedTrackings.length > 0 
                    ? 
                    receivedTrackings.map(receiving => 
                      <tr 
                        key={receiving._id} 
                        className="table-row-cs"
                        onClick={e => {
                          e.preventDefault()
                          setChecking(!checking)
                        }} 
                      >
                        <th scope="row">{receiving.tracking}</th>
                        <td><span className={`${receiving.status === 'received' ? 'text-primary' : 'text-success'}`}>{receiving.status}</span></td>
                        <td>{moment(receiving.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
                        <td>{receiving.procDate ? moment(receiving.procDate).format('MMM Do YYYY, h:mm:ss a') : 'not processed'}</td>
                      </tr>
                    )
                    : <>
                      <tr className="table-row-cs">
                        <td colSpan="3">No received packages in the inventory.</td>
                      </tr>
                    </>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  checkingItems: selectCheckingItems,
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTrackings);