import axios from 'axios';

const API_KEY = process.env.REACT_APP_GEOAPIFY_KEY;
const ROOT_URL = 'https://api.geoapify.com/v1/routing?'

export const ROUTE_INFO_RECEIVED = 'ROUTE_INFO_RECEIVED';

const dataCleaner = (apiResponse) => {
  return {
    geometry: apiResponse.data.results[0].geometry.map((pair) => [pair.lat, pair.lon]),
    elevationData: apiResponse.data.results[0].legs[0].elevation_range,
    totalDistance: apiResponse.data.results[0].distance,
    elevationGain: apiResponse.data.results[0].legs[0].steps.reduce((total, stepObj) => total + stepObj.elevation_gain, 0)
  };
};

export const getRouteData = ([lat1, lon1], [lat2, lon2]) => {
  const request = axios.get(`${ROOT_URL}waypoints=${lat1},${lon1}|${lat2},${lon2}&mode=hike&details=elevation&format=json&apiKey=${API_KEY}`)
    .then(dataCleaner)
    .catch((error) => {
      throw error;
    })

  return {
    type: ROUTE_INFO_RECEIVED,
    payload: request
  }
};