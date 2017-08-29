import * as types from '../../mutation-types'

import axios from 'axios';


const ROOT_URI = 'http://localhost:3000';
const URI = ROOT_URI + '/auth';



const state = {
  isAuth: undefined
}

const mutations = {
  [types.SET_AUTH](state, isAuth) {
    state.isAuth = isAuth;
  }
}

const actions = {
  checkLogin({ commit }) {
    axios
      .get(URI + '/check')
      .then(({ data }) => {
        console.log(data);
        commit(types.SET_AUTH, data.result === 'ok');
      });
  }
}

export default {
  state,
  mutations,
  actions
}
