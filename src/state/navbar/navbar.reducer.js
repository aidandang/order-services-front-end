import { NAVBAR_LIST } from './navbar.data';

const INITIAL_STATE = NAVBAR_LIST;

const navbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default navbarReducer;