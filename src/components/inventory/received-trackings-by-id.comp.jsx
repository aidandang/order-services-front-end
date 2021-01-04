import React from 'react'

// dependecies
import { useParams } from 'react-router-dom'
// components
import ReceivedCheck from './received-check.comp'
import ReceivedTrackingsProcess from './received-trackings-process.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'

const ReceivedTrackingsById = ({
  data
}) => {

  const params = useParams()

  const { trackings, items } = data
  const { trackingId } = params

  return <>
    {
      trackings && trackings.find(el => el._id === trackingId) && <>
        {
          trackings.find(el => el._id === trackingId).status === 'received' && 
          <ReceivedCheck />
        }
        {
          trackings.find(el => el._id === trackingId).status === 'checked' &&
          <ReceivedTrackingsProcess tracking={trackings.find(el => el._id === trackingId)} items={items} />
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData
})

export default connect(mapStateToProps)(ReceivedTrackingsById)