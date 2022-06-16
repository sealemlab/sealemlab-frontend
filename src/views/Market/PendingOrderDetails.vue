<template>
  <div class="ordeDetails" v-if="orderStatus">
    <img :src="`${$store.state.imgUrl}back.webp`" class="back_img" @click="closeOrder" />
    <div class="content">
      <div class="left_">
        <p class="font32 p1" :class="isEnLang ? 'en_Bold' : ''">List item for sale</p>
        <p class="font24 p2" :class="isEnLang ? 'en_Bold' : ''">Price</p>
        <div class="box">
          <div class="type" :class="[disablehover ? 'clear_hover' : '']">
            {{selectCoin}}
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
        <p class="font24 p2" :class="isEnLang ? 'en_Bold' : ''">Fees</p>
        <div class="box">
          <div class="input_" v-if="feeStatus">
            <BtnLoading :isloading="true"></BtnLoading>
          </div>
          <div class="input_" v-else>{{fee | MultiplyBySquare}} %</div>
        </div>
        <p class="font24 p2" :class="isEnLang ? 'en_Bold' : ''">You will get</p>
        <div class="box">
          <div class="input_">{{getValue | PriceConversion}}</div>
        </div>
        <div class="tip_txt font16" :class="isEnLang?'en_medium':''">
          <img :src="`${$store.state.imgUrl}ques_new.webp`" class="ques_img"/>
          同时挂单多个NFT，挂单价格一致
        </div>
        <div class="btn btn_normal" v-if="allLoading">
          <BtnLoading :isloading="true"></BtnLoading>
        </div>
        <div v-else :class="isEnLang ? 'en_Bold' : ''">
          <div v-if="selectarr.isnft && selectarr.isbox">
            <div class="btn btn_normal font16 mobile_font16" @click="sellfun" v-if="isApproveBox && isApproveNft">
              {{$t("message.market.sell_btn")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font16" @click="authorizationClick('box')" v-else-if="!isApproveBox">
              BOX {{$t("message.approve")}}<BtnLoading :isloading="boxisloading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font16" @click="authorizationClick('nft')" v-else-if="!isApproveNft">
              NFT {{$t("message.approve")}}<BtnLoading :isloading="nftisloading"></BtnLoading>
            </div>
          </div>
          <div v-else-if="selectarr.isnft">
            <div class="btn btn_normal font16 mobile_font16" @click="sellfun" v-if="isApproveNft">
              {{$t("message.market.sell_btn")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font16" @click="authorizationClick('nft')" v-else-if="!isApproveNft">
              NFT {{$t("message.approve")}}<BtnLoading :isloading="nftisloading"></BtnLoading>
            </div>
          </div>
          <div v-else-if="selectarr.isbox">
            <div class="btn btn_normal font16 mobile_font16" @click="sellfun" v-if="isApproveBox">
              {{$t("message.market.sell_btn")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="btn btn_normal font16 mobile_font16" @click="authorizationClick('box')" v-else-if="!isApproveBox">
              BOX {{$t("message.approve")}}<BtnLoading :isloading="boxisloading"></BtnLoading>
            </div>
          </div>
        </div>
      </div>
      <div class="right_">
        <p class="p_positon font32" :class="isEnLang ? 'en_Bold' : ''">Preview</p>
        <div class="showbox">
          <div
            class="out_box_one"
            v-for="(item, index) in selectarr.arr"
            :key="index"
          >
            <div class="onebox" v-if="item.nft">
              <div class="out_img"><img :src="item.src" class="imgcard" /></div>
              <div class="huxing_bg_box">
                <img
                  :src="`${$store.state.imgUrl}huxing6.webp`"
                  class="huxing_img"
                />
                <div class="huxing_content">
                  <div class="start">
                    <span class="span1 font24">{{ item.start }}</span>
                    <img :src="`${$store.state.imgUrl}start.webp`" />
                  </div>
                  <div class="people_type">
                    <div class="leftimgbox" v-if="item.type == 1">
                      <img :src="`${$store.state.imgUrl}type_jds.webp`" />
                      <span class="font12">{{ $t("message.nft.txt9") }}</span>
                    </div>
                    <div class="leftimgbox" v-if="item.type == 2">
                      <img :src="`${$store.state.imgUrl}type_cike.webp`" />
                      <span class="font12">{{ $t("message.nft.txt11") }}</span>
                    </div>
                    <div class="leftimgbox" v-if="item.type == 3">
                      <img :src="`${$store.state.imgUrl}type_wushi.webp`" />
                      <span class="font12">{{ $t("message.nft.txt10") }}</span>
                    </div>
                    <div class="leftimgbox" v-if="item.type == 4">
                      <img :src="`${$store.state.imgUrl}type_zs.webp`" />
                      <span class="font12">{{ $t("message.nft.txt8") }}</span>
                    </div>
                    <div class="leftimgbox">
                      <img
                        :src="`${$store.state.imgUrl}power1.webp`"
                        v-if="item.power <= 20"
                      />
                      <img
                        :src="`${$store.state.imgUrl}power2.webp`"
                        v-else-if="item.power <= 40 && item.power > 20"
                      />
                      <img
                        :src="`${$store.state.imgUrl}power3.webp`"
                        v-else-if="item.power <= 60 && item.power > 40"
                      />
                      <img
                        :src="`${$store.state.imgUrl}power4.webp`"
                        v-else-if="item.power <= 80 && item.power > 60"
                      />
                      <img
                        :src="`${$store.state.imgUrl}power5.webp`"
                        v-else-if="item.power <= 100 && item.power > 80"
                      />
                      <span class="font12">{{ item.power }}</span>
                    </div>
                  </div>
                  <div class="people_type">
                    <div class="left_content">
                      <span class="font14 scale_box">
                        {{
                          $t(
                            `message.nft.type${item.type}.suit${item.suit}.position${item.position}`
                          )
                        }}
                      </span>
                      <div class="box_3d">
                        <span class="font12"># {{ item.id }}</span>
                        <img
                          :src="`${$store.state.imgUrl}new_3dimg.webp`"
                          class="img_3d"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="onebox" v-else>
              <div class="box_out_img">
                <img :src="item.src" class="imgcard" />
              </div>
              <div class="huxing_bg_box">
                <img
                  :src="`${$store.state.imgUrl}huxing6.webp`"
                  class="huxing_img"
                />
                <div class="box_id">
                  <span class="font14" :class="isEnLang ? 'en_Bold' : ''"
                    >{{item.title}}</span
                  >
                  <span class="font12" :class="isEnLang ? 'en_medium' : ''"
                    >#{{item.id}}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { market,contract,token, getSigner } from 'sealemlab-sdk'
import { mapGetters } from "vuex";
export default {
  props: {
    orderStatus: {
      type: Boolean,
      default: false
    },
    selectarr:{
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
          },2000)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: { ...mapGetters(["getAccount","getNoticeNum","isEnLang","getAccountStatus"])},
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
      alredaySellStatus:false
    }
  },
  methods:{
    sellfun(){
      if(this.buyLoading)return
      if(!this.Pricevalue){
        return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_txt'}));
      }
      this.buyLoading = true
      // console.log('选中的nft/box: ', this.selectarr.arr);
      this.processingArrayFun(this.selectarr.arr,this.selectCoin,this.$utils.convertNormalToBigNumber(Number(this.Pricevalue), 18)).then(info => {
        console.log('处理好的数组res: ', info);
        let idArr = info.map(item => {
          return item.id
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
            if(that.selectarr.isbox){
              console.log("刷新box")
              that.$utils.newgetUserBoxInfoFun(that.getAccount).then((res) => {
                sessionStorage.setItem("sb_count", res);
              })
              that.Pricevalue = ''
              that.getValue = 0
            }
            if(that.selectarr.isnft){
              console.log("刷新nft")
            }
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
            id:'',//NFT的ID数组
            prices:price,//价格数组
            address:'', // NFT合约地址数组
          }
          obj.id = item.id
          if(type == 'ST'){
            obj.type = token().ST
          }else if(type == 'BUSD'){
            obj.type = token().BUSD
          }
          obj.address = item.nft?token().SN:token().SB
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
            this.isApproveBUSD = false
            this.busdisloading = false
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
  // max-height: 100%;
  // overflow: auto;
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
    .out_box_one {
      width:80%;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .onebox {
        position: relative;
        cursor: pointer;
        width: 100%;
        max-width: 204px;
        height: 292px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url($bg_url + "nftbg6.webp") no-repeat;
        background-size: contain;
        .out_img {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .imgcard {
            height: 184px;
          }
        }
        .box_out_img {
          width: 100%;
        }
        .huxing_bg_box {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          .huxing_img {
            width: 100%;
          }
          .huxing_content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 47px 13px 10px;
            .start {
              position: absolute;
              top: 42px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 5px;
              .span1 {
                font-weight: 800;
                color: #efb045;
                line-height: 29px;
                margin-right: 5px;
              }
              img {
                width: 24px;
              }
            }
            .people_type {
              margin-top: 7px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 24px;
              }
              .leftimgbox {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .left_content {
                width: 100%;
                display: flex;
                flex-direction: column;
                .scale_box {
                  white-space: nowrap;
                  zoom: 0.8;
                  font-weight: 800;
                  line-height: 14px;
                }
                .box_3d {
                  margin-top: 5px;
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  span {
                    font-weight: 800;
                    line-height: 14px;
                    transform: scale(0.95);
                    zoom: 0.9;
                  }
                  .img_3d {
                    width: 30px;
                  }
                }
              }
            }
          }
          .box_id {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 90px 13px 0;
            span {
              &:nth-child(1) {
                font-weight: bold;
                color: #ced3d9;
                line-height: 16px;
              }
              &:nth-child(2) {
                font-weight: 500;
                color: #ced3d9;
                line-height: 14px;
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
  }
}
.left_::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>