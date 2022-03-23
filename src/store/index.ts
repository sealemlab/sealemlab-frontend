import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    MenuActive: sessionStorage.getItem("vuex") || 0, // 导航栏菜单索引
    // imgUrl:
    //   process.env.NODE_ENV === "production"
    //     ? "//cdn.hashland.com/images/"
    //     : "//cdn.hashland.com/testimgs/", //图片前缀
  },
  getters: {
    // 获取导航栏状态
    getMenuIndex(state) {
      return state.MenuActive;
    },
  },
  mutations: {
    // 设置导航栏状态
    setMenuStatus(state, isMenu) {
      state.MenuActive = isMenu;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的MenuActive
          MenuActive: val.MenuActive,
        };
      },
    }),
  ],
});
