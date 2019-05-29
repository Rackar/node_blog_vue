import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    output: "",
    token: "",
    userid: "",
    username: ""
  },
  mutations: {
    login_saveToken(state, data) {
      state.token = data;
      function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = decodeURIComponent(
          atob(base64Url)
            .split("")
            .map(function(c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(base64);
      }
      var dd = parseJwt(data.split(" ")[1]);
      // console.log(dd);
      state.userid = dd.userid;
      state.username = dd.username;
    },
    saveTempContent(state, data) {
      state.output = data;
    }
  },
  actions: {}
});
