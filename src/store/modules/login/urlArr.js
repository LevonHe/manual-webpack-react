import { URL_ARR } from './_constants';

export function urlArr(urlArr) {
  return {
    type: URL_ARR,
    urlArr,
  };
}

export function urlArrReducer(state, action) {
  switch (action.type) {
    case URL_ARR:
      return {
        ...state,
        urlArr: action.urlArr,
      };

    default:
      return state;
  }
}
