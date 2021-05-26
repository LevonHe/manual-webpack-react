import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import layoutReducer from './modules/layout/_reducer';
import loginReducer from './modules/login/_reducer';

const config = {
  key: 'jarvis_web_2020_root',
  storage,
};

const reducers = combineReducers({
  router: routerReducer,
  layout: layoutReducer,
  login: loginReducer,
});

const rootReducer = persistReducer(config, reducers);

export default rootReducer;
