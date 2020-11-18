import { createSelector } from 'reselect';

const selectOrder = state => state.order

export const selectOrderData = createSelector(
  [selectOrder],
  order => order.data
)

export const selectOrderItem = createSelector(
  [selectOrder],
  order => order.item
)

export const selectOrderEditing = createSelector(
  [selectOrder],
  order => order.editing
)