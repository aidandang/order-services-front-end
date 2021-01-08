import React from 'react';

import uuid from 'react-uuid';
import './tag.style.css';

export const Card = ({ 
  children, 
  width, 
  title, 
  action 
}) => {
  return <>
    <div className="row">
      <div className={width ? width : 'col'}>
        <div className="card mb-4">
          <div className="card-header card-header-cs">
            <div className="row">
              <div className="col text-uppercase h6 mb-0">{title}</div>
              {
                action &&
                <div className="col text-right">
                  <a
                    href="/"
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault()
                      action.handleAction()
                    }}
                  >
                    {action.name}
                  </a>
                </div>
              }
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  </>
}

export const WhiteCard = ({ 
  children, 
  width, 
  title, 
  action 
}) => {
  return <>
    <div className="row">
      <div className={width ? width : 'col'}>
        <div className="card mb-4">
          {
            title &&
            <div className="card-header bg-light">
              <div className="row">
                <div className="col text-uppercase">{title}</div>
                {
                  action &&
                  <div className="col text-right">
                    <a
                      href="/"
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault()
                        action.handleAction()
                      }}
                    >
                      {action.name}
                    </a>
                  </div>
                }
              </div>
            </div>
          }
          {children}
        </div>
      </div>
    </div>
  </>
}

export const Li = ({ children }) => {
  return (
    <li className="list-group-item bg-item-list-cs list-group-item-action">
      {children}
    </li>
  )
}

export const Ul = ({ children }) => {
  return (
    <ul className="list-group list-group-flush">
      {children}
    </ul>
  )
}

export const Button = ({ children, isGoogleSignIn, disabled, ...otherProps }) => {
  return (
    <button 
      className={`btn ${disabled ? 'btn-secondary' : 'btn-primary'} btn-custom ${isGoogleSignIn && 'btn-custom-google'}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
)}

export const SelectInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  defaultValue,
  defaultText,
  data,
  valueKey,
  textKey,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size ? size : 'col'}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <select
            name={name} 
            className="custom-select text-capitalize"
            {...otherProps}
          >
            <option value={defaultValue ? defaultValue : ""}>{defaultText ? defaultText : "Select..."}</option>
            {data && data.map(item => <option key={uuid()} value={item[valueKey]}>{item[textKey]}</option>)}
          </select>
          <small>{smallText}</small>
          {errors && errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}

export const TextInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size ? size : 'col'}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            name={name} 
            type="text"
            className="form-control"
            {...otherProps}
          />
          <small>{smallText}</small>
          {errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}

export const DateInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size ? size : 'col'}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            className="form-control" 
            type="date"
            name={name} 
            {...otherProps} 
          />
          <small>{smallText}</small>
          {errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}

export const TextareaInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size ? size : 'col'}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <textarea
            name={name} 
            type="text"
            className="form-control"
            {...otherProps}
          />
          <small>{smallText}</small>
          {errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}

export const Badge = ({
  name
}) => {
  return <>
    <span class="badge badge-info badge-cs">{name}</span>
  </>
}

export const CloseTask = ({
  setCloseTask
}) => {
  return (
    <div className="row mb-2">
      <div className="col text-right">
        <div className="my-1">
          <a
            href="/"
            className="a-link-cs"
            onClick={e => {
              e.preventDefault();
              setCloseTask()
            }}
          >
            Close
          </a>
        </div>
      </div>  
    </div>
  )
}