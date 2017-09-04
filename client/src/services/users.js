import { getInstance } from 'services/http';
import store from 'vuex-store'


const http = getInstance('users');


export function getList() {
  return http
    .get('/list')
    .then(res => res.data);
}

export function update(id, user) {
  return http
    .put(`/${id}`, user)
    .then(res => res.data);
}

export function remove(id) {
  return http
    .delete(`/${id}`)
    .then(res => res.data);
}

