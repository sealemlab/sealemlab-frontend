<template>
  <div class="assets_page">
    <div class="box display_flex">
      <div class="mobile_menu">
        <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(index)">{{$t(item.title)}}</div>
      </div>
      <div class="title_box display_flex">
        <div class="address_box display_flex">
          <span class="font32 mobile_font16" :class="isEnLang?'en_Bold':''">{{nftArr.length}} NFT</span>
          <!-- <div class="add_address_metamask">
            <span class="font16" :class="isEnLang?'en_Bold':''">{{$t("message.user.txt7")}}:0x*********</span>
            <img :src="`${$store.state.imgUrl}add.webp`" class="add_img" />
          </div> -->
        </div>
        <div class="add_buybtn font16" @click="toBuy" :class="isEnLang?'en_medium':''">{{$t("message.user.txt17")}}</div>
        <div class="menu display_flex">
          <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(index)">{{$t(item.title)}}</div>
        </div>
      </div>
      <!-- <NftCompontent></NftCompontent> -->
      <!-- 盲盒跟nft装备 -->
      <div class="nft_box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div class="page_show_content">
          <BoxComponents :nftArr="nftArr" @nftFun="nftFun"></BoxComponents>
        </div>
        <div class="bottom_loading font16" :class="isEnLang ? 'en_heavy' : ''" v-if="nftArr.length > 7">
          <span v-if="loadMoreStatus">Loading...</span>
          <span v-else-if="!loadMoreStatus">End</span>
        </div>
      </div>
      <!-- loding -->
      <div class="market_ loading_box_content" v-if="nftArr.length == 0 && loadMoreStatus">
        <LoadingAnmation></LoadingAnmation>
      </div>
      <!-- nodata -->
      <div
        class="loading_box_content"
        v-else-if="nftArr.length == 0"
      >
        <svg
          t="1653726615818"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="84371"
          width="200"
          height="200"
        >
          <path
            d="M102.4 634.88h13.824c3.584 0 6.656 3.072 6.656 6.656 0 3.584-3.072 6.656-6.656 6.656H102.4v13.824c0 3.584-3.072 6.656-6.656 6.656-2.048 0-3.584-0.512-4.608-2.048-1.536-1.024-2.048-3.072-2.048-4.608v-13.824h-13.824c-3.584 0-6.656-3.072-6.656-6.656 0-3.584 3.072-6.656 6.656-6.656h13.824v-13.824c0-3.584 3.072-6.656 6.656-6.656 3.584 0 6.656 3.072 6.656 6.656v13.824z m901.12-54.784v-13.824c0-2.048-0.512-3.584-2.048-4.608-1.536-1.024-3.072-2.048-4.608-2.048-3.584 0-6.656 3.072-6.656 6.656v13.824h-13.824c-2.048 0-3.584 0.512-4.608 2.048-1.024 1.536-2.048 3.072-2.048 4.608 0 3.584 3.072 6.656 6.656 6.656h13.824v13.824c0 3.584 3.072 6.656 6.656 6.656 3.584 0 6.656-3.072 6.656-6.656V593.92h13.824c3.584 0 6.656-3.072 6.656-6.656 0-3.584-3.072-6.656-6.656-6.656H1003.52z m-496.128 225.28H163.84a13.98784 13.98784 0 0 1-13.824-13.824c0-7.68 6.144-13.824 13.824-13.824h61.952c-4.608-8.192-7.168-17.92-7.168-27.136V354.816c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h40.96V286.72c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h327.68c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v396.288c0 9.728-2.56 19.456-7.168 27.136H819.2c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-163.84v13.824c0 9.728-2.56 19.456-7.168 27.136h7.168c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-71.68c6.144 10.24 5.12 24.064-4.096 33.28-5.12 5.12-12.288 8.192-19.456 8.192s-14.336-3.072-19.456-8.192l-33.28-34.304z m50.176-27.136h43.52c14.848 0 27.136-12.288 27.136-27.136V354.304c0-14.848-11.776-26.624-26.112-26.624H271.872c-14.336 0-26.112 11.776-26.112 26.624v396.8c0 15.36 12.288 27.136 27.136 27.136h207.36l-7.168-7.168c-7.168-6.656-9.728-16.896-7.168-26.624l-12.8-12.8c-39.936 29.696-96.768 23.552-129.536-14.336-32.768-37.888-30.72-94.72 4.608-130.048 35.328-35.328 92.16-37.888 130.048-4.608 37.888 32.768 44.032 89.6 13.824 129.536l12.8 12.8c9.216-2.56 19.456 0 26.624 7.168l46.08 46.08z m97.792-68.608h40.96c14.848 0 27.136-12.288 27.136-27.136V286.72c0-15.36-12.288-27.136-27.136-27.136H368.64c-14.848 0-27.136 12.288-27.136 27.136v13.824h259.584c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v354.816z m-481.28-501.76h20.48c5.632 0 10.24 4.608 10.24 10.24s-4.608 10.24-10.24 10.24h-20.48v20.48c0 5.632-4.608 10.24-10.24 10.24-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168v-20.48h-20.48c-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168 0-5.632 4.608-10.24 10.24-10.24h20.48v-20.48c0-5.632 4.608-10.24 10.24-10.24s10.24 4.608 10.24 10.24v20.48z m-160.256 583.68c0-7.68 6.144-13.824 13.824-13.824h81.92c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-81.92c-3.584 0-7.168-1.536-9.728-4.096-3.072-2.56-4.096-6.144-4.096-9.728z m430.592-88.064c26.624-26.624 26.624-70.144 0-96.768-26.624-26.624-70.144-26.624-96.768 0-26.624 26.624-26.624 70.144 0 96.768 26.624 26.624 70.144 26.624 96.768 0zM300.544 381.952c0-7.68 6.144-13.824 13.824-13.824h150.016c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.608c0-7.68 6.144-13.824 13.312-13.824H532.48c7.68 0 13.312 6.144 13.312 13.824 0 7.68-6.144 13.824-13.312 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.096c0-7.68 6.144-13.824 13.824-13.824H409.6c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728zM40.96 436.736c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-18.432 40.96-40.96 40.96z m0-20.48c7.168 0 13.824-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m846.336-61.44c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-17.92 40.96-40.96 40.96z m0-20.48c7.168 0 14.336-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m0 0"
            fill="#CDCDCD"
            p-id="84372"
          ></path>
        </svg>
        {{ $t("message.tip.self_txt13") }}
      </div>
    </div> 
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
import { mapGetters } from "vuex";
import { marketInfo,token,getSourceUrl,sn,util} from 'sealemlab-sdk'
export default {
  computed: {
    ...mapGetters(["getNoticeNum","getAccount","getIstrue","getAccountStatus","isEnLang"])
  },
  data(){
    return{
      videoStatus: '',
      videoSrc:'',

      isOneLoading:false,//第一次是否加载
      loadMoreStatus:true,
      busy: false, // 为true则第一次不执行loadmore
      nftArr:[],
      userNftAndBoxArr:[],

      menuIndex:0,
      menuArr:[
        {title:'message.user.txt18'},
        {title:'message.user.txt19'},
        {title:'message.user.txt20'},
        // {title:'message.user.txt21'},
      ],
      BothsortObj: {
        first: 8, //查询结果数量，比如填10，就展示前10个结果
        skip: 0, //跳过结果数量，用于分页，比如填50，相当于从第6页开始
        orderBy: "buyTime", // 排序字段，填字段名，所有字段见下文查询结果
        orderDirection: "desc", // 降序or升序，填desc或asc
        buyer:'',
        seller: '',// 卖家地址
        nft:'',//nft地址
        token:'', // 代币地址
        price_gte:'',//最小价格
        price_lte:'',//最大价格
        stars:'',
        rarity: '',
        role: '',//职业
        part: '',//部位
        suit: '',//套装
        boxType:'',//盲盒类型
      },// 市场上成交的买卖双方的信息
    }
  },
  watch: {
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == -1 || newValue == undefined){
          this.loadMoreStatus = true
          this.nftArr = []
        }else if (newValue == 0) {
          this.integrationBoxAnsNft(true) // 获取用户的nft跟盒子
        } else if (newValue > 0) {
          localStorage.removeItem('nftInfo')
          sessionStorage.removeItem("setBoxInfo")
          this.loadMoreStatus = true
          this.nftArr = []
          this.menuIndex = 0
          this.$utils.antiShakeFun(() => {
            this.integrationBoxAnsNft(true)
          }, 2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    menuClick(index){
      this.menuIndex = index
      switch(index){
        case 0:
          this.nftArr = this.userNftAndBoxArr
          break;
        case 1:
          this.nftArr = []
          this.BothsortObj.seller = ''
          this.BothsortObj.skip = 0
          this.BothsortObj.buyer = this.getAccount
          this.BothSidesEncapsulationFun()
          break;
        case 2:
          this.nftArr = []
          this.BothsortObj.seller = this.getAccount
          this.BothsortObj.buyer = ''
          this.BothsortObj.skip = 0
          this.BothSidesEncapsulationFun()
          break;
        default:
          break;
      }
    },
    nftFun(item){
      if (item.isnft) {
        this.videoStatus = true
        this.videoSrc = item.videoSrc
      }
    },
    // 加载更多
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus && this.isOneLoading) {
        this.BothSidesEncapsulationFun()
      }
    },
    toBuy(){
      let arr = []
      arr.push({link: "/market",id:3})
      sessionStorage.setItem('routeArr',JSON.stringify(arr))
      this.$router.push('/market')
    },
    // 整合盲盒数据跟nft数据
    integrationBoxAnsNft (istrue = false) {
      this.userNftAndBoxArr = []
      let userBoxArr = JSON.parse(sessionStorage.getItem("setBoxInfo"))
      let userNftArr = JSON.parse(localStorage.getItem("nftInfo"))
      if(userBoxArr){
        if (userNftArr) {
          sn().tokensOfOwnerBySize(this.getAccount, 0, 100000000).then(res2 => {
            // console.log("公共函数:获取用户的装备信息:",res2)
            if(userNftArr.length != res2[0].length){
              this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res3 => {
                this.userNftAndBoxArr =  res3.concat(userBoxArr)
                if(istrue){
                  this.nftArr = this.userNftAndBoxArr
                }
                this.loadMoreStatus = false
                this.isOneLoading = false
                this.busy = true
              })
            }else{
              this.userNftAndBoxArr =  userNftArr.concat(userBoxArr)
              if(istrue){
                this.nftArr = this.userNftAndBoxArr
              }
              this.loadMoreStatus = false
              this.isOneLoading = false
              this.busy = true
            }
          })
        } else {
          this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res => {
            console.log('用户有的总的nft的数量res: ', res);
            if (res.length > 0) {
              this.userNftAndBoxArr = res.concat(userBoxArr)
              localStorage.setItem('nftInfo', JSON.stringify(res))
              if(istrue){
                this.nftArr = this.userNftAndBoxArr
              }
              this.loadMoreStatus = false
              this.isOneLoading = false
              this.busy = true
            } else {
              this.userNftAndBoxArr = userBoxArr
              if(istrue){
                this.nftArr = this.userNftAndBoxArr
              }
              this.loadMoreStatus = false
              this.isOneLoading = false
              this.busy = true
            }
          })
        }
      }else{
        this.$utils.newgetUserBoxInfoFun(this.getAccount).then(res => {
          sessionStorage.setItem("sb_count", res)
          let userBoxArr = JSON.parse(sessionStorage.getItem("setBoxInfo"))
          if (userNftArr) {
            sn().tokensOfOwnerBySize(this.getAccount, 0, 100000000).then(res2 => {
              // console.log("公共函数:获取用户的装备信息:",res2)
              if(userNftArr.length != res2[0].length){
                this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res3 => {
                  this.userNftAndBoxArr =  res3.concat(userBoxArr)
                  if(istrue){
                    this.nftArr = this.userNftAndBoxArr
                  }
                  this.loadMoreStatus = false
                  this.isOneLoading = false
                  this.busy = true
                })
              }else{
                this.userNftAndBoxArr =  userNftArr.concat(userBoxArr)
                if(istrue){
                  this.nftArr = this.userNftAndBoxArr
                }
                this.loadMoreStatus = false
                this.isOneLoading = false
                this.busy = true
              }
            })
          } else {
            this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res => {
              console.log('用户有的总的nft的数量res: ', res);
              if (res.length > 0) {
                this.userNftAndBoxArr = res.concat(userBoxArr)
                localStorage.setItem('nftInfo', JSON.stringify(res))
                if(istrue){
                  this.nftArr = this.userNftAndBoxArr
                }
                this.loadMoreStatus = false
                this.isOneLoading = false
                this.busy = true
              } else {
                this.userNftAndBoxArr = userBoxArr
                if(istrue){
                  this.nftArr = this.userNftAndBoxArr
                }
                this.loadMoreStatus = false
                this.isOneLoading = false
                this.busy = true
              }
            })
          }
        })
      }
    },
    // 获取市场信息(获取买卖双方的成交信息)
    getBothSidesInfo(sortObj){
      return new Promise(resolve => {
        marketInfo.getBuyInfos(
          sortObj.first,
          sortObj.skip,
          sortObj.orderBy,
          sortObj.orderDirection,
          sortObj.buyer,
          sortObj.seller,
          sortObj.nft,
          sortObj.token,
          sortObj.price_gte,
          sortObj.price_lte,
          sortObj.stars,
          sortObj.rarity,
          sortObj.role,
          sortObj.part,
          sortObj.suit,
          sortObj.boxType
          ).then(res => {
          console.log('获取买卖双方的成交信息: ', res);
          if (res.data.buyInfos.length > 0) {
            const arr = JSON.parse(JSON.stringify(res.data.buyInfos));
            arr.forEach((element) => {
              element.price = util.formatEther(element.price) //this.$utils.convertBigNumberToNormal(Number(element.price),0,18,true)
              element.isnft = (element.nft).toLowerCase() == (token('production').SN).toLowerCase()?true:false
              element.buyloading = false
              if((element.token).toLowerCase() == (token().ST).toLowerCase()){
                element.price_currency = 'ST'
              }else if((element.token).toLowerCase() == (token().BUSD).toLowerCase()){
                element.price_currency = 'BUSD'
              }else{
                element.price_currency = '0X'
              }
              if(element.isnft){
                element.src = getSourceUrl([element.stars,element.power,element.role,element.part,element.suit]) + '.png'
                element.videoSrc = getSourceUrl([element.stars,element.power,element.role,element.part,element.suit]) + '.mp4'
              }else{
                element.title = 'Mysterybox'
                element.src = '//cdn.sealemlab.com/sealemlab_assets_test/images/mybox1.webp'
              }
            });
            resolve({ status: 0, arr: arr, msg: "Success" });
          } else {
            resolve({ status: 1, msg: "No data" });
          }
        })
      })
    },
    // 排序--筛选--封装函数(市场上买卖双方的信息)
    BothSidesEncapsulationFun(){
      this.loadMoreStatus = true
      this.getBothSidesInfo(this.BothsortObj).then((res) => {
        console.log('市场上买卖双方的信息--筛选以后的结果res: ', res);
        this.BothsortObj.skip += this.BothsortObj.first;
        if (res.status == 0) {
          this.nftArr = this.nftArr.concat(res.arr)
          this.loadMoreStatus = true
          this.isOneLoading = true
          this.busy = false
        } else if (res.status == 1) {
          this.loadMoreStatus = false
          this.isOneLoading = false
          this.busy = true
        }
        this.loadingHistory = true
      }).catch(() => {
        this.nftArr = [];
        this.isOneLoading = false
        this.busy = true
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.assets_page{
  width: 100%;
  .box{
    width: 100%;
    flex-direction: column;
    .mobile_menu{
      display: none;
    }
    .title_box{
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .address_box{
        flex-direction: column;
        align-items: center;
        .add_address_metamask{
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          .add_img{
            width: 11px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
      .add_buybtn{
        cursor: pointer;
        width: 163px;
        height: 48px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #000000;
      }
      .menu{
        align-items: center;
        .onebox{
          cursor: pointer;
          padding: 0 15px;
          height: 31px;
          background: #000000;
          border: 1px solid rgba(68, 67, 67, 0.47);
          text-align: center;
          line-height: 31px;
        }
        .activeMenu{
          color: #FADD82;
          // background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        }
      }
    }
  }
}
.market_{
  min-height: 10vh;
}
.nft_box{
  width: 100%;
  max-height: 730px;
  overflow: auto;
  padding-bottom: 20px;
}
.nft_box::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@media screen and (max-width: 980px) {
  .assets_page{
    .box{
      .mobile_menu{
        display: flex;
        align-items: center;
        margin-bottom: 0.15rem;
        .onebox{
          cursor: pointer;
          padding: 0 15px;
          height: 31px;
          background: #000000;
          border: 1px solid rgba(68, 67, 67, 0.47);
          text-align: center;
          line-height: 31px;
        }
        .activeMenu{
          color: #FADD82;
          // background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        }
      }
      .title_box{
        .menu{
          display: none;
        }
        .address_box{
          align-items: flex-start;
          font-weight: 400;
          color: #DBDADA;
          line-height: 0.18rem;
          .add_address_metamask{
            margin-top: 0.1rem;
            .add_img{
              width: 0.11rem;
              margin-left: 0.1rem;
              cursor: pointer;
            }
          }
        }
        .add_buybtn{
          width: 0.66rem;
          height: 0.24rem;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.04rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          color: #000000;
        }
      }
    }
  }
}
</style>