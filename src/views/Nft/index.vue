<template>
  <div class="page">
    <div class="main_box">
      <ul :class="isEnLang ? 'ff_en_bold' : 'ff_cn_regular'">
        <li>Wonderful display, perfect trading platform</li>
        <li>Sacred Realm nft</li>
        <li>Dark nemesis, good at uninterrupted attack, so that the enemy has no room to fight back!</li>
      </ul>
    </div>
    <div class="tab_box">
      <div class="tab_left">
        <router-link class="a_link" :class="isEnLang ? 'ff_en_bold' : 'ff_cn_regular'" v-for="(route, index) in navArr" :key="index" :to="route.link">
          {{ route.label }}
        </router-link>
      </div>
      <div class="tab_right"><router-view /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navArr: [
        { label: "角   色", link: "/nft/role" },
        { label: "购买盲盒", link: "/nft/buy-blind-box" },
        { label: "赠送", link: "/nft/giving" },
        { label: "租赁", link: "/nft/lease" },
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
  created() {
    // console.log("当前语言：", this.$i18n.locale);
    // console.log("English：", this.isEnLang);
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  .main_box {
    width: 100vw;
    height: calc(100vw * 0.58);
    background: url("../../assets/images/nftimage/nft_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 5vw;
    ul {
      max-width: 800px;
      position: relative;
      top: 60%;
      li {
        &:nth-child(1) {
          font-size: 26px;
        }
        &:nth-child(2) {
          font-size: 70px;
          color: #ffffff;
        }
        &:nth-child(3) {
          max-width: 500px;
          font-size: 22px;
          font-weight: 400;
        }
      }
    }
  }
  .tab_box {
    width: 80vw;
    min-height: 25vh;
    margin: 0 auto;
    position: relative;
    top: 50px;
    .tab_left {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      .a_link {
        display: block;
        text-decoration: none;
        font-size: 35px;
        color: #ffffff;
        padding: 20px 50px;
        margin-bottom: 20px;
        &.router-link-active {
          background: linear-gradient(270deg, rgba(140, 106, 56, 0) 0%, #bf9a50 100%);
          border-image: linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(184, 155, 91, 1)) 1 1;
        }
      }
    }
  }
}
</style>
