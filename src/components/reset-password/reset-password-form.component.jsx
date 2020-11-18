import React from 'react';

// components
import Button from '../button/button.component';

// ui settings
import './reset-password-form.styles.css';
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const ResetPasswordForm = ({
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled 
}) => {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-7">
          {/* The Card */}
          <div className="card mt-3">
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                <div className="col">
                    <div className="form-group">
                      <label htmlFor="password">New Password (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={formData.password}
                        onChange={onInputChange}
                      />
                      {errors.password.length > 0 ? <p className="mt-2 text-danger">{errors.password}</p> : null}
                    </div>
                  </div> 
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="passwordConfirm">New Password Confirm (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="passwordConfirm" 
                        value={formData.passwordConfirm}
                        onChange={onInputChange}
                      />
                      {/* fixed bug of passwordConfirm matched with password but still show */}
                      {(errors.passwordConfirm.length > 0) && (formData.passwordConfirm !== formData.password) ? <p className="mt-2 text-danger">{errors.passwordConfirm}</p> : null}
                    </div>
                  </div> 
                </div>
              </li>
              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="form-group">
                      <Button buttonDisabled={buttonDisabled}>
                        Submit
                      </Button>
                    </div>
                  </div> 
                </div>
              </li>
            </ul>
          </div>
          {/* End of the Card */}
        </div>
      </div>
    </form>
  </>
}

export default ResetPasswordForm;
