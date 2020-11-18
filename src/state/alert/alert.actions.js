import { AlertActionTypes } from './alert.types';

export const setAlertMessage = (payload) => ({
  type: AlertActionTypes.SET_ALERT_MESSAGE,
  payload
})

export const clearAlertMessage = () => ({
  type: AlertActionTypes.CLEAR_ALERT_MESSAGE
})