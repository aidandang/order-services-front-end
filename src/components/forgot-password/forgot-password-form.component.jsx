import React from 'react';

// components
import Button from '../button/button.component';

// ui settings
import './forgot-password-form.styles.css';
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const ForgotPasswordForm = ({ 
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
                      <label htmlFor="email">Email (*)</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={formData.email}
                        onChange={onInputChange} 
                      />
                      {errors.email.length > 0 ? <p className="mt-2 text-danger">{errors.email}</p> : null}
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

export default ForgotPasswordForm;