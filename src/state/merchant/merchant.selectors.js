import { createSelector } from 'reselect';

const selectMerchant = state => state.merchant;

export const selectMerchantData = createSelector(
  [selectMerchant],
  merchant => merchant.data
)