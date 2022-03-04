import { ROUTE_INFO_RECEIVED } from "../actions";

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
    console.log(action.payload)
    return {...action.payload};
  }

  return state;
}

export default routeDataReducer;