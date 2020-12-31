import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  data: {},
  checkingItems: [],
  matchingItems: []
}

const updateArray = (array, values) => {
  const arr = [ ...array ]

  return arr.map(el => {
    if (el.tracking !== values.tracking) {
      return el
    }
    return { 
      ...el, 
      items: values.items
    }
  })
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
    case InventoryActionTypes.INVENTORY_MATCH_ITEMS:
      return {
        ...state,
        data: { 
          ...state.data,
          trackings: updateArray(state.data.trackings, action.payload)
        }
      }
    default:
      return state;
  }
}

export default inventoryReducer;