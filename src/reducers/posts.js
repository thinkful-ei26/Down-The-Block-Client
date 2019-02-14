import { 
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CHANGE_SEARCH_TERM
} from '../actions/types';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: null,
  searchTerm: '',
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
    case CREATE_POST_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case CREATE_POST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case CREATE_POST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case CHANGE_SEARCH_TERM:
      return Object.assign({}, state, {
        searchTerm: action.searchTerm,
      })
    default:
      return state;
  }
};
