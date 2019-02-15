import {
  FETCH_LOCATION_SUCCESS, 
  FETCH_LOCATION_ERROR } from '../actions/types';

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
        err: action.err
      })
    default:
      return state;
  }
}