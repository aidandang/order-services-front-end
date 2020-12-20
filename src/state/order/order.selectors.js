import { createSelector } from 'reselect';

const selectOrder = state => state.order

export const selectOrderData = createSelector(
  [selectOrder],
  order => order.data
)

export const selectOrderOrder = createSelector(
  [selectOrder],
  order => order.order
)