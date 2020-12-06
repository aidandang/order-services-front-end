import { ReceivingActionTypes } from './receiving.types';

const INITIAL_STATE = {
  data: {},
  list: []
}

function addItemToArray(array, item) {
  return [...array, item]
}

function removeItemInArray(array, index) {
  let newArray = array.slice()
  newArray.splice(index, 1)
  return newArray
}

const receivingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReceivingActionTypes.RECEIVING_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case ReceivingActionTypes.RECEIVING_ADD_TRACKING_TO_LIST:
      return {
        ...state,
        list: addItemToArray(state.list, action.payload)
      }
    case ReceivingActionTypes.RECEIVING_REMOVE_TRACKING_IN_LIST:
      return {
        ...state,
        list: removeItemInArray(state.list, action.payload)
      }
    case ReceivingActionTypes.RECEIVING_EMPTY_LIST:
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}

export default receivingReducer;