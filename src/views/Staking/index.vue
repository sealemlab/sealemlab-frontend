<template>
  <div class="staking_box">
    <!-- 背景图 -->
    <div class="img_bg font16">
      <img :src="`${$store.state.imgUrl}staking.webp`" class="pc_staking_bg" />
      <img :src="`${$store.state.imgUrl}mobile_staking.webp`" class="mobile_staking_bg">
      <span class="span1 font35 mobile_font22" :class="isEnLang ? 'en_heavy' : ''">STAKING</span>
      <span class="span2 font16 mobile_font12" :class="isEnLang ? 'en_medium' : ''">Sacred Farms offer multiple farming opportunities to you. Get double rewards by staking your ST tokens in return for additional SR tokens and earning high income.</span>
      <span class="span3 font14 mobile_font12" :class="isEnLang ? 'en_medium' : ''">Learn how to start</span>
    </div>
    <!-- 数据 -->
    <div class="dataBox">
      <div class="onebox" v-for="(item, index) in dataArr" :key="index">
        <span class="font24" :class="isEnLang ? 'en_medium' : ''">{{
          $t(item.title)
        }}</span>
        <span class="font35 mobile_font16" :class="isEnLang ? 'en_heavy' : ''"
          >$ {{ item.num | PriceConversion | Thousandths}}</span
        >
      </div>
    </div>
    <div class="staking_content_box">
      <div class="otu_onebox">
        <div class="onebox">
          <div class="label font16 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">
            {{$t("message.stake.txt5")}}
          </div>
          <div class="out_top_box">
            <div class="top_box">
              <div class="top_content">
                <img
                  :src="`${$store.state.imgUrl}new_stlogo.webp`"
                  class="logo_img"
                />
                <div class="right_cen">
                  <span class="font16" :class="isEnLang ? 'en_Bold' : ''"
                    >{{$t("message.stake.txt6")}}</span
                  >
                  <span class="font32 mobile_font20" :class="isEnLang ? 'en_Bold' : ''">{{
                    poolInfo.totalStaked | PriceConversion | Thousandths
                  }}</span>
                  <span class="font12" :class="isEnLang ? 'en_medium' : ''"
                    >≈ $
                    {{
                      (poolInfo.totalStaked * getUserCoin.stPrice)
                        | PriceConversion | Thousandths
                    }}</span
                  >
                </div>
              </div>
              <div class="line_txt">
                <div class="left">
                  <span class="font16 span2" :class="isEnLang ? 'en_Bold' : ''"
                    >APY</span
                  >
                  <span class="font16" :class="isEnLang ? 'en_Bold' : ''"
                    >{{APY | MultiplyBySquare}} %</span
                  >
                </div>
                <div class="left right" @click="viewContract">
                  <span class="span1 font12">{{$t("message.stake.txt7")}}</span>
                  <svg
                    t="1655894703771"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1998"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M892 928.1H134c-19.9 0-36-16.1-36-36v-758c0-19.9 16.1-36 36-36h314.1c19.9 0 36 16.1 36 36s-16.1 36-36 36H170v686h686V579.6c0-19.9 16.1-36 36-36s36 16.1 36 36v312.5c0 19.9-16.1 36-36 36z"
                      p-id="1999"
                      fill="#8F8E8E"
                    ></path>
                    <path
                      d="M927.9 131.6v-0.5c-0.1-1.7-0.4-3.3-0.7-4.9 0-0.1 0-0.2-0.1-0.3-0.4-1.7-0.9-3.3-1.5-4.9v-0.1c-0.6-1.6-1.4-3.1-2.2-4.6 0-0.1-0.1-0.1-0.1-0.2-0.8-1.4-1.7-2.8-2.7-4.1-0.1-0.1-0.2-0.3-0.3-0.4-0.5-0.6-0.9-1.1-1.4-1.7 0-0.1-0.1-0.1-0.1-0.2-0.5-0.6-1-1.1-1.6-1.6l-0.4-0.4c-0.5-0.5-1.1-1-1.6-1.5l-0.1-0.1c-0.6-0.5-1.2-1-1.9-1.4-0.1-0.1-0.3-0.2-0.4-0.3-1.4-1-2.8-1.8-4.3-2.6l-0.1-0.1c-1.6-0.8-3.2-1.5-4.9-2-1.6-0.5-3.3-1-5-1.2-0.1 0-0.2 0-0.3-0.1l-2.4-0.3h-0.3c-0.7-0.1-1.3-0.1-2-0.1H640.1c-19.9 0-36 16.1-36 36s16.1 36 36 36h165L487.6 487.6c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5 9.2 0 18.4-3.5 25.5-10.5L856 221v162.8c0 19.9 16.1 36 36 36s36-16.1 36-36V134.1c0-0.8 0-1.7-0.1-2.5z"
                      p-id="2000"
                      fill="#8F8E8E"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!-- 用户的st余额 -->
          <div class="coin">
            <div class="left">
              <span class="font14" :class="isEnLang ? 'en_medium' : ''"
                >{{$t("message.stake.txt8")}}</span
              >
              <div class="num">
                <img
                  :src="`${$store.state.imgUrl}new_stlogo.webp`"
                  class="coin_img"
                />
                <span class="font20 mobile_font16" :class="isEnLang ? 'en_Bold' : ''">{{
                  getUserCoin.st | PriceConversion | Thousandths
                }}</span>
              </div>
            </div>
            <div class="btn mobile_font16" :class="isEnLang ? 'en_Bold' : ''" @click="getST">{{$t("message.stake.txt9")}}</div>
          </div>
          <!-- 用户质押st -->
          <div class="coin">
            <div class="left">
              <span class="font14" :class="isEnLang ? 'en_medium' : ''"
                >{{$t("message.stake.txt10")}}</span
              >
              <div class="num">
                <img
                  :src="`${$store.state.imgUrl}new_stlogo.webp`"
                  class="coin_img"
                />
                <span class="font20 mobile_font16" :class="isEnLang ? 'en_Bold' : ''">{{
                  poolInfo.userStaked | PriceConversion | Thousandths
                }}</span>
              </div>
            </div>
            <div class="btn">
              <!-- Approve/Stake -->
              <FunBtn
                :allLoading="allLoading"
                :isapprove="isapprove"
                :approveloading="buy_isloading"
                :isloading="buy_isloading"
                :word="'message.stake.txt1'"
                ref="mychild"
                @sonapprove="sonapprove"
                @dosomething="stakedSTFun"
              />
            </div>
          </div>
          <!-- 质押st得到的sr -->
          <div class="coin">
            <div class="left">
              <span class="font14" :class="isEnLang ? 'en_medium' : ''"
                >{{$t("message.stake.txt11")}}</span
              >
              <div class="num mobile_font16">
                <img
                  :src="`${$store.state.imgUrl}new_srlogo.webp`"
                  class="coin_img"
                />
                <BtnLoading :isloading="true" v-if="srLoading"></BtnLoading>
                <span
                  class="font20"
                  :class="isEnLang ? 'en_Bold' : ''"
                  v-else-if="poolInfo.userClaimSR == 0"
                  >0.00</span
                >
                <countTo
                  v-else
                  :decimals="2"
                  :startVal="poolInfo.userClaimSR"
                  :endVal="endValue"
                  :duration="2000"
                ></countTo>
              </div>
            </div>
            <div
              class="btn mobile_font16"
              :class="isEnLang ? 'en_Bold' : ''"
              @click="ClaimFun"
            >
              {{$t("message.stake.txt12")}}
              <BtnLoading :isloading="SRBtnLoading"></BtnLoading>
            </div>
          </div>
          <div class="out_btn btn_normal" @click="ClaimSTFun">
            {{$t("message.stake.txt13")}}<BtnLoading :isloading="STBtnLoading"></BtnLoading>
          </div>
          <p
            class="font12 mobile_font12 tip_"
            @click="AddQuesFun('message.stake.txt14_1', $event)"
            :class="isEnLang ? 'en_medium' : ''"
          >
            <span
              class="page_has_question_icon"
              :title="$t('message.stake.txt14_1')"
              >{{ $t("message.stake.txt14") }}</span
            >
            <span>{{ userTaxRate }}%</span>
          </p>
        </div>
      </div>
      <div class="otu_onebox">
        <div class="onebox nodata" :class="isEnLang ? 'en_Bold' : ''">
          <svg t="1655965712914" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3421" width="128" height="128"><path d="M931.392 96v832H96v-832h835.392z m-85.568 88.32H181.504v655.36h664.192l0.128-655.36z m-118.272 236.992l59.776 65.408-234.816 228.992L435.392 601.6 289.728 743.68l-59.776-65.408 205.568-200.448 117.12 114.176 174.976-170.688zM586.368 309.44c34.368 0 62.208 28.8 62.208 64.256s-27.84 64.256-62.208 64.256c-34.368 0-62.208-28.8-62.208-64.256s27.84-64.256 62.208-64.256z" fill="#333333" p-id="3422"></path></svg>
          <span>{{ $t("message.stake.txt15") }}</span>
        </div>
      </div>
      <div class="otu_onebox">
        <div class="onebox nodata" :class="isEnLang ? 'en_Bold' : ''">
          <svg t="1655965712914" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3421" width="128" height="128"><path d="M931.392 96v832H96v-832h835.392z m-85.568 88.32H181.504v655.36h664.192l0.128-655.36z m-118.272 236.992l59.776 65.408-234.816 228.992L435.392 601.6 289.728 743.68l-59.776-65.408 205.568-200.448 117.12 114.176 174.976-170.688zM586.368 309.44c34.368 0 62.208 28.8 62.208 64.256s-27.84 64.256-62.208 64.256c-34.368 0-62.208-28.8-62.208-64.256s27.84-64.256 62.208-64.256z" fill="#333333" p-id="3422"></path></svg>
          <span>{{ $t("message.stake.txt15") }}</span>
        </div>
      </div>
    </div>
    <StakedProup
      :rate="rate"
      :APY="APY"
      :openPoolStatus="openPoolStatus"
      :stakedStatus="stakedStatus"
      @close="close"
    ></StakedProup>
    <MessageBox
      ref="mychildAdd"
      :clientX="clientX"
      :clientY="clientY"
      :content="datacontent"
    ></MessageBox>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MessageBox from "@/views/Bond/MessageBox.vue";
