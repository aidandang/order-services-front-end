import { CustomerActionTypes } from './customer.types';

const INITIAL_STATE = {
  data: {}
}

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.CUSTOMER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    default:
      return state
  }
}

export default customerReducer;