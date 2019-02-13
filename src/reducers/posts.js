import { 
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts: action.posts,
        loading: false,
        error: null,
    })
    case FETCH_POSTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
    })
    default:
      return state;
  }
};
