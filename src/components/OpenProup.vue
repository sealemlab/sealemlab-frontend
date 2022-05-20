<template>
  <div class="record_page" v-if="resultStatus">
    <div class="title font26">开盲盒结果</div>
    <img
      :src="`${$store.state.imgUrl}close.webp`"
      class="close_img"
      @click="closepage"
    />
    <div class="boxarr">
      <div class="out_box_one" v-for="(item, index) in boxarr" :key="index" @click="nftFun(item)">
        <div class="onebox">
          <div class="out_img"><img :src="item.src" class="imgcard" /></div>
          <div class="huxing_bg_box">
            <img :src="`${$store.state.imgUrl}huxing6.webp`" class="huxing_img" />
            <div class="huxing_content">
              <div class="start">
                <span class="span1 font24">{{item.start}}</span>
                <img :src="`${$store.state.imgUrl}start.webp`" />
              </div>
              <div class="people_type">
                <div class="leftimgbox" v-if="item.type == 1">
                  <img :src="`${$store.state.imgUrl}type_jds.webp`" />
                  <span class="font12">{{$t("message.nft.txt9")}}</span>
                </div>
                <div class="leftimgbox" v-if="item.type == 2">
                  <img :src="`${$store.state.imgUrl}type_cike.webp`"/>
                  <span class="font12">{{$t("message.nft.txt11")}}</span>
                </div>
                <div class="leftimgbox" v-if="item.type == 3">
                  <img :src="`${$store.state.imgUrl}type_wushi.webp`"/>
                  <span class="font12">{{$t("message.nft.txt10")}}</span>
                </div>
                <div class="leftimgbox" v-if="item.type == 4">
                  <img :src="`${$store.state.imgUrl}type_zs.webp`"/>
                  <span class="font12">{{$t("message.nft.txt8")}}</span>
                </div>
                <div class="leftimgbox">
                  <img :src="`${$store.state.imgUrl}power1.webp`" v-if=" item.power <= 20"/>
                  <img :src="`${$store.state.imgUrl}power2.webp`" v-else-if=" item.power <= 40 && item.power >20"/>
                  <img :src="`${$store.state.imgUrl}power3.webp`" v-else-if=" item.power <= 60 && item.power >40"/>
                  <img :src="`${$store.state.imgUrl}power4.webp`" v-else-if=" item.power <= 80 && item.power >60"/>
                  <img :src="`${$store.state.imgUrl}power5.webp`" v-else-if=" item.power <= 100 && item.power >80"/>
                  <span class="font12">{{item.power}}</span>
                </div>
              </div>
              <div class="people_type">
                <div class="left_content">
                  <span class="font14 scale_box">
                    {{$t(`message.nft.type${item.type}.suit${item.suit}.position${item.position}`)}}
                  </span>
                  <div class="box_3d">
                    <span class="font12"># {{item.id}}</span>
                    <img :src="`${$store.state.imgUrl}new3d.webp`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="Suspension_btnbox">
      <span class="bottom_title fontsize12_400">按钮上方提示信息</span>
      <div class="btn_box fontsize18" @click="winbtnsure">
        确认
      </div>
    </div> -->
    <div class="video_proup" v-if="videoStatus">
      <video class="video_" :src="videoSrc" loop autoplay muted controls></video>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click="closeProup"/>
    </div>
  </div>
</template>

<script>
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
  computed: {
    ...mapGetters(["getIsMobile"])
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
    color: #ffffff;
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
    .out_box_one{
      width: 20%;
      padding: 10px;
      .onebox {
        position: relative;
        cursor: pointer;
        width: 204px;
        height: 292px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        // padding: 0 13px 18px;
        background: url($bg_url + 'nftbg6.webp') no-repeat;
        background-size: contain;
        .out_img{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .imgcard {
            height: 184px;
          }
        }
        .huxing_bg_box{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          .huxing_img{
            width: 100%;
          }
          .huxing_content{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 49px 13px 10px;
            .start{
              position: absolute;
              top: 41px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom:5px;
              .span1{
                font-weight: 800;
                color: #EFB045;
                line-height: 29px;
                margin-right: 5px;
              }
              img{
                width: 24px;
              }
            }
            .people_type{
              margin-top: 7px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img{
                width: 24px;
              }
              .leftimgbox{
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .left_content{
                width: 100%;
                display: flex;
                flex-direction: column;
                .scale_box{
                  white-space:nowrap;
                  zoom:0.8;
                  font-weight: 800;
                  line-height: 14px;
                }
                .box_3d{
                  margin-top: 5px;
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  span{
                    font-weight: 800;
                    line-height: 14px;
                    transform: scale(0.83);
                    zoom:0.8;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .Suspension_btnbox {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%);
    width: 637px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(
      180deg,
      #06366d 0%,
      rgba(7, 31, 58, 0) 100%,
      #034088 100%
    );
    border-radius: 79px;
    padding-top: 24px;
    .bottom_title {
      color: #ffffff;
    }
    .btn_box {
      width: 274px;
      height: 59px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #ffffff;
      cursor: pointer;
      margin-top: 14px;
    }
  }
}
.video_proup{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 88;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  .video_{
    height: 90%;
    object-fit: cover;
  }
  .close_img{
    position: absolute;
    top: 30px;
    right: 30px;
    width: 34px;
    cursor: pointer;
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    .title {
      margin-top: 1rem;
      width: 100%;
      text-align: center;
      color: #ffffff;
    }
    .close_img {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      width: 0.36rem;
      object-fit: contain;
    }
    .boxarr {
      width: 100%;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      min-height: 3.7rem;
      max-height: 3.7rem;
      overflow-y: auto;
      margin: 0.3rem;
      .onebox {
        position: relative;
        width: 1.56rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0.05rem;
        margin-bottom: 0.16rem;
        .imgcard {
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .Suspension_btnbox {
      position: absolute;
      bottom: 0.15rem;
      left: 50%;
      transform: translate(-50%);
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(
        180deg,
        #06366d 0%,
        rgba(7, 31, 58, 0) 100%,
        #034088 100%
      );
      border-radius: 0.79rme;
      padding-top: 0.12rem;
      .bottom_title {
        color: #ffffff;
        transform: scale(0.8);
      }
      .btn_box {
        width: 1.67rem;
        height: 0.39rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #ffffff;
        cursor: pointer;
        margin-top: 0.06rem;
      }
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
