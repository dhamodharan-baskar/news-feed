import {
  GET_MESSAGE_LIST,
  SHOW_DELETE_OPTION,
  DELETE_MESSAGE
} from "../actionTypes";
import baseUrl from '../../baseUrl'



export function getMessages (token) {
    return (dispatch) => {
      const url = `/messages${token ? `?pageToken=${token}`: ''}`
      return baseUrl.get(url).then(res => {
        dispatch(updateMessages(res.data))
      })
    }
}
export function updateMessages (data) {
    return {
      type: GET_MESSAGE_LIST,
      payload: data
    }
}

export function deleteMessage(id) {
    return {
        type: DELETE_MESSAGE,
        id
    };
}

export function showDeleteOption(id) {
  return {
      type: SHOW_DELETE_OPTION,
      id
  };
}
