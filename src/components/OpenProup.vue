<template>
  <div class="record_page" v-if="resultStatus">
    <div class="title font32 mobile_font16" :class="isEnLang?'en_heavy':''">{{$t('message.tip.self_txt12')}}</div>
    <img
      :src="`${$store.state.imgUrl}close.webp`"
      class="close_img"
      @click="closepage"
    />
    <div class="boxarr">
      <!-- <div class="out_box_one" v-for="(item, index) in boxarr" :key="index" @click="nftFun(item)">
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
                    <svg t="1653790729523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3152" width="16" height="16">
                      <path d="M528.516129 53.97471l371.893677 214.709677a33.032258 33.032258 0 0 1 16.516129 28.605936v429.419354a33.032258 33.032258 0 0 1-16.516129 28.605936L528.516129 970.02529a33.032258 33.032258 0 0 1-33.032258 0l-371.893677-214.709677a33.032258 33.032258 0 0 1-16.516129-28.605936V297.290323a33.032258 33.032258 0 0 1 16.516129-28.605936L495.483871 53.97471a33.032258 33.032258 0 0 1 33.032258 0z m-16.516129 66.741677L206.170839 297.290323l93.48129 53.991225-33.032258 57.211871-93.48129-53.974709v353.131355L478.967742 884.190968 478.967742 776.258065h66.064516v107.932903l305.829161-176.55742V354.502194l-93.48129 53.974709-33.032258-57.211871 93.48129-53.991226L512 120.716387z m-113.796129 255.405419c25.666065 0.264258 46.046968 8.456258 61.159226 24.592517a81.226323 81.226323 0 0 1 22.049032 55.741935c0 10.834581-1.932387 21.28929-5.797161 31.347613-4.525419 10.074839-12.58529 19.026581-24.196129 26.92129 11.875097 7.729548 20.446968 17.011613 25.748645 27.86271 5.020903 10.834581 7.547871 22.181161 7.547871 34.056258-0.264258 26.458839-8.456258 47.285677-24.592516 62.513548-15.855484 15.624258-36.252903 23.552-61.159226 23.816258a77.460645 77.460645 0 0 1-51.084387-18.580645c-14.848-12.387097-24.460387-30.323613-28.853678-53.809548h40.464517c3.600516 9.414194 8.704 17.028129 15.277419 22.841806 6.722065 6.061419 15.624258 9.083871 26.723097 9.083871 11.858581 0 21.867355-4.062968 29.99329-12.188903 8.258065-7.597419 12.519226-18.448516 12.766968-32.520258-0.247742-14.319484-4.508903-25.418323-12.766968-33.28-8.125935-7.613935-18.448516-11.429161-30.967742-11.429161h-17.028129V497.300645h13.923097c13.807484 0 24.526452-3.79871 32.140387-11.412645 7.597419-7.349677 11.412645-16.896 11.412645-28.638968-0.247742-11.891613-4.195097-21.619613-11.809032-29.233548-7.597419-7.349677-17.408-11.164903-29.39871-11.412645-8.654452 0-16.516129 2.77471-23.618064 8.324129-7.498323 5.549419-12.519226 14.12129-15.112258 25.732129H320.578065c2.064516-20.892903 10.520774-38.515613 25.352258-52.851613 14.583742-14.170839 32.008258-21.404903 52.257032-21.669161z m209.589677 2.328775c38.201806 0.264258 66.85729 16.136258 85.949936 47.616 6.837677 10.570323 11.164903 21.669161 12.965161 33.28l0.528516 5.103484c0.990968 11.098839 1.519484 27.581935 1.585549 49.515354l0.016516 5.582452c0 30.323613-1.090065 51.480774-3.303226 63.488a70.87071 70.87071 0 0 1-4.624516 16.251871 150.263742 150.263742 0 0 1-7.944258 14.534193c-8.258065 13.278968-19.736774 24.245677-34.452645 32.883613-14.583742 9.298581-32.454194 13.939613-53.611355 13.939613h-95.793549V378.450581H607.793548z m-4.822709 40.464516h-51.100904V620.180645h51.100904c22.577548 0 39.341419-7.267097 50.275096-21.784774l1.981936-2.807742 1.932387-2.692129c3.666581-5.582452 6.061419-12.370581 7.168-20.331355 0.924903-7.267097 1.486452-19.604645 1.651613-36.996129l0.049548-4.855742 0.033033-15.161806c-0.082581-21.636129-0.660645-37.342968-1.734194-47.120516-1.552516-10.570323-5.235613-19.15871-11.032774-25.732129-10.405161-14.336-24.526452-22.214194-42.429936-23.618065l-3.897806-0.198193z" p-id="3153" fill="#CDCDCD"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <BoxComponents :selfBoxCentr="true" :centr="true" :nftArr="boxarr" @nftFun="nftFun"></BoxComponents>
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
      color: #CED3D9;
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
      color: #CED3D9;
      cursor: pointer;
      margin-top: 14px;
    }
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    .title {
      margin-top: 1rem;
      width: 100%;
      text-align: center;
      color: #CED3D9;
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
      overflow-y: auto;
      margin: 0.3rem;
      .out_box_one{
        width: 50%;
        padding: 0.05rem;
        .onebox {
          position: relative;
          width: 100%;
          min-height: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 0.05rem;
          margin-bottom: 0.16rem;
          .out_img{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .imgcard {
              height: 1.6rem;
            }
          }
          .huxing_bg_box{
            .huxing_content{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 0.29rem 0.08rem 0.1rem;
              .start{
                position: absolute;
                top: 0.29rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom:0.05rem;
                .span1{
                  font-weight: 800;
                  color: #EFB045;
                  line-height: 0.26rem;
                  margin-right: 0.05rem;
                }
                img{
                  width: 0.13rem;
                }
              }
              .people_type{
                margin-top: 0.07rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                img{
                  width: 0.24rem;
                }
                .leftimgbox{
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  &:nth-child(2){
                    align-items: center;
                  }
                }
                .left_content{
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  .scale_box{
                    white-space:nowrap;
                    zoom:0.8;
                    font-weight: 800;
                    line-height: 0.14rem;
                  }
                  .box_3d{
                    margin-top: 0.05rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span{
                      font-weight: 800;
                      line-height: 0.14rem;
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
    // .Suspension_btnbox {
    //   position: absolute;
    //   bottom: 0.15rem;
    //   left: 50%;
    //   transform: translate(-50%);
    //   width: 80%;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   background: linear-gradient(
    //     180deg,
    //     #06366d 0%,
    //     rgba(7, 31, 58, 0) 100%,
    //     #034088 100%
    //   );
    //   border-radius: 0.79rme;
    //   padding-top: 0.12rem;
    //   .bottom_title {
    //     color: #CED3D9;
    //     transform: scale(0.8);
    //   }
    //   .btn_box {
    //     width: 1.67rem;
    //     height: 0.39rem;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    //     background-size: 100% 100%;
    //     background-repeat: no-repeat;
    //     color: #CED3D9;
    //     cursor: pointer;
    //     margin-top: 0.06rem;
    //   }
    // }
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