import StakedProup from './StakeProup.vue'
import { stStaking, token, contract, getSigner, stStakingInfo, bondDepository } from 'sealemlab-sdk'
export default {
  computed: { ...mapGetters(["getProduction","getAccountStatus", "getAccount", "getIsMobile", "getIstrue", "getNoticeNum", "isEnLang", "getUserCoin"]), },
  data () {
    return {
      APY:0,
      userTaxRate: 0,
      endValue: 0,
      openPoolStatus: false,
      srLoading: true,
      SRBtnLoading: false,
      STBtnLoading: false,
      dataArr: [
        { title: "message.stake.txt2", num: 0 },
        { title: "message.stake.txt3", num: 0 },
        { title: "message.stake.txt4", num: 0 }
      ],
      datacontent: '',
      clientX: 0,
      clientY: 0,
      poolInfo: {
        totalStaked: 0,
        userStaked: 0,
        userClaimSR: 0
      },
      isapprove: false,
      allLoading: true,
      buy_isloading: false, // 按钮loading
      isapprove: false, //是否授权
      setIntervalOBJ: null,
      stakedStatus: false,
      userSrYieldTimer: null,
      rate:0 // 用户的质押利率
    }
  },
  components: {
    MessageBox, StakedProup
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.allLoading = true
          setTimeout(() => {
            this.isApprove()
          }, 1500)
        } else {
          this.allLoading = this.srLoading = false
          clearInterval(this.userSrYieldTimer)
        }
      },
      deep: true,
      immediate: true,
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if (newValue == 0) {
          this.getUserInfo()
          this.getCurrencyETFun()
        } else if (newValue > 0) {
          this.$utils.antiShakeFun(() => {
            this.getUserInfo()
            this.getCurrencyETFun()
          }, 2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    stakedSTFun () {
      this.stakedStatus = true
    },
    close (data) {
      if (data) {
        this.getUserInfo()
        this.getSdkInfo()
        this.getCurrencyETFun()
      }
      this.stakedStatus = false
    },
    // 判断授权
    isApprove () {
      this.$refs.mychild.isApproveFun(token().ST, contract().STStaking).then((res) => {
        if (res) {
          this.isapprove = true;
        } else {
          this.isapprove = false;
        }
        this.allLoading = false
      })
    },
    // 去授权
    sonapprove () {
      if (this.allLoading) return
      if (this.buy_isloading) return;
      this.buy_isloading = true;
      this.$refs.mychild.goApproveFun(token().ST, contract().STStaking)
        .then((res) => {
          this.buy_isloading = false;
          if (res) {
            this.isapprove = true;
            // if(!this.getNoticeNum){
            //   this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
            //   this.$store.commit("setNoticeNum",true)
            // }
          } else {
            this.isapprove = false;
          }
          this.allLoading = false
        })
    },
    AddQuesFun (data, e) {
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY + 5
      setTimeout(() => {
        this.$refs.mychildAdd.titleFun()
      }, 400)
    },
    getSdkInfo () {
      // 获取池子是否已开启
      stStaking().openStatus().then(res => {
        this.openPoolStatus = res
      })
      // 获取质押池APR（年度百分比利率），已经乘了100，所以只需要在返回结果后面加上百分号%
      let srPrice = 0
      if(!this.getProduction){
        srPrice = 0.00001
      }
      stStakingInfo.getApr(this.getUserCoin.stPrice,srPrice).then(res => {
        console.log('获取质押池APR（年度百分比利率），已经乘了100，所以只需要在返回结果后面加上百分号%res: ', res);
        this.APY = Math.pow((1 + res / 100 / 365),365) - 1
      }).catch(() => {
        this.APY = 0
      })
      // 获取池子总质押ST数量
      stStaking().stakedST().then(res => {
        // console.log('获取池子总质押ST数量: ', res);
        this.dataArr[0].num = res / 1e18
        this.poolInfo.totalStaked = res / 1e18
      })
    },
    getUserInfo () {
      // 获取某用户的质押的ST数量
      stStaking().userStakedST(this.getAccount).then(res => {
        // console.log('获取某用户的质押的ST数量: ', res);
        if(res / 1e18 <= 1e-8){
          this.poolInfo.userStaked = 0
        }else{
          this.poolInfo.userStaked = res / 1e18
        }
      })
      
      // 获取某用户已提取的SR数量
      stStaking().userHarvestedSR(this.getAccount).then(res => {
        // console.log('获取某用户已提取的SR数量: ', res);
        this.dataArr[1].num = res / 1e18
      })

      // 获取用户提现时要扣的税率
      stStaking().getUserTaxRate(this.getAccount).then(res => {
        // console.log('获取用户提现时要扣的税率 ', res);
        this.userTaxRate = res / 100
      })

      // 获取某用户的质押利率等级信息
      bondDepository().getUserStakeLevelInfo(this.getAccount).then(res => {
        // console.log('质押利率res1: ', res);
        this.rate = Number(res[0]) / 1e4
      })
    },
    // 实时刷新可提取的sr数量
    getCurrencyETFun () {
      // console.log("实时获取sr产量函数")
      clearInterval(this.userSrYieldTimer)
      this.userSrYieldTimer = setInterval(() => {
        stStaking().getTokenRewards(this.getAccount).then(res => {
          console.log('获取用户可提取SR数量', Number(res / 1e18));
          if (res / 1e18 < 1e-8) {
            this.poolInfo.userClaimSR = 0
            this.srLoading = false
          } else {
            let nums = this.$utils.convertBigNumberToNormal(Number(res), 2)
            this.poolInfo.userClaimSR = this.endValue
            this.endValue = Number(nums)
            this.srLoading = false
          }
          if (this.endValue != 0 && this.poolInfo.userStaked == 0) {
            let nums = this.$utils.convertBigNumberToNormal(Number(res), 2)
            this.poolInfo.userClaimSR = this.endValue
            this.endValue = Number(nums)
            // console.log('清空定时器this.endValue: ', this.endValue);
            clearInterval(this.userSrYieldTimer)
          }
        })
      }, 3000)
    },
    ClaimFun () {
      // console.log('this.poolInfo.userClaimSR: ', this.poolInfo.userClaimSR,this.endValue);
      if (this.poolInfo.userClaimSR == 0 && this.endValue == 0) return
      if (this.SRBtnLoading) return
      this.SRBtnLoading = true
      stStaking().connect(getSigner()).harvestToken().then(async res => {
        // console.log('res: ', res);
        const etReceipt = await res.wait();
        if (etReceipt.status == 1) {
          this.SRBtnLoading = false
          this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt22' }));
          this.getCurrencyETFun()
        } else {
          this.SRBtnLoading = false
        }
      }).catch(() => {
        this.SRBtnLoading = false
      })
    },
    ClaimSTFun () {
      if (this.poolInfo.userStaked == 0) {
        this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt23' }));
        return
      }
      if (this.STBtnLoading) return
      this.STBtnLoading = true
      let subNum = this.$utils.getBit(this.poolInfo.userStaked, 8)
      // console.log('subNum: ', subNum);
      stStaking().connect(getSigner()).withdraw(this.$utils.convertNormalToBigNumber(subNum, 18)).then(async res => {
        // console.log('res: ', res);
        const etReceipt = await res.wait();
        if (etReceipt.status == 1) {
          this.STBtnLoading = false
          this.getUserInfo()
          this.getSdkInfo()
          this.$utils.getUserCoinQuantity(token().ST, 'st', this.getAccount)
          this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt22' }));
          clearInterval(this.userSrYieldTimer)
        } else {
          this.STBtnLoading = false
        }
      }).catch(() => {
        this.STBtnLoading = false
      })
    },
    getST(){
      window.open(`https://pancakeswap.finance/swap?outputCurrency=${token().ST}`)
    },
    viewContract(){
      window.open(`${this.$store.state.BSC_BROWSER}${token().ST}`)
    }
  },
  mounted () {
    this.getSdkInfo()
  },
  destroyed () {
    clearInterval(this.userSrYieldTimer)
  },
}
</script>
<style lang="scss" scoped>
.staking_box {
  width: 100vw;
  padding-bottom: 198px;
  .img_bg {
    width: 100%;
    position: relative;
    .pc_staking_bg {
      width: 100%;
      min-height: 350px;
    }
    .mobile_staking_bg{
      display: none;
    }
    .span1 {
      position: absolute;
      left: 5vw;
      top: 25%;
      font-weight: 800;
      color: #ffffff;
      line-height: 41px;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .span2 {
      position: absolute;
      left: 5vw;
      top: 45%;
      max-width: 40vw;
      font-weight: 500;
      color: #CED3D9;
      line-height: 22px;
    }
    .span3 {
      position: absolute;
      left: 5vw;
      top: 66%;
      font-weight: 500;
      color: #ECCF83;
      cursor: pointer;
      line-height: 16px;
    }
  }
  .dataBox {
    width: 90vw;
    margin: 0 auto;
    margin-top: 95px;
    height: 181px;
    background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .onebox {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:nth-child(1) {
          font-weight: 500;
          color: #ced3d9;
          line-height: 22px;
        }
        &:nth-child(2) {
          font-weight: 800;
          color: #ced3d9;
          line-height: 41px;
          margin-top: 25px;
        }
      }
    }
  }
  .staking_content_box {
    width: 90vw;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .otu_onebox {
      width: 344px;
      height: 539px;
      padding: 2px;
      border-radius: 12px;
      background: linear-gradient(
        135deg,
        rgba(149, 127, 93, 0.19) 0%,
        rgba(226, 202, 169, 0.58) 46%,
        rgba(237, 213, 180, 0.13) 68%,
        rgba(131, 102, 77, 0.21) 100%
      );
      .nodata{
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #8F8E8E;
        line-height: 22px;
        span{
          margin-top: 14px;
        }
      }
      .onebox {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        padding: 0 8px;
        background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
        display: flex;
        flex-direction: column;
        .label {
          width: 135px;
          height: 31px;
          background: linear-gradient(
            311deg,
            rgba(242, 215, 140, 0) 0%,
            #f3da92 100%
          );
          backdrop-filter: blur(0px);
          font-weight: bold;
          color: #111010;
          line-height: 31px;
          text-align: center;
          margin-left: -10px;
        }
        .out_top_box {
          width: 100%;
          height: 136px;
          margin-top: 13px;
          border-radius: 5px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            rgba(234, 206, 129, 0.16) 0%,
            #d4ba74 53%,
            rgba(188, 164, 101, 0.15) 100%
          );
          .top_box {
            width: 100%;
            height: 100%;
            background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
            border-radius: 5px;
            padding: 11px 16px;
            .top_content {
              display: flex;
              align-items: center;
              justify-content: center;
              .logo_img {
                width: 66px;
                margin-right: 36px;
              }
              .right_cen {
                display: flex;
                flex-direction: column;
                font-weight: bold;
                color: #ced3d9;
                line-height: 22px;
                span {
                  &:nth-child(2) {
                    margin: 8px 0;
                  }
                  &:nth-child(3) {
                    font-weight: 500;
                  }
                }
              }
            }
            .line_txt {
              width: 100%;
              padding: 0 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 5px;
              .left {
                display: flex;
                align-items: center;
                font-weight: bold;
                color: #ced3d9;
                line-height: 22px;
                .span1 {
                  font-weight: 500;
                  color: #8f8e8e;
                  line-height: 22px;
                  margin-right: 3px;
                }
                .span2 {
                  margin-right: 31px;
                }
              }
              .right{
                cursor: pointer;
              }
            }
          }
        }
        .coin {
          width: 100%;
          display: flex;
          margin-top: 27px;
          padding: 0 14px;
          justify-content: space-between;
          .left {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            color: #ced3d9;
            line-height: 22px;
            .num {
              display: flex;
              align-items: center;
              font-weight: bold;
              color: #ced3d9;
              line-height: 22px;
              margin-top: 5px;
              .coin_img {
                width: 28px;
                margin-right: 3px;
              }
            }
          }
          .btn {
            cursor: pointer;
            width: 130px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            border: 1px solid #918256;
          }
        }
        .out_btn {
          cursor: pointer;
          width: 206px;
          height: 40px;
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 4px;
          backdrop-filter: blur(14px);
          font-weight: 600;
          color: #0e0d0d;
          line-height: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          margin-top: 34px;
        }
        .tip_ {
          width: 206px;
          margin: 12px auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          color: #8f8e8e;
          line-height: 22px;
          .page_has_question_icon {
            position: relative;
            cursor: pointer;
            &::after {
              content: "";
              width: 12px;
              height: 12px;
              filter: blur(0px);
              background: url(//cdn.sealemlab.com/sealemlab_assets_test/images/ques_new.webp)
                no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: -15px;
              top: 5px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .staking_box {
    width: 100vw;
    padding: 1rem 5vw 0;
    .img_bg {
      width: 100%;
      position: relative;
      .pc_staking_bg {
        display: none;
      }
      .mobile_staking_bg{
        display: block;
        width: 100%;
      }
      .span1 {
        position: absolute;
        left: 5vw;
        top: 4%;
        font-weight: 800;
        color: #ffffff;
        line-height: 0.2rem;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .span2 {
        position: absolute;
        left: 5vw;
        top: 25%;
        max-width: 80vw;
        font-weight: 500;
        color: #CED3D9;
        line-height: 0.15rem;
      }
      .span3 {
        position: absolute;
        left: 5vw;
        top:75%;
        font-weight: 500;
        color: #ECCF83;
        cursor: pointer;
        line-height: 0.12rem;
      }
    }
    .dataBox {
      width: 90vw;
      margin: 0 auto;
      margin-top: 0.48rem;
      height: 0.88rem;
      background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 0.04rem;
      border: 1px solid rgba(68, 67, 67, 0.47);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .onebox {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          &:nth-child(1) {
            font-weight: 500;
            color: #ced3d9;
            line-height: 0.14rem;
          }
          &:nth-child(2) {
            font-weight: 800;
            color: #ced3d9;
            line-height: 0.2rem;
            margin-top: 0.05rem;
          }
        }
      }
    }
    .staking_content_box {
      width: 90vw;
      margin: 0 auto;
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: space-between;
      .otu_onebox {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 0.2rem;
        height:auto;
        min-height: 4.2rem;
        padding: 2px;
        border-radius: 0.12rem;
        background: linear-gradient(
          135deg,
          rgba(149, 127, 93, 0.19) 0%,
          rgba(226, 202, 169, 0.58) 46%,
          rgba(237, 213, 180, 0.13) 68%,
          rgba(131, 102, 77, 0.21) 100%
        );
        .nodata{
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: #8F8E8E;
          line-height: 22px;
          span{
            margin-top: 14px;
          }
        }
        .onebox {
          width: 100%;
          min-height: 4.2rem;
          border-radius: 0.12rem;
          padding:0 0.06rem;
          background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
          display: flex;
          flex-direction: column;
          .label {
            width: 0.87rem;
            height: 0.23rem;
            background: linear-gradient(
              311deg,
              rgba(242, 215, 140, 0) 0%,
              #f3da92 100%
            );
            backdrop-filter: blur(0px);
            font-weight: bold;
            color: #111010;
            line-height: 0.23rem;
            text-align: center;
            margin-left: -0.06rem;
          }
          .out_top_box {
            width: 100%;
            height: 1rem;
            margin-top: 0.08rem;
            border-radius: 0.05rem;
            padding: 2px;
            background: linear-gradient(
              135deg,
              rgba(234, 206, 129, 0.16) 0%,
              #d4ba74 53%,
              rgba(188, 164, 101, 0.15) 100%
            );
            .top_box {
              width: 100%;
              height: 100%;
              background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
              border-radius: 0.05rem;
              padding: 0.1rem;
              .top_content {
                display: flex;
                align-items: center;
                justify-content: center;
                .logo_img {
                  width: 0.43rem;
                  margin-right: 0.27rem;
                }
                .right_cen {
                  display: flex;
                  flex-direction: column;
                  font-weight: bold;
                  color: #ced3d9;
                  line-height: 0.12rem;
                  span {
                    &:nth-child(2) {
                      margin: 0.08rem 0;
                    }
                    &:nth-child(3) {
                      font-weight: 500;
                      color: #8F8E8E;
                    }
                  }
                }
              }
              .line_txt {
                width: 100%;
                padding: 0 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 5px;
                .left {
                  display: flex;
                  align-items: center;
                  font-weight: bold;
                  color: #ced3d9;
                  line-height: 22px;
                  .span1 {
                    font-weight: 500;
                    color: #8f8e8e;
                    line-height: 0.22rem;
                    margin-right: 3px;
                  }
                  .span2 {
                    margin-right: 0.19rem;
                  }
                }
              }
            }
          }
          .coin {
            width: 100%;
            display: flex;
            margin-top: 0.25rem;
            padding: 0 0.08rem;
            justify-content: space-between;
            .left {
              display: flex;
              flex-direction: column;
              font-weight: 500;
              color: #ced3d9;
              line-height: 22px;
              .num {
                display: flex;
                align-items: center;
                font-weight: bold;
                color: #ced3d9;
                line-height: 22px;
                margin-top: 5px;
                .coin_img {
                  width: 0.19rem;
                  margin-right: 3px;
                }
              }
            }
            .btn {
              cursor: pointer;
              width: 1.1rem;
              height: 0.3rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0.04rem;
              border: 1px solid #918256;
            }
          }
          .out_btn {
            cursor: pointer;
            width: 1.5rem;
            height: 0.26rem;
            box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
            border-radius: 0.04rem;
            backdrop-filter: blur(14px);
            font-weight: 600;
            color: #0e0d0d;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            margin-top: 0.25rem;
          }
          .tip_ {
            width: 1.5rem;
            margin: 0.12rem auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 500;
            color: #8f8e8e;
            line-height: 0.12rem;
            .page_has_question_icon {
              position: relative;
              cursor: pointer;
              &::after {
                content: "";
                width: 0.1rem;
                height: 0.1rem;
                filter: blur(0px);
                background: url(//cdn.sealemlab.com/sealemlab_assets_test/images/ques_new.webp)
                  no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right: -15px;
                top: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>