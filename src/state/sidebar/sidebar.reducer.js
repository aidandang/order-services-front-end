import { SIDEBAR_LIST } from './sidebar.data';

const INITIAL_STATE = SIDEBAR_LIST;

const sidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default sidebarReducer;