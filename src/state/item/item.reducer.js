import { ItemActionTypes } from './item.types';

const INITIAL_STATE = {
  data: {},
  list: [],
  editing: {}
}

function addItemToArray(array, item) {
  return [...array, item]
}

function removeItemInArray(array, index) {
  let newArray = array.slice()
  newArray.splice(index, 1)
  return newArray
}

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.ITEM_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case ItemActionTypes.ITEM_ADD_TO_LIST:
      return {
        ...state,
        list: addItemToArray(state.list, action.payload)
      }
    case ItemActionTypes.ITEM_REMOVE_IN_LIST:
      return {
        ...state,
        list: removeItemInArray(state.list, action.payload)
      }
    case ItemActionTypes.ITEM_EMPTY_LIST:
      return {
        ...state,
        list: []
      }
    case ItemActionTypes.COPY_ITEM_TO_EDIT:
      return {
        ...state,
        editing: action.payload
      }
    case ItemActionTypes.COPY_ITEMS_TO_LIST:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}

export default itemReducer;