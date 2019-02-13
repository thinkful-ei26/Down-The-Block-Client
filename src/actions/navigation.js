import { 
    DISPLAY,
    TOGGLE_NAVBAR,
} from './types';

export const display = (component) => ({
    type: DISPLAY,
    component,
});

export const toggleNavbar = (bool) =>({
    type: TOGGLE_NAVBAR,
    bool
})