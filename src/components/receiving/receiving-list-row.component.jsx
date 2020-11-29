import React from 'react';

// dependencies
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';

const ReceivingListRow = ({
  receiving
}) => {

  const location = useLocation();
  const history = useHistory();

  const handleOnClick = (e, receiving) => {
    e.preventDefault();
    
    history.push(`${location.pathname}/${receiving._id}`)
  }

  return <>
    <tr 
      className="table-row-cs" 
      onClick={e => handleOnClick(e, receiving)}
    >
      <th scope="row">{receiving.tracking}</th>
      <td>{moment(receiving.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
      <td>{receiving.note}</td>
    </tr>
  </>
}

export default ReceivingListRow;