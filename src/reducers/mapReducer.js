import {SET_MAP } from "../actions";

const defaultState = null;

const mapReducer = (state = defaultState, action) => {
  if (action.type === SET_MAP) {
    return {map: action.payload}
  }

  return state;
};

export default mapReducer;