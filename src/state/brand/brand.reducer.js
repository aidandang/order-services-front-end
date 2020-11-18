import { BrandActionTypes } from './brand.types';

const INITIAL_STATE = {
  data: {}
}

const brandReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case BrandActionTypes.BRAND_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload } 
      }
    default: 
      return state;
  }
}

export default brandReducer;