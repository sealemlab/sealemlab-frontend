import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n/index";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus:false, // 登录状态
  },
  getters: {
    isEnLang() {
      return i18n.locale == "en";
    },
    getLogin(state){
      return state.loginStatus
    }
  },
  mutations: {
    // 设置登录状态
    setLogin(state, data) {
      state.loginStatus = data;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的MenuActive
          loginStatus: val.loginStatus,
        };
      },
    }),
  ],
});
