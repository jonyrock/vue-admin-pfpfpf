import axios from 'axios';

const ROOT_URI = 'http://localhost:3000';


export function getInstance(baseURL) {
  if(baseURL === undefined) {
    baseURL = '';
  }
  if(baseURL.length === 0 || baseURL[0] !== '/') {
    baseURL = '/' + baseURL;
  }
  return axios.create({
    baseURL: ROOT_URI + baseURL,
    withCredentials: true
  })
}