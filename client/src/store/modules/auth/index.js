import * as types from '../../mutation-types';
import { checkLogin, logout } from 'services/auth';


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
    checkLogin()
      .then(res => commit(types.SET_AUTH, res));
  },
  logout({ commit }) {
    logout()
      .then(res => commit(types.SET_AUTH, false));
  }
}

export default {
  state,
  mutations,
  actions
}
