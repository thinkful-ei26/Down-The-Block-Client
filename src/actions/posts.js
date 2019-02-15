import { 
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CHANGE_SEARCH_TERM,
  CHANGE_CATEGORY_FILTER,
  POST_BEING_EDITED,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
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
    // console.log('here')
    dispatch(fetchPostsRequest());
    const authToken = getState().auth.authToken;
    let simplifiedGeoObject = {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
    let stringifiedObj = JSON.stringify(simplifiedGeoObject);
    // console.log(stringifiedObj);
    fetch(`${API_BASE_URL}/posts/${stringifiedObj}`, {
        method: 'GET',
        headers: {
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

export const submitPost = (postId, values, coords) => (dispatch, getState) =>{
    dispatch(createPostRequest());
    const authToken = getState().auth.authToken;
    const method = postId ? "PUT" : "POST";

    let simplifiedGeoObject = {
        latitude: coords.latitude,
        longitude: coords.longitude
      };
    let stringifiedObj = JSON.stringify(simplifiedGeoObject);

    const path = postId ? `${API_BASE_URL}/posts/${postId}` : `${API_BASE_URL}/posts/${stringifiedObj}`; 


    return fetch(path, { 
        method,
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

export const deletePostRequest = () => ({
    type: DELETE_POST_REQUEST,
})

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  postId
})

export const deletePostError= (error) => ({
  type: DELETE_POST_ERROR,
  error
})

export const deletePost = (postId) => (dispatch, getState) =>{
    dispatch(deletePostRequest());
    const authToken = getState().auth.authToken;

    fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        },
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        console.log('here')
        dispatch(deletePostSuccess(postId));
    })
    .catch(error => {
        dispatch(deletePostError(error));
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
                    _error: 'Unable to delete post, please try again',
                })
            );
        }
    });
}


export const postBeingEdited= (post) => ({
    type: POST_BEING_EDITED,
    post,
  })

export const changeSearchTerm = (searchTerm) =>({
    type: CHANGE_SEARCH_TERM,
    searchTerm
})

export const changeCategoryFilter = (categoryFilter) =>({
    type: CHANGE_CATEGORY_FILTER,
    categoryFilter
})
