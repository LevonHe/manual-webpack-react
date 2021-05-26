import { PERMISSION_NAME_ARR } from './_constants';

export function permissionNameArr(permissionNameArr) {
  return {
    type: PERMISSION_NAME_ARR,
    permissionNameArr,
  };
}

export function permissionNameArrReducer(state, action) {
  switch (action.type) {
    case PERMISSION_NAME_ARR:
      return {
        ...state,
        permissionNameArr: action.permissionNameArr,
      };

    default:
      return state;
  }
}
