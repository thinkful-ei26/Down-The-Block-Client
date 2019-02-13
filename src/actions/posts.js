import { 
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
} from './types';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

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
    // console.log(coords);
    let geoObjToObj = {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
    // console.log(geoObjToObj);
    let stringifiedObj = JSON.stringify(geoObjToObj);
    console.log(stringifiedObj);
    fetch(`${API_BASE_URL}/posts/${stringifiedObj}`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        },
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

export const createPostRequest = () => ({
    type: CREATE_POST_REQUEST,
})

export const createPostSuccess = () => ({
  type: CREATE_POST_SUCCESS,
})

export const createPostError= (error) => ({
  type: CREATE_POST_ERROR,
  error
})

export const submitPost = (values, coords) => (dispatch, getState) =>{
    dispatch(createPostRequest());
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/posts/${coords}`, { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => {
        dispatch(createPostSuccess());
        dispatch(fetchPosts(coords));
    })
    .catch(error => {
        dispatch(createPostError(error));
        const {message, location, status} = error;
        if (status === 400) {
            console.log(message, location)
            // Convert errors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        else{
            return Promise.reject(
                new SubmissionError({
                    _error: 'Unable to create post, please try again',
                })
            );
        }
    });
}
