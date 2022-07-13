<template>
  <div class="market_page">
    <PcPage class="pc_content" @openVideo="openVideo" v-if="!getIsMobile"></PcPage>
    <MobilePage class="mobile_content" @openVideo="openVideo" v-if="getIsMobile"></MobilePage>
    <div class="video_proup" v-if="videoStatus">
      <video
        class="video_"
        :src="videoSrc"
        loop
        autoplay
        muted
        controls
      ></video>
      <img
        :src="`${$store.state.imgUrl}close.webp`"
        class="close_img"
        @click="videoStatus = false"
      />
    </div>
  </div>
</template>
<script>
import MobilePage from "./MobilePage.vue";
import PcPage from "./PcPage.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    MobilePage,PcPage
  },
  computed: {
    ...mapGetters(["getIsMobile"])
  },
  data(){
    return{
      videoStatus: '',
      videoSrc:'',
    }
  },
  methods:{
    openVideo(data){
      this.videoStatus = true
      this.videoSrc = data
    }
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
    padding: 0.7rem 5vw 0.2rem;
  }
  .pc_content{
    display: none;
  }
  .mobile_content{
    display: flex;
  }
}
</style>