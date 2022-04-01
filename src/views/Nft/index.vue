<template>
  <div class="page" :class="isEnLang ? 'en_Bold' : 'cn_lang'">
    <div class="main_box">
      <ul>
        <li>{{ $t("message.nft.txt5") }}</li>
        <li>{{ $t("message.nft.txt6") }}</li>
        <li>{{ $t("message.nft.txt7") }}</li>
      </ul>
    </div>
    <div class="tab_box">
      <div class="tab_left">
        <router-link class="a_link" v-for="(route, index) in navArr" :key="index" :to="route.link">
          {{ $t(route.label) }}
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
        { label: "message.nft.txt1", link: "/nft/role" },
        { label: "message.nft.txt2", link: "/nft/buy-blind-box" },
        { label: "message.nft.txt3", link: "/nft/giving" },
        { label: "message.nft.txt4", link: "/nft/lease" },
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  .main_box {
    width: 100%;
    height: 58vw;
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
          line-height: 32px;
        }
        &:nth-child(2) {
          font-size: 70px;
          line-height: 85px;
          color: #ffffff;
        }
        &:nth-child(3) {
          max-width: 500px;
          font-size: 22px;
          line-height: 32px;
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
        font-size: 25px;
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
