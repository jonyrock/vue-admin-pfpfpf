import axios from 'axios';
import store from 'vuex-store'


const ROOT_URI = 'http://localhost:3000';
const URI = ROOT_URI + '/users';

export function getList() {
  return axios
    .get(URI + '/list')
    .then(res => res.data);
}

export function update(id, user) {
  return axios
    .put(URI + '/${id}', user)
    .then(res => res.data);
}

export function remove(id) {
  return axios
    .delete(URI + '/${id}')
    .then(res => res.data);
}

