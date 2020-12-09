import { createSelector } from 'reselect';

const selectCourier = state => state.courier;

export const selectCourierData = createSelector(
  [selectCourier],
  courier => courier.data
)