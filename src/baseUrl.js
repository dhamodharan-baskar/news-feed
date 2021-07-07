import axios from 'axios'

const baseURL = axios.create({
  baseURL: 'http://message-list.appspot.com',
  responseType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default baseURL