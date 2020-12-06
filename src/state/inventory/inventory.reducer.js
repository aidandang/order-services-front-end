import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  data: {}
}

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.INVENTORY_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    default:
      return state;
  }
}

export default inventoryReducer;