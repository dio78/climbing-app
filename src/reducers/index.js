import {combineReducers} from 'redux';
import routeDataReducer from './routeDataReducer.js';
import wayPointReducer from './wayPointReducer.js';

const rootReducer = combineReducers({
  waypoints: wayPointReducer,
  routeData: routeDataReducer
});

export default rootReducer;