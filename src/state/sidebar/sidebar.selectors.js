import { createSelector } from 'reselect';

const selectSidebar = state => state.sidebar;

export const selectSidebarSections = createSelector(
  [selectSidebar],
  sidebar => sidebar.sections
)