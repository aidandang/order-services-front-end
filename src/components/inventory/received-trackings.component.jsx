import React, { useState } from 'react';

// dependencies
import moment from 'moment';
// components
import AlertMesg from '../alert-mesg/alert-mesg.component';
import OrderedList from './ordered-list.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { ReceivingActionTypes } from '../../state/receiving/receiving.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const ReceivedTrackings = ({
  receivedTrackings,
  setSuccess,
  patchReq,
  alertMessage
}) => {

  const [processing, setProcessing] = useState(false)

  const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS;

  const handleProcessing = (id) => {
    const obj = {
      status: 'processed'
    }

    patchReq(`/receiving/${id}`, fetchSuccess, obj, setSuccess, 'received-trackings');
  }

  return <>
  
    { alertMessage && alertMessage.component === 'received-trackings' && <AlertMesg /> }

    {
      processing 
      ? <>
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
                          setProcessing(true)
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
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTrackings);