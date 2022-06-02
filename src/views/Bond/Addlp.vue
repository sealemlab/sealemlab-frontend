<template>
  <div class="input_proup" v-if="addlpDis">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18" :class="isEnLang?'en_Bold':''">{{$t("message.bond.txt20")}}</p>
      <div class="add_overflow_box">
        <p class="title_ font14 mobile_font14" :class="isEnLang?'en_Bold':''">{{$t("message.bond.txt21")}}</p>
        <div class="content" :class="isEnLang?'en_medium':''">
          <div class="box" v-for="(item,index) in arr" :key="index" @click="typeClick(item,index)">
            <span class="type_ font12" :class="index == activetype?'activeClass':''">{{item.title}}</span>
          </div>
        </div>
        <!-- busd输入框 token1 -->
        <div class="inputbox" v-if="activetype == 0 || activetype == 1">
          <p class="font12 balance_" :class="isEnLang?'en_medium':''">BUSD {{$t("message.bond.txt22")}}: {{getUserCoin.busd}}</p>
          <div class="inputcontent" :class="isEnLang?'en_Bold':''">
            <div class="left_content">
              <img :src="`${$store.state.imgUrl}busd.webp`" class="busd_img" />
              <span class="busd_txt font14">BUSD</span>
            </div>
            <div class="center_content">
              <Input @blurEvent="busdBlurEvent" @focusEvent="busdFocusEvent" :msg="BUSDmsg" :placeholder='$t("message.bond.txt23")' @input="busdInputClick"></Input>
            </div>
            <div class="max_btn font16" @click="maxClick('busd')">MAX</div>
          </div>
        </div>
        <!-- st输入框 token0 -->
        <div class="inputbox" v-if="activetype == 0 || activetype == 2">
          <p class="font12 balance_" :class="isEnLang?'en_medium':''">ST {{$t("message.bond.txt22")}}: {{getUserCoin.st}}</p>
          <div class="inputcontent" :class="isEnLang?'en_Bold':''">
            <div class="left_content">
              <img :src="`${$store.state.imgUrl}stlogo.webp`" class="busd_img" />
              <span class="busd_txt font14">ST</span>
            </div>
            <div class="center_content">
              <Input @blurEvent="blurEvent" :msg="STmsg" @focusEvent="focusEvent" :placeholder='$t("message.bond.txt23")' @input="inputClick"></Input>
            </div>
            <div class="max_btn font16" @click="maxClick('st')">MAX</div>
          </div>
        </div>
        <!-- 投入以及收益 -->
        <div class="profit_box">
          <div class="onebox" v-for="(item,index) in moneyArr" :key="index">
            <p class="font14 _txt" :class="isEnLang?'en_Bold':''">{{$t(item.title)}}</p>
            <div class="border_ font12" :class="isEnLang?'en_medium':''">
              <span class="span1">{{item.num}}</span>
              <span class="span1">BUSD</span>
            </div>
          </div>
        </div>
        <div class="main_button" v-if="allLoading">
          <BtnLoading :isloading="true"></BtnLoading>
        </div>
        <div v-else>
          <div class="main_button font16 mobile_font16" @click="buyBondFun" v-if="isApproveBUSD && isApproveST">
            {{$t("message.tip.self_buy")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
          </div>
          <div class="main_button font16 mobile_font16" @click="authorizationClick('busd')" v-if="!isApproveBUSD && (activetype == 1 || activetype == 0)">
            BUSD {{$t("message.approve")}}<BtnLoading :isloading="busdisloading"></BtnLoading>
          </div>
          <div class="main_button font16 mobile_font16" @click="authorizationClick('st')" v-if="!isApproveST && (activetype == 2 || activetype == 0)">
            ST {{$t("message.approve")}}<BtnLoading :isloading="stisloading"></BtnLoading>
          </div>
        </div>
        <div class="tipbox font12" :class="isEnLang?'en_medium':''">
          <p class="font14 mobile_font14" :class="isEnLang?'en_Bold':''"><span>{{$t("message.bond.txt27")}}</span><span>0%</span></p>
          <p class="color1"><span>{{$t("message.bond.txt28")}}</span><span>0%</span>
          <p class="color2"><span>{{$t("message.bond.txt30")}}</span><span>0%</span>
          <p class="color3"><span>{{$t("message.bond.txt29")}}</span><span>0%</span>
          <p class="color4"><span>{{$t("message.bond.txt31")}}</span><span>0%</span>
          <p class="font14 mobile_font14" @click="AddQuesFun('message.bond.txt_tax',$event)" :class="isEnLang?'en_Bold':''"><span class="has_question_icon" :title='$t("message.bond.txt_tax")'>{{$t("message.bond.txt32")}}</span><span>0.1%</span></p>
          <p class="font16 mobile_font14" :class="isEnLang?'en_Bold':''"><span>{{$t("message.bond.txt33")}}</span><span>$0</span></p>
          <p>{{$t("message.bond.txt34")}}</p>
        </div>
      </div>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
    </div>
    <MessageBox ref="mychildAdd" :clientX='clientX' :clientY="clientY" :content="datacontent"></MessageBox>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MessageBox from "./MessageBox.vue";
import { bondDepository,token,contract,getSigner,erc20,util} from 'sealemlab-sdk'
export default {
  watch:{
    'addlpDis'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == -1 || newValue == undefined){
          this.allLoading = this.isApproveST = this.isApproveBUSD = false
        }else if(newValue == 0){
          this.allLoading = true
          this.isApproveST = this.isApproveBUSD = false
          this.getSDKInfo()
        }else if(newValue > 0){
          this.isApproveST = this.isApproveBUSD = false
          this.allLoading = true
          clearInterval(this.btntimernull)
          this.$utils.antiShakeFun(() => {
            this.getSDKInfo()
            // console.log("切换账号重新判断授权")
          },2000)
          this.getUserCoinBalance('busd')
          this.getUserCoinBalance('st')
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    MessageBox
  },
  computed: {
    ...mapGetters(["isEnLang","getUserCoin","getNoticeNum","getAccount","getAccountStatus"]),
    userRate(){
      return (this.obj.baseRate + this.obj.additional1 + this.obj.additional2 + this.obj.additional3) / 100
    }
  },
  props: {
    addlpDis: {
      type: Boolean,
      default: false
    },
    newBondID:{
      type: Number,
      default: -2
    },
    obj: {
      type: Object,
      default: function () { return {} }
    }
  },
  data(){
    return {
      BUSDmsg:'',
      STmsg:'',
      busd_code:1,
      st_vode:1,
      allLoading:true,// 按钮转圈
      isApproveST:false,//st是否授权
      isApproveBUSD:false,//bsud是否授权
      buyLoading:false,//购买债券loading
      busdisloading:false,//busd授权loading
      stisloading:false,//st授权loading
      activetype:0,
      datacontent:'',
      clientX:0,
      clientY:0,
      arr:[
        {
          title:'BUSD&ST',
        },
        {
          title:'BUSD',
        },
        {
          title:'ST',
        }
      ],
      moneyArr:[
        {title:'message.bond.txt24',num:0},
        {title:'message.bond.txt25',num:0},
        {title:'message.bond.txt26',num:0}
      ],
      btntimernull:null,
      stBlurStatus:false,
      busdBlurStatus:false,
    }
  },
  methods: {
    buyBondFun(){
      console.log('购买债券')
      if(this.buyLoading)return
      this.buyLoading = true
      let address = this.$route.params.address == 0 ?'0x0000000000000000000000000000000000000000':''
      console.log('this.newBondID,this.$utils.convertNormalToBigNumber(this.BUSDmsg, 18),this.$utils.convertNormalToBigNumber(this.STmsg, 18),0,address: ', this.newBondID,this.$utils.convertNormalToBigNumber(this.BUSDmsg, 18),this.$utils.convertNormalToBigNumber(this.STmsg, 18),0,address);
      bondDepository().connect(getSigner()).swapAndAddLiquidityAndBond(this.newBondID,this.$utils.convertNormalToBigNumber(this.STmsg, 18),this.$utils.convertNormalToBigNumber(this.BUSDmsg, 18),0,address).then(async res => {
        console.log('购买债券res: ', res);
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res.hash}));
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.buyLoading = false
          this.BUSDmsg = this.STmsg = ''
          this.moneyArr[0].num = this.moneyArr[1].num = this.moneyArr[2].num = 0
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          this.getUserCoinBalance('busd')
          this.getUserCoinBalance('st')
        }else{
          this.buyLoading = false
        }
      }).catch(() => {
        this.buyLoading = false
      })
    },
    // 去授权
    authorizationClick(data){
      if(data == 'busd'){
        if(!this.isApproveBUSD){
          this.busdisloading = true
          this.$utils.goApproveFun(token().BUSD, contract().BondDepository).then(res => {
            console.log('busd授权结果res: ', res);
            if(res){
              this.isApproveBUSD = true
              this.busdisloading = false
              if(!this.getNoticeNum){
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
                this.$store.commit("setNoticeNum",true)
              }
            }else{
              this.isApproveBUSD = false
              this.busdisloading = false
            }
          }).catch(() => {
            this.isApproveBUSD = false
            this.busdisloading = false
          })
        }
      }else{
        if(!this.isApproveST){
          this.stisloading = true
          this.$utils.goApproveFun(token().ST,contract().BondDepository).then(res => {
            console.log('st授权结果res: ', res);
            if(res){
              this.isApproveST = true
              this.stisloading = false
              if(!this.getNoticeNum){
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
                this.$store.commit("setNoticeNum",true)
              }
            }else{
              this.isApproveST = false
              this.stisloading = false
            }
          }).catch(() => {
            this.isApproveST = false
            this.stisloading = false
          })
        }
      }
    },
    // 是否授权
    getSDKInfo(){
      let count = 0
      this.$utils.isApproveFun(this.getAccount,token().BUSD,contract().BondDepository).then(res => {
        // console.log('busd是否授权res: ', res);
        if (res) {
          this.busd_code = 2
          count++
          // this.isApproveBUSD = true
        } else {
          // this.isApproveBUSD = false
          this.busd_code = 3
          count++
        }
      }).catch(() => {
        // this.isApproveBUSD = false
        this.busd_code = 3
        count++
      })
      this.$utils.isApproveFun(this.getAccount,token().ST,contract().BondDepository).then(res => {
        // console.log('st是否授权res: ', res);
        if(res){
          // this.isApproveST = true
          this.st_vode = 2
          count++
        }else{
          // this.isApproveST = false
          this.st_vode = 3
          count++
        }
      }).catch(() => {
        // this.isApproveST = false
        this.st_vode = 3
        count++
      })
      clearInterval(this.btntimernull)
      this.btntimernull = setInterval(() => {
        if(count == 2){
          clearInterval(this.btntimernull)
          if(this.st_vode == 2){
            this.isApproveST = true
          }else{
            this.isApproveST = false
          }
          if(this.busd_code == 2){
            this.isApproveBUSD = true
          }else{
            this.isApproveBUSD = false
          }
          this.allLoading = false
          // console.log('按钮都已判断完毕',this.st_vode,this.busd_code)
        }
      },1000)
    },
    AddQuesFun(data,e){
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY
      setTimeout(() => {
        this.$refs.mychildAdd.titleFun()
      },400)
    },
    // busd---input
    busdBlurEvent(){
      console.log("busd失焦")
      this.busdBlurStatus = false
      if(!this.stBlurStatus){
        this.moneyArr[0].num = Number(this.BUSDmsg) + Number(this.STmsg) * this.getUserCoin.stPrice
        this.moneyArr[1].num = this.$utils.getBit(this.userRate * this.moneyArr[0].num,2)
        this.moneyArr[2].num = Number(this.moneyArr[0].num) + Number(this.moneyArr[1].num)
      }
    },
    busdFocusEvent(){
      console.log("busd聚焦")
      this.busdBlurStatus = true
    },
    busdInputClick(data){
      console.log('busd----data: ', data);
      this.BUSDmsg = data
    },
    // st---input
    blurEvent(){
      console.log("st失焦")
      this.stBlurStatus = false
      if(!this.busdBlurStatus){
        this.moneyArr[0].num = Number(this.BUSDmsg) + Number(this.STmsg) * this.getUserCoin.stPrice
        this.moneyArr[1].num = this.$utils.getBit(this.userRate * this.moneyArr[0].num,2)
        this.moneyArr[2].num = Number(this.moneyArr[0].num) + Number(this.moneyArr[1].num)
      }
    },
    focusEvent(){
      console.log("st聚焦")
      this.stBlurStatus = true
    },
    inputClick(data){
      console.log("input")
      this.STmsg = data
    },
    typeClick(item,index){
      this.arr.forEach(item => {
        item.status = false
      })
      item.status = true
      this.activetype = index
    },
    // 弹窗关闭
    closeProup () {
      this.BUSDmsg = this.STmsg = ''
      this.$emit('closeLP')
    },
    maxClick(data){
      if(data == 'busd'){
        this.BUSDmsg = this.getUserCoin.busd
      }else{
        this.STmsg = this.getUserCoin.st
      }
    },
    // 获取当前用户的代币余额
    getUserCoinBalance(data){
      if(data == 'busd'){
        erc20(token().BUSD).balanceOf(this.getAccount).then(res => {
          let obj = {}
          obj.busd = this.$utils.getBit(util.formatEther(res),4)
          this.$store.commit("setUserCoin",Object.assign(this.getUserCoin,obj));
          console.log("busd余额")
        })
      }else if(data == 'st'){
        erc20(token().ST).balanceOf(this.getAccount).then(res => {
          let obj = {}
          obj.st = this.$utils.getBit(util.formatEther(res),4)
          this.$store.commit("setUserCoin",Object.assign(this.getUserCoin,obj));
          console.log("st余额")
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.input_proup {
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
  height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 100px;
  background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
  border-radius: 12px;
  border: 1px solid rgba(68, 67, 67, 0.47);
  .propu_title_txt{
    font-weight: bold;
    color: #ECCF83;
    line-height: 29px;
    margin-bottom: 20px;
  }
  .title_{
    width: 100%;
    margin-top: 23px;
    font-weight: bold;
    color: #ECCF83;
    line-height: 16px;
  }
  .content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .box{
      display: flex;
      flex-direction: column;
      cursor: pointer;
      min-height: 50px;
      .type_{
        width: 102px;
        display: inline-block;
        height: 26px;
        background: #373636;
        box-shadow: 0px 4px 14px 0px rgba(42, 37, 30, 0.45);
        border-radius: 5px;
        text-align: center;
        line-height: 26px;
        font-weight: 600;
        color: #CED3D9;
        margin-bottom: 10px;
      }
      .activeClass{
        background: #F0D48D;
        color: #000000;
      }
    }
  }
  .inputbox{
    width: 100%;
    margin-bottom: 30px;
    .balance_{
      width: 100%;
      text-align: right;
      font-weight: 400;
      color: #8B8484;
      line-height: 14px;
    }
    .inputcontent{
      padding-left: 14px;
      margin-top: 8px;
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 8px;
      border: 1px solid #373636;
      .left_content{
        min-width: 58px;
        display: flex;
        // justify-content: center;
        align-items: center;
        .busd_img{
          width: 17px;
          margin-right: 5px;
        }
        .busd_txt{
          font-weight: 600;
          color: #CED3D9;
          line-height: 20px;
        }
      }
      .center_content{
        width: 70%;
      }
      .max_btn{
        width: 72px;
        height: 38px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 8px;
        text-align: center;
        line-height: 38px;
        color: #000000;
        font-weight: bolder;
        cursor: pointer;
      }
    }
  }
  .profit_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .onebox{
      ._txt{
        font-weight: 600;
        color: #CED3D9;
        line-height: 20px;
      }
      .border_{
        margin-top: 8px;
        min-width: 100px;
        padding: 0 10px;
        height: 23px;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 4px;
        border: 1px solid #373636;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .span1{
          font-weight: 600;
          color: #F0D48D;
          line-height: 14px;
        }
      }
    }
  }
  .main_button{
    width: 75%;
    min-height: 45px;
    margin: 35px auto 37px;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
    border-radius: 4px;
    backdrop-filter: blur(14px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #000000;
    cursor: pointer;
  }
  .tipbox{
    width: 100%;
    display: flex;
    flex-direction: column;
    p{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      color: #A4A4A4;
      line-height: 14px;
      &:nth-child(1),&:nth-last-child(2),&:nth-last-child(3){
        margin-bottom: 15px;
        span{
          font-weight: 500;
          color: #CED3D9;
          line-height: 17px;
          margin-bottom: 0;
        }
      }
      &:nth-last-child(3){
        margin-top: 15px;
      }
      &:nth-last-child(1){
        margin-top: 20px;
      }
      span{
        margin-bottom: 8px;
      }
    }
  }
  .close_img{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 34px;
    cursor: pointer;
  }
}
.add_overflow_box{
  height: 90%;
  overflow: auto;
}
@media screen and (max-width: 980px) {
  .proup_boxs{
    position: relative;
    width: 90%; 
    height: 90%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    border-radius: 0.2rem;
    .propu_title_txt{
      font-weight: bold;
      color: #ECCF83;
      line-height: 0.2rem;
      margin-bottom: 0.2rem;
    }
    .title_{
      width: 100%;
      margin-top: 0.2rem;
      font-weight: 600;
      color: #ECCF83;
      line-height: 0.2rem;
    }
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      .box{
        display: flex;
        flex-direction: column;
        cursor: pointer;
        min-height: 0.5rem;
        .type_{
          width: 0.9rem;
          display: inline-block;
          height: 0.22rem;
          background: #373636;
          box-shadow: 0px 4px 14px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.05rem;
          text-align: center;
          line-height: 0.22rem;
          font-weight: 600;
          color: #CED3D9;
          margin-bottom: 0.1rem;
        }
        .activeClass{
          background: #F0D48D;
          color: #000000;
        }
      }
    }
    .inputbox{
      width: 100%;
      margin-bottom: 0.3rem;
      .balance_{
        width: 100%;
        text-align: right;
        font-weight: 400;
        color: #8B8484;
        line-height: 0.14rem;
      }
      .inputcontent{
        padding-left: 0.1rem;
        margin-top: 0.08rem;
        width: 100%;
        height: 0.38rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 0.08rem;
        border: 1px solid #373636;
        .left_content{
          display: flex;
          justify-content: center;
          align-items: center;
          .busd_img{
            width: 0.2rem;
            margin-right: 0.05rem;
          }
          .busd_txt{
            font-weight: 600;
            color: #CED3D9;
            line-height: 0.2rem;
          }
        }
        .center_content{
          width: 70%;
        }
        .max_btn{
          width: 0.72rem;
          height: 0.38rem;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.08rem;
          text-align: center;
          line-height: 0.38rem;
          color: #000000;
          font-weight: bolder;
        }
      }
    }
    .profit_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .onebox{
        ._txt{
          font-weight: 600;
          color: #CED3D9;
          line-height: 0.2rem;
        }
        .border_{
          margin-top: 0.08rem;
          min-width: 0.8rem;
          padding: 0 0.1rem;
          height: 0.23rem;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 0.04rem;
          border: 1px solid #373636;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .span1{
            font-weight: 600;
            color: #F0D48D;
            line-height: 0.14rem;
          }
        }
      }
    }
    .main_button{
      width: 75%;
      min-height: 0.45rem;
      margin: 0.35rem auto 0.37rem;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 0.04rem;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #000000;
      cursor: pointer;
    }
    .tipbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 400;
        color: #A4A4A4;
        line-height: 0.14rem;
        &:nth-child(1),&:nth-last-child(2),&:nth-last-child(3){
          margin-bottom: 0.15rem;
          span{
            font-weight: 500;
            color: #CED3D9;
            line-height: 0.17rem;
            margin-bottom: 0;
          }
        }
        &:nth-last-child(3){
          margin-top: 0.15rem;
        }
        span{
          margin-bottom: 0.08rem;
        }
      }
    }
    .close_img{
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      width: 0.28rem;
      cursor: pointer;
    }
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>