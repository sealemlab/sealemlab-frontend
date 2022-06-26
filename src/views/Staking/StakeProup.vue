<template>
  <div class="stake_proup" v-if="stakedStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18" :class="isEnLang?'en_Bold':''">{{$t("message.stake.txt16")}}</p>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
      <div class="box">
        <p class="title font14 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.stake.txt17") }}</p>
        <div class="inputbox">
          <div class="inputdiv" :class="isEnLang?'en_Bold':''">
            <Input :isright="true" :modelValue="STmsg" type="number" :placeholder='$t("message.bond.txt23")' @input="inputClick"></Input>
          </div>
          <p :class="isEnLang?'en_Bold':''">≈ $ {{STmsg * getUserCoin.stPrice | PriceConversion | Thousandths}}</p>
        </div>
        <p class="balance" :class="isEnLang?'en_medium':''">{{$t("message.acticePage.txt16")}}: {{getUserCoin.st | PriceConversion | Thousandths}} ST</p>
        <!-- 滑动块 -->
        <div class="line_onebox font16 mobile_font14">
          <div class="btns">
            <progressBar @inputFun="inputFun" :passValue="passValue"></progressBar>
          </div>
          <span class="unit_class font16" :class="isEnLang?'en_Bold':''">{{sliderValue}} %</span>
        </div>
        <!-- 百分比 -->
        <div class="percentageBox">
          <div class="onebox" :class="{activeClass:index == IndexPage}" v-for="(item,index) in arr" :key="index" @click="selectFun(item)">{{item}}%</div>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt17") }}</span>
          <span>$ {{STmsg * getUserCoin.stPrice | PriceConversion | Thousandths}}</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>APY</span>
          <span>{{APY | MultiplyBySquare}} %</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt18") }}</span>
          <span>$ {{sevenDays | PriceConversion}}</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt19") }}</span>
          <span>$ {{fourteenDays | PriceConversion}}</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt20") }}</span>
          <span>$ {{thirtyDays | PriceConversion}}</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt21") }}</span>
          <span>{{additionalTaxRate | MultiplyBySquare}} %</span>
        </div>
        <div class="stake_btn font18" :class="isEnLang?'en_Bold':''" @click="userStakedFun">
          {{ $t("message.stake.txt1") }}
          <BtnLoading :isloading="userStakedLoading"></BtnLoading>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { stStaking,token,getSigner,stStakingInfo } from 'sealemlab-sdk'
