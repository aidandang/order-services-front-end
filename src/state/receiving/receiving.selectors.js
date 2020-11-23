import { createSelector } from 'reselect';

const selectReceiving = state => state.receiving;

export const selectReceivingData = createSelector(
  [selectReceiving],
  receiving => receiving.data
)