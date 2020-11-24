import { OrderActionTypes } from './order.types';
// import { acctToStr } from '../../components/utils/acctToStr';

const INITIAL_STATE = {
  data: {},
  item: {}
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case OrderActionTypes.COPY_ORDER_ITEM_TO_EDIT:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}

export default orderReducer;