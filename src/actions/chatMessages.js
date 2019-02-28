import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';
import {
    DISPLAY_NEW_PRIVATE_MESSAGE,
    SET_ACTIVE_CHAT, 
    CHATS
} from './types';

export const fetchNewPrivateMessage = (chatId, message) => ({
    type:DISPLAY_NEW_PRIVATE_MESSAGE, 
    chatId, 
    message
});

export const setActiveChat = (activeChat) => ({
    type:SET_ACTIVE_CHAT, 
    activeChat
});

export const chats = (chatsArray) => ({
    type:CHATS,
    chatsArray
});

