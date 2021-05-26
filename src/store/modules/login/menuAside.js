import { MENU_ASIDE } from './_constants';

export function menuAside(menuAside) {
  return {
    type: MENU_ASIDE,
    menuAside,
  };
}

export function menuAsideReducer(state, action) {
  switch (action.type) {
    case MENU_ASIDE:
      return {
        ...state,
        menuAside: action.menuAside,
      };

    default:
      return state;
  }
}
