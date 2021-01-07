import { createSelector } from 'reselect';

const selectOrder = state => state.order

export const selectOrderData = createSelector(
  [selectOrder],
  order => order.data
)

export const selectItemTemp = createSelector(
  [selectOrder],
  order => order.itemTemp
)

export const selectOrderOrder = createSelector(
  [selectOrder],
  order => order.order
)

export const selectPurcItemTabActive = createSelector(
  [selectOrder],
  order => order.purcItemTabActive
)