import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import posts from './posts'
import geolocation from './geolocation';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  nav,
  auth,
  posts,
  geolocation,
  form: formReducer,
});
