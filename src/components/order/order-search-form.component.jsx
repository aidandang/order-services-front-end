import React from 'react';

// components
import { Li } from '../tag/tag.component';

const OrderSearchForm = ({ 
  formData, 
  formSubmit,  
  onInputChange
}) => {

  return <>
    <Li>
      <div className="row">
        <div className="col-12 py-3">
          <form className="form-inline" onSubmit={formSubmit}>
            <div className="form-group mr-3 mb-2">
              <label htmlFor="search" className="sr-only">Search</label>
              <input 
                type="text" 
                className="form-control" 
                name="search" 
                placeholder="Search"
                onChange={onInputChange}
                value={formData.search}
              />
            </div>
            <div className="dropdown">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a 
                className="btn btn-outline-primary btn-outline-cs dropdown-toggle mb-2" 
                href="/" 
                role="button" 
                id="dropdownMenuLink" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
              >
                Search By
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" name="orderNumber" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Order Number</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" name="createdAt" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Created At</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Li>
  </>
}

export default OrderSearchForm;