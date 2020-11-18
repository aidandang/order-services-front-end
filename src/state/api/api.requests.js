// dependencies
import axios from 'axios';
// firebase
import { auth } from '../../firebase/firebase.utils';
// redux
import { batch } from 'react-redux';
import { IsFetchingActionTypes } from '../is-fetching/is-fetching.types';
import { AlertActionTypes } from '../alert/alert.types';

import { BASE_API_URL } from './base-api-url';

const handleErrorMesg = (err, component, request) => {
  const payload = {}

  if (err.response) { 
    payload.message = err.response.data.message 
  } else {
    payload.message = 'Error: Could not connect to the server.'
  }

  payload.component = component;
  payload.request = request;
  
  payload.color = 'danger';
  return payload
}

// GET request.
export const getReq = (
  pathname,
  fetchSuccess,
  queryStr,
  setSuccess,
  component
) => dispatch => {
  if (queryStr) pathname = pathname + queryStr;
  dispatch({ type: IsFetchingActionTypes.FETCH_START })
  auth.currentUser.getIdToken()
    .then(token => {
      axios
        .create({ headers: { Authorization: `Bearer ${token}` } })
        .get(BASE_API_URL + pathname)
        .then(res => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ type: fetchSuccess, payload: res.data })
          })
          if (setSuccess) setSuccess(true);
        })
        .catch(err => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ 
              type: AlertActionTypes.SET_ALERT_MESSAGE, 
              payload: handleErrorMesg(err, component, 'get') 
            })  
          })
          if (setSuccess) setSuccess(false)
        });
    })
    .catch(err => console.log(err));
}

// POST request.
export const postReq = (
  pathname,
  fetchSuccess,
  reqBody,
  setSuccess,
  component
) => dispatch => {
  dispatch({ type: IsFetchingActionTypes.FETCH_START })
  auth.currentUser.getIdToken()
    .then(token => {
      axios
        .create({ headers: { Authorization: `Bearer ${token}` } })
        .post(BASE_API_URL + pathname, reqBody)
        .then(res => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ type: fetchSuccess, payload: res.data })
          })
          if (setSuccess) setSuccess(true);
        })
        .catch(err => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ 
              type: AlertActionTypes.SET_ALERT_MESSAGE, 
              payload: handleErrorMesg(err, component, 'post') 
            })  
          })
        });
    })
    .catch(err => console.log(err));
}

// PATCH request.
export const patchReq = (
  pathname,
  fetchSuccess,
  reqBody,
  setSuccess,
  component
) => dispatch => {
  dispatch({ type: IsFetchingActionTypes.FETCH_START })
  auth.currentUser.getIdToken()
    .then(token => {
      axios
        .create({ headers: { Authorization: `Bearer ${token}` } })
        .patch(BASE_API_URL + pathname, reqBody)
        .then(res => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ type: fetchSuccess, payload: res.data })
          })
          if (setSuccess) setSuccess(true);
        })
        .catch(err => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ 
              type: AlertActionTypes.SET_ALERT_MESSAGE, 
              payload: handleErrorMesg(err, component, 'patch') 
            })  
          })
        });
    })
    .catch(err => console.log(err));
}

// DELETE request.
export const deleteReq = (
  pathname,
  fetchSuccess,
  setSuccess,
  component
) => dispatch => {
  console.log(component)
  dispatch({ type: IsFetchingActionTypes.FETCH_START })
  auth.currentUser.getIdToken()
    .then(token => {
      axios
        .create({ headers: { Authorization: `Bearer ${token}` } })
        .delete(BASE_API_URL + pathname)
        .then(res => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ type: fetchSuccess, payload: res.data })
          })
          if (setSuccess) setSuccess(true);
        })
        .catch(err => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ 
              type: AlertActionTypes.SET_ALERT_MESSAGE, 
              payload: handleErrorMesg(err, component, 'delete') 
            })  
          })
        });
    })
    .catch(err => console.log(err));
}