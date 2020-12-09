import { ConsigneeActionTypes } from './consignee.types';

const INITIAL_STATE = {
  data: {}
}

const consigneeReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case ConsigneeActionTypes.CONSIGNEE_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload } 
      }
    default: 
      return state;
  }
}

export default consigneeReducer;