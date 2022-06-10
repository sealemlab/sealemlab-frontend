<template>
  <div class="my_nft">
    <p class="title_nft font32 mobile_font20" :class="isEnLang?'en_heavy':''">{{$t("message.nft.txt38")}}</p>
    <div class="martop"></div>
    <NftCompontent></NftCompontent>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NftCompontent from '@/components/NftCompontent.vue'
export default {
  components:{
    NftCompontent
  },
  computed: {
    ...mapGetters(["isEnLang"])
  }
};
</script>

<style lang="scss" scoped>
.my_nft {
  width: 100%;
  // min-height:100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title_nft{
    position: absolute;
    top: 0;
    left: 0;
    // left: 50%;
    // transform: translateX(-50%);
    font-weight: 600;
    color: #CED3D9;
    line-height: 63px;
  }
  .martop{
    margin-top: 60px;
  }
}
@media screen and (max-width: 980px) {
  .my_nft {
    .title_nft{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 600;
      color: #CED3D9;
      line-height: 0.21rem;
      width: 100%;
      text-align: left;
    }
    .martop{
      margin-top: 0.3rem;
    }
  }
}
</style>