import socketClient from "socket.io-client";
import { API_BASE_URL } from '../config'; 

export const socket = socketClient(`${API_BASE_URL}`);

const initialState={
    socket, 
};


export default (state=initialState, action) => {
    switch (action.type) {	
        default: 
            return state
    }
}