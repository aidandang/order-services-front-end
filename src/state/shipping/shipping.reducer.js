import { ShippingActionTypes } from './shipping.types';

const INITIAL_STATE = {
  data: {},
  item: {}
}

const shippingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShippingActionTypes.SHIPPING_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload}
      }
    default:
      return state
  }
}

export default shippingReducer;