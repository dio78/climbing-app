import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import promise from 'redux-promise';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const createStoreWithPromiseMiddleware = applyMiddleware(promise)(createStore); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithPromiseMiddleware(rootReducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);