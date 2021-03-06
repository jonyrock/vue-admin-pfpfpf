import { getInstance } from 'services/http';

const http = getInstance('auth');

export function checkLogin() {
  return http
    .get('/checkLogin')
    .then(res => res.data.result);
}

export function logout() {
  return http
    .get('/logout')
    .then(res => res.data.result)
    .catch(logoutError => true);
}

export function validateUsername(username, id) {
  var url = '/validateUsername/';
  if(id !== undefined) {
    url += id;
  }
  return http
    .post(url, { username: username })
    .then(res => {
      res = res.data;
      if(res.error !== undefined) {
        return Promise.reject(res.error);
      }
      return res;
    });
}

export function validateEmail(email, id) {
  var url = '/validateEmail/';
  if(id !== undefined) {
    url += id;
  }
  return http
    .post(url, { email: email })
    .then(res => {
      res = res.data;
      if(res.error !== undefined) {
        return Promise.reject(res.error);
      }
      return res;
    });
}

export function createNewUser(user) {
  return http
    .post('/createNewUser', user)
    .then(res => {
      res = res.data;
      if(res.error !== undefined) {
        return Promise.reject(res.error);
      }
      return res;
    });
}

export function login(login) {
  return http
    .post('/login', login)
    .then(res => {
      res = res.data;
      if(res.error !== undefined) {
        return Promise.reject(res.error);
      }
      return res;
    });
}
