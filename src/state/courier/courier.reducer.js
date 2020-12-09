import { CourierActionTypes } from './courier.types';

const INITIAL_STATE = {
  data: {}
}

const courierReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case CourierActionTypes.COURIER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload } 
      }
    default: 
      return state;
  }
}

export default courierReducer;