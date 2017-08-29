import * as types from '../../mutation-types'


const state = {
  isAuth: true
}

const mutations = {
  [types.SET_AUTH](state, payload) {
    state.isAuth = payload;
  }
}

const actions = {
  checkLogin({ commit }) {
    setInterval(() => {
      commit(types.SET_AUTH, true)  
    }, 1000);
  }
}

export default {
  state,
  mutations,
  actions
}
