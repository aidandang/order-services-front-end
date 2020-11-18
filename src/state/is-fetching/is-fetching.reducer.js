import { IsFetchingActionTypes } from './is-fetching.types';

const INITIAL_STATE = {
  isFetching: false
}

const isFetchingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IsFetchingActionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      }
    case IsFetchingActionTypes.FETCH_STOP:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export default isFetchingReducer;