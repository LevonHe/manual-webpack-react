import initialState from './_initialState';
import { collapsedReducer } from './collapsed';
import { selectedKeyReducer } from './selectedKey';
import { openKeysReducer } from './openKeys';

const reducers = [collapsedReducer, selectedKeyReducer, openKeysReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
