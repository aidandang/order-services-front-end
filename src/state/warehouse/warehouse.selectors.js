import { createSelector } from 'reselect';

const selectWarehouse = state => state.warehouse;

export const selectWarehouseData = createSelector(
  [selectWarehouse],
  warehouse => warehouse.data
)