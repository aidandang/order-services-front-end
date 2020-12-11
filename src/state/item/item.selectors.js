import { createSelector } from 'reselect';

const selectItem = state => state.item

export const selectItemData = createSelector(
  [selectItem],
  item => item.data
)