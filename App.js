import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('initialized database successfully');
  })
  .catch(err => {
    console.log('initialized database failed');
    console.log(err);
  });

import AppNav from './navigation/MemNavigation';
import memReducer from './store/mem-reducer';

const rootReducer = combineReducers({ memories: memReducer });
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
