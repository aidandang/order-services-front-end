import React, { useState, useEffect } from 'react';

// dependencies
import moment from 'moment';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq, patchReq } from '../../state/api/api.requests';
import { ReceivingActionTypes } from '../../state/receiving/receiving.types';
import { selectReceivingData } from '../../state/receiving/receiving.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const ScannedTrackings = ({
  data,
  getReq,
  patchReq,
  alertMessage
}) => {

  const [success, setSuccess] = useState(false);
  const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS;
  const { allIds } = data;

  const handleProcessing = (id) => {
    const obj = {
      status: 'processed'
    }

    patchReq(`/receiving/${id}`, fetchSuccess, obj, setSuccess, 'scanned-trackings');
  }

  useEffect(() => {
    getReq('/receiving', fetchSuccess, '?status=scanned', null, 'scanned-trackings');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>
  
    { alertMessage && alertMessage.component === 'scanned-trackings' && <AlertMesg /> }

    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr className="table">
                <th scope="col">Tracking#</th>
                <th scope="col">Received Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                allIds && allIds.length > 0 
                ? 
                allIds.map(receiving => 
                  <tr key={receiving._id} className="table-row-cs">
                    <th scope="row">{receiving.tracking}</th>
                    <td>{moment(receiving.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
                    <td>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a 
                        href="/" 
                        className="a-link-cs" 
                        onClick={e => {
                          e.preventDefault();
                          handleProcessing(receiving._id)
                        }}
                      >
                        Processed
                      </a>
                    </td>
                  </tr>
                )
                : <>
                  <tr className="table-row-cs">
                    <td colSpan="3">All trackings have been processed.</td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of customer table --> */}
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectReceivingData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ScannedTrackings);