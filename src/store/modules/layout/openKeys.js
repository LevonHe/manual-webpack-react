import { OPEN_KEYS } from './_constants';

export function openKeys(openKeys) {
  return {
    type: OPEN_KEYS,
    openKeys,
  };
}

export function openKeysReducer(state, action) {
  switch (action.type) {
    case OPEN_KEYS:
      return {
        ...state,
        openKeys: action.openKeys,
      };

    default:
      return state;
  }
}
