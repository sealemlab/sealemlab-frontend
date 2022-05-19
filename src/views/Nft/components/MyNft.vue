<template>
  <div class="my_nft">
    <p class="title_nft font30">{{$t("message.nft.txt38")}}</p>
    <div class="box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div class="out_box" v-for="(item, index) in nftArr" :key="index" @click="nftFun(item)">
        <div class="onebox" >
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
                  <span class="font14">
                    <span v-if="item.suit == 1">神圣</span>
                    <span v-if="item.suit == 2">神秘</span>
                    <span v-if="item.suit == 3">钢铁</span>
                    <span v-if="item.suit == 4">沉默</span>
                    <span v-if="item.type == 1">{{$t("message.nft.txt9")}}</span>
                    <span v-if="item.type == 2">{{$t("message.nft.txt11")}}</span>
                    <span v-if="item.type == 3">{{$t("message.nft.txt10")}}</span>
                    <span v-if="item.type == 4">{{$t("message.nft.txt8")}}</span>
                    <span v-if="item.position == 1">武器</span>
                    <span v-if="item.position == 2">头</span>
                    <span v-if="item.position == 3">胸</span>
                    <span v-if="item.position == 4">手</span>
                    <span v-if="item.position == 5">脚</span>
                    <span v-if="item.position == 6">腰带</span>
                    <span v-if="item.position == 7">项链</span>
                    <span v-if="item.position == 8">戒指</span>
                  </span>
                  <span class="font12"># {{item.id}}</span>
                </div>
                <img :src="`${$store.state.imgUrl}new3d.webp`" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_loading font16" v-if="nftArr.length > 9">
        <span v-if="loadMoreStatus">Loading...</span>
        <span v-else-if="!loadMoreStatus">End</span>
      </div>
    </div>
    <div class="loading_box_content" v-if="nftArr.length == 0 && getIstrue && loadMoreStatus">
      <LoadingAnmation></LoadingAnmation>
    </div>
    <div class="loading_box_content" v-else-if="nftArr.length == 0 || !getIstrue">
      NoData
    </div>
    <div class="video_proup" v-if="videoStatus">
      <video class="video_" :src="videoSrc" loop autoplay muted controls></video>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click="closeProup"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sn } from "sacredrealm-sdk";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue"])
  },
  data(){
    return{
      isOneLoading:false,//第一次是否加载
      loadMoreStatus:true,
      busy: false, // 为true则第一次不执行loadmore
      nftArr:[],
      videoStatus:false,
      videoSrc:'',
    }
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.getAllUserNftInfo(res => {
            console.log('回调函数--用户拥有的总装备数:res: ', res);
            this.nftArr = []
            let arr = JSON.parse(localStorage.getItem('nftInfo'))
            if(!arr ){
              console.log("缓存不存在情况")
              this.$utils.getUserBindbox(this.getAccount,0).then(res1 => {
                console.log('缓存不存在情况res: ', res1);
                if(res1.length > 0){
                  this.loadMoreStatus = true
                  this.isOneLoading = true
                  this.busy = false
                  this.nftArr = this.nftArr.concat(res1)
                  localStorage.setItem('nftInfo',JSON.stringify(this.nftArr))
                }else{
                  this.loadMoreStatus = false
                  this.isOneLoading = false
                  this.busy = true
                }
              })
              return
            }
            if(arr.length < res){
              console.log("缓存小于用户数据")
              this.$utils.getUserBindbox(this.getAccount,arr.length).then(res2 => {
                console.log('缓存小于用户数据res: ', res2);
                if(res2.length > 0){
                  this.loadMoreStatus = true
                  this.isOneLoading = true
                  this.busy = false
                  this.nftArr = this.nftArr.concat(res2)
                  localStorage.setItem('nftInfo',JSON.stringify(this.nftArr))
                }
              })
            }else{
              console.log("缓存数据等于用户数据")
              this.nftArr = JSON.parse(localStorage.getItem('nftInfo'))
              this.isOneLoading = false
              this.loadMoreStatus = false
            }
          })
        }else{
          this.isOneLoading = false
          this.loadMoreStatus = true
          this.busy =  false
          this.nftArr = []
        }
      },
      deep: true,
      immediate: true,
    },
    'videoStatus'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
  },
  methods:{
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus && this.isOneLoading) {
        // console.log("loadmore加载更多")
        this.$utils.getUserBindbox(this.getAccount,this.nftArr.length).then(res2 => {
          if(res2.length > 0){
            this.loadMoreStatus = true
            this.isOneLoading = true
            this.busy = false
            this.nftArr = this.nftArr.concat(res2)
            localStorage.setItem('nftInfo',JSON.stringify(this.nftArr))
          }else{
            this.loadMoreStatus = false
            this.isOneLoading = false
            this.busy = true
          }
          console.log('loadmore加载更多res: ', res2);
        })
      }
    },
    nftFun(item){
      console.log('装备信息item: ', item);
      this.videoStatus = true
      this.videoSrc = item.videoSrc
    },
    getAllUserNftInfo(calback){
      sn().tokensOfOwnerBySize(this.getAccount, 0, 100000000).then(res => {
        // console.log('用户拥有的所有装备数量res: ', Number(res[1]));
        // this.userAllNft = res[1]
        calback(Number(res[1]))
      })
    },
    closeProup(){
      this.videoStatus = false
    }
  }
};
</script>

<style lang="scss" scoped>
.my_nft {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title_nft{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 600;
    color: #FFFFFF;
    line-height: 42px;
    // margin-bottom: 60px;
  }
  .box{
    margin-top: 60px;
    width: 100%;
    max-height: 630px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 20px;
    .out_box{
      width: 20%;
      padding: 10px;
      cursor: pointer;
      .onebox {
        position: relative;
        max-width: 204px;
        width: 100%;
        height: 292px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
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
              top: 38px;
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
              margin-top: 5px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left_content{
                display: flex;
                flex-direction: column;
                span{
                  font-weight: 800;
                  line-height: 14px;
                  &:nth-child(2){
                    margin-top: 8px;
                  }
                }
              }
              .leftimgbox{
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              img{
                width: 24px;
              }
            }
          }
        }
      }
    }
  }
  .loading_box_content{
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.bottom_loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
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
</style>