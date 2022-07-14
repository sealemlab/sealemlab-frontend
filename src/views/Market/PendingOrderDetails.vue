<template>
  <div class="ordeDetails" v-if="orderStatus">
    <img :src="`${$store.state.imgUrl}back.webp`" class="back_img" @click="closeOrder" />
    <div class="content">
      <div class="left_">
        <p class="font32 p1 mobile_font20" :class="isEnLang ? 'en_Bold' : ''">{{$t("message.market.order_1")}}</p>
        <p class="font24 p2 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">{{$t("message.market.order_2")}}</p>
        <div class="box">
          <div class="type" :class="[disablehover ? 'clear_hover' : '']">
            {{selectCoin}}
            <svg
              t="1654321191240"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2336"
              :width="getIsMobile ? 16 : 16"
              :height="getIsMobile ? 16 : 16"
            >
              <path
                d="M454.188 785.022c-145.192-150.177-290.378-300.353-435.422-450.526-59.842-61.836 37.327-154.021 97.313-91.899 129.23 133.647 258.318 267.296 387.548 400.868 133.646-134.287 267.436-268.574 401.083-402.934 60.84-61.123 158.011 31.060 97.244 91.971-150.105 150.89-300.279 301.703-450.454 452.521-24.933 24.934-72.666 25.575-97.311 0z"
                p-id="2337"
                fill="#CED3D9"
              ></path>
            </svg>
            <div class="left_content_hover">
              <span
                class="span1 font14"
                v-for="(ele, index1) in sortByArr"
                :key="index1"
                @click="sortClikChildren(ele)"
              >
                {{ ele.name }}
              </span>
            </div>
          </div>
          <div class="input_num">
            <Input
              :readonly="feeStatus"
              :fontSize="'12px'"
              :modelValue="Pricevalue"
              type="number"
              :placeholder="$t('message.bond.txt23')"
              @input="PriceClick"
            ></Input>
          </div>
        </div>
        <p class="font24 p2 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">{{$t("message.market.order_3")}}</p>
        <div class="box">
          <div class="input_" v-if="feeStatus">
            <BtnLoading :isloading="true"></BtnLoading>
          </div>
          <div class="input_" v-else>{{fee | MultiplyBySquare}} %</div>
        </div>
        <p class="font24 p2 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">{{$t("message.market.order_4")}}</p>
        <div class="box">
          <div class="input_">{{getValue | PriceConversion}}</div>
        </div>
        <div class="tip_txt font16" :class="isEnLang?'en_medium':''">
          <img :src="`${$store.state.imgUrl}ques_new.webp`" class="ques_img"/>
          {{$t("message.market.order_5")}}
        </div>
        <div class="btn btn_normal" v-if="allLoading">
          <BtnLoading :isloading="true"></BtnLoading>
        </div>
        <div v-else :class="isEnLang ? 'en_Bold' : ''">
          <div v-if="userselectarr.isnft && userselectarr.isbox">
            <div class="btn btn_normal font16 mobile_font14" @click="sellfun" v-if="isApproveBox && isApproveNft">
              {{$t("message.market.sell_btn")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font14" @click="authorizationClick('box')" v-else-if="!isApproveBox">
              BOX {{$t("message.approve")}}<BtnLoading :isloading="boxisloading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font14" @click="authorizationClick('nft')" v-else-if="!isApproveNft">
              NFT {{$t("message.approve")}}<BtnLoading :isloading="nftisloading"></BtnLoading>
            </div>
          </div>
          <div v-else-if="userselectarr.isnft">
            <div class="btn btn_normal font16 mobile_font14" @click="sellfun" v-if="isApproveNft">
              {{$t("message.market.sell_btn")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font14" @click="authorizationClick('nft')" v-else-if="!isApproveNft">
              NFT {{$t("message.approve")}}<BtnLoading :isloading="nftisloading"></BtnLoading>
            </div>
          </div>
          <div v-else-if="userselectarr.isbox">
            <div class="btn btn_normal font16 mobile_font14" @click="sellfun" v-if="isApproveBox">
              {{$t("message.market.sell_btn")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font14" @click="authorizationClick('box')" v-else-if="!isApproveBox">
              BOX {{$t("message.approve")}}<BtnLoading :isloading="boxisloading"></BtnLoading>
            </div>
          </div>
        </div>
      </div>
      <div class="right_">
        <p class="p_positon font32 mobile_font20" :class="isEnLang ? 'en_Bold' : ''">{{$t("message.market.order_6")}}</p>
        <div class="showbox">
          <BoxComponents :nftArr="orderArr" :isColumn="true"></BoxComponents>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { market, contract,token, getSigner, util } from 'sealemlab-sdk'
import { mapGetters } from "vuex";
export default {
  props: {
    orderStatus: {
      type: Boolean,
      default: false
    },
    userselectarr:{
      type:Object,
      default:function(){return {}}
    }
  },
  watch:{
    'orderStatus'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
        this.getFeeFun()
      }else{
        document.body.style.overflow='visible'
      }
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == -1 || newValue == undefined){
          this.allLoading = false
          this.isApproveNft = this.isApproveBox = true
        }else if(newValue == 0){
          this.allLoading = true
          this.isApproveNft = this.isApproveBox = false
          this.getSDKInfo()
        }else if(newValue > 0){
          this.isApproveNft = this.isApproveBox = false
          this.allLoading = true
          clearInterval(this.btntimernull)
          this.$utils.antiShakeFun(() => {
            this.getSDKInfo()
          },2000)()
        }
      },
      deep: true,
      immediate: true,
    },
    'userselectarr': {
      handler: function (newValue) {
        if(newValue.arr.length > 0){
          this.orderArr = JSON.parse(JSON.stringify(newValue.arr))
          this.orderArr.forEach(element => {
            element.showSelect = false
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: { ...mapGetters(["getAccount","getIsMobile","getNoticeNum","isEnLang","getAccountStatus"])},
  data(){
    return{
      nft_code:1,
      box_code:1,
      allLoading:true,// 按钮转圈
      isApproveBox:false,//box 是否授权
      isApproveNft:false,//nft 是否授权
      buyLoading:false,//购买债券loading
      boxisloading:false,//box 授权loading
      nftisloading:false,//nft 授权loading
      getValue:0,
      Pricevalue:'',
      disablehover:false,
      selectCoin:'ST',
      fee:0,// 手续费
      feeStatus:true,
      sortByArr:[
        { name: "BUSD" },
        { name: "ST" },
      ],
      btntimernull:null,
      alredaySellStatus:false,
      orderArr:[]
    }
  },
  methods:{
    sellfun(){
      if(this.buyLoading)return
      if(!this.Pricevalue){
        return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_txt'}));
      }
      this.buyLoading = true
      // console.log('选中的nft/box: ', this.userselectarr.arr);
      // this.$utils.convertNormalToBigNumber(Number(this.Pricevalue), 18)
      this.processingArrayFun(this.userselectarr.arr,this.selectCoin,util.parseUnits(this.Pricevalue)).then(info => {
        console.log('处理好的数组res: ', info);
        let idArr = info.map(item => {
          return item.nftId
        })
        let priceArr = info.map(item => {
          return item.prices
        })
        let payAdress = info.map(item => {
          return item.type
        })
        let contractArr = info.map(item => {
          return item.address
        })
        let that = this
        market().connect(getSigner()).sell(contractArr,idArr,payAdress,priceArr).then(async data => {
          console.log('用户批量挂单data: ', data);
          const etReceipt = await data.wait();
          if(etReceipt.status == 1){
            that.buyLoading = false
            that.alredaySellStatus = true
            that.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
            if(that.userselectarr.isbox){
              console.log("刷新box")
              that.$utils.newgetUserBoxInfoFun(that.getAccount).then((res) => {
                sessionStorage.setItem("sb_count", res);
              })
            }
            if(that.userselectarr.isnft){
              console.log("刷新nft")
              this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res3 => {
                localStorage.setItem('nftInfo',JSON.stringify(res3))
              })
            }
            that.Pricevalue = ''
            that.getValue = 0
          }else{
            that.buyLoading = false
          }

        }).catch(() => {
          that.buyLoading = false
        })
      })
    },
    // 合约需要的三个数组处理方法
    processingArrayFun(arr,type,price){
      return new Promise((resolve) => {
        let count = 1
        let arr_cardinfo = []
        arr.map(async item => {
          let obj = {
            type:'',// 支付代币合约地址数组
            nftId:'',//NFT的ID数组
            prices:price,//价格数组
            address:'', // NFT合约地址数组
          }
          obj.nftId = item.nftId
          if(type == 'ST'){
            obj.type = token().ST
          }else if(type == 'BUSD'){
            obj.type = token().BUSD
          }
          obj.address = item.isnft?token().SN:token().SB
          arr_cardinfo.push(obj)
          if (count == arr.length) {
            resolve(arr_cardinfo);
          }
          count++
        })
      })
    },
    // 是否授权
    getSDKInfo(){
      let count = 0
      this.$utils.nftisApproveFun(this.getAccount,'sn',contract().Market).then(res => {
        // console.log('nft是否授权res: ', res);
        if (res) {
          this.nft_code = 2
          count++
        } else {
          this.nft_code = 3
          count++
        }
      }).catch(() => {
        this.nft_code = 3
        count++
      })
      this.$utils.nftisApproveFun(this.getAccount,'sb',contract().Market).then(res => {
        // console.log('box是否授权res: ', res);
        if(res){
          this.box_code = 2
          count++
        }else{
          this.box_code = 3
          count++
        }
      }).catch(() => {
        this.box_code = 3
        count++
      })
      clearInterval(this.btntimernull)
      this.btntimernull = setInterval(() => {
        if(count == 2){
          clearInterval(this.btntimernull)
          if(this.box_code == 2){
            this.isApproveBox = true
          }else{
            this.isApproveBox = false
          }
          if(this.nft_code == 2){
            this.isApproveNft = true
          }else{
            this.isApproveNft = false
          }
          this.allLoading = false
        }
      },1000)
    },
    // 去授权
    authorizationClick(data){
      if(data == 'box'){
        if(!this.isApproveBox){
          this.boxisloading = true
          this.$utils.nftgoApproveFun('sb', contract().Market).then(res => {
            // console.log('box授权结果res: ', res);
            if(res){
              this.isApproveBox = true
              this.boxisloading = false
              if(!this.getNoticeNum){
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
                this.$store.commit("setNoticeNum",true)
              }
            }else{
              this.isApproveBox = false
              this.boxisloading = false
            }
          }).catch(() => {
            this.boxisloading = false
            this.isApproveBox = false
          })
        }
      }else{
        if(!this.isApproveNft){
          this.nftisloading = true
          this.$utils.nftgoApproveFun('sn',contract().Market).then(res => {
            // console.log('st授权结果res: ', res);
            if(res){
              this.isApproveNft = true
              this.nftisloading = false
              if(!this.getNoticeNum){
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
                this.$store.commit("setNoticeNum",true)
              }
            }else{
              this.isApproveNft = false
              this.nftisloading = false
            }
          }).catch(() => {
            this.isApproveNft = false
            this.nftisloading = false
          })
        }
      }
    },
    PriceClick(data){
      console.log('data: ', data);
      this.Pricevalue = data
      this.getValue = Number(data) * (1 - this.fee)
    },
    sortClikChildren(ele){
      this.disablehover = true;
      setTimeout(() => {
        this.disablehover = false;
      }, 600);
      this.selectCoin = ele.name
    },
    // 弹窗关闭
    closeOrder () {
      this.$emit('closeOrder',this.alredaySellStatus)
    },
    // 获取手续费
    getFeeFun(){
      market().fee().then(res => {
        console.log('获取手续费res: ', res);
        this.fee = res / 1e4
        this.feeStatus = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ordeDetails{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  .back_img{
    position: fixed;
    top: 20px;
    left: 5vw;
    width: 55px;
    cursor: pointer;
  }
}
.content{
  position: relative;
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 67px;
  padding-bottom: 150px;
}
.left_{
  width: 60%;
  max-height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  .p1{
    font-weight: bold;
    color: #CED3D9;
    line-height: 38px;
  }
  .p2{
    font-weight: bold;
    color: #CED3D9;
    line-height: 29px;
    margin-top: 35px;
  }
  .box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .type{
      position: relative;
      width: 165px;
      height: 50px;
      background: #2C2B2B;
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      border: 1px solid #373636;
      line-height: 50px;
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_content_hover {
        position: absolute;
        top: 0;
        left: -1px;
        z-index: 9;
        width: 165px;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        background: #2C2B2B;
        filter: blur(0px);
        border: 1px solid #373636;
        border-top: none;
        border-radius: 8px;
        padding: 0 10px 10px;
        margin-top: 49px;
        line-height: 39px;
        .span1 {
          cursor: pointer;
        }
      }
      &:hover {
        box-shadow: none;
        border-bottom: none;
        border-radius: 8px 8px 0 0;
        .left_content_hover {
          display: flex;
          border-radius: 0 0 8px 8px;
        }
      }
    }
    .input_num{
      width: 328px;
      height: 50px;
      background: #2C2B2B;
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      border: 1px solid #373636;
      padding: 0 10px;
    }
    .input_{
      width: 100%;
      height: 50px;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 8px;
      border: 1px solid #373636;
      text-align: center;
      line-height: 50px;
    }
  }
  .tip_txt{
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #8F8E8E;
    line-height: 19px;
    margin-top: 22px;
    .ques_img{
      width: 11px;
      margin-right: 5px;
    }
  }
}
.btn{
  width: 330px;
  min-height: 58px;
  background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.36);
  backdrop-filter: blur(14px);
  margin: 57px auto 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.right_{
  width: 35%;
  max-height: calc(100vh - 70px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  padding-top: 70px;
  .p_positon{
    position: absolute;
    top: 0;
    z-index: 9;
    font-weight: bold;
    color: #CED3D9;
    line-height: 38px;
    width: fit-content;
    height: 38px;
    background: rgba(0, 0, 0, 1);
  }
  .showbox{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // .out_box_one {
    //   width:80%;
    //   display: flex;
    //   flex-direction: column;
    //   margin-bottom: 20px;
    //   .onebox {
    //     position: relative;
    //     cursor: pointer;
    //     width: 100%;
    //     max-width: 204px;
    //     height: 292px;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     background: url($bg_url + "nftbg6.webp") no-repeat;
    //     background-size: contain;
    //     .out_img {
    //       width: 100%;
    //       display: flex;
    //       align-items: center;
    //       justify-content: center;
    //       .imgcard {
    //         height: 184px;
    //       }
    //     }
    //     .box_out_img {
    //       width: 100%;
    //     }
    //     .huxing_bg_box {
    //       position: absolute;
    //       bottom: 0;
    //       left: 0;
    //       width: 100%;
    //       .huxing_img {
    //         width: 100%;
    //       }
    //       .huxing_content {
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         width: 100%;
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         padding: 47px 13px 10px;
    //         .start {
    //           position: absolute;
    //           top: 42px;
    //           width: 100%;
    //           display: flex;
    //           justify-content: center;
    //           align-items: center;
    //           margin-bottom: 5px;
    //           .span1 {
    //             font-weight: 800;
    //             color: #efb045;
    //             line-height: 29px;
    //             margin-right: 5px;
    //           }
    //           img {
    //             width: 24px;
    //           }
    //         }
    //         .people_type {
    //           margin-top: 7px;
    //           width: 100%;
    //           display: flex;
    //           justify-content: space-between;
    //           align-items: center;
    //           img {
    //             width: 24px;
    //           }
    //           .leftimgbox {
    //             display: flex;
    //             flex-direction: column;
    //             align-items: center;
    //           }
    //           .left_content {
    //             width: 100%;
    //             display: flex;
    //             flex-direction: column;
    //             .scale_box {
    //               white-space: nowrap;
    //               zoom: 0.8;
    //               font-weight: 800;
    //               line-height: 14px;
    //             }
    //             .box_3d {
    //               margin-top: 5px;
    //               width: 100%;
    //               display: flex;
    //               justify-content: space-between;
    //               align-items: center;
    //               span {
    //                 font-weight: 800;
    //                 line-height: 14px;
    //                 transform: scale(0.95);
    //                 zoom: 0.9;
    //               }
    //               .img_3d {
    //                 width: 30px;
    //               }
    //             }
    //           }
    //         }
    //       }
    //       .box_id {
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         width: 100%;
    //         display: flex;
    //         flex-direction: column;
    //         padding: 90px 13px 0;
    //         span {
    //           &:nth-child(1) {
    //             font-weight: bold;
    //             color: #ced3d9;
    //             line-height: 16px;
    //           }
    //           &:nth-child(2) {
    //             font-weight: 500;
    //             color: #ced3d9;
    //             line-height: 14px;
    //             margin-top: 8px;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
.left_::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@media screen and (max-width: 980px) {
  .ordeDetails{
    width: 100%;
    min-height: 100vh;
    position: fixed;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9;
    backdrop-filter: blur(6px);
    display: flex;
    flex-direction: column;
    .back_img{
      position: fixed;
      top: 0.2rem;
      left: 5vw;
      width: 0.3rem;
      cursor: pointer;
    }
  }
  .ordeDetails::-webkit-scrollbar {
    width: 0;
  }
  .content{
    position: relative;
    width: 85vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 0.6rem;
    padding-bottom: 0.1rem;
  }
  .left_{
    width:100%;
    max-height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    .p1{
      font-weight: bold;
      color: #CED3D9;
      line-height: 0.28rem;
    }
    .p2{
      font-weight: bold;
      color: #CED3D9;
      line-height: 0.22rem;
      margin-top: 0.23rem;
    }
    .box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.08rem;
      .type{
        position: relative;
        width: 1.07rem;
        height: 0.35rem;
        background: #2C2B2B;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
        border-radius: 0.02rem;
        border: 1px solid #373636;
        line-height: 0.35rem;
        padding: 0 0.08rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left_content_hover {
          position: absolute;
          top: 0;
          left: -1px;
          z-index: 9;
          width: 1.07rem;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          background: #2C2B2B;
          filter: blur(0px);
          border: 1px solid #373636;
          border-top: none;
          border-radius: 0.02rem;
          padding: 0 0.08rem 0.08rem;
          margin-top: 0.3rem;
          line-height:  0.35rem;
          .span1 {
            cursor: pointer;
          }
        }
        &:hover {
          box-shadow: none;
          border-bottom: none;
          border-radius:  0.02rem 0.02rem 0 0;
          .left_content_hover {
            display: flex;
            border-radius: 0 0 0.02rem 0.02rem;
          }
        }
      }
      .input_num{
        width: 1.99rem;
        height: 0.35rem;
        background: #2C2B2B;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
        border-radius: 0.02rem;
        border: 1px solid #373636;
        padding: 0 0.12rem;
      }
      .input_{
        width: 100%;
        height: 0.35rem;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 0.02rem;
        border: 1px solid #373636;
        text-align: center;
        line-height: 0.35rem;
      }
    }
    .tip_txt{
      display: flex;
      align-items: center;
      font-weight: 500;
      color: #8F8E8E;
      line-height: 19px;
      margin-top: 22px;
      .ques_img{
        width: 11px;
        margin-right: 5px;
      }
    }
  }
  .btn{
    width: 2rem;
    min-height: 0.34rem;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.36);
    backdrop-filter: blur(14px);
    margin: 0.3rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .right_{
    position: relative;
    width: 100%;
    max-height: 5rem;
    overflow: visible;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
    padding-top: 0.45rem;
    .p_positon{
      position: absolute;
      top: 0;
      z-index: 9;
      font-weight: bold;
      color: #CED3D9;
      line-height: 0.28rem;
      width: fit-content;
      height: 0.28rem;
      background: rgba(0, 0, 0, 1);
    }
    .showbox{
      width: 100%;
      max-height: 5rem;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 25%;
    }
  }
}
</style>