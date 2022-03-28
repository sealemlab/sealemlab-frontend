<template>
  <div class="nav">
    <div class="nav_left">
      <img class="logo" src="../assets/images/logo.png" alt="" />
      <ul>
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item.link)">
          <span> {{ $t(item.label) }}</span>
        </li>
      </ul>
    </div>
    <div class="nav_right">
      <div class="connect">{{ $t("message.nav.txt9") }}</div>
      <div class="lang_box" @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false">
        <span>{{ lang }}</span>
        <img src="../assets/images/accrow.png" alt="" />
        <transition name="select-lang" appear>
          <ul v-show="showLangSelect">
            <li @click="selectLang($t('message.nav.txt10'))">{{ $t("message.nav.txt10") }}</li>
            <li @click="selectLang($t('message.nav.txt11'))">{{ $t("message.nav.txt11") }}</li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navActive: 0,
      showLangSelect: false,
      lang: "English",
      navArr: [
        { label: "message.nav.txt1", link: "/home" },
        { label: "message.nav.txt2", link: "/nft" },
        { label: "message.nav.txt3", link: "" },
        { label: "message.nav.txt4", link: "" },
        // { label: "message.nav.txt5", link: "" },
        // { label: "message.nav.txt6", link: "" },
        { label: "message.nav.txt7", link: "" },
        { label: "message.nav.txt8", link: "" },
      ],
    };
  },
  watch: {
    $route(to, from) {
      if (to.path == "/home") {
        this.navActive = 0;
      } else if (to.path.indexOf("/nft") !== -1) {
        this.navActive = 1;
      }
    },
  },
  methods: {
    toRoute(link) {
      if (link) this.$router.push(link);
    },
    selectLang(lang) {
      this.lang = lang;
      this.showLangSelect = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
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
        font-family: WenYue-GuDianMingChaoTi-JRFC, WenYue-GuDianMingChaoTi;
        font-weight: normal;
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
    font-family: WenYue-GuDianMingChaoTi-JRFC;
    font-weight: 800;
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
        &:hover {
          color: #939393;
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
