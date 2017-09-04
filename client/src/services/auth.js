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
    .then(res => res.data.result);
}

export function emailExists(email) {
  return http
    .post('/emailExists', { email: email })
    .then(res => res.data.result);
}

export function usernameExists(username) {
  return http
    .post('/usernameExists', { username: username })
    .then(res => res.data.result);
}

export function createNewUser(user) {
  return http
    .post('/createNewUser', user)
    .then(res => res.data)
    .catch(res => console.log(res));
}

export function login(login) {
  return http
    .post('/login', login)
    .then(res => res.data)
    .catch(error => console.log(res));
}
