import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    output: "",
    token: ""
  },
  mutations: {
    login_saveToken(state, data) {
      state.token = data;
    },
    saveTempContent(state, data) {
      state.output = data;
    }
  },
  actions: {}
});
