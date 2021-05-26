import initialState from './_initialState';
import { userInfoReducer } from './userInfo';
import { menuAsideReducer } from './menuAside';
import { permissionNameArrReducer } from './permissionNameArr';
import { urlArrReducer } from './urlArr';
import { browserTipReducer } from './browserTip';

const reducers = [userInfoReducer, menuAsideReducer, permissionNameArrReducer, urlArrReducer, browserTipReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
