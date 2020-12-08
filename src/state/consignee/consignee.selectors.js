import { createSelector } from 'reselect';

const selectConsignee = state => state.consignee;

export const selectConsigneeData = createSelector(
  [selectConsignee],
  consignee => consignee.data
)