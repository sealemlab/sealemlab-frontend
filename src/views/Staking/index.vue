<template>
  <div class="staking_box">
    <!-- 背景图 -->
    <div class="img_bg font16">
      <img :src="`${$store.state.imgUrl}newbondbg.webp`" class="pc_bond_bg" />
      <span class="font35" :class="isEnLang?'en_heavy':''">STAKING</span>
    </div>
    <!-- 数据 -->
    <div class="dataBox">
      <div class="onebox" v-for="(item, index) in dataArr" :key="index">
        <span class="font24" :class="isEnLang?'en_medium':''">{{item.title}}</span>
        <span class="font35" :class="isEnLang?'en_heavy':''">$ {{item.num}}</span>
      </div>
    </div>
    <div class="staking_box">
      <div class="onebox">
        <div class="label font16" :class="isEnLang?'en_Bold':''">ST POOL</div>
        <div class="top_box">
          <div class="top_content">
            <img :src="`${$store.state.imgUrl}new_stlogo.webp`" class="logo_img" />
            <div class="right_cen">
              <span class="font16" :class="isEnLang?'en_Bold':''">Total staked</span>
              <span class="font32" :class="isEnLang?'en_Bold':''">100000</span>
              <span class="font12" :class="isEnLang?'en_medium':''">≈ $ 2345678.9</span>
            </div>
          </div>
          <div class="line_txt">
            <div class="left">
              <span class="font16 span2" :class="isEnLang?'en_Bold':''">APY</span>
              <span class="font16" :class="isEnLang?'en_Bold':''">1000%</span>
            </div>
            <div class="left">
              <span class="span1 font12">View Contract</span>
              <svg t="1653893405932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18173" width="16" height="16"><path d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z" p-id="18174" fill="#8F8E8E"></path></svg>
            </div>
          </div>
        </div>
        <div class="coin">
          <div class="left">
            <span class="font14" :class="isEnLang?'en_medium':''">Available ST</span>
            <div class="num">
              <img :src="`${$store.state.imgUrl}new_stlogo.webp`" class="coin_img" />
              <span class="font20" :class="isEnLang?'en_Bold':''">1000</span>
            </div>
          </div>
          <div class="btn">GET ST</div>
        </div>
        <div class="coin">
          <div class="left">
            <span class="font14" :class="isEnLang?'en_medium':''">ST Staked</span>
            <div class="num">
              <img :src="`${$store.state.imgUrl}new_stlogo.webp`" class="coin_img" />
              <span class="font20" :class="isEnLang?'en_Bold':''">1000</span>
            </div>
          </div>
          <div class="btn">GET ST</div>
        </div>
        <div class="coin">
          <div class="left">
            <span class="font14" :class="isEnLang?'en_medium':''">SR Earned</span>
            <div class="num">
              <img :src="`${$store.state.imgUrl}new_srlogo.webp`" class="coin_img" />
              <span class="font20" :class="isEnLang?'en_Bold':''">1000</span>
            </div>
          </div>
          <div class="btn">GET ST</div>
        </div>
        <div class="out_btn btn_normal">
          Withdraw&Claim
        </div>
        <p class="font12 mobile_font12 tip_" @click="AddQuesFun('message.bond.txt_tax',$event)" :class="isEnLang?'en_medium':''">
          <span class="page_has_question_icon" :title='$t("message.bond.txt_tax")'>{{$t("message.bond.txt32")}}</span>
          <span>1%</span>
        </p>
      </div>
    </div>
    <MessageBox ref="mychildAdd" :clientX='clientX' :clientY="clientY" :content="datacontent"></MessageBox>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MessageBox from "@/views/Bond/MessageBox.vue";
