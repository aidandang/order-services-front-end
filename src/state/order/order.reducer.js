import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
  data: {},
  order: {
    items: []
  }
}

// function addItemToArray(array, item) {
//   return [...array, item]
// }

// function updateItemInArray(array, payload) {
//   return array.map((item, index) => {
//     if (index !== payload.index) {
//       // This isn't the item we care about - keep it as-is
//       return item
//     }
//     // Otherwise, this is the one we want - return an updated value
//     return {
//       ...item,
//       ...payload.item
//     }
//   })
// }

// function removeItemInArray(array, index) {
//   let newArray = array.slice()
//   newArray.splice(index, 1)
//   return newArray
// }

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case OrderActionTypes.COPY_ORDER_TO_EDIT:
      return {
        ...state,
        order: action.payload
      }
    case OrderActionTypes.UPDATE_ITEM_IN_ORDER:
      return {
        ...state,
        order: { 
          ...state.order,
          ...action.payload
        }
      }
    case OrderActionTypes.UPDATE_PURCHASING_IN_ORDER:
      return {
        ...state,
        order: { 
          ...state.order,
          purchasing: action.payload
        }
      }
    default:
      return state;
  }
}

export default orderReducer;