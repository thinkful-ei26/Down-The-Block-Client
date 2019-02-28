import {
    DISPLAY_NEW_PRIVATE_MESSAGE,
    SET_ACTIVE_CHAT, 
    CHATS
} from '../actions/types';

const initialState={
    chats:[],
    message: '', 
    chatId:0, 
    activeChat:{}
};

export default (state=initialState, action) => {
    switch (action.type) {
        case DISPLAY_NEW_PRIVATE_MESSAGE:
            return {
                ...state,
                message:action.message, 
                chatId:action.chatId
            }
        case SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.activeChat
            }
        case CHATS: 
            return {
                ...state,
                chats: action.chatsArray
            }
        default: 
            return state
    }
}