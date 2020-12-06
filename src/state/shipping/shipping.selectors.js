import { createSelector } from 'reselect';

const selectShipping = state => state.shipping;

export const selectShippingData = createSelector(
  [selectShipping],
  shipping => shipping.data
)