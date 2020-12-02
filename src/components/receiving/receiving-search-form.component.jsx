import React, { useState } from 'react';

// components
import { Li, Button } from '../tag/tag.component'

const ReceivingSearchForm = ({
  formSubmit
}) => {

  const [filterBy, setFilterBy] = useState('tracking');

  const queryState = {
    tracking: "",
    status: "",
    recvDate: ""
  }
  const [query, setQuery] = useState(queryState);

  const handleFilterBy = e => {
    e.preventDefault();
    setFilterBy(e.target.name)
  }

  const onInputChange = e => {
    e.persist();
    setQuery(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  } 

  console.log(query.recvDate)

  return <>
    <Li>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 d-flex flex-row">
              {
                filterBy === 'tracking' &&
                <div className="form-group my-2 mr-3">
                  <label htmlFor="tracking" className="sr-only">Tracking</label>
                  <input 
                    type="text"
                    className="form-control" 
                    name="tracking" 
                    placeholder="Tracking Number"
                    onChange={onInputChange}
                    value={query.tracking}
                  />
                </div>
              }
              {
                filterBy === 'status' &&
                <div className="form-group my-2 mr-3">
                  <select
                    name="status" 
                    className="custom-select text-capitalize"
                    onChange={onInputChange}
                    value={query.status}
                  >
                    <option value='scanned'>scanned</option>
                    <option value='processed'>processed</option>
                  </select>
                </div>
              }
              {
                filterBy === 'recvDate' &&
                <div className="form-group my-2 mr-3">
                  <label htmlFor="recvDate" className="sr-only">Received Date</label>
                  <input
                    className="form-control" 
                    type="date"
                    name="recvDate"
                    onChange={onInputChange}
                    value={query.recvDate}
                  />
                </div>
              }
              <div className="dropdown my-2">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a 
                  className="btn btn-outline-primary btn-outline-cs dropdown-toggle" 
                  href="/" 
                  role="button" 
                  id="dropdownMenuLink" 
                  data-toggle="dropdown" 
                  aria-haspopup="true" 
                  aria-expanded="false"
                >
                  Filter By
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="" name="tracking" className="dropdown-item dropdown-item-cs" onClick={e => handleFilterBy(e)}>Tracking Number</a>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="" name="status" className="dropdown-item dropdown-item-cs" onClick={e => handleFilterBy(e)}>Status</a>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="" name="recvDate" className="dropdown-item dropdown-item-cs" onClick={e => handleFilterBy(e)}>Received Date</a>
                </div>
              </div>
              <div className="ml-3 my-2">
                <Button
                  onClick={e => {
                    e.preventDefault();
                    formSubmit(filterBy, query[filterBy])
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Li>
  </>
}

export default ReceivingSearchForm;