import progressBar from './slider.vue'
export default {
  components:{
    progressBar
  },
  computed: {
    ...mapGetters(["getProduction","isEnLang","getUserCoin","getNoticeNum","getAccount","getAccountStatus"]),
    additionalTaxRate(){ // 用户已经购买额加上即将要购买额是否超过额定额度(每1000增加0.1%---(0.001))
      let num = Math.floor( (Number(this.STmsg) * this.getUserCoin.stPrice ) / 1000) * 0.001
      return num + this.rate
    },
    sevenDays(){
      return Number(this.interestInfo.sevenDays) + ((this.yearValue * (this.STmsg / ( Number(this.totalStaked) + Number(this.STmsg) )) * 7 ) / 365)
    },
    fourteenDays(){
      return Number(this.interestInfo.fourteenDays) + ((this.yearValue * (this.STmsg / ( Number(this.totalStaked) + Number(this.STmsg) )) * 14 ) / 365)
    },
    thirtyDays(){
      return Number(this.interestInfo.thirtyDays) + ((this.yearValue * (this.STmsg / ( Number(this.totalStaked) + Number(this.STmsg) )) * 30) / 365)
    }
  },
  watch:{
    'stakedStatus'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if (newValue == 0) {
          this.getUserROI()
        } else if (newValue > 0) {
          this.$utils.antiShakeFun(() => {
            this.getUserROI()
          }, 2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  props: {
    stakedStatus: {
      type: Boolean,
      default: false
    },
    openPoolStatus: {
      type: Boolean,
      default: false
    },
    APY:{
      type: Number,
      default: 0
    },
    rate:{
      type: Number,
      default: 0
    },
    totalStaked:{
      type: Number,
      default: 0
    },
  },
  data(){
    return {
      passValue:0, // 给滑块传的值
      userReadyStaked:false,
      userStakedLoading:false,
      IndexPage:-1,
      arr:[25,50,75,100],
      STmsg:'',
      sliderValue:0,// 拖动条value
      interestInfo:{
        sevenDays:0,
        fourteenDays:0,
        thirtyDays:0
      },
      yearValue:0
    }
  },
  methods: {
    inputFun(data){
      if(this.getUserCoin.st < 1e-8){
        this.sliderValue = 0
        this.STmsg = 0
      }else{
        this.sliderValue = data
        let nums = this.getUserCoin.st * (data / 100)
        this.STmsg = this.$utils.getBit(nums,8)
      }
    },
    inputClick(data){
      if(Number(this.getUserCoin.st) < Number(1e-8)){
        this.STmsg = 0
      }else if(Number(data) > Number(this.getUserCoin.st)){
        this.STmsg = this.$utils.getBit(this.getUserCoin.st,8)
        // console.log('this.STmsg: ', this.STmsg);
      }else{
        this.STmsg = this.$utils.getBit(data,8)
      }
      console.log("this.sevenDays",this.sevenDays)
    },
    userStakedFun(){
      if(!this.openPoolStatus){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.stake.txt24'}));
        return
      }
      if(this.userStakedLoading)return
      if(this.getUserCoin.st < 0){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.stake.txt25'}));
        return
      }
      if(!this.STmsg){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.stake.txt26'}));
        return
      }
        // console.log('Number(this.STmsg): ', Number(this.STmsg));
        // console.log('Number(this.getUserCoin.st): ', Number(this.getUserCoin.st));
      if(Number(this.STmsg) > Number(this.getUserCoin.st)){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.stake.txt29'}));
        return
      }
      this.userStakedLoading = true
      stStaking().connect(getSigner()).deposit(this.$utils.convertNormalToBigNumber(this.STmsg, 18),localStorage.getItem('Invitee')).then(async res => {
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.stake.txt27','link':res.hash}));
        this.$store.commit("setProgressInfo", JSON.stringify({'speed':50}));
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          this.userStakedLoading = false
          this.$utils.getUserCoinQuantity(token().ST,'st',this.getAccount)
          this.STmsg = ''
          this.passValue = 0
          // console.log('this.passValue: ', this.passValue);
          this.sliderValue = 0
          this.userReadyStaked = true
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.stake.txt28'}));
        }else{
          this.userStakedLoading = false
        }
      }).catch(() => {
        this.userStakedLoading = false
      })
    },
    selectFun(item){
      this.passValue = item
      this.sliderValue = item
      if(Number(this.getUserCoin.st) < 1e-8){
        this.STmsg = 0
      }else{
        let nums = this.getUserCoin.st * (item / 100)
        // console.log('nums: ', nums);
        this.STmsg = this.$utils.getBit(nums,8)
      }
      console.log('this.sevenDays',this.sevenDays)
    },
    closeProup(){
      this.sliderValue = 0
      this.IndexPage = -1
      this.STmsg = ''
      this.$emit('close',this.userReadyStaked)
    },
    // 获取用户ROI
    getUserROI(){
      // 获取质押池用户ROI（用户年度投资回报率），需要在返回结果前面加上$
      stStakingInfo.getRoi(this.getAccount,this.$store.state.srPrice).then(res => {
        console.log('获取质押池用户ROI（用户年度投资回报率），需要在返回结果前面加上$res: ', res);
        this.interestInfo.sevenDays = 7 / 365 * res
        this.interestInfo.fourteenDays = 14 / 365 * res
        this.interestInfo.thirtyDays = 30 / 365 * res
      })
    },
    // 预计用户质押的st收益
    expectedIncome(){
      console.log('this.$store.state.srPrice: ', this.$store.state.srPrice)
      stStakingInfo.getSRValuePerYear(this.$store.state.srPrice).then(res => {
        console.log('一年产出价值 ', res,this.totalStaked);
        this.yearValue = res
      })
    }
  },
  mounted(){
    this.expectedIncome()
  }
}
</script>
<style lang="scss" scoped>
.stake_proup {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.proup_boxs{
  position: relative;
  width: 50vw;
  height: 85%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 70px;
  background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
  border-radius: 12px;
  border: 1px solid rgba(68, 67, 67, 0.47);
  .propu_title_txt{
    position: absolute;
    font-weight: bold;
    color: #ECCF83;
    line-height: 29px;
    width: 100%;
    text-align: center;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
  }
  .close_img{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 34px;
    cursor: pointer;
  }
}
.box{
  width: 100%;
  padding-top: 50px;
  // height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .title{
    font-weight: bold;
    color: #ECCF83;
    line-height: 16px;
  }
  .inputbox{
    margin-top: 15px;
    background: #171718;
    box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
    border-radius: 8px;
    border: 1px solid #373636;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .inputdiv{
      width: 50%;
      height: 50%;
    }
    p{
      font-weight: 600;
      color: #A4A4A4;
      line-height: 17px;
      margin-top: 8px;
    }
  }
  .balance{
    width: 100%;
    text-align: right;
    color: #A4A4A4;
    line-height: 14px;
    margin-top: 12px;
  }
  .line_onebox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 39px;
    .btns {
      padding-left: 7px;
      width: calc(100% - 62px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .unit_class{
      font-weight: bold;
      color: #ECCF83;
      line-height: 19px;
    }
  }
  .percentageBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 37px;
    margin-bottom: 42px;
    .onebox{
      cursor: pointer;
      width: 86px;
      height: 25px;
      text-align: center;
      line-height: 23px;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 4px;
      border: 1px solid #373636;
      font-weight: 600;
      color: #ECCF83;
    }
    .activeClass{
      background: red;
      color: #fff;
    }
  }
  .tipbox{
    width: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .stake_btn{
    cursor: pointer;
    width: 330px;
    min-height: 58px;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    border-radius: 4px;
    backdrop-filter: blur(14px);
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #000000;
  }
}
.box::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@media screen and (max-width: 980px) {
  .proup_boxs{
    position: relative;
    width: 90%; 
    height: 85%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    border-radius: 0.2rem;
    .propu_title_txt{
      position: absolute;
      font-weight: bold;
      color: #ECCF83;
      width: 100%;
      text-align: center;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      line-height: 0.2rem;
      padding-bottom: 0.2rem;
    }
    .close_img{
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      width: 0.28rem;
      cursor: pointer;
    }
  }
  .box{
    width: 100%;
    padding-top: 0.4rem;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .title{
      font-weight: bold;
      color: #ECCF83;
      line-height: 0.16rem;
    }
    .inputbox{
      margin-top: 0.08rem;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 0.02rem;
      border: 1px solid #373636;
      padding: 0.11rem 0.14rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .inputdiv{
        width: 50%;
        height: 50%;
      }
      p{
        font-weight: 600;
        color: #A4A4A4;
        line-height: 0.17rem;
        margin-top: 0.15rem;
      }
    }
    .balance{
      width: 100%;
      text-align: right;
      color: #A4A4A4;
      line-height: 0.14rem;
      margin-top: 0.12rem;
    }
    .line_onebox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      .btns {
        padding-left: 7px;
        width: calc(100% - 0.4rem);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .unit_class{
        font-weight: bold;
        color: #ECCF83;
        line-height: 0.19rem;
      }
    }
    .percentageBox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      margin-bottom: 42px;
      .onebox{
        cursor: pointer;
        width: 0.57rem;
        height: 0.22rem;
        text-align: center;
        line-height: 0.22rem;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 0.04rem;
        border: 1px solid #373636;
        font-weight: 600;
        color: #ECCF83;
      }
    }
    .tipbox{
      width: 100%;
      display: flex;
      justify-content:space-between;
      align-items: center;
      margin-bottom: 0.1rem;
    }
    .stake_btn{
      cursor: pointer;
      width: 90%;
      min-height: 0.4rem;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      border-radius: 0.04rem;
      backdrop-filter: blur(14px);
      margin: 0.4rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
    }
  }
}
</style>