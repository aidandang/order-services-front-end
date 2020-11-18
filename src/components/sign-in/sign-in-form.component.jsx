import React from 'react';

// dependencies
import { Link } from 'react-router-dom';
// firebase
import { signInWithGoogle } from '../../firebase/firebase.utils';
// components
import { Button } from '../tag/tag.component';
// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const SignInForm = ({ 
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
                <div className="col text-uppercase font-weight-bold align-self-center">Sign In</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
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
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <Link className="a-link-cs" to='/forgot-password'>Forgot Your Password?</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <span className="mr-3">
                        <Button 
                          type='submit'
                          disabled={buttonDisabled}
                        >
                          Sign in
                        </Button>
                      </span>
                      <span>
                        <Button  
                          onClick={e => {
                            e.preventDefault();
                            signInWithGoogle();
                          }}
                          isGoogleSignIn
                        >
                          <i className="fab fa-google text-light"></i><span className='mr-2'></span>Sign in with Google
                        </Button>
                      </span>
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

export default SignInForm;