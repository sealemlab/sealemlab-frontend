<template>
  <div class="buy_blind_box">
    <ul class="title_box">
      <li class="font32 box_txt mobile_font20" :class="isEnLang?'en_heavy':''">{{$t("message.nft.txt20")}}</li>
      <li class="font16">
        {{$t("message.nft.txt21")}}
      </li>
      <li class="font16">
        {{$t("message.nft.txt22")}}
      </li>
    </ul>
    <div class="conten_box">
      <div class="treasure_chest_box">
        <img :src="`${$store.state.imgUrl}bind_box_base.webp`" class="base_img" />
        <img :src="`${$store.state.imgUrl}bindbox.webp`" class="bind_box_img" />
        <Lottie :options="datajson1"></Lottie>
      </div>
      <div class="right_content">
        <p class="font20 title_txt mobile_font16">
          <span class="lefttxt">{{$t("message.nft.txt23")}}</span>
          <BtnLoading :isloading="true" v-if="surplusNumStatus"></BtnLoading>
          <span class="righttxt" v-else>{{boxnum}}</span>
        </p>
        <div class="line_onebox font16 mobile_font14">
          <span class="lefttxt">{{$t("message.nft.txt24")}}</span>
          <BtnLoading :isloading="true" v-if="priceStatus"></BtnLoading>
          <span class="righttxt no_border" v-else>{{stPrice}}</span>
          <span class="unit_class">ST</span>
          <!-- <span class="unit_class" v-if="bindboxType == 0">HC</span>
          <span class="unit_class" v-if="bindboxType == 1">BNB</span> -->
        </div>
        <div class="line_onebox font16 mobile_font14">
          <span class="lefttxt">{{$t("message.nft.txt25")}}</span>
          <div class="btns">
            <Slider :min="0" :max="50" v-model="per" :resetdata="resetdata"></Slider>
          </div>
          <span class="unit_class">{{sliderValue}}</span>
        </div>
        <div class="line_onebox font16 mobile_font14">
          <span class="lefttxt">{{$t("message.nft.txt26")}}</span>
          <span class="righttxt">{{stTotal}}</span>
          <span class="unit_class">ST</span>
          <!-- <span class="unit_class" v-if="bindboxType == 0">HC</span>
          <span class="unit_class" v-if="bindboxType == 1">BNB</span> -->
        </div>
        <div class="balance_txt">
          {{$t("message.nft.txt27")}}&nbsp;
          <BtnLoading :isloading="true" v-if="balanceStatus"></BtnLoading>
          <span v-else>{{balance}}</span>
          <span>&nbsp;ST</span>
          <!-- <span v-if="bindboxType == 0">HC</span>
          <span v-if="bindboxType == 1">BNB</span> -->
          <img :src="`${$store.state.imgUrl}link.webp`" class="link_img" />
        </div>
        <div class="btnbox font20 mobile_font16" :class="disable?'disable_bnb':''">
          <!-- {{$t("message.nft.txt28")}} -->
          <FunBtn
            :allLoading="allLoading"
            :isapprove="isapprove"
            :approveloading="buy_isloading"
            :isloading="buy_isloading"
            :word="'message.nft.txt28'"
            ref="mychild"
            @sonapprove="sonapprove"
            @dosomething="buyBindBox"
          />
        </div>
      </div>
    </div>
    <!-- 盲盒概率 -->
    <div class="blindbox_introduce">
      <p class="font30 introduce_title_txt mobile_font18">{{$t("message.nft.txt216")}}</p>
      <div class="box_probability font20" :class="isEnLang?'en_Bold':''">
        <div class="top_one_line">
          <div class="small_box">
            <span>{{$t("message.nft.txt217")}}</span><span class="specil_span">{{$t("message.nft.txt218")}}</span>
          </div>
          <div class="small_box" v-for="(item,index) in probabilityArr1" :key="index">
            <p><span>{{item.lv}}</span>
            <img :src="`${$store.state.imgUrl}start.webp`" /></p>
            <span>{{item.num}}</span>
          </div>
        </div>
        <div class="top_one_line">
          <div class="small_box">
            <span>{{$t("message.nft.txt219")}}</span>
            <span class="specil_span">{{$t("message.nft.txt218")}}</span>
          </div>
          <div class="small_box" v-for="(item,index) in probabilityArr2" :key="index">
            <p><img :src="`${$store.state.imgUrl}power${index+1}.webp`" class="power_img" />
            <span class="specil_span">{{$t(item.lv)}}</span></p>
            <span>{{item.num}}</span>
          </div>
        </div>
      </div>
      <!-- 盲盒概率--移动端 -->
      <div class="mobile_box_probability" :class="isEnLang?'en_Bold':''">
        <div class="oneline">
          <span class="mobile_font14">{{$t("message.nft.txt217")}}</span>
          <p v-for="(item,index) in probabilityArr1" :key="index">
            <span>{{item.lv}}</span>
            <img :src="`${$store.state.imgUrl}start.webp`" />
          </p>
        </div>
        <div class="oneline">
          <span class="mobile_font14">{{$t("message.nft.txt218")}}</span>
          <p v-for="(item,index) in probabilityArr1" :key="index">
            <span class="color_ced">{{item.num}}</span>
          </p>
        </div>
        <div class="oneline">
          <span class="mobile_font14">{{$t("message.nft.txt219")}}</span>
          <p v-for="(item,index) in probabilityArr2" :key="index">
            <img :src="`${$store.state.imgUrl}power${index + 1}.webp`" class="power_img" />
            <span>{{$t(item.lv)}}</span>
          </p>
        </div>
        <div class="oneline">
          <span class="mobile_font14">{{$t("message.nft.txt218")}}</span>
          <p v-for="(item,index) in probabilityArr2" :key="index">
            <span class="color_ced">{{item.num}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 盲盒介绍 -->
    <div class="blindbox_introduce">
      <p class="font30 introduce_title_txt mobile_font18">{{$t("message.nft.txt29")}}</p>
      <div class="introduce_content">
        <div class="introduce_onebox">
          <p class="title font16 mobile_font16" :class="isEnLang?'en_Bold':''">{{$t("message.nft.txt32")}}</p>
          <div class="center font12">{{$t("message.nft.txt30")}}</div>
        </div>
        <div class="introduce_onebox">
          <p class="title font16 mobile_font16" :class="isEnLang?'en_Bold':''">{{$t("message.nft.txt33")}}</p>
          <div class="center font12">{{$t("message.nft.txt34")}}</div>
        </div>
        <div class="introduce_onebox">
          <p class="title font16 mobile_font16" :class="isEnLang?'en_Bold':''">{{$t("message.nft.txt35")}}</p>
          <div class="center font12">{{$t("message.nft.txt36")}}</div>
        </div>
      </div>
    </div>
    <!-- 穿戴展示 -->
    <WearingShow/>
  </div>
</template>

<script>
import datajson1 from '@/assets/data4.json'
import WearingShow from './WearingDisplay.vue'
import { mapGetters } from "vuex";
import { sb,util,token,erc20,getSigner } from "sealemlab-sdk";
export default {
  components:{
    WearingShow
  },
  computed: {
    ...mapGetters(["getAccount","getIstrue","isEnLang"]),
    per: {
      get() {
        return 0;
      },
      set(val) {
        this.sliderValue = val
        this.stTotal = val * this.stPrice
      }
    }
  },
  data() {
    return {
      datajson1,
      probabilityArr1:[
        {lv:4,num:'40%'},
        {lv:5,num:'32%'},
        {lv:6,num:'24%'},
        {lv:7,num:'3.6%'},
        {lv:8,num:'0.4%'}
      ],
      probabilityArr2:[
        {lv:"message.nft.txt220",num:'50%'},
        {lv:"message.nft.txt221",num:'30%'},
        {lv:"message.nft.txt222",num:'10%'},
        {lv:"message.nft.txt223",num:'6%'},
        {lv:"message.nft.txt224",num:'4%'}
      ],
      allLoading:true,// 授权/操作按钮在没有进行判断之前,全部转圈圈状态
      resetdata:false,
      surplusNumStatus:true,//剩余数量loading
      priceStatus:true,// 价格loading
      balanceStatus:true,// 余额loading
      disable:true,//按钮禁用
      balance:0,//钱包余额
      buy_isloading: false, // 按钮loading
      isapprove: false, //是否授权
      bindboxType:0,//默认是普通盲盒0,后期可能会有其他类型盲盒(1,2,3,4),那么此值就会变化
      imgStatus:true,//图片加载时用loading状态
      payAddress:'',//支付地址
      stPrice:0,//st价格
      boxnum:0,//盲盒剩余数量
      userBuyNum:0,//用户剩余购买数量(频控)
      stTotal:0,//st的总价格
      sliderValue:0,// 拖动条value
      userAddress:0,//邀请人地址
    };
  },
  watch: {
    $route(to) {
      this.bindboxType = to.params.boxtype
      this.userAddress = to.params.address
      this.getBoxInfo(this.bindboxType)
    },
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.allLoading = true
          this.balanceStatus = true
          this.getBtnStatus(this.bindboxType)
          let setIntervalOBJ = setInterval(() => {
            if (this.payAddress) {
              this.getUserBalance(this.payAddress)
              this.getBindboxNum(this.bindboxType)
              clearInterval(setIntervalOBJ);
              this.$refs.mychild.isApproveFun(this.payAddress, token().SB).then((res) => {
                if (res) {
                  this.isapprove = true;
                } else {
                  this.isapprove = false;
                }
                this.allLoading = false
              });
            }
          }, 1000);
        }else{
          this.balanceStatus = this.allLoading = this.disable = false
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 去授权
    sonapprove() {
      if (this.buy_isloading) return;
      this.buy_isloading = true;
      this.$refs.mychild.goApproveFun(this.payAddress, token().SB)
        .then((res) => {
          console.log('去授权res: ', res);
          this.buy_isloading = false;
          if(res){
            this.isapprove = true;
            if(!this.getNoticeNum){
              this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
              this.$store.commit("setNoticeNum",true)
            }
          }else{
            this.isapprove = false;
          }
          this.allLoading = false
        })
    },
    buyBindBox(){
      console.log("购买方法",this.disable)
      if(this.disable)return
      if (this.buy_isloading) return;
      if(this.sliderValue <= 0){
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt45'}));
          this.$store.commit("setNoticeNum",true)
        }
        return
      }
      if(this.stTotal > this.balance){ // 余额判断
        // this.$store.commit("setProupStatus", JSON.stringify({'status':true,'content':'message.nft.txt49'}));
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt49'}));
          this.$store.commit("setNoticeNum",true)
        }
        return
      }
      if(this.sliderValue > this.userBuyNum){ // 频控判断
        console.log('this.sliderValue > this.userBuyNum: ', this.sliderValue,this.userBuyNum);
        // this.$store.commit("setProupStatus", JSON.stringify({'status':true,'content':'message.nft.txt50'}));
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt50'}));
          this.$store.commit("setNoticeNum",true)
        }
        return
      }
      if(this.sliderValue > this.boxnum){ // 库存判断
        // this.$store.commit("setProupStatus", JSON.stringify({'status':true,'content':'message.nft.txt51'}));
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt51'}));
          this.$store.commit("setNoticeNum",true)
        }
        return
      }
      this.buy_isloading = true
      // 0x0000000000000000000000000000000000000000
      console.log('this.sliderValue,this.bindboxType: ', this.sliderValue,this.bindboxType,this.$route);
      sb().connect(getSigner()).buyBoxes(this.sliderValue,this.bindboxType,this.userAddress == 0?'0x0000000000000000000000000000000000000000':this.userAddress).then(async (res) => {
        // 进度条
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res.hash}));
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.$utils.newgetUserBoxInfoFun(this.getAccount).then(res => {
            sessionStorage.setItem("sb_count", res)
          })
          console.log("购买成功")
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
          
          this.getBindboxNum(this.bindboxType)
          this.getUserBalance(this.payAddress)
          this.buy_isloading = false
          this.sliderValue = 0
          this.stTotal = 0
          this.resetdata = true
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          setTimeout(() => {
            this.resetdata = false
          },1500)
        }else{
          this.buy_isloading = false
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
        }
      }).catch(err => {
        console.log('购买盒子err: ', err)
        this.buy_isloading = false
      });
    },
    // 获取盲盒一系列信息
    getBoxInfo(boxtypeInfo){
      this.getBindboxNum(boxtypeInfo)
      // 获取某类型的盲盒的支付代币单价
      sb().boxTokenPrices(boxtypeInfo).then(res => {
        // console.log('res: ', util.formatEther(res),Number(res));
        this.stPrice = this.$utils.convertBigNumberToNormal(Number(res), 2)
        this.priceStatus = false
      }).catch(() => {
        this.priceStatus = false
      })
      // 获取某类型的盲盒的支付代币地址
      sb().tokenAddrs(boxtypeInfo).then(res => {
        // console.log('获取某类型的盲盒的支付代币地址res: ', res);
        this.payAddress = res
        // 获取用户某代币余额
        this.getUserBalance(res)
      });
      
      this.getBtnStatus(boxtypeInfo)
    },
    // 盲盒剩余数量  获取某类型的盲盒下某用户某小时剩余购买数量
    getBindboxNum(bindboxType){
      // 获取某类型的盲盒的剩余可销售数量
      sb().getBoxesLeftSupply(bindboxType).then(res => {
        // console.log('获取某类型的盲盒的剩余可销售数量:', Number(res));
        this.boxnum = Number(res)
        this.surplusNumStatus = false
      }).catch(() => {
        this.surplusNumStatus = false
      })
      
      // 获取某类型的盲盒下某用户某小时剩余购买数量
      sb().getUserHourlyBoxesLeftSupply(bindboxType,this.getAccount,new Date().getTime()).then(res => {
        // console.log('获取某类型的盲盒下某用户某小时剩余购买数量:', Number(res));
        this.userBuyNum = Number(res)
      });
    },
    // 获取用户余额 
    getUserBalance(data){
      erc20(data).balanceOf(this.getAccount).then(res1 => {
        this.balance = this.$utils.getBit(util.formatEther(res1),4)
        this.balanceStatus = false
      }).catch(() => {
        this.balanceStatus = false
      })
    },
    //判断按钮是否禁用
    getBtnStatus(boxtypeInfo){
      // 获取某类型的盲盒是否开启白名单
      sb().whiteListFlags(boxtypeInfo).then(res => {
        // console.log('获取某类型的盲盒是否开启白名单:', res);
        // this.isOpenWhiteList = res
        // 判断某用户是否在某类型的盲盒的白名单
        sb().getWhiteListExistence(boxtypeInfo,this.getAccount).then(res1 => {
          // console.log('判断某用户是否在某类型的盲盒的白名单:', res1);
          // this.isWhiteList = res1
          if(res){//为真证明开启白名单限制
            if(!res1){
              this.disable = true
            }else{
              this.disable = false
            }
          }else{
            this.disable = false
          }
        });
      });
    }
  },
  mounted(){
    this.bindboxType = this.$route.params.boxtype // 页面加载时路由不会触发监听,所以在mounted赋值
    this.userAddress = this.$route.params.address
    this.getBoxInfo(this.bindboxType)
  }
};
</script>

