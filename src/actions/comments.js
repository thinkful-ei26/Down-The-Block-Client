import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {updatePost} from './posts';
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
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((post) =>{ 
            console.log('the response in comments is', post);
            dispatch(postCommentSuccess(post));
            // it gets back the post that was changed, so update that in the posts array? 
            dispatch(updatePost(post))
        })
        .catch(err => {
            dispatch(postCommentError(err));
        })
    );
}
