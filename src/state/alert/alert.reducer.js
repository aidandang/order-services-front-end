import { AlertActionTypes } from './alert.types';

const INITIAL_STATE = {
  alertMessage: null
}

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: {
          ...state.alertMessage,
          message: action.payload.message,
          color: action.payload.color,
          component: action.payload.component,
          request: action.payload.request
        }
      }
    case AlertActionTypes.CLEAR_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: null
      }
    default:
      return state;
  }
}

export default alertReducer;