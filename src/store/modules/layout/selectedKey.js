import { SELECTED_KEY } from './_constants';

export function selectedKey(selectedKey) {
  return {
    type: SELECTED_KEY,
    selectedKey,
  };
}

export function selectedKeyReducer(state, action) {
  switch (action.type) {
    case SELECTED_KEY:
      return {
        ...state,
        selectedKey: action.selectedKey,
      };

    default:
      return state;
  }
}
