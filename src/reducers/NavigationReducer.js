import {
  DISPLAY,
} from '../actions/types';

const INITIAL_STATE = {
  display: 'neighbor-forum',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.component);
  switch (action.type) {
    case DISPLAY:
      return Object.assign({}, state, {
        display: action.component,
      });
    default:
      return state;
  }
};
