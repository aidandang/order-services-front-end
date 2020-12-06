import { ReceivingActionTypes } from './receiving.types';

export const addTrackingToList = tracking => ({
  type: ReceivingActionTypes.RECEIVING_ADD_TRACKING_TO_LIST,
  payload: tracking
})

export const removeTrackingInList = index => ({
  type: ReceivingActionTypes.RECEIVING_REMOVE_TRACKING_IN_LIST,
  payload: index
})

export const emptyList = () => ({
  type: ReceivingActionTypes.RECEIVING_EMPTY_LIST
})