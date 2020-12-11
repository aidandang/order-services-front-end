import { ItemActionTypes } from './item.types';

const INITIAL_STATE = {
  data: {}
}

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.ITEM_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    default:
      return state;
  }
}

export default itemReducer;