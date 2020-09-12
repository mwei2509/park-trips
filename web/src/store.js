import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createHistory from 'history/createBrowserHistory';

import reduce from './reducers';
import { loadState, saveState } from './localStorage';
import { apiBaseURL } from 'config';

const rootReducer = (history) => {
  return combineReducers({
    default: reduce,
    router: connectRouter(history)
  });
};

export const history = createHistory();

history.listen(() => {
  window.scrollTo(0, 0);
});

export const client = axios.create({
  baseURL: apiBaseURL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#Protecting_REST_Services:_Use_of_Custom_Request_Headers
    'Cache-Control': 'no-cache'
  }
});

const initialState = loadState();
const enhancers = [];
const middleware = [routerMiddleware(history), axiosMiddleware(client)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer(history), initialState, composedEnhancers);
store.subscribe(() => {
  saveState(store.getState());
});

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // use this to catch sesion timeouts
      store.dispatch({
        type: 'AUTH_INVALID'
      });
    }

    return Promise.reject(error);
  }
);

export default store;
