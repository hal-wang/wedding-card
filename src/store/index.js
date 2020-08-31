import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: null,
  },
  mutations: {
    SET_CONFIG: (state, val) => {
      state.config = val;
    },
  },
  actions: {
    setConfig({ commit }, val) {
      commit("SET_CONFIG", val);
    },
  },
  modules: {},
});
