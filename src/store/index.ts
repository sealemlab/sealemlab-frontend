import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n/index";
import createPersistedState from "vuex-persistedstate";
import utils from "@/utils/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userBoxInfo:sessionStorage.getItem('setBoxInfo') || [],//用户的盲盒信息
    userInfo:{
      loginStatus:false, // 登录状态
      username:'',
      password:'',
      rememberStatus:false
    },
    newWalletInfo:{
      account:'',
      chainID:'',
      status:false
    }, // 钱包信息
    walletstatus:false,// 钱包弹窗状态
    proupInfo:{
      status:false,
      isProgress:true,
      content:'',
      title:'message.tip.txt3',
      ortherDoing:false,
    },// 提示框信息
    noticeInfo:{
      status:false,
      word:'',
    },//轻提示信息
    imgUrl:process.env.NODE_ENV === 'production'?'//cdn.hashland.com/sacredTestImg/':'//cdn.hashland.com/sacredTestImg/',//图片前缀
    codeTime:60,//验证码重新发送时间
    emailReg:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,//邮箱校验
    pwReg: /^[a-zA-Z0-9]{6,16}$/,//密码校验 6-16位数字英文组合
    ProgressInfo:{
      value:1,
      title:''
    } // 给进度条传值
  },
  getters: {
    // 获取进度条的值
    getProgressInfo(state) {
      return state.ProgressInfo
    },
    // 获取用户盲盒信息
    getUserBoxInfo(state) {
      return state.userBoxInfo
    },
    getProupInfo(state){
      return state.proupInfo
    },
    getNoticeInfo(state){
      return state.noticeInfo
    },
    // 中英文状态
    isEnLang() {
      return i18n.locale == "en";
    },
    // 用户信息
    getLogin(state){
      return state.userInfo
    },
    // 是否是移动端
    getIsMobile(){
      return document.body.clientWidth <= 980
    },
    // 获取钱包弹窗状态
    getwalletstatus(state){
      return state.walletstatus;
    },
    // 获取完整账号
    getAccount(state) {
      return state.newWalletInfo.account
    },
    // 截取过后的账号
    getSubtringAccount(state) {
      return utils.getSubStr(state.newWalletInfo.account,4)
    },
    // 获取是否已连接且网络状态正确
    getIstrue(state) {
      return state.newWalletInfo.status
    },
  },
  mutations: {
    // 设置进度条的值
    setProgressInfo(state, data) {
      state.ProgressInfo = JSON.parse(data);
    },
    // 轻提示状态
    setNoticeStatus(state, data) {
      state.noticeInfo = JSON.parse(data);
    },
    // 普通弹窗状态
    setProupStatus(state, data) {
      state.proupInfo = JSON.parse(data);
    },
    // 设置登录状态
    setLogin(state, data) {
      state.userInfo = data;
    },
    // 钱包链接信息
    setnewinfo(state,data){
      state.newWalletInfo = JSON.parse(data);
    },
    // 设置弹窗钱包状态
    setwalletstatus(state,data){
      state.walletstatus = data
    },
     // 设置用户盲盒信息
    setBoxInfo(state,data) {
      state.userBoxInfo = data;
    },
  },
  actions: {
    setLogin({commit},data){
      commit('setLogin',data)
    },
    setProgressInfo({commit},data){
      commit('setProgressInfo',data)
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
