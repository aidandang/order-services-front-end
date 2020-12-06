import { createSelector } from 'reselect';

const selectApi = state => state.api;

export const selectApiData = createSelector(
  [selectApi],
  api => api.data
)
