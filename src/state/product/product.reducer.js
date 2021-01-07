import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  data: {},
  active: {}
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case ProductActionTypes.PRODUCT_COPY_TO_BY_ID:
      return {
        ...state,
        data: { 
          ...state.data,
          byId: { ...action.payload }
        }
      }
    case ProductActionTypes.SET_PRODUCT_COMPONENT:
      return {
        ...state,
        comp: { 
          ...state.comp, ...action.comp
        }
      }   
    default:
      return state;
  }
}

export default productReducer;