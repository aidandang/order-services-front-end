import { ReceivingActionTypes } from './receiving.types';

const INITIAL_STATE = {
  data: {}
}

const receivingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReceivingActionTypes.RECEIVING_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    default:
      return state
  }
}

export default receivingReducer;