<style lang="scss" scoped>
.buy_blind_box{
  width: 100%;
  height: 100%;
}
.title_box {
  width: 100%;
  // text-align: center;
  li {
    &:nth-child(1) {
      font-weight: 600;
      line-height: 63px;
    }
    &:nth-child(2) {
      font-weight: 400;
      line-height: 32px;
      margin-top: 20px;
    }
    &:nth-child(3) {
      font-weight: 400;
      line-height: 32px;
    }
  }
}
.conten_box {
  margin-top: 30px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .treasure_chest_box {
    position: relative;
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: flex-end;
    .base_img{
      width: 100%;
      max-width: 848px;
    }
    .bind_box_img{
      position: absolute;
      top: -4%;
      left: 20%;
      // transform: translate(-50%,-50%);
      width: 340px;
      animation: topbottom 4s linear 0s infinite alternate;
    }
  }
  .right_content{
    position: absolute;
    right: 0;
    top: 0;
    width: 307px;
    max-height:370px;
    padding:20px;
    // padding-right: 40px;
    display: flex;
    flex-direction: column;
    // margin: 87px 0;
    align-items: center;
    background: rgba(248, 229, 186, 0.06);
    border-radius: 12px;
    backdrop-filter: blur(4px);
    .title_txt{
      width: 100%;
      font-weight: 600;
      color: #ECCF83;
      line-height: 28px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .unit_class{
      min-width: 20px;
      font-weight: bold;
      color: #ECCF83;
      line-height: 19px;
      text-align: right;
    }
    .line_onebox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .lefttxt{
        width: 110px;
        font-weight: 400;
        color: #CED3D9;
        line-height: 22px;
      }
      .righttxt{
        width: calc(100% - 140px);
        text-align: center;
        font-weight: bold;
        color: #ECCF83;
        line-height: 19px;
      }
      .btns {
        width: calc(100% - 140px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .balance_txt{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 400;
      color: #9B9995;
      line-height: 14px;
      .link_img{
        width:15px;
        margin-left: 15px;
      }
    }
    .btnbox{
      margin-top: 34px;
      width: 163px;
      height: 48px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
      cursor: pointer;
    }
  }
}
.blindbox_introduce{
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  margin-top: 100px;
  .introduce_title_txt{
    font-weight: bold;
    color: #CED3D9;
    line-height: 36px;
  }
  .introduce_content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 23px;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    padding:20px;
    .introduce_onebox{
      flex: 1;
      display: flex;
      flex-direction: column;
      max-width: 310px;
      .title{
        font-weight: bold;
        color: #ECCF83;
        line-height: 19px;
      }
      .center{
        margin-top: 10px;
        width: 100%;
        min-height: 159px;
        padding: 10px 0;
        font-weight: 400;
        color: #CED3D9;
        line-height: 32px;
      }
    }
  }
  .box_probability{
    width: 100%;
    height: 296px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 31px;
    border: 1px solid #D3B96D;
    margin-top: 23px;
    padding: 30px;
    .top_one_line{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .small_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        &:nth-child(1){
          align-items: flex-start;
        }
        p{
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 18px;
            margin-left: 5px;
          }
          .power_img{
            margin-top: 15px;
            margin-right: 5px;
            margin-left: 0;
          }
        }
      }
      span{
        font-weight: 600;
        color: #EDD07E;
        line-height: 28px;
        &:nth-child(2){
          margin-top: 10px;
          color: #CED3D9;
        }
      }
      .specil_span{
        color: #EDD07E !important;
      }
    }
  }
  .mobile_box_probability{
    display: none;
  }
}
@keyframes topbottom {
  0%{
    transform: translateY(-20px);
  }
  50%{
    transform: translateY(30px);
  }
  100%{
    transform: translateY(-20px);
  }
}
@media screen and (max-width: 980px) {
  .title_box {
    width: 100%;
    li {
      &:nth-child(1) {
        text-align: left;
        font-weight: bold;
        line-height: 0.14rem;
      }
      &:nth-child(2) {
        font-weight: 400;
        color: #CED3D9;
        line-height: 0.14rem;
        margin-top: 0.2rem;
        text-align: left;
      }
      &:nth-child(3) {
        font-weight: 400;
        color: #CED3D9;
        line-height: 0.14rem;
        text-align: left;
      }
    }
  }
  .conten_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    .treasure_chest_box {
      width: 100%;
      min-height: 0.5em;
      // display: flex;
      // justify-content: center;
      // align-items: flex-end;
      margin: 1rem 0 0.3rem;
      .base_img{
        width: 100%;
        max-width: 100%;
      }
      .bind_box_img{
        position: absolute;
        top: -246%;
        left: 27%;
        // transform: translate(-50%,-50%);
        width:1.34rem;
      }
    }
    .right_content{
      position: static;
      width: 100%;
      max-height:3.7rem;
      padding:0.2rem;
      display: flex;
      flex-direction: column;
      margin:0;
      align-items: center;
      background: rgba(248, 229, 186, 0.06);
      .title_txt{
        width: 100%;
        font-weight: 600;
        color: #ECCF83;
        line-height: 28px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .unit_class{
        min-width: 20px;
        font-weight: bold;
        color: #ECCF83;
        line-height: 19px;
        text-align: right;
      }
      .line_onebox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        .lefttxt{
          width: 110px;
          font-weight: 400;
          color: #CED3D9;
          line-height: 22px;
        }
        .righttxt{
          width: calc(100% - 140px);
          text-align: center;
          font-weight: bold;
          color: #ECCF83;
          line-height: 19px;
        }
        .btns {
          width: calc(100% - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .balance_txt{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-weight: 400;
        color: #9B9995;
        line-height: 14px;
        .link_img{
          width:15px;
          margin-left: 15px;
        }
      }
      .btnbox{
        margin-top: 34px;
        width: 163px;
        height: 48px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #000000;
        cursor: pointer;
      }
    }
  }
  .blindbox_introduce{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:0.3rem;
    .introduce_title_txt{
      font-weight: 600;
      color: #CED3D9;
      line-height: 0.25rem;
      text-align: center;
      text-align: left;
      width: 100%;
    }
    .introduce_content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.25rem;
      .introduce_onebox{
        width: 100%;
        display: flex;
        flex-direction: column;
        max-width: 100%;
        margin-bottom: 0.1rem;
        .title{
          font-weight: bold;
          color: #ECCF83;
          line-height: 0.2rem;
        }
        .center{
          margin-top: 0.1rem;
          width: 100%;
          min-height: 0.1rem;
          padding: 0;
          font-weight: 500;
          color: #DBDADA;
          line-height: 0.15rem;
        }
      }
    }
    .box_probability{
      display: none;
    }
    .mobile_box_probability{
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-radius: 0.12rem;
      border: 1px solid #D3B96D;
      margin-top: 0.23rem;
      padding: 0.2rem;
      .oneline{
        display: flex;
        flex-direction: column;
        span{
          font-weight: 600;
          color: #EDD07E;
          line-height: 0.28rem;
        }
        p{
          width: fit-content;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 0.13rem;
            margin-left: 0.03rem;
          }
          .power_img{
            margin-left: 0;
            margin-right: 0.03rem;
          }
        }
      }
    }
  }
}
</style>
