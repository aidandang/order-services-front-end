import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
  data: {},
  comp: '',
  itemTemp: {}
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case OrderActionTypes.ORDER_SET_COMP:
      return {
        ...state,
        comp: action.payload
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
        }
      }
    case OrderActionTypes.SELECT_CUSTOMER_TO_ORDER:
      return {
        ...state,
        data: {
          ...state.data, 
          byId: {
            ...state.data.byId, ...action.payload
          }
        }
      }
    default:
      return state;
  }
}

export default orderReducer;