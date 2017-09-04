import * as types from '../../mutation-types';
import { checkLogin } from 'services/auth';


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
  }
}

export default {
  state,
  mutations,
  actions
}
