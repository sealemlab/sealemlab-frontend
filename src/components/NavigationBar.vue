<template>
  <div class="nav" :class="isEnLang ? 'en_Bold' : 'cn_lang'">
    <div class="nav_left">
      <img class="logo" src="../assets/images/logo.png" alt="" @click="toRoute('/home')" />
      <ul>
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item.link)">
          <span class="font18"> {{ $t(item.label) }}</span>
        </li>
      </ul>
    </div>
    <div class="nav_right">
      <div class="st_price">
        <img src="../assets/images/stlogo.png" class="st_price_img" />
        <span class="font_price font16">$5.45</span>
      </div>
      <div class="login_box">
        <span class="font_login font16">Register/Login</span>
      </div>
      <div class="connect font16">{{ $t("message.nav.txt9") }}</div>
      <div class="lang_box" @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false">
        <span>{{ language }}</span>
        <img src="../assets/images/accrow.png" alt="" />
        <transition name="select-lang" appear>
          <ul v-show="showLangSelect">
            <li v-for="(item, index) in langArr" :key="index" @click="selectLang(index)">{{ item }}</li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navActive: 0,
      navArr: [
        { label: "message.nav.txt1", link: "/bond" },
        { label: "message.nav.txt2", link: "" },
        { label: "message.nav.txt3", link: "/nft" },
        { label: "message.nav.txt4", link: "" },
        { label: "message.nav.txt5", link: "" },
        { label: "message.nav.txt6", link: "/user/assets/0" },
        { label: "message.nav.txt7", link: "" }
      ],
      showLangSelect: false,
      language: "",
      langArr: ["EN", "CN"],
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
  watch: {
    $route(to, from) {
      if (from.matched.length && to.matched[0].path != from.matched[0].path) {
        window.scrollTo(0, 0);
      }
      if (to.path == "/home") {
        this.navActive = -1;
      }else if (to.path == '/bond') {
        this.navActive = 0;
      } else if (to.path.indexOf("/nft/") !== -1) {
        this.navActive = 2;
      } else if (to.path.indexOf("/user/") !== -1) {
        this.navActive = 5;
      }
    },
  },
  created() {
    this.language = this.$i18n.locale == "en" ? this.langArr[0] : this.langArr[1];
  },
  methods: {
    toRoute(link) {
      if (link) this.$router.push(link);
    },
    selectLang(index) {
      if (this.language == this.langArr[index]) return (this.showLangSelect = false);
      this.language = this.langArr[index];
      this.$i18n.locale = this.language == "EN" ? "en" : "cn";
      this.$utils.setCookie("LANG", this.$i18n.locale);
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // padding: 0 96px;
}
.nav_left {
  display: flex;
  align-items: center;
  .logo {
    width: auto;
    height: 62px;
    margin-right: 14px;
    cursor: pointer;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      cursor: pointer;
      padding: 10px 14px;
      font-weight: bold;
      color: #fff;
      &.active {
        span {
          background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        // background: url("../assets/images/menubg.png") no-repeat;
        // background-size: 100% 100%;
      }
    }
  }
}
.nav_right {
  display: flex;
  align-items: center;
  .st_price{
    display: flex;
    align-items: center;
    .st_price_img{
      width: 32px;
    }
    .font_price{
      font-weight: bold;
      color: #F0C682;
      line-height: 19px;
      margin-left: 10px;
    }
  }
  .login_box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 23px 0 53px;
    .font_login{
      font-weight: bold;
      color: #FFFFFF;
      line-height: 19px;
    }
  }
  .connect {
    cursor: pointer;
    padding: 5px 10px;
    background: #232229;
    border: 1px solid #4f4e53;
    border-radius: 8px;
    // background: url("../assets/images/connect.png") no-repeat;
    // background-size: 100% 100%;
    margin-right: 17px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 19px;
  }
  .lang_box {
    cursor: pointer;
    position: relative;
    padding: 0 10px;
    span {
      margin-right: 5px;
      color: #939393;
    }
    img {
      width: 15px;
      height: auto;
    }
    ul {
      width: 100%;
      height: auto;
      background: #000;
      text-align: center;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 99;
      transition: transform 0.3s;
      transform-origin: top center;
      padding: 10px 0;
      li {
        padding: 5px 0;
        color: #939393;
        // 语言切换单独设置，不能改
        &:nth-child(1) {
          font-family: TrajanPro-Bold;
        }
        &:nth-child(2) {
          font-family: WenYue-GuDianMingChaoTi-JRFC;
        }
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
.select-lang-enter,
.select-lang-leave-to {
  transform: scaleY(0);
}
.select-lang-enter-to,
.select-lang-leave {
  transform: scaleY(1);
}
</style>
