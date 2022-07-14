<template>
  <div class="record_page" v-if="resultStatus">
    <div class="title font32 mobile_font16" :class="isEnLang?'en_heavy':''">{{$t('message.tip.self_txt12')}}</div>
    <img
      :src="`${$store.state.imgUrl}close.webp`"
      class="close_img"
      @click="closepage"
    />
    <div class="boxarr">
      <BoxComponents :selfBoxBetween="boxarr.length > 1?true:false" :selfBoxCentr="true" :centr="true" :nftArr="boxarr" @nftFun="nftFun"></BoxComponents>
    </div>
    <div class="video_proup" v-if="videoStatus">
      <video class="video_" :src="videoSrc" loop autoplay muted controls></video>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click="closeProup"/>
    </div>
  </div>
</template>

<script>
import BoxComponents from "@/components/BoxComponents.vue"
import { mapGetters } from "vuex";
export default {
  props: {
    resultStatus: {
      type: Boolean,
      default: false
    },
    boxarr: {
      type: Array,
      default: function () { return [] }
    }
  },
  data(){
    return{
      videoStatus:false,
      videoSrc:'',
    }
  },
  watch:{
    'resultStatus': {
      handler: function (newValue) {
        if(newValue){
          document.body.style.overflow='hidden'
        console.log('boxarr: ', this.boxarr);
        }else{
          document.body.style.overflow='visible'
        }
      },
      deep: true,
      immediate: true,
    }
  },
  components:{
    BoxComponents
  },
  computed: {
    ...mapGetters(["isEnLang"])
  },
  methods: {
    nftFun(item){
      this.videoStatus = true
      this.videoSrc = item.videoSrc
    },
    // 弹窗关闭
    closepage () {
      this.$emit('closepage')
    },
    winbtnsure () {
      this.$emit('winbtnsure')
    },
    closeProup(){
      this.videoStatus = false
    }
  }
}
</script>

<style lang='scss' scoped>
.record_page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 3s linear 1;
  .title {
    margin-top: 50px;
    width: 100%;
    text-align: center;
    color: #CED3D9;
  }
  .close_img {
    position: absolute;
    top: 40px;
    right: 100px;
    width: 44px;
    object-fit: contain;
    cursor: pointer;
  }
  .boxarr {
    width: 100%;
    padding: 0 5vw;
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 132px;
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    .title {
      margin-top: 0.4rem;
      width: 100%;
      text-align: center;
      color: #CED3D9;
    }
    .close_img {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      width: 0.25rem;
      object-fit: contain;
    }
    .boxarr {
      width: 100%;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      overflow-y: auto;
      margin: 0.3rem;
    }
  }
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
