import { MerchantActionTypes } from './merchant.types';

const INITIAL_STATE = {
  data: {}
}

const merchantReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case MerchantActionTypes.MERCHANT_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload } 
      }
    default: 
      return state;
  }
}

export default merchantReducer;