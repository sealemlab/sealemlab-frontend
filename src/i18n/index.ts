import Vue from "vue";
import VueI18n from "vue-i18n";
import utils from "../utils/index";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: utils.getCookie("LANG") || "cn",
  messages: {
    cn: require("./cn"),
    en: require("./en"),
  },
});
export default i18n;
