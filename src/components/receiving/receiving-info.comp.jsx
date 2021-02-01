import React, { useState } from 'react'

// dependencies
import moment from 'moment'
// components
import withReceivingData from './withReceivingData'
import { TableFrame, CompFrame } from '../tag/tag.comp'
import ReceivingProcess from './receiving-process.comp'
// constants
const textColors = {
  'received': 'text-primary',
  'processed': 'text-muted'
}

const ReceivingInfo = ({
  data
}) => {

  const { byId } = data
  const [isProcessing, setIsProcessing] = useState(false)

  const closeProcessingComp = () => {
    setIsProcessing(false)
  }

  return <>
    <TableFrame>
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
          <tr>
            <th scope="row">{byId.tracking}</th>
            <td><span className={textColors[byId.status]}>{byId.status}</span></td>
            <td>{moment(byId.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
            <td>{byId.procDate ? moment(byId.procDate).format('MMM Do YYYY, h:mm:ss a') : '-'}</td>
          </tr>
          <tr className="table-row-no-link-cs">
            <td colSpan="4">
              {
                isProcessing  
                ? <>
                  <CompFrame closeComp={closeProcessingComp}>
                    <ReceivingProcess />
                  </CompFrame>
                </>
                : <a 
                  href="/"
                  className="a-link-cs"
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setIsProcessing(true)
                  }}
                >
                  Process this tracking
                </a>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </TableFrame>
  </>
}

export default withReceivingData(ReceivingInfo)