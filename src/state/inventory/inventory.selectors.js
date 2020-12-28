import { createSelector } from 'reselect';

const selectInventory = state => state.inventory

export const selectInventoryData = createSelector(
  [selectInventory],
  inventory => inventory.data
)

export const selectCheckingItems = createSelector(
  [selectInventory],
  inventory => inventory.checkingItems
)