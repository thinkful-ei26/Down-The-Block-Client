import  { 
        POST_COMMENT_REQUEST, 
        POST_COMMENT_SUCCESS, 
        POST_COMMENT_ERROR 
    } from '../actions/types';

const initialState = {
    response:null, 
    error:null
};

export default (state=initialState, action) => {
    switch (action.type) {
        case POST_COMMENT_REQUEST:
        return {
            ...state, 
        }

        case POST_COMMENT_SUCCESS:  
            return {
                ...state, 
                response:action.response
            }
        
        case POST_COMMENT_ERROR: 
            return {
                ...state, 
                error:action.error
            }
        
        default: 
            return {
                initialState
            }
    };
};
