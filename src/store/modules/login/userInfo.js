import { USER_INFO } from './_constants';

export function userInfo(userInfo) {
  return {
    type: USER_INFO,
    userInfo,
  };
}

export function userInfoReducer(state, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    default:
      return state;
  }
}
