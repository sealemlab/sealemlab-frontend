import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n/index";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
      loginStatus:false, // 登录状态
      username:'',
      password:'',
      rememberStatus:false
    },
    imgUrl:process.env.NODE_ENV === 'production'?'//cdn.hashland.com/sacredTestImg/':'//cdn.hashland.com/sacredTestImg/',//图片前缀
    codeTime:60,//验证码重新发送时间
    emailReg:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,//邮箱校验
    pwReg: /^[a-zA-Z0-9]{6,16}$/ //密码校验 6-16位数字英文组合
  },
  getters: {
    isEnLang() {
      return i18n.locale == "en";
    },
    getLogin(state){
      return state.userInfo
    },
    // 是否是移动端
    getIsMobile(){
      return document.body.clientWidth <= 980
    },
  },
  mutations: {
    // 设置登录状态
    setLogin(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    setLogin({commit},data){
      commit('setLogin',data)
    }
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        return {
          // 只储存state中的MenuActive
          userInfo: val.userInfo,
        };
      },
    }),
  ],
});
