import { createSelector } from 'reselect';

const selectReceiving = state => state.receiving;

export const selectReceivingData = createSelector(
  [selectReceiving],
  receiving => receiving.data
)

export const selectReceivingList = createSelector(
  [selectReceiving],
  receiving => receiving.list
)