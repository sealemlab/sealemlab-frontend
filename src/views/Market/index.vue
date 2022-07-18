<template>
  <div class="market_page">
    <PcPage @openVideo="openVideo" class="pc_page" v-if="!getIsMobile"></PcPage>
    <MobilePage @openVideo="openVideo" class="mobile_page" v-if="getIsMobile"></MobilePage>
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
      console.log('data: ', data);
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
}
.mobile_page{
  display: none;
}
.pc_page{
  display: flex;
}
@media screen and (max-width: 980px) {
  .market_page {
    width: 100%;
    padding: 0.7rem 5vw 0.2rem;
  }
  .pc_page{
    display: none;
  }
  .mobile_page{
    display: flex;
  }
}
</style>