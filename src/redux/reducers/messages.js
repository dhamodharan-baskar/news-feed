import {
    GET_MESSAGE_LIST,
    SHOW_DELETE_OPTION,
    DELETE_MESSAGE,
    SHOW_LOADER
  } from "../actionTypes";

  
var initialState = {
    messageId: null,
    messages: [],
    pageToken: null,
    loading: false
  }
  
  //current user reducer
  export const messages = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_LOADER: 
        return {
          ...state,
          loading: action.boolean
        };
      case GET_MESSAGE_LIST:
        return {
          ...state,
          messages: [...state.messages, ...action.payload.messages],
          pageToken: action.payload.pageToken,
          loading: false
        };

      case SHOW_DELETE_OPTION:
        return {
          ...state,
          messageId: action.id
        };

      case DELETE_MESSAGE:
          return {
            ...state,
            messages: state.messages.filter(item => item.id !== action.id)
          };
 
      default:
        return state
   }
  }