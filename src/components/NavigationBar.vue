<template>
  <div class="nav" :class="isEnLang ? 'en_Bold' : 'cn_lang'">
    <div class="nav_left">
      <img class="logo" src="../assets/images/logo.png" alt="" @click="toRoute('/home')" />
      <ul>
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item.link)">
          <span> {{ $t(item.label) }}</span>
        </li>
      </ul>
    </div>
    <div class="nav_right">
      <div class="connect">{{ $t("message.nav.txt9") }}</div>
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
        { label: "message.nav.txt1", link: "/home" },
        { label: "message.nav.txt2", link: "/nft" },
        { label: "message.nav.txt3", link: "" },
        { label: "message.nav.txt4", link: "" },
        // { label: "message.nav.txt5", link: "" },
        // { label: "message.nav.txt6", link: "" },
        { label: "message.nav.txt7", link: "" },
        { label: "message.nav.txt8", link: "/user/assets/0" },
      ],
      showLangSelect: false,
      language: "",
      langArr: ["English", "繁体中文"],
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
  watch: {
    $route(to, from) {
      if (from.matched.length && to.matched[0].path != from.matched[0].path) {
        window.scrollTo(0, 0);
      }
      if (to.path == "/home") {
        this.navActive = 0;
      } else if (to.path.indexOf("/nft/") !== -1) {
        this.navActive = 1;
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
      this.$i18n.locale = this.language == "English" ? "en" : "cn";
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
}
.nav_left {
  display: flex;
  align-items: center;
  .logo {
    width: auto;
    height: 60px;
    margin-right: 20px;
    cursor: pointer;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      cursor: pointer;
      margin: 0 10px;
      padding: 10px 15px;
      span {
        font-size: 19px;
      }
      &.active {
        span {
          font-weight: bold;
          color: #d8d8d8;
          background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        background: url("../assets/images/menubg.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
.nav_right {
  display: flex;
  align-items: center;
  .connect {
    cursor: pointer;
    padding: 5px 20px;
    background: url("../assets/images/connect.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
    font-size: 16px;
    color: #381a02;
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
