import React from 'react';

import uuid from 'react-uuid';
import './tag.styles.css';

export const Container = ({
  children,
  goBack
}) => {

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row my-0 py-0">
          <div className="col mb-3 text-right">
            <a
              href="/"
              className={'symbol-link-cs'}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                if (goBack) goBack();
              }}
            >
              <i className="fas fa-times-circle"></i>
            </a>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export const Section = ({
  children,
  goRoot
}) => {

  return (
    <div className="card">
      <div className="card-body">
        <div className="row my-0 py-0">
          <div className="col mb-3 text-right">
            <a
              href="/"
              className="symbol-link-cs"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                if (goRoot) goRoot();
              }}
            >
              <i className="fas fa-times-circle"></i>
            </a>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export const Card = ({ children, width, title }) => {
  return (
    <div className="row">
      <div className={width ? width : 'col'}>
        <div className="card mb-4">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">{title}</div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
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
            <option value={defaultValue}>{defaultText}</option>
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