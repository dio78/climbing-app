import { ROUTE_INFO_RECEIVED, RESET } from "../actions";

const defaultState = 
  {
    geometry: [],
    elevationData: [],
    totalDistance: 0,
    elevationGain: 0,
    stepInfo: []
  };


const routeDataReducer = (state = defaultState, action) => {
  if (action.type === ROUTE_INFO_RECEIVED) {
    return {...action.payload};
  }
  if (action.type === RESET) {
    return defaultState;
  }

  return state;
}

export default routeDataReducer;