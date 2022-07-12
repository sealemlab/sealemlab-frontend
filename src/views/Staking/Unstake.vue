<template>
  <div class="stake_proup" v-if="unStakedStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18" :class="isEnLang?'en_Bold':''">{{$t("message.stake.txt33")}}</p>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
      <div class="box">
        <p class="title font14 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.stake.txt34") }}</p>
        <div class="inputbox">
          <div class="inputdiv" :class="isEnLang?'en_Bold':''">
            <Input :isright="true" :modelValue="STmsg" type="number" :placeholder='$t("message.bond.txt23")' @input="inputClick"></Input>
          </div>
          <p :class="isEnLang?'en_Bold':''">≈ $ {{STmsg * getUserCoin.stPrice | PriceConversion | Thousandths}}</p>
        </div>
        <p class="balance" :class="isEnLang?'en_medium':''">{{$t("message.acticePage.txt16")}}: {{ userStaked | PriceConversion | Thousandths}} ST</p>
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
        <div class="tipbox add_pointer font14" :class="isEnLang?'en_medium':''">
          <span class="has_question_icon" @click="AddQuesFun('message.stake.rate_tip', $event)">{{ $t("message.stake.txt36") }}</span>
          <span>{{userTaxRate}} %</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt37") }}</span>
          <span>{{twenty | PriceConversion }} d</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt38") }}</span>
          <span>{{ten | PriceConversion}} d</span>
        </div>
        <div class="tipbox font14" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt39") }}</span>
          <span>{{zero | PriceConversion}} d</span>
        </div>
        <div class="stake_btn font18" :class="isEnLang?'en_Bold':''" @click="userUnStakedFun">
          {{ $t("message.stake.txt35") }}
          <BtnLoading :isloading="userUnStakedLoading"></BtnLoading>
        </div>
        <div class="btn_tip font12" :class="isEnLang?'en_medium':''">
          <span>{{ $t("message.stake.txt40") }}</span>
        </div>
      </div>
    </div>
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
import { stStaking,getSigner,token,util } from 'sealemlab-sdk'
import progressBar from './slider.vue'
import MessageBox from "@/views/Bond/MessageBox.vue";
export default {
  components:{
    progressBar,MessageBox
  },
  computed: {
    ...mapGetters(["getProduction","isEnLang","getUserCoin","getNoticeNum","getAccount","getAccountStatus"]),
    twenty(){
      if(this.userTaxRate >= 20){
        // console.log('this.userTaxRate - 20: ', this.userTaxRate - 20);
        return Number((this.userTaxRate - Number(20)) / 0.1).toFixed(2)
      }
      return 0
    },
    ten(){
      if(this.userTaxRate >= 10){
        return Number((this.userTaxRate - Number(10)) / 0.1).toFixed(2)
      }
      return 0
    },
    zero(){
      return Number(this.userTaxRate / 0.1).toFixed(2)
    }
  },
  watch:{
    'unStakedStatus'(newvala){
      if(newvala){
        this.getUserStaked()
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if (newValue == 0) {
          this.getUserStaked()
        } else if (newValue > 0) {
          this.$utils.antiShakeFun(() => {
            this.getUserStaked()
          }, 2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  props: {
    unStakedStatus: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      datacontent: '',
      clientX: 0,
      clientY: 0,
      passValue:0, // 给滑块传的值
      userUnstakedSuccess:false,
      userUnStakedLoading:false, // 解除质押按钮loading
      IndexPage:-1,
      arr:[25,50,75,100],
      STmsg:'',
      sliderValue:0,// 拖动条value
      userStaked:0,//用户质押数量
      userTaxRate:0,//提现税率
    }
  },
  methods: {
    AddQuesFun (data, e) {
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY + 5
      setTimeout(() => {
        this.$refs.mychildAdd.titleFun()
      }, 400)
    },
    inputFun(data){
      this.sliderValue = data
      let nums = this.userStaked * (data / 100)
      this.STmsg = this.$utils.getBit(nums,8)
    },
    inputClick(data){
      if(Number(data) > Number(this.userStaked)){
        this.STmsg = this.$utils.getBit(this.userStaked,8)
      }else{
        this.STmsg = this.$utils.getBit(data,8)
      }
    },
    userUnStakedFun(){
      if (this.userStaked == 0) {
        this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt41' }));
        return
      }
      if(!this.STmsg){
        this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt42' }));
        return
      }
      if (this.userUnStakedLoading) return
      this.userUnStakedLoading = true
      let subNum = this.$utils.getBit(this.STmsg, 8)
      // this.$utils.convertNormalToBigNumber(subNum, 18)
      stStaking().connect(getSigner()).withdraw(util.parseUnits(subNum)).then(async res => {
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.stake.txt43','link':res.hash}));
        this.$store.commit("setProgressInfo", JSON.stringify({'speed':30}));
        const etReceipt = await res.wait();
        if (etReceipt.status == 1) {
          this.userUnstakedSuccess = true
          this.STmsg = ''
          this.passValue = 0
          this.sliderValue = 0
          this.userUnStakedLoading = false
          this.getUserStaked()
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          this.$utils.getUserCoinQuantity(token().ST,'st',this.getAccount)
          this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt44' }));
          
        } else {
          this.userUnStakedLoading = false
        }
      }).catch(() => {
        this.userUnStakedLoading = false
      })
    },
    selectFun(item){
      this.passValue = item
      this.sliderValue = item
      if(Number(this.userStaked) < 1e-8){
        this.STmsg = 0
      }else{
        let nums = this.userStaked * (item / 100)
        this.STmsg = this.$utils.getBit(nums,8)
      }
    },
    closeProup(){
      this.sliderValue = 0
      this.IndexPage = -1
      this.STmsg = ''
      this.$emit('closeUnstake',this.userUnstakedSuccess)
    },
    getUserStaked(){
      stStaking().userStakedST(this.getAccount).then(res => {
        console.log('获取某用户的质押的ST数量: ', res);
        if (res / 1e18 <= 1e-8) {
          this.userStaked = 0
        } else {
          this.userStaked = util.formatEther(res)// this.$utils.convertBigNumberToNormal(Number(res), 0, 18, true)
        }
      })
      // 获取用户提现时要扣的税率
      stStaking().getUserTaxRate(this.getAccount).then(res => {
        this.userTaxRate = res / 100
      })
    }
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
    padding: 9px 20px;
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
  .add_pointer{
    cursor: pointer;
  }
  .stake_btn{
    cursor: pointer;
    width: 330px;
    min-height: 58px;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    border-radius: 4px;
    backdrop-filter: blur(14px);
    margin: 40px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #000000;
  }
  .btn_tip{
    width: 100%;
    text-align: center;
    font-weight: 500;
    color: #8F8E8E;
    line-height: 14px;
    margin-top: 17px;
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
      width: 0.25rem;
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
      margin: 0.2rem auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
    }
  }
}
</style>