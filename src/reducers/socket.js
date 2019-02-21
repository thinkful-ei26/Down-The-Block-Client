import socketClient from "socket.io-client";

export const socket = socketClient("http://localhost:8080");
const initialState={
    socket, 
    posts: []
};


export default (state=initialState, action) => {
    switch (action.type) {	
        default: 
            return state
    }
}