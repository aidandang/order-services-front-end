import React from 'react'

// components
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { Li } from '../tag/tag.comp'

const AddressOptions = ({
  handleRadioSubmit,
  handleRadioOnChange,
  byId,
  setAction,
  radio
}) => {

  return <>
    <div onChange={handleRadioOnChange}>
      <Li>
        <div className="row">
          <div className="col align-self-center">
            <div className="form-check">
              <label className="form-check-label" htmlFor="shippingAddress">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="shippingAddress" 
                  value='' 
                  defaultChecked={byId.shippingAddress === undefined || byId.shippingAddress === ''}
                />
                  <span className="font-weight-bold">{byId.fullname}</span>
                  <span>{`, ${byId.streetAddress1}, ${byId.city}, ${byId.state}, ${byId.country === 'United States' ? byId.zipcode + ', ' : ''} ${byId.phone} (same as Billing Address)`}</span>
              </label>
            </div>
          </div>
        </div>
      </Li>
      {
        byId.shippingInfo.length > 0 && byId.shippingInfo.map((address, index) =>
          <Li key={index}>
            <div className="row">
              <div className="col align-self-center">
                <div key={index} className="form-check">
                  <label className="form-check-label" htmlFor="shippingAddress">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="shippingAddress"
                      value={address._id}
                      defaultChecked={byId.shippingAddress === address._id}
                    />
                    <span className="font-weight-bold">{address.fullname}</span>
                    <span>{`, ${address.streetAddress1}, ${address.city}, ${address.state}, ${address.country === 'United States' ? address.zipcode + ', ' : ''} ${address.phone}`}</span><br />
                    {
                      address._id === radio &&
                      <div className="pt-1">
                        <a 
                          href="/" 
                          className="a-link-cs"
                          onClick={e => {
                            e.preventDefault()
                            setAction('edit')
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
                                e.preventDefault()
                                setAction('remove')
                              }}
                            >
                              Remove
                            </a>
                          </>
                        }
                      </div>
                    }
                  </label>
                </div>
              </div>
            </div>
          </Li>
        )
      }
      <SubmitOrReset
        buttonName={'Use This Address'}
        buttonDisabled={byId.shippingInfo.length > 0 ? false : true}
        formSubmit={handleRadioSubmit}
      />
    </div>
  </>
}

export default AddressOptions