import {combineReducers} from 'redux';
import mapReducer from './mapReducer.js';
import routeDataReducer from './routeDataReducer.js';
import wayPointReducer from './wayPointReducer.js';

const rootReducer = combineReducers({
  waypoints: wayPointReducer,
  routeData: routeDataReducer,
  mapRef: mapReducer
});

export default rootReducer;