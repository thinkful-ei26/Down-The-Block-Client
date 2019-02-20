import {
  DISPLAY,
  TOGGLE_NAVBAR,
  SHOW_ANIMATION
} from '../actions/types';

const INITIAL_STATE = {
  display: 'neighbors',
  toggleNavbar: false,
  showAnimation: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY:
      return Object.assign({}, state, {
        display: action.component,
      });
    case TOGGLE_NAVBAR:
      if(action.bool===true || action.bool===false){
        return Object.assign({}, state, {
          toggleNavbar: action.bool,
        })
      }
      return Object.assign({}, state, {
        toggleNavbar: !state.toggleNavbar,
      })
      case SHOW_ANIMATION:
      return Object.assign({}, state, {
        showAnimation: action.bool,
      });    
    default:
      return state;
  }
};
