import { ROUTE_INFO_RECEIVED } from "../actions";

const defaultState = {
  geometry: [],
  elevationData: [],
  totalDistance: 0,
  elevationGain: 0
}

const routeDataReducer = (state = defaultState, action) => {
  if (action.type === ROUTE_INFO_RECEIVED) {
    return {...action.payload};
  }

  return state;
}

export default routeDataReducer;