import axios from 'axios';

export const WAYPOINT_1_RECEIVED = 'WAYPOINT_1_RECEIVED';
export const WAYPOINT_2_RECEIVED = 'WAYPOINT_2_RECEIVED';
export const ROUTE_INFO_RECEIVED = 'ROUTE_INFO_RECEIVED';

const API_KEY = process.env.REACT_APP_GEOAPIFY_KEY;

const routeDataCleaner = (apiResponse) => {
  return {
    geometry: apiResponse.data.results[0].geometry[0].map((pair) => [pair.lat, pair.lon]),
    elevationData: apiResponse.data.results[0].legs[0].elevation_range,
    totalDistance: apiResponse.data.results[0].distance,
    elevationGain: apiResponse.data.results[0].legs[0].steps.reduce((total, stepObj) => total + stepObj.elevation_gain, 0)
  };
};

export const getRouteData = ([lat1, lon1], [lat2, lon2]) => {
  const ROOT_URL = 'https://api.geoapify.com/v1/routing?';

  const request = axios.get(`${ROOT_URL}waypoints=${lat1},${lon1}|${lat2},${lon2}&mode=hike&details=elevation&format=json&apiKey=${API_KEY}`)
    .then(routeDataCleaner)
    .catch((error) => {
      throw error;
    })

  return {
    type: ROUTE_INFO_RECEIVED,
    payload: request
  }
};

export const getWayPoint1 = (search) => {
  const ROOT_URL = 'https://api.geoapify.com/v1/geocode/search?';

  const request = axios.get(`${ROOT_URL}text=${search}&format=json&apiKey=${API_KEY}`)

  return {
    type: WAYPOINT_1_RECEIVED,
    payload: request
  }
};

export const getWayPoint2 = (search) => {
  const ROOT_URL = 'https://api.geoapify.com/v1/geocode/search?';

  const request = axios.get(`${ROOT_URL}text=${search}&format=json&apiKey=${API_KEY}`)

  return {
    type: WAYPOINT_2_RECEIVED,
    payload: request
  }
};