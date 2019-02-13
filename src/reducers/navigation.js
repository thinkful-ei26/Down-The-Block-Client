import {
  DISPLAY,
  TOGGLE_NAVBAR,
} from '../actions/types';

const INITIAL_STATE = {
  display: 'neighbor-forum',
  toggleNavbar: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY:
      return Object.assign({}, state, {
        display: action.component,
      });
    case TOGGLE_NAVBAR:
      console.log(action.bool);
      if(action.bool===true || action.bool===false){
        console.log('CHANGING TOGGLE1', action.bool)
        return Object.assign({}, state, {
          toggleNavbar: action.bool,
        })
      }
      console.log('CHANGING TOGGLE2', action.bool)
      return Object.assign({}, state, {
        toggleNavbar: !state.toggleNavbar,
      })
    default:
      return state;
  }
};
