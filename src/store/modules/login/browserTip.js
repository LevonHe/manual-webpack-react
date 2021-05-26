import { BROWSER_TIP } from './_constants';

export function browserTip(browserTip) {
  return {
    type: BROWSER_TIP,
    browserTip,
  };
}

export function browserTipReducer(state, action) {
  switch (action.type) {
    case BROWSER_TIP:
      return {
        ...state,
        browserTip: action.browserTip,
      };
    default:
      return state;
  }
}
