<template>
  <div>
    <h1>NFT</h1>
    adshkdjhaksjhdh
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NFT extends Vue {
  private msg = "欲买桂花同载酒，终不似少年游！";
  // 生命周期
  private created() {
    console.log("created");
  }
}
</script>

<style lang="scss" scoped></style>
