<template>
  <div class="my_nft">
    <p class="title_nft font32 mobile_font20" :class="isEnLang?'en_heavy':''">{{$t("message.nft.txt38")}}</p>
    <div class="box" v-if="nftArr.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div class="out_box_one" v-for="(item, index) in nftArr" :key="index" @click="nftFun(item)">
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
                    <!-- <img :src="`${$store.state.imgUrl}new3d.webp`" /> -->
                  </div>
                </div>
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
      <svg t="1653726615818" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="84371" width="200" height="200"><path d="M102.4 634.88h13.824c3.584 0 6.656 3.072 6.656 6.656 0 3.584-3.072 6.656-6.656 6.656H102.4v13.824c0 3.584-3.072 6.656-6.656 6.656-2.048 0-3.584-0.512-4.608-2.048-1.536-1.024-2.048-3.072-2.048-4.608v-13.824h-13.824c-3.584 0-6.656-3.072-6.656-6.656 0-3.584 3.072-6.656 6.656-6.656h13.824v-13.824c0-3.584 3.072-6.656 6.656-6.656 3.584 0 6.656 3.072 6.656 6.656v13.824z m901.12-54.784v-13.824c0-2.048-0.512-3.584-2.048-4.608-1.536-1.024-3.072-2.048-4.608-2.048-3.584 0-6.656 3.072-6.656 6.656v13.824h-13.824c-2.048 0-3.584 0.512-4.608 2.048-1.024 1.536-2.048 3.072-2.048 4.608 0 3.584 3.072 6.656 6.656 6.656h13.824v13.824c0 3.584 3.072 6.656 6.656 6.656 3.584 0 6.656-3.072 6.656-6.656V593.92h13.824c3.584 0 6.656-3.072 6.656-6.656 0-3.584-3.072-6.656-6.656-6.656H1003.52z m-496.128 225.28H163.84a13.98784 13.98784 0 0 1-13.824-13.824c0-7.68 6.144-13.824 13.824-13.824h61.952c-4.608-8.192-7.168-17.92-7.168-27.136V354.816c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h40.96V286.72c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h327.68c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v396.288c0 9.728-2.56 19.456-7.168 27.136H819.2c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-163.84v13.824c0 9.728-2.56 19.456-7.168 27.136h7.168c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-71.68c6.144 10.24 5.12 24.064-4.096 33.28-5.12 5.12-12.288 8.192-19.456 8.192s-14.336-3.072-19.456-8.192l-33.28-34.304z m50.176-27.136h43.52c14.848 0 27.136-12.288 27.136-27.136V354.304c0-14.848-11.776-26.624-26.112-26.624H271.872c-14.336 0-26.112 11.776-26.112 26.624v396.8c0 15.36 12.288 27.136 27.136 27.136h207.36l-7.168-7.168c-7.168-6.656-9.728-16.896-7.168-26.624l-12.8-12.8c-39.936 29.696-96.768 23.552-129.536-14.336-32.768-37.888-30.72-94.72 4.608-130.048 35.328-35.328 92.16-37.888 130.048-4.608 37.888 32.768 44.032 89.6 13.824 129.536l12.8 12.8c9.216-2.56 19.456 0 26.624 7.168l46.08 46.08z m97.792-68.608h40.96c14.848 0 27.136-12.288 27.136-27.136V286.72c0-15.36-12.288-27.136-27.136-27.136H368.64c-14.848 0-27.136 12.288-27.136 27.136v13.824h259.584c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v354.816z m-481.28-501.76h20.48c5.632 0 10.24 4.608 10.24 10.24s-4.608 10.24-10.24 10.24h-20.48v20.48c0 5.632-4.608 10.24-10.24 10.24-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168v-20.48h-20.48c-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168 0-5.632 4.608-10.24 10.24-10.24h20.48v-20.48c0-5.632 4.608-10.24 10.24-10.24s10.24 4.608 10.24 10.24v20.48z m-160.256 583.68c0-7.68 6.144-13.824 13.824-13.824h81.92c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-81.92c-3.584 0-7.168-1.536-9.728-4.096-3.072-2.56-4.096-6.144-4.096-9.728z m430.592-88.064c26.624-26.624 26.624-70.144 0-96.768-26.624-26.624-70.144-26.624-96.768 0-26.624 26.624-26.624 70.144 0 96.768 26.624 26.624 70.144 26.624 96.768 0zM300.544 381.952c0-7.68 6.144-13.824 13.824-13.824h150.016c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.608c0-7.68 6.144-13.824 13.312-13.824H532.48c7.68 0 13.312 6.144 13.312 13.824 0 7.68-6.144 13.824-13.312 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.096c0-7.68 6.144-13.824 13.824-13.824H409.6c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728zM40.96 436.736c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-18.432 40.96-40.96 40.96z m0-20.48c7.168 0 13.824-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m846.336-61.44c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-17.92 40.96-40.96 40.96z m0-20.48c7.168 0 14.336-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m0 0" fill="#CDCDCD" p-id="84372"></path></svg>
      {{$t("message.tip.self_txt13")}}
    </div>
    <div class="video_proup" v-if="videoStatus">
      <video class="video_" :src="videoSrc" loop autoplay muted controls></video>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click="closeProup"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sn } from "sealemlab-sdk";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue","getAccountStatus","isEnLang"])
  },
  data(){
    return{
      isOneLoading:false,//第一次是否加载
      loadMoreStatus:true,
      busy: false, // 为true则第一次不执行loadmore
      nftArr:[],
      videoStatus:false,
      videoSrc:''
    }
  },
  watch: {
    'videoStatus'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == -1 || newValue == undefined){
          console.log("还未连接钱包 ||  已退出钱包")
          this.isOneLoading = false
          this.loadMoreStatus = true
          this.busy =  false
          this.nftArr = []
        }else if(newValue == 0){
          console.log("已连接钱包")
          this.getAllUserNftInfo(res => {
            console.log('回调函数--用户拥有的总装备数:res: ', res);
            if(res == 0){
              this.nftArr = []
              this.isOneLoading = false
              this.loadMoreStatus = false
              return
            }
            let arr = JSON.parse(localStorage.getItem('nftInfo'))
            if(!arr ){
              console.log("缓存不存在情况")
              this.getUtilsFun()
              return
            }
            if(arr.length < res){
              console.log("缓存小于用户数据--此时获取的缓存数据的长度:",arr.length)
              this.getUtilsFun()
            }else{
              console.log("缓存数据等于用户数据")
              this.nftArr = JSON.parse(localStorage.getItem('nftInfo'))
              this.isOneLoading = false
              this.loadMoreStatus = false
            }
          })
        }else if(newValue > 0){
          console.log("切换账号")
          localStorage.removeItem('nftInfo')
          this.nftArr = []
          this.loadMoreStatus = true
          this.isOneLoading = false
          this.busy = false
          this.$utils.antiShakeFun(() => {
            this.getAllUserNftInfo(res => {
              console.log('回调函数--用户拥有的总装备数:res: ', res);
              if(res == 0){
                this.nftArr = []
                this.isOneLoading = false
                this.loadMoreStatus = false
                return
              }
              let arr = JSON.parse(localStorage.getItem('nftInfo'))
              if(!arr ){
                console.log("缓存不存在情况")
                this.getUtilsFun()
                return
              }
              if(arr.length < res){
                console.log("缓存小于用户数据--此时获取的缓存数据的长度:",arr.length)
                this.getUtilsFun()
              }else{
                console.log("缓存数据等于用户数据")
                this.nftArr = JSON.parse(localStorage.getItem('nftInfo'))
                this.isOneLoading = false
                this.loadMoreStatus = false
              }
            })
          },3000)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus && this.isOneLoading) {
        // console.log("loadmore加载更多")
        this.getUtilsFun(this.nftArr.length)
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
    },
    getUtilsFun(size = 0){
      this.$utils.getUserBindbox(this.getAccount,size).then(res => {
        console.log('此次加载数据的页数:%s使用公共方法获取到的数据:res: ',size,res);
        if(res.length > 0){
          this.loadMoreStatus = true
          this.isOneLoading = true
          this.busy = false
          this.nftArr = this.nftArr.concat(res)
          localStorage.setItem('nftInfo',JSON.stringify(this.nftArr))
        }else{
          this.loadMoreStatus = false
          this.isOneLoading = false
          this.busy = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.my_nft {
  width: 100%;
  min-height:100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title_nft{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 600;
    color: #FFFFFF;
    line-height: 63px;
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
    .out_box_one{
      width: 20%;
      padding: 10px 5px;
      .onebox {
        position: relative;
        cursor: pointer;
        width: 100%;
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
  .loading_box_content{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
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
    .box{
      margin-top: 0.32rem;
      width: 100%;
      max-height: 6.3rem;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-bottom: 0.2rem;
      .out_box_one{
        width: 50%;
        padding: 0.1rem 0.05rem;
        .onebox {
          position: relative;
          cursor: pointer;
          width: 100%;
          height: 2.92rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.2rem;
          background: url($bg_url + 'nftbg6.webp') no-repeat;
          background-size: contain;
          .out_img{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .imgcard {
              height: 1.84rem;
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
              padding: 0.21rem 0.13rem 0.1rem;
              .start{
                position: absolute;
                top: 0.27rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom:0.05rem;
                .span1{
                  font-weight: 800;
                  color: #EFB045;
                  line-height: 0.29rem;
                  margin-right: 0.05rem;
                }
                img{
                  width: 0.24rem;
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
  }
}
</style>