import { COLLAPSED } from './_constants';

export function collapsed(collapsed) {
  return {
    type: COLLAPSED,
    collapsed,
  };
}

export function collapsedReducer(state, action) {
  switch (action.type) {
    case COLLAPSED:
      return {
        ...state,
        collapsed: action.collapsed,
      };
    default:
      return state;
  }
}
