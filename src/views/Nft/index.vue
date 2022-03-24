<template>
  <div class="page">
    <div class="tab_box">
      <div class="tab_left">
        <router-link v-for="(route, index) in navArr" :key="index" :to="route.link" tag="button">{{ route.label }}</router-link>
      </div>
      <div class="tab_right"><router-view /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NFT extends Vue {
  private msg = "欲买桂花同载酒，终不似少年游！";
  private navArr = [
    { label: "nft1", link: "/nft/nft1" },
    { label: "nft2", link: "/nft/nft2" },
    { label: "nft3", link: "/nft/nft3" },
  ];

}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #000;
  .tab_box {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .tab_left {
      width: 20%;
      button {
        display: block;
      }
    }
    .tab_right {
      width: 80%;
    }
  }
}
</style>
