import React from 'react'

const CustomerListRow = ({
  customer,
  setActive
}) => {

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    
    setActive({
      comp: 'customer-info',
      id: customer._id
    })
  }

  return <>
    <tr 
      className="table-row-cs" 
      onClick={e => handleOnClick(e, customer)}
    >
      <th scope="row">{customer.customerNumber}</th>
      <td>{customer.nickname}</td>
      <td>{customer.fullname}</td>
      <td>{`${customer.streetAddress1}, ${customer.city}, ${customer.state}`}{customer.streetAddress2 !== "" && `, (${customer.streetAddress2})`}</td>
      <td className="text-right">{customer.phone}</td>
    </tr>
  </>
}

export default CustomerListRow