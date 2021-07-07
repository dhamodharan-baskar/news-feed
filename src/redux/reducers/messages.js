import {
    GET_MESSAGE_LIST,
    SHOW_DELETE_OPTION,
    DELETE_MESSAGE
  } from "../actionTypes";

  
var initialState = {
    messageId: null,
    messages: [],
    pageToken: null
  }
  
  //current user reducer
  export const messages = (state = initialState, action) => {
    switch (action.type) {

      case GET_MESSAGE_LIST:
        return {
          ...state,
          messages: [...state.messages, ...action.payload.messages],
          pageToken: action.payload.pageToken
        };

      case SHOW_DELETE_OPTION:
        return {
          ...state,
          messageId: action.id
        };

      case DELETE_MESSAGE:
        console.log('delete', action)
          return {
            ...state,
            messages: state.messages.filter(item => item.id !== action.id)
          };
 
      default:
        return state
   }
  }