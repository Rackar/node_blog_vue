import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    temp: {
      ifTemp: false,
      title: "",
      content: ""
    },
    token: "",
    userid: "",
    username: ""
  },
  mutations: {
    login_saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("token", data);

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
    logout_delToken(state) {
      state.token = "";
      window.localStorage.removeItem("token");

      // console.log(dd);
      state.userid = "";
      state.username = "";
    },
    saveTempContent(state, data) {
      state.temp.title = data.title;
      state.temp.content = data.content;
      state.temp.ifTemp = true;
    }
  },
  actions: {}
});
