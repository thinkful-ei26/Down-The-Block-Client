import {
  DISPLAY,
  TOGGLE_NAVBAR,
  SHOW_ANIMATION,
  FOCUS_ON
} from '../actions/types';

const INITIAL_STATE = {
  display: 'neighbors',
  toggleNavbar: false,
  showAnimation: false,
  focusOn: "",
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
        console.log('IN SHOW ANIMATION REDUCER, IT IS', action.bool)
      return Object.assign({}, state, {
        showAnimation: action.bool,
      });   
    case FOCUS_ON:
      console.log(action.focus, action.form)
      return Object.assign({}, state, {
        focusOn: action.focus,
      });     
    default:
      return state;
  }
};
