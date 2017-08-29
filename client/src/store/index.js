import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import auth from './modules/auth'
import app from './modules/app'

import * as getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    menu,
    auth,
    app
  },
  state: {},
  mutations: {}
});

export default store
