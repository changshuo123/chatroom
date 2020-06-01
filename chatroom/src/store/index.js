import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import startChat from './startChat'
import state from './state'
export default new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  modules:{
      startChat
  }
})
