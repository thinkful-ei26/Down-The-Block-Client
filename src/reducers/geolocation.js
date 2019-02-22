import {
  FETCH_LOCATION_SUCCESS, 
  FETCH_LOCATION_ERROR, 
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_ERROR,
} from '../actions/types';

const initialState = {
  coords: null,
  error: null
}

export default (state=initialState, action) =>{
  switch (action.type){
    case FETCH_LOCATION_SUCCESS:
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
      return Object.assign({}, state, {
        coords: action.coords
      })
    case FETCH_ADDRESS_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state;
  }
}