import axios from 'axios';


export function getList() {
  return axios
    .get(`http://jsonplaceholder.typicode.com/users`)
    .then(res => res.data)
}

export function remove(id) {
  return Promise.resolve('removed');
}

export function update(id, user) {
  return Promise.resolve('updated');
}