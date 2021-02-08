import React from 'react'

// components
import withReceivingData from './withReceivingData'
import ReceivingProcess from './receiving-process.comp'

const ReceivingInfo = ({
  setCloseTask,
  data
}) => {

  const { byId } = data

  return <>
    <ReceivingProcess byId={byId} setCloseTask={setCloseTask} />
  </>
}

export default withReceivingData(ReceivingInfo)