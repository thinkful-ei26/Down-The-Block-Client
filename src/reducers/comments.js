// import  { 
//         POST_COMMENT_REQUEST, 
//         POST_COMMENT_SUCCESS, 
//         POST_COMMENT_ERROR, 
//         ADD_NEW_COMMENT
//     } from '../actions/types';

// const initialState = {
//     response:null, 
//     error:null, 
//     comments:[]
// };

// export default (state=initialState, action) => {
//     switch (action.type) {
//         case POST_COMMENT_REQUEST:
//         return {
//             ...state, 
//         }

//         case POST_COMMENT_SUCCESS:  
//             return {
//                 ...state, 
//                 response:action.response
//             }
        
//         case POST_COMMENT_ERROR: 
//             return {
//                 ...state, 
//                 error:action.error
//             }

//         case ADD_NEW_COMMENT: 
//             console.log('STATE IN COMMENTS',state)
//             return {
//             ...state,
//             comments:[...action.comments ]
//             }

//         default: 
//             return state
            
//     };
// };
