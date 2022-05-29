import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/index";
import "./style/reset.scss";
import "./style/global.scss";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faHouse,
  faGlobe,
  faBoxesPacking,
  faBuildingFlag,
  faCoins,
  faRegistered,
  // faGamepadModern,
  faCircleDollarToSlot,
  // faSauareVirus,
  faGem,
  // faCoinFront,
  
  // faSquareDollar,
  faMoneyBill,
  faFileInvoiceDollar,
  faDice,
  // faTreasureChest,
  // faMelon,

  faAddressCard,
  // faShieldCheck,
  // faHryvniaCign,
  faCalendarDays,
  faStore,
  // faSwords
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCalendarDays,
  faStore,
  faHouse,
  faGlobe,
  faBoxesPacking,
  faBuildingFlag,
  faCoins,
  faRegistered,
  faCircleDollarToSlot,
  faGem,
  faMoneyBill,
  faFileInvoiceDollar,
  faDice,
  faAddressCard
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import api from "./api/api";
Vue.prototype.$api = api;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import BtnLoading from "./components/Btnloading.vue";
Vue.component("BtnLoading", BtnLoading);

import FunBtn from "./components/FunctionButton.vue";
Vue.component("FunBtn", FunBtn);

import Slider from "./components/ProgressBar.vue";
Vue.component("Slider", Slider);

import LoadingAnmation from '@/components/loadingAnmation.vue'
Vue.component("LoadingAnmation", LoadingAnmation);

import RingProgress from '@/components/RingProgress.vue'
Vue.component("RingProgress", RingProgress);

import Proup from "@/components/Proup.vue";
Vue.component("Proup", Proup);

import Notice from "@/components/Notice.vue";
Vue.component("Notice", Notice);

import Input from "@/components/InpuptComponents.vue";
Vue.component("Input", Input);

import WalletComponents from "@/components/walletcomponents.vue";
Vue.component("WalletComponents", WalletComponents);

import utils from "./utils/index";
Vue.prototype.$utils = utils;

// @ts-ignore
import vueiInfinite from 'vue-infinite-scroll'
Vue.use(vueiInfinite)

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
