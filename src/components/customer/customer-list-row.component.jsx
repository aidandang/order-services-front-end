import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';

const CustomerListRow = ({
  customer
}) => {

  const location = useLocation();
  const history = useHistory();

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    
    history.push(`${location.pathname}/${customer._id}`)
  }

  return <>
    <tr 
      className="table-row-cs" 
      onClick={e => handleOnClick(e, customer)}
    >
      <th scope="row">
        <span className="mr-2">{customer.account}</span>
        {customer.status === "na" && <a href="/" className="a-link-cs">A</a>}
      </th>
      <td>{customer.nickname}</td>
      <td>{customer.fullname}</td>
      <td>
        {`${customer.streetAddress1}, ${customer.city}, ${customer.state}`}{customer.streetAddress2 !== "" && `, (${customer.streetAddress2})`}
      </td>
      <td>{customer.phone}</td>
    </tr>
  </>
}

export default CustomerListRow;