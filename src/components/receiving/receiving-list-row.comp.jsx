import React from 'react';

// dependencies
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
// constants
const textColors = {
  'received': 'text-primary',
  'checked': 'text-success',
  'processed': 'text-muted'
}

const ReceivingListRow = ({
  receiving
}) => {

  const location = useLocation();
  const history = useHistory();

  const processPath = location.pathname.split('/receiving')[0] + '/inventory/received-trackings/'

  const handleOnClick = (e, receiving) => {
    e.preventDefault();

    if (receiving.status !== 'processed') history.push(processPath + receiving._id)
  }

  return <>
    <tr 
      className={receiving.status === 'processed' ? "table-row-no-link-cs" : "table-row-cs"} 
      onClick={e => handleOnClick(e, receiving)}
    >
      <th scope="row">{receiving.tracking}</th>
      <td><span className={textColors[receiving.status]}>{receiving.status}</span></td>
      <td>{moment(receiving.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
      <td>{receiving.chkdDate ? moment(receiving.chkdDate).format('MMM Do YYYY, h:mm:ss a') : '-'}</td>
      <td>{receiving.procDate ? moment(receiving.procDate).format('MMM Do YYYY, h:mm:ss a') : '-'}</td>
    </tr>
  </>
}

export default ReceivingListRow;