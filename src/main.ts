import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/index";
import "./style/reset.scss";
Vue.config.productionTip = false;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default global options } */);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
