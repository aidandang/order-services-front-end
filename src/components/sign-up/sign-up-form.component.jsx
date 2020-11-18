import React from 'react';

// components
import { Button } from '../tag/tag.component';
// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const SignUpForm = ({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled 
}) => {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card mt-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">Sign Up</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="displayName">Display Name (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="displayName" 
                        value={formData.displayName}
                        onChange={onInputChange} 
                      />
                      {errors.displayName.length > 0 ? <p className="mt-2 text-danger">{errors.displayName}</p> : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Email (*)</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={formData.email}
                        onChange={onInputChange} 
                      />
                      {errors.email.length > 0 ? <p className="mt-2 text-danger">{errors.email}</p> : null}
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="password">Password (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        value={formData.password}
                        onChange={onInputChange}
                      />
                      {errors.password.length > 0 ? <p className="mt-2 text-danger">{errors.password}</p> : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="passwordConfirm">Confirm Password (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="passwordConfirm" 
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
                      <Button 
                        type="submit" 
                        disabled={buttonDisabled}
                      >
                        Sign up
                      </Button>
                    </div>
                  </div>
                </div>
              </li>  
            </ul>
          </div>
        </div>
      </div>
    </form>
  </>
}

export default SignUpForm;