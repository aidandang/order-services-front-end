import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
  data: {},
  itemTemp: {},
  purcItemTabActive: 'item'
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case OrderActionTypes.COPY_ORDER_TO_EDIT:
      return {
        ...state,
        order: action.payload
      }
    case OrderActionTypes.UPDATE_ITEM_IN_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId, ...action.payload
          }
        }
      }
    case OrderActionTypes.UPDATE_PURCHASING_IN_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          byId: {
            ...state.data.byId, ...action.payload
          }
        }
      }
    case OrderActionTypes.SET_ITEM_TEMP_TO_EDIT:
      return {
        ...state,
        itemTemp: action.payload
      }
    case OrderActionTypes.SELECT_PRODUCT_TO_ORDER_ITEM:
      return {
        ...state,
        itemTemp: {
          ...state.itemTemp, ...action.payload
        },
        purcItemTabActive: 'item'
      }
    case OrderActionTypes.SET_PURC_ITEM_TAB_ACTIVE:
      return {
        ...state,
        purcItemTabActive: action.payload
      }
    default:
      return state;
  }
}

// function addItemToArray(array, item) {
//   return [...array, item]
// }

// function updateItemInArray(array, item, itemIndex) {
//   return array.map((el, index) => {
//     if (index !== itemIndex) {
//       // This isn't the item we care about - keep it as-is
//       return el
//     }
//     // Otherwise, this is the one we want - return an updated value
//     return {
//       ...el,
//       ...item
//     }
//   })
// }

// function removeItemInArray(array, index) {
//   let newArray = array.slice()
//   newArray.splice(index, 1)
//   return newArray
// }

export default orderReducer;