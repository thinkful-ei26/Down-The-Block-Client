import { 
    DISPLAY,
    TOGGLE_NAVBAR,
    SHOW_ANIMATION,
    FOCUS_ON, 
    DESTROY_SOCKET,
    CREATE_SOCKET
} from './types';

export const display = (component) => ({
    type: DISPLAY,
    component,
});

export const toggleNavbar = (bool) =>({
    type: TOGGLE_NAVBAR,
    bool
})

export const showAnimation = (bool) => ({
    type: SHOW_ANIMATION,
    bool
})

export const focusOn = (focus) => ({
    type: FOCUS_ON,
    focus
})
