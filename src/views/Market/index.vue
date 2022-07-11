<template>
  <div class="market_page">
    <PcPage class="pc_content"></PcPage>
    <MobilePage class="mobile_content"></MobilePage>
  </div>
</template>
<script>
import MobilePage from "./MobilePage.vue";
import PcPage from "./PcPage.vue";
export default {
  components: {
    MobilePage,PcPage
  }
}
</script>
<style lang="scss" scoped>
.market_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;
}
.pc_content{
  display: flex;
}
.mobile_content{
  display: none;
}
@media screen and (max-width: 980px) {
  .market_page {
    width: 100%;
    padding: 1rem 5vw 0.2rem;
  }
  .pc_content{
    display: none;
  }
  .mobile_content{
    display: flex;
  }
}
</style>