import { createSelector } from 'reselect';

const selectItem = state => state.item

export const selectItemData = createSelector(
  [selectItem],
  item => item.data
)

export const selectItemList = createSelector(
  [selectItem],
  item => item.list
)

export const selectItemEditing = createSelector(
  [selectItem],
  item => item.editing
)