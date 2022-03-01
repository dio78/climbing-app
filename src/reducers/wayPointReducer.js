import { WAYPOINT_1_RECEIVED, WAYPOINT_2_RECEIVED } from "../actions";

const defaultState = {
  point1: [],
  point2: []
}

const wayPointReducer = (state = defaultState, action) => {
  if (action.type === WAYPOINT_1_RECEIVED) {
    const pair = [action.payload.data.results[0].lat, action.payload.data.results[0].lon];
    return {...state, point1: pair}
  }
  if (action.type === WAYPOINT_2_RECEIVED) {
    const pair = [action.payload.data.results[0].lat, action.payload.data.results[0].lon];
    return {...state, point2: pair}
  }

  return state;
};

export default wayPointReducer;