import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';
import { refreshProfileAuthToken } from './auth';
import { UPDATED_USER_SUCCESS, CHANGE_SUCCESS_MESSAGE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from './types';
import {
  USER_COORDS_REQUEST,
  USER_COORDS_SUCCESS,
  USER_COORDS_ERROR
} from './types';

export const registerUser = user => dispatch => {
    let formData = new FormData();

    Object.keys(user).forEach(item=> {
        formData.append(item, (user[item]))
    });

    return fetch(`${API_BASE_URL}/auth/users`, {
        method: 'POST',
        body: formData
    })
        .then(res => normalizeResponseErrors(res))
        .then(res =>{
            res.json();
        })
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const updatedUserSuccess = (updatedUser, message) => ({
    type: UPDATED_USER_SUCCESS,
    updatedUser,
    message
})

export const changeSuccessMessage = (message) =>({
    type: CHANGE_SUCCESS_MESSAGE,
    message
})

export const updatedUser = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/users/account`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(updatedUser => {
            dispatch(updatedUserSuccess(updatedUser, 'Your account has been successfully updated'));
        })
        .then(()=>{
            dispatch(refreshProfileAuthToken())
        })
        .catch(err => {

            const {reason, message, location, status} = err;
            if (reason === 'ValidationError' || status === 401) {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            else{
                return Promise.reject(
                    new SubmissionError({
                        _error: 'Unable to update, please try again',
                    })
                );
            }
        });
};

export const updatePassword = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/users/password`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(updatedUser => {
            dispatch(updatedUserSuccess(updatedUser, 'Your password has been successfully updated'));
        })
        .catch(err => {
            const {reason, message, location, status} = err;
            if (reason === 'ValidationError' || status === 401) {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            else{
                return Promise.reject(
                    new SubmissionError({
                        _error: 'Unable to update password, please try again',
                    })
                );
            }
        });
};

export const updateProfilePhoto = photo => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    let formData = new FormData();

    formData.append('photo', photo)


    return fetch(`${API_BASE_URL}/auth/users/photo`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        body: formData
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(updatedUser => {
            dispatch(updatedUserSuccess(updatedUser, 'Your account has been successfully updated'));
        })
        .then(()=>{
            dispatch(refreshProfileAuthToken())
        })

        .catch(err => {
            console.log(err);
        });
};

export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
})

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
})

export const fetchUsersError= (error) => ({
  type: FETCH_USERS_ERROR,
  error
})

export const fetchUsers = (coords) => (dispatch, getState) => {
    dispatch(fetchUsersRequest());
    const authToken = getState().auth.authToken;
    let simplifiedGeoObject = {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
      let stringifiedObj = JSON.stringify(simplifiedGeoObject);
    fetch(`${API_BASE_URL}/auth/users/${stringifiedObj}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(users => {
            dispatch(fetchUsersSuccess(users));
            console.log('THE USERS GOTTEN BACK IN ACTION ARE', users)
        })
        .catch(error => {
            console.log(error);
        });
};
export const userCoordsRequest = () => ({
    type: USER_COORDS_REQUEST
});

export const userCoordsSuccess = user => ({
    type: USER_COORDS_SUCCESS,
    user
});

export const userCoordsError = error => ({
    type: USER_COORDS_ERROR,
    error
})

export const setUserCoords = (coords) => (dispatch, getState) => {
    dispatch(userCoordsRequest());
    const authToken = getState().auth.authToken;

    let simplifiedGeoObject = {
        latitude: coords.latitude,
        longitude: coords.longitude,
    };

    if (coords.automatic === false){
        simplifiedGeoObject.automatic = false;
    } else {
        simplifiedGeoObject.automatic = true
    }

    let stringifiedObj = JSON.stringify(simplifiedGeoObject);

    const path = `${API_BASE_URL}/auth/users/location/${stringifiedObj}`;

    return fetch(path, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => {
        dispatch(userCoordsSuccess(user));
        // dispatch(fetchPosts(coords, forum));
    })
    .catch(error => {
        dispatch(userCoordsError(error))
    })
}
