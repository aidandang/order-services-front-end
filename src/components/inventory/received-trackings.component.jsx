import React from 'react';

// dependencies
import moment from 'moment'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const ReceivedTrackings = ({
  data
}) => {

  const location = useLocation()
  const history = useHistory()

  // get previous pathname for going back
  const prevPath = location.pathname.split('/received-trackings')[0]

  const { trackings } = data

  const handleChecking = (tracking, id) => {
    history.push(`${location.pathname}/check`, { tracking, id })
  }

  return <>

    {
      !trackings && <Redirect to={prevPath} />
    }

    <div className="row mb-2">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tracking#</th>
                <th scope="col">Status</th>
                <th scope="col">Received Date</th>
                <th scope="col">Checked Date</th>
              </tr>
            </thead>
            <tbody>
              {
                trackings && trackings.length > 0 
                ? 
                trackings.map(receiving => 
                  <tr 
                    key={receiving._id} 
                    className="table-row-cs"
                    onClick={e => {
                      e.preventDefault()
                      handleChecking(receiving.tracking, receiving._id)
                    }} 
                  >
                    <th scope="row">{receiving.tracking}</th>
                    <td><span className={`${receiving.status === 'received' ? 'text-primary' : 'text-success'}`}>{receiving.status}</span></td>
                    <td>{moment(receiving.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
                    <td>{receiving.chkdDate ? moment(receiving.chkdDate).format('MMM Do YYYY, h:mm:ss a') : 'not checked'}</td>
                  </tr>
                )
                : <>
                  <tr className="table-row-cs">
                    <td colSpan="4">No received packages in the inventory.</td>
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

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(ReceivedTrackings);