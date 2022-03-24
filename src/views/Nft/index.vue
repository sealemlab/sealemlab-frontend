<template>
  <div class="page">
    <h1>NFT</h1>
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NFT extends Vue {
  private msg = "欲买桂花同载酒，终不似少年游！";
  private created() {
    console.log("created");
  }
}
</script>

<style lang="scss" scoped>
.page {
  h1 {
    color: #000;
  }
  font-size: 60px;
  background-image: linear-gradient(135deg, red, blue);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
