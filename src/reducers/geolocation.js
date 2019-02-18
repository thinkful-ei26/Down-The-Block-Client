import {
  FETCH_LOCATION_SUCCESS, 
  FETCH_LOCATION_ERROR, 
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_ERROR } from '../actions/types';

const initialState = {
  coords: null,
  error: null
}

export default (state=initialState, action) =>{
  switch (action.type){
    case FETCH_LOCATION_SUCCESS:
      console.log('in reducer',action.coords);
      return Object.assign({}, state, {
        coords: action.coords
      })
    case FETCH_LOCATION_ERROR: 
      return Object.assign({}, state, {
        error: 'Location access not granted'
      })
    case FETCH_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        error: null
      })
    case FETCH_ADDRESS_SUCCESS:
      console.log('in reducer', action.coords);
      return Object.assign({}, state, {
        // traverse google maps response here
        coords: action.coords
      })
    case FETCH_ADDRESS_ERROR:
      return Object.assign({}, state, {
        // traverse google maps response here
        // error: action.error
      })
    default:
      return state;
  }
}