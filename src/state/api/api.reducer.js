import { ApiActionTypes } from './api.types';

const INITIAL_STATE = {
  data: {}
}

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ApiActionTypes.API_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      } 
    default:
      return state
  }
}

export default apiReducer;