import { WarehouseActionTypes } from './warehouse.types';

const INITIAL_STATE = {
  data: {}
}

const warehouseReducer = (state =  INITIAL_STATE, action) => {
  switch (action.type) {
    case WarehouseActionTypes.WAREHOUSE_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload } 
      }
    default: 
      return state;
  }
}

export default warehouseReducer;