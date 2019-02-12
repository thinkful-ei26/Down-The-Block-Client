import {FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR } from '../actions/geolocation';


const initialState = {
  location: null,
  error: null
}

export default function reducer(state=initialState, action){
  if (action.type === FETCH_LOCATION_SUCCESS){
    return Object.assign({}, state, {
      location: action.location
    })
  } else if(action.type === FETCH_LOCATION_ERROR) {
    return Object.assign({}, state, {
      err: action.err
    })
  }
}