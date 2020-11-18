import React from 'react';

// components
import { Li, Button } from '../tag/tag.component';

const AddressOptions = ({
  handleRadioSubmit,
  handleRadioOnChange,
  byId,
  setAction
}) => {

  return <>
    <div onChange={handleRadioOnChange}>
      <Li>
        <div className="row">
          <div className="col-9 align-self-center">
            <div className="form-check">
              <label className="form-check-label" htmlFor='billing'>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="shippingAddress" 
                  value='' 
                  defaultChecked={byId.shippingAddress === undefined || byId.shippingAddress === ''}
                />
                  <span className="font-weight-bold">{byId.fullname}</span>
                  <span>{`, ${byId.streetAddress1}, ${byId.city}, ${byId.state}, ${byId.phone} (same as Billing Address)`}</span>
              </label>
            </div>
          </div>
        </div>
      </Li>
      {
        byId.shippingInfo.length > 0 && byId.shippingInfo.map((address, index) =>
          <Li key={index}>
            <div className="row">
              <div className="col-9 align-self-center">
                <div key={index} className="form-check">
                  <label className="form-check-label" htmlFor={address._id}>
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="shippingAddress"
                      value={address._id}
                      defaultChecked={byId.shippingAddress === address._id}
                    />
                      <span className="font-weight-bold">{address.fullname}</span>
                      <span>{`, ${address.streetAddress1}, ${address.city}, ${address.state}, ${address.phone}`}</span>
                  </label>
                </div>
              </div>
              <div className="col-3 text-right">
                <a 
                  href="/" 
                  className="a-link-cs"
                  onClick={e => {
                    e.preventDefault();
                    setAction(`edit/${address._id}`)
                  }}
                >
                  Edit
                </a>
                {
                  byId.shippingAddress !== address._id && <>
                    <span>{' | '}</span>
                    <a 
                      href="/" 
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault();
                        setAction(`remove/${address._id}`)
                      }}
                    >
                      Remove
                    </a>
                  </>
                }
              </div>
            </div>
          </Li>
        )
      }

      <Li>
        <div className="row my-3">
          <div className="col">
            <Button 
              onClick={e => {
                e.preventDefault()
                handleRadioSubmit()
              }}
            >
              Use This Address
            </Button>
          </div>
        </div>
      </Li>
      
      <Li>
        <div className="row">
          <div className="col">
            <a
              href="/"
              className="a-link-cs"
              onClick={e => {
                e.preventDefault();
                setAction('add')
              }}
            >
              ( + ) Add a New Address
            </a>
          </div>  
        </div>
      </Li>
    </div>
  </>
}

export default AddressOptions;