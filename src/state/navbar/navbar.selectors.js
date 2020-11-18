import { createSelector } from 'reselect';

const selectNavbar = state => state.navbar;

export const selectNavbarSections = createSelector(
  [selectNavbar],
  navbar => navbar.sections
)