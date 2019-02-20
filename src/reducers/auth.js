import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    UPDATED_USER_SUCCESS,
    CHANGE_SUCCESS_MESSAGE
} from '../actions/types';

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: null,
    loading: false,
    error: null,
    successMessage: null
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null
        });
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        console.log('current user is', action.currentUser)
        return Object.assign({}, state, {
            loading: false,
            currentUser: action.currentUser
        });
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    }
    else if (action.type=== UPDATED_USER_SUCCESS){
        console.log('IN REDUCER', action.updatedUser);
        return Object.assign({}, state, {
            currentUser: action.updatedUser,
            successMessage: action.message,
            error: null
        });
      }
      else if(action.type===CHANGE_SUCCESS_MESSAGE){
        return Object.assign({}, state, {
            successMessage: action.message,
            error: null
        });
      }
    return state;
}
