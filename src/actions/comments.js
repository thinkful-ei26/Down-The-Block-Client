import {API_BASE_URL} from '../config';

import  
    { 
        POST_COMMENT_REQUEST, 
        POST_COMMENT_SUCCESS, 
        POST_COMMENT_ERROR 
    } 
from './types'; 
    

export const postCommentRequest = () => ({
    type: POST_COMMENT_REQUEST
});

export const postCommentSuccess = (response) => ({
    type: POST_COMMENT_SUCCESS,
    response
});

export const postCommentError = (error) => ({
    type: POST_COMMENT_ERROR,
    error
});

export const addComment = (content, userId, postId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(postCommentRequest());
 
    return (
        fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                content, 
                userId, 
                postId
            })
        })
        .then(res =>{ 
            return res.json()
        })
        .then((response) =>{ 
            dispatch(postCommentSuccess(response));
        })
        .catch(err => {
            dispatch(postCommentError(err));
        })
    );
}
