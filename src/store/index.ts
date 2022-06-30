import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n/index";
import createPersistedState from "vuex-persistedstate";
import utils from "@/utils/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    antiShakeTimer:null,// 函数防抖定时器对象
    prizeInfo: {
      status: false,
      boxarr: [],
    }, // 开盲盒弹窗信息
    userBoxInfo: sessionStorage.getItem("setBoxInfo") || [], //用户的盲盒信息
    userInfo: {
      loginStatus: false, // 登录状态
      rememberStatus: false,
      mailAccount: "",
      password: "",
      token: "",
      activationTime: "",
      lastLogin: "",
      addr: "",
    },
    newWalletInfo: {
      account: "",
      chainID: "",
      status: false,
      changeAccount:-1
    }, // 钱包信息
    walletstatus: false, // 钱包弹窗状态
    proupInfo: {
      status: false,
      isProgress: true,
      content: "",
      title: "message.tip.txt3",
      ortherDoing: false,
      link: "",
    }, // 提示框信息
    noticeInfo: {
      status: false,
      word: "",
    }, //轻提示信息
    // https://cdn.sealemlab.com/sealemlab_assets_test/images/accrow.webp
    imgUrl:
      process.env.NODE_ENV === "production"
        ? "//cdn.sealemlab.com/sealemlab_assets_main/images/"
        : "//cdn.sealemlab.com/sealemlab_assets_test/images/", //图片前缀
    videoUrl:
      process.env.NODE_ENV === "production" ? "//cdn.sealemlab.com/sealemlab_assets_main/video/" : "//cdn.sealemlab.com/sealemlab_assets_test/video/", //视频前缀
    htmlUrl:
      process.env.NODE_ENV === "production" ? "//cdn.sealemlab.com/sealemlab_assets_main/htmls/" : "//cdn.sealemlab.com/sealemlab_assets_test/htmls/", //图片前缀
    codeTime: 60, //验证码重新发送时间
    emailReg: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, //邮箱校验
    pwReg: /^[a-zA-Z0-9]{6,16}$/, //密码校验 6-16位数字英文组合
    ProgressInfo: {
      value: 1,
      title: "",
      speed:100
    }, // 给进度条传值
    noticeNum: false, // 轻提示弹窗只弹一次
    BSC_BROWSER: process.env.NODE_ENV === "production" ? "https://bscscan.com/" : "https://testnet.bscscan.com/",
    mobileInfo:{
      direction:'top',//默认上滑(true)
    },
    userCoin:{st: 0, sr: 0, busd: 0, stPrice: "0.00",stlpPrice:"0.00",srPrice:0},//用户各种币的余额
  },
  getters: {
    // 获取用户的币的余额
    getUserCoin(state){
      return state.userCoin;
    },
    // 获取移动端当前滑动方向
    getmobileInfo(state) {
      return state.mobileInfo;
    },
    // 获取开盲盒弹窗信息
    getPrizeInfo(state) {
      return state.prizeInfo;
    },
    // 获取是否可以再次弹起轻提示弹窗
    getNoticeNum(state) {
      return state.noticeNum;
    },
    // 获取进度条的值
    getProgressInfo(state) {
      return state.ProgressInfo;
    },
    // 获取用户盲盒信息
    getUserBoxInfo(state) {
      return state.userBoxInfo;
    },
    getProupInfo(state) {
      return state.proupInfo;
    },
    getNoticeInfo(state) {
      return state.noticeInfo;
    },
    // 中英文状态
    isEnLang() {
      return i18n.locale == "EN";
    },
    // 用户信息
    getLogin(state) {
      return state.userInfo;
    },
    // 是否是移动端
    getIsMobile() {
      return document.body.clientWidth <= 980;
    },
    // 获取钱包弹窗状态
    getwalletstatus(state) {
      return state.walletstatus;
    },
    // 获取完整账号
    getAccount(state) {
      return state.newWalletInfo.account;
    },
    // 截取过后的账号
    getSubtringAccount(state) {
      return utils.getSubStr(state.newWalletInfo.account, 4);
    },
    // 获取是否已连接且网络状态正确
    getIstrue(state) {
      return state.newWalletInfo.status;
    },
    getAccountStatus(state) {
      return state.newWalletInfo.changeAccount;
    },
    getProduction(){
      return process.env.NODE_ENV === "production" 
    }
  },
  mutations: {
    // 设置用户的币的余额
    setUserCoin(state,data){
      state.userCoin = data;
    },
    // 设置移动端上滑下滑
    setMoblieTouch(state, data){
      state.mobileInfo = JSON.parse(data);
    },
    // 设置开盲盒弹窗信息
    setPrizeInfo(state, data) {
      state.prizeInfo = JSON.parse(data);
    },
    // 设置轻提示弹窗弹起次数
    setNoticeNum(state, data) {
      state.noticeNum = data;
    },
    // 设置进度条的值
    setProgressInfo(state, data) {
      state.ProgressInfo = Object.assign(state.ProgressInfo,JSON.parse(data));
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
    setnewinfo(state, data) {
      state.newWalletInfo = JSON.parse(data);
    },
    // 设置弹窗钱包状态
    setwalletstatus(state, data) {
      state.walletstatus = data;
    },
    // 设置用户盲盒信息
    setBoxInfo(state, data) {
      state.userBoxInfo = data;
    },
  },
  actions: {
    setLogin({ commit }, data) {
      commit("setLogin", data);
    },
    setProgressInfo({ commit }, data) {
      commit("setProgressInfo", data);
    },
    // 设置开盲盒弹窗信息
    setPrizeInfo({commit},data) {
      commit('setPrizeInfo',data)
    },
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        return {
          // 只储存state中的MenuActive
          userInfo: val.userInfo,
          userCoin: val.userCoin
        };
      },
    }),
  ],
});
