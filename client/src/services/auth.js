import axios from 'axios';


const ROOT_URI = 'http://localhost:3000';
const URI = ROOT_URI + '/auth';


export function emailExists(email) {
  return axios
    .post(URI + '/emailExists', { email: email })
    .then(res => {
      return res.data.result;
    });
}


export function usernameExists(username) {
  return axios
    .post(URI + '/usernameExists', { username: username })
    .then(({ data }) => {
      return data.result;
    });
}


