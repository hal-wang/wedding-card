import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    people: null
  },
  mutations: {
    SET_PEOPLE: (state, val) => {
      state.people = val
    }
  },
  actions: {
    setPeople({ commit }, val) {
      commit('SET_PEOPLE', val)
    }
  },
  modules: {}
})
