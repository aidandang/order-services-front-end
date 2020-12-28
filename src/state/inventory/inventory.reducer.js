import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  data: {},
  checkingItems: []
}

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.INVENTORY_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case InventoryActionTypes.INVENTORY_UPDATE_CHECKED_ITEMS:
      return {
        ...state,
        checkingItems: action.payload
      }
    default:
      return state;
  }
}

export default inventoryReducer;