import { 
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from './types';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST,
})

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  posts
})

export const fetchPostsError= (error) => ({
  type: FETCH_POSTS_ERROR,
  error
})

export const fetchPosts = (coords) => (dispatch, getState) => {
    dispatch(fetchPostsRequest());
    const authToken = getState().auth.authToken;
    console.log(coords);
    let geoObjToObj = {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
    // let testObj = {
    //   latitude: 2,
    //   longitude: 4
    // };
    // console.log(testObj);
    console.log(geoObjToObj);
    let stringifiedObj = JSON.stringify(geoObjToObj);
    fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        },
        // body: stringifiedObj,
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(posts => {
            dispatch(fetchPostsSuccess(posts));
        })
        .catch(error => {
            dispatch(fetchPostsError(error));
        });
};