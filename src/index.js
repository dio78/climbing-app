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

//  const state = {
//      waypoints: {
//        point1: [lat, lon],
//        point2: [lat, lon]
//      },
//      routeData: {
//        geometry: [[lat, lon], [lat, lon], etc],
//        elevationData: [[distance_from_start], [elevation_in_meters], etc.],
//        totalDistance: meters
//        elevationGain: meters
//      }
//  }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithPromiseMiddleware(rootReducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);