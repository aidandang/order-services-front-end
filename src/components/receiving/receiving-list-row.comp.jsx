import React from 'react'

// dependencies
import moment from 'moment'
// constants
const textColors = {
  'received': 'text-primary',
  'processed': 'text-muted',
  'returned': 'text-muted'
}

const ReceivingListRow = ({
  receiving,
  setActive
}) => {

  const handleOnClick = (e) => {
    e.preventDefault()
    setActive({
      comp: 'receiving-info',
      id: receiving._id
    })
  }

  return <>
    <tr 
      className={receiving.status === 'processed' ? "table-row-no-link-cs" : "table-row-cs"} 
      onClick={e => handleOnClick(e, receiving)}
    >
      <th scope="row">{receiving.tracking}</th>
      <td><span className={textColors[receiving.status]}>{receiving.status}</span></td>
      <td>{moment(receiving.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
      <td>{receiving.processedDate ? moment(receiving.processedDate).format('MMM Do YYYY, h:mm:ss a') : '-'}</td>
      <td>{receiving.returnedDate ? moment(receiving.returnedDate).format('MMM Do YYYY, h:mm:ss a') : '-'}</td>
    </tr>
  </>
}

export default ReceivingListRow