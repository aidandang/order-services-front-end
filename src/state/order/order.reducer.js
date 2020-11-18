import { OrderActionTypes } from './order.types';
// import { acctToStr } from '../../components/utils/acctToStr';

const INITIAL_STATE = {
  data: {},
  item: {}
}

function addItemToArray(array, action) {
  return [...array, action.payload]
}

function updateItemInArray(array, payload) {
  return array.map((item, index) => {
    if (index !== payload.index) {
      return item
    }
    return {
      ...item,
      ...payload.item
    }
  })
}

function removeItemInArray(array, index) {
  let newArray = array.slice()
  newArray.splice(index, 1)
  return newArray
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case OrderActionTypes.SET_ORDER_COMPONENT:
      return {
        ...state,
        comp: {
          ...state.comp,
          currComp: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_INFO:
      return {
        ...state,
        editing: { 
          ...state.editing,
          info: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_ITEM:
      return {
        ...state,
        editing: {
          ...state.editing,
          items: addItemToArray(state.editing.items, action),
          item: {}
        }
      }
    case OrderActionTypes.UPDATE_ORDER_ITEM:
      return {
        ...state,
        editing: {
          ...state.editing,
          items: updateItemInArray(state.editing.items, action.payload),
          item: {}
        }
      }
    case OrderActionTypes.REMOVE_ORDER_ITEM:
      return {
        ...state,
        editing: {
          ...state.editing,
          items: removeItemInArray(state.editing.items, action.payload)
        }
      }
    case OrderActionTypes.SELECT_PRODUCT_TO_ORDER:
      return {
        ...state,
        editing: {
          ...state.editing,
          item: {
            ...state.editing.item,
            product: action.payload.product,
            color: action.payload.color
          }
        }
      }
    case OrderActionTypes.COPY_ORDER_ITEM_TO_EDIT:
      return {
        ...state,
        item: action.payload
      }
    case OrderActionTypes.SAVE_ORDER_COST:
      return {
        ...state,
        editing: { 
          ...state.editing,
          cost: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_RECEIVING:
      return {
        ...state,
        editing: { 
          ...state.editing,
          receiving: action.payload
        }
      }
    case OrderActionTypes.SELECT_CUSTOMER_TO_ORDER:
      return {
        ...state,
        editing: {
          ...state.editing,
          billing: {
            ...state.editing.billing,
            customer: { ...action.payload }
          }
        }
      }
    case OrderActionTypes.SAVE_ORDER_SALE:
      return {
        ...state,
        editing: { 
          ...state.editing,
          billing: { 
            ...state.editing.billing, ...action.payload
          }
        }
      }
    case OrderActionTypes.RESET_ORDER_EDITING:
      return {
        ...state,
        editing: INITIAL_STATE.editing
      }
    case OrderActionTypes.SET_ORDER_EDITING:
      return {
        ...state,
        editing: action.payload
      }
    default:
      return state;
  }
}

export default orderReducer;