import { stStaking,token,contract,getSigner } from 'sealemlab-sdk'
export default {
  computed: { ...mapGetters(["getAccount","getIsMobile","getIstrue","getNoticeNum","isEnLang","getUserCoin"]),},
  data(){
    return {
      dataArr:[
        {title:"Total staked",num:12567.97},
        {title:"Total staked",num:12567.97},
        {title:"Total staked",num:12567.97}
      ],
      datacontent:'',
      clientX:0,
      clientY:0,
    }
  },
  components: {
    MessageBox
  },
  watch:{
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == 0){
          this.getUserInfo()
        }else if(newValue > 0){
          this.$utils.antiShakeFun(() => {
            this.getUserInfo()
          },2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    AddQuesFun(data,e){
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY + 5
      setTimeout(() => {
        this.$refs.mychildAdd.titleFun()
      },400)
    },
    getSdkInfo(){
      // 获取池子是否已开启
      stStaking().openStatus().then(res => {
        console.log('获取池子是否已开启res: ', res);
      })
      // 获取每区块SR产量
      stStaking().srPerBlock().then(res => {
        console.log('获取每区块SR产量: ', res);
      })
      // 获取用户质押后每经过一天提现时可减免的税率
      stStaking().taxDynamicRate().then(res => {
        console.log('获取用户质押后每经过一天提现时可减免的税率: ', res);
      })
      // 获取用户质押的第1天提现时的基础税率
      stStaking().taxBaseRate().then(res => {
        console.log('获取每区块SR产量: ', res);
      })

      // 获取池子总质押ST数量
      stStaking().stakedST().then(res => {
        console.log('获取池子总质押ST数量: ', res);
      })
      // 获取池子总已产出SR
      stStaking().releasedSR().then(res => {
        console.log('获取池子总已产出SR: ', res);
      })
      // 获取池子总已提取SR
      stStaking().harvestedSR().then(res => {
        console.log('获取池子总已提取SR: ', res);
      })
    },
    getUserInfo(){
      // 获取某用户的质押的ST数量
      stStaking().userStakedST(this.getAccount).then(res => {
        console.log('获取某用户的质押的ST数量: ', res);
      })
      // 获取某用户的下级的质押的ST数量
      stStaking().affiliateStakedST(this.getAccount).then(res => {
        console.log('获取某用户的下级的质押的ST数量: ', res);
      })
      // 获取某用户已提取的SR数量
      stStaking().userHarvestedSR(this.getAccount).then(res => {
        console.log('获取某用户已提取的SR数量: ', res);
      })
      // 获取某用户上次质押的时间戳
      stStaking().userLastStakeTime(this.getAccount).then(res => {
        console.log('获取某用户上次质押的时间戳: ', res);
      })
      // 获取用户总SR奖励数量（已提取+可提取）
      stStaking().getTokenTotalRewards(this.getAccount).then(res => {
        console.log('获取用户总SR奖励数量（已提取+可提取）: ', res);
      })

      // 获取用户提现时要扣的税率
      stStaking().getUserTaxRate(this.getAccount).then(res => {
        console.log('获取用户提现时要扣的税率 ', res);
      })
      // 获取用户可提取SR数量
      stStaking().getTokenRewards(this.getAccount).then(res => {
        console.log('获取用户可提取SR数量', res);
      })
    }
  },
  mounted(){
    this.getSdkInfo()
  }
}
</script>
<style lang="scss" scoped>
.staking_box{
  width: 100vw;
  padding-bottom: 198px;
  .img_bg{
    width: 100%;
    position: relative;
    .pc_bond_bg {
      width: 100%;
      min-height: 350px;
    }
    span{
      position: absolute;
      left: 5vw;
      top: 164px;
      font-weight: 800;
      color: #ffffff;
      line-height: 41px;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .dataBox{
    width: 90vw;
    margin: 0 auto;
    margin-top: 95px;
    height: 181px;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .onebox{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        &:nth-child(1){
          font-weight: 500;
          color: #CED3D9;
          line-height: 22px;
        }
        &:nth-child(2){
          font-weight: 800;
          color: #CED3D9;
          line-height: 41px;
          margin-top: 25px;
        }
      }
    }
  }
  .staking_box{
    width: 90vw;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .onebox{
      // width: 30%;
      width: 344px;
      height: 539px;
      padding: 0 10px;
      background: linear-gradient(136deg, #000000 0%, #0F0F0F 37%, #1C1C1C 54%, #000000 100%);
      border: 1px solid;
      border-image: linear-gradient(136deg, rgba(149, 127, 93, 0.19), rgba(226, 202, 169, 0.58), rgba(237, 213, 180, 0.13), rgba(131, 102, 77, 0.21)) 1 1;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      .label{
        width: 135px;
        height: 31px;
        background: linear-gradient(311deg, rgba(242, 215, 140, 0) 0%, #F3DA92 100%);
        backdrop-filter: blur(0px);
        font-weight: bold;
        color: #111010;
        line-height: 31px;
        text-align: center;
        margin-left: -10px;
      }
      .top_box{
        width: 100%;
        height: 127px;
        border: 1px solid #bb9f5a;
        border-radius: 5px;
        margin-top: 13px;
        padding: 11px 16px;
        .top_content{
          display: flex;
          align-items: center;
          justify-content: center;
          .logo_img{
            width: 66px;
            margin-right: 36px;
          }
          .right_cen{
            display: flex;
            flex-direction: column;
            font-weight: bold;
            color: #CED3D9;
            line-height: 22px;
            span{
              &:nth-child(2){
                margin: 8px 0;
              }
              &:nth-child(3){
                font-weight: 500;
              }
            }
          }
        }
        .line_txt{
          width: 100%;
          padding: 0 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 5px;
          .left{
            display: flex;
            align-items: center;
            font-weight: bold;
            color: #CED3D9;
            line-height: 22px;
            .span1{
              font-weight: 500;
              color: #8F8E8E;
              line-height: 22px;
              margin-right: 3px;
            }
            .span2{
              margin-right: 31px;
            }
          }
        }
      }
      .coin{
        width: 100%;
        display: flex;
        margin-top: 27px;
        padding: 0 14px;
        justify-content: space-between;
        .left{
          display: flex;
          flex-direction: column;
          font-weight: 500;
          color: #CED3D9;
          line-height: 22px;
          .num{
            display: flex;
            align-items: center;
            font-weight: bold;
            color: #CED3D9;
            line-height: 22px;
            margin-top: 5px;
            .coin_img{
              width: 28px;
              margin-right: 3px;
            }
          }
        }
        .btn{
          cursor: pointer;
          width: 130px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #bb9f5a;
          border-radius: 5px;
        }
      }
      .out_btn{
        cursor: pointer;
        width: 206px;
        height: 40px;
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        font-weight: 600;
        color: #0E0D0D;
        line-height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-top: 34px;
      }
      .tip_{
        width: 206px;
        margin: 0 auto;
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        color: #8F8E8E;
        line-height: 22px;
        .page_has_question_icon{
          position: relative;
          cursor: pointer;
          &::after {
            content: "";
            width: 12px;
            height: 12px;
            filter: blur(0px);
            background: url(//cdn.sealemlab.com/sealemlab_assets_test/images/ques_new.webp) no-repeat;
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
</style>