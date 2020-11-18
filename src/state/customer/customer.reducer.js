import { CustomerActionTypes } from './customer.types';

const INITIAL_STATE = {
  data: {},
  comp: {
    directory: {
      'customer-list': {
        name: 'Customer List',
        parent: null
      },
      'customer-info': {
        name: 'Customer Information',
        parent: null
      },
      'customer-add': {
        name: 'Add Customer',
        parent: 'customer-list'
      },
      'customer-edit': {
        name: 'Edit Customer Information',
        parent: 'customer-info'
      },
      'customer-shipping-info': {
        name: 'Edit Shipping Information',
        parent: 'customer-info'
      }
    },
    currComp: 'customer-list'
  }
}

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.CUSTOMER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      } 
    case CustomerActionTypes.CUSTOMER_COPY_TO_BY_ID:
      return {
        ...state,
        data: { 
          ...state.data,
          byId: { ...action.payload }
        }
      }
    case CustomerActionTypes.SET_CUSTOMER_COMPONENT:
      return {
        ...state,
        comp: {
          ...state.comp,
          currComp: action.payload
        }
      }   
    default:
      return state
  }
}

export default customerReducer;