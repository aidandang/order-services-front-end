import { createSelector } from 'reselect';

const selectBrand = state => state.brand;

export const selectBrandData = createSelector(
  [selectBrand],
  brand => brand.data
)