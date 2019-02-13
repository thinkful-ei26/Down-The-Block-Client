import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import geolocation from './geolocation';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  nav,
  auth,
  geolocation,
  form: formReducer,
});
