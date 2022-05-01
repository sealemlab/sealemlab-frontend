import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/index";
import "./style/reset.scss";
import "./style/global.scss";

import api from "./api/api";
Vue.prototype.$api = api;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import BtnLoading from "./components/Btnloading.vue";
Vue.component("BtnLoading", BtnLoading);

import Slider from "./components/ProgressBar.vue";
Vue.component("Slider", Slider);

import LoadingAnmation from '@/components/loadingAnmation.vue'
Vue.component("LoadingAnmation", LoadingAnmation);

import Proup from "@/components/Proup.vue";
Vue.component("Proup", Proup);

import Input from "@/components/InpuptComponents.vue";
Vue.component("Input", Input);

import utils from "./utils/index";
Vue.prototype.$utils = utils;

Vue.directive('loading-img', async function (el, binding) {//指令名称为：real-img
  const imgURL = binding.value;//获取图片地址
  if (imgURL) {
    el.setAttribute('src', imgURL);
  }
})
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
