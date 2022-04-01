import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n/index";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // imgUrl:
    //   process.env.NODE_ENV === "production"
    //     ? "//cdn.hashland.com/images/"
    //     : "//cdn.hashland.com/testimgs/", //图片前缀
  },
  getters: {
    isEnLang() {
      return i18n.locale == "en";
    },
  },
  mutations: {},
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的MenuActive
          // MenuActive: val.MenuActive,
        };
      },
    }),
  ],
});
