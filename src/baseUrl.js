import axios from 'axios'
import { APP_URL } from './constants'
const baseURL = axios.create({
  baseURL: APP_URL,
  responseType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default baseURL