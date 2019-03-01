import {
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_ERROR,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSSAGE_ERROR,
    UPDATE_CHAT,
    SET_NEW_DAY
} from '../actions/types';

const initialState={
    chat: null,
    loading: false,
    error: null,
    namespace: null,
    day: null,
};

export default (state=initialState, action) => {
    switch (action.type) {
      case FETCH_CHAT_REQUEST:
        return Object.assign({}, state, {
          loading: true,
        });
      case FETCH_CHAT_SUCCESS:
        return Object.assign({}, state, {
          chat: action.chat,
          loading: false,
          error: null,
          namespace: action.namespace
      })
      case FETCH_CHAT_ERROR:
        return Object.assign({}, state, {
          loading: false,
          error: action.error,
      })
      case SEND_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        chat: action.chat,
        loading: false,
        error: null,
    })
    case UPDATE_CHAT:
    return Object.assign({}, state, {
      chat: action.chat,
  })
  case SEND_MESSSAGE_ERROR:
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
  })
  case SET_NEW_DAY: 
    console.log('NEW DAY', action.day);
    return Object.assign({}, state, {
      day: action.day
    })
    default: 
        return state
    }
}