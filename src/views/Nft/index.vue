<template>
  <div class="page">
    <div class="tab_box">
      <div class="tab_left">
        <router-link class="a_link font18" v-for="(route, index) in navArr" :key="index" :to="route.link">
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
        { label: "message.nft.txt3", link: "/nft/blind-box" },
        { label: "message.nft.txt4", link: "/nft/my-nft" },
        { label: "message.nft.txt5", link: "/nft/giving" },
        { label: "message.nft.txt6", link: "/nft/lease" },
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
  margin-top: 80px;
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
        color: #ffffff;
        padding: 10px;
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
