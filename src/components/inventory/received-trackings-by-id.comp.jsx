import React from 'react'

// dependecies
import { useParams } from 'react-router-dom'
// components
import ReceivedTrackingsCheck from './received-trackings-check.comp'
import ReceivedTrackingsProcess from './received-trackings-process.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const ReceivedTrackingsById = ({
  data
}) => {

  const params = useParams()

  const { trackings, orders } = data
  const { trackingId } = params

  return <>
    {
      trackings && trackings.find(el => el._id === trackingId) && <>
        {
          trackings.find(el => el._id === trackingId).status === 'received' && 
          <ReceivedTrackingsCheck tracking={trackings.find(el => el._id === trackingId)} />
        }
        {
          trackings.find(el => el._id === trackingId).status === 'checked' &&
          <ReceivedTrackingsProcess tracking={trackings.find(el => el._id === trackingId)} orders={orders} />
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(ReceivedTrackingsById)