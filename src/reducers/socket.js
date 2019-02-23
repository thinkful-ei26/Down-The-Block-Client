import socketClient from "socket.io-client";
import { API_BASE_URL } from '../config'; 
import { DESTROY_SOCKET, CREATE_SOCKET } from '../actions/types'

export const socket = socketClient(`${API_BASE_URL}`);

const initialState={
    socket, 
};


export default (state=initialState, action) => {
    switch (action.type) {	
        case DESTROY_SOCKET:
            return Object.assign({}, state, {
                socket: null,
            })
        case CREATE_SOCKET:
            if(state.socket===null){
                return Object.assign({}, state, {
                    socket: socketClient(`${API_BASE_URL}`)
                })
            }
            else{
                return state;
            }
        default: 
            return state
    }
}