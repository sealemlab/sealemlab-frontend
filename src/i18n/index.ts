import Vue from "vue";
import VueI18n from "vue-i18n";
import utils from "../utils/index";
// utils.isLang()
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: process.env.NODE_ENV === 'production'?"EN":"ZH",
  messages: {
    ZH: require("./cn"),
    EN: require("./en"),
  },
});
export default i18n;
