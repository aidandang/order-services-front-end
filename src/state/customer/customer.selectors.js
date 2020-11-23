import { createSelector } from 'reselect';

const selectCustomer = state => state.customer;

export const selectCustomerData = createSelector(
  [selectCustomer],
  customer => customer.data
)
