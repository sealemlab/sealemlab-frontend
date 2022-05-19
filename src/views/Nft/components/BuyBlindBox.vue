<template>
  <div class="buy_blind_box">
    <ul class="title_box">
      <li class="font45 box_txt">{{$t("message.nft.txt20")}}</li>
      <li class="font16">
        {{$t("message.nft.txt21")}}
      </li>
      <li class="font16">
        {{$t("message.nft.txt22")}}
      </li>
    </ul>
    <div class="conten_box">
      <div class="treasure_chest_box">
        <!-- <LoadingAnmation v-if="imgStatus" ></LoadingAnmation>
        <img :src="`${$store.state.imgUrl}bindbox.webp`" ref="bindboximg" v-show="!imgStatus" /> -->
      </div>
      <div class="right_content">
        <p class="font20 title_txt">
          <span class="lefttxt">{{$t("message.nft.txt23")}}</span>
          <BtnLoading :isloading="true" v-if="surplusNumStatus"></BtnLoading>
          <span class="righttxt" v-else>{{boxnum}}</span>
        </p>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt24")}}</span>
          <BtnLoading :isloading="true" v-if="priceStatus"></BtnLoading>
          <span class="righttxt no_border" v-else>{{stPrice}}</span>
          <span class="unit_class">ST</span>
          <!-- <span class="unit_class" v-if="bindboxType == 0">HC</span>
          <span class="unit_class" v-if="bindboxType == 1">BNB</span> -->
        </div>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt25")}}</span>
          <div class="btns">
            <Slider :min="0" :max="50" v-model="per" :resetdata="resetdata"></Slider>
          </div>
          <span class="unit_class">{{sliderValue}}</span>
        </div>
        <div class="line_onebox font16">
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
        <div class="btnbox font20" :class="disable?'disable_bnb':''">
          <!-- {{$t("message.nft.txt28")}} -->
          <FunBtn
            :allLoading="allLoading"
            :isapprove="isapprove"
            :approveloading="buy_isloading"
            :isloading="buy_isloading"
            :word="$t('message.nft.txt28')"
            ref="mychild"
            @sonapprove="sonapprove"
            @dosomething="buyBindBox"
          />
        </div>
      </div>
    </div>
    <!-- 盲盒概率 -->
    <div class="blindbox_introduce">
      <p class="font30 introduce_title_txt">{{$t("message.nft.txt216")}}</p>
      <div class="box_probability font20">
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
            <p><img :src="`${$store.state.imgUrl}power1.webp`" class="power_img" />
            <span class="specil_span">{{$t(item.lv)}}</span></p>
            <span>{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 盲盒介绍 -->
    <div class="blindbox_introduce">
      <p class="font30 introduce_title_txt">{{$t("message.nft.txt29")}}</p>
      <div class="introduce_content">
        <div class="introduce_onebox">
          <p class="title font16">{{$t("message.nft.txt32")}}</p>
          <div class="center font12">{{$t("message.nft.txt30")}}</div>
        </div>
        <div class="introduce_onebox">
          <p class="title font16">{{$t("message.nft.txt33")}}</p>
          <div class="center font12">{{$t("message.nft.txt34")}}</div>
        </div>
        <div class="introduce_onebox">
          <p class="title font16">{{$t("message.nft.txt35")}}</p>
          <div class="center font12">{{$t("message.nft.txt36")}}</div>
        </div>
      </div>
    </div>
    <!-- 穿戴展示 -->
    <WearingShow/>
  </div>
</template>

<script>
import WearingShow from './WearingDisplay.vue'
import { mapGetters } from "vuex";
import { sb,util,token,erc20,getSigner } from "sacredrealm-sdk";
export default {
  components:{
    WearingShow
  },
  computed: {
    ...mapGetters(["getAccount","getIstrue"]),
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
      // isOpenWhiteList:true,//是否开启白名单
      // isWhiteList:false,//是否在白名单
      stPrice:0,//st价格
      boxnum:0,//盲盒剩余数量
      userBuyNum:0,//用户剩余购买数量(频控)
      stTotal:0,//st的总价格
      sliderValue:0,// 拖动条value
    };
  },
  watch: {
    $route(to) {
      this.bindboxType = to.params.boxtype
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
          }else{
            this.isapprove = false;
          }
          this.allLoading = false
        })
    },
    buyBindBox(){
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
      sb().connect(getSigner()).buyBoxes(this.sliderValue,this.bindboxType).then(async (res) => {
        console.log('gdfgdf----res: ', res);
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
      }).catch(() => {
        // console.log('购买盒子err: ', err)
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
    this.getBoxInfo(this.bindboxType)
  }
};
</script>

<style lang="scss" scoped>
.buy_blind_box{
  width: 100%;
}
.title_box {
  width: 100%;
  text-align: center;
  li {
    &:nth-child(1) {
      font-weight: 600;
      color: #FFFFFF;
      line-height: 63px;
    }
    &:nth-child(2) {
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
      margin-top: 20px;
    }
    &:nth-child(3) {
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
    }
  }
}
.conten_box {
  width: 100%;
  display: flex;
  background: url($bg_url + "bindboxbg.webp") no-repeat #000;
  background-size: contain;
  .treasure_chest_box {
    width: 50%;
    img {
      width: 100%;
      max-width: 616px;
      // height: 504px;
    }
  }
  .right_content{
    width: 405px;
    max-height:370px;
    padding:20px;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
    margin: 87px 0;
    align-items: center;
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
        color: #FFFFFF;
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
  margin-top: 100px;
  .introduce_title_txt{
    font-weight: bold;
    color: #FFFFFF;
    line-height: 36px;
  }
  .introduce_content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 84px;
    .introduce_onebox{
      flex: 1;
      display: flex;
      flex-direction: column;
      // align-items: center;
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
        color: #FFFFFF;
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
          color: #FFFFFF;
        }
      }
      .specil_span{
        color: #EDD07E !important;
      }
    }
  }
}
</style>
