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
          <p class="font12 balance_" :class="isEnLang?'en_medium':''">BUSD {{$t("message.bond.txt22")}}: {{getUserCoin.busd | PriceConversion}}</p>
          <div class="inputcontent" :class="isEnLang?'en_Bold':''">
            <div class="left_content">
              <img :src="`${$store.state.imgUrl}busd.webp`" class="busd_img" />
              <span class="busd_txt font14">BUSD</span>
            </div>
            <div class="center_content">
              <Input :modelValue="BUSDmsg" :readonly="isWriteStatus" type="number" :placeholder='$t("message.bond.txt23")' @input="busdInputClick"></Input>
            </div>
            <div class="max_btn font16" @click="maxClick('busd')">MAX</div>
          </div>
        </div>
        <!-- st输入框 token0 -->
        <div class="inputbox" v-if="activetype == 0 || activetype == 2">
          <p class="font12 balance_" :class="isEnLang?'en_medium':''">ST {{$t("message.bond.txt22")}}: {{getUserCoin.st | PriceConversion}}</p>
          <div class="inputcontent" :class="isEnLang?'en_Bold':''">
            <div class="left_content">
              <img :src="`${$store.state.imgUrl}stlogo.webp`" class="busd_img" />
              <span class="busd_txt font14">ST</span>
            </div>
            <div class="center_content">
              <Input :modelValue="STmsg" :readonly="isWriteStatus" type="number" :placeholder='$t("message.bond.txt23")' @input="inputClick"></Input>
            </div>
            <div class="max_btn font16" @click="maxClick('st')">MAX</div>
          </div>
        </div>
        <p class="font12 balance_ add_balance_" :class="isEnLang?'en_medium':''" v-if="changeLpNum > 0">
          {{$t("message.bond.txt79")}} {{changeLpNum}}
        </p>
        <!-- 投入以及收益 -->
        <div class="profit_box">
          <div class="onebox" v-for="(item,index) in moneyArr" :key="index">
            <p class="font14 _txt" :class="isEnLang?'en_Bold':''">{{$t(item.title)}}</p>
            <div class="border_ font12" :class="isEnLang?'en_medium':''">
              <span class="span1">$ {{item.num}}</span>
              <!-- <span class="span1">BUSD</span> -->
            </div>
          </div>
        </div>
        <div class="main_button" v-if="allLoading">
          <BtnLoading :isloading="true"></BtnLoading>
        </div>
        <div v-else>
          <div v-if="activetype == 0">
            <div class="main_button font16 mobile_font16" @click="buyBondFun" v-if="isApproveBUSD && isApproveST">
              {{$t("message.tip.self_buy")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="main_button font16 mobile_font16" @click="authorizationClick('busd')" v-else-if="!isApproveBUSD">
              BUSD {{$t("message.approve")}}<BtnLoading :isloading="busdisloading"></BtnLoading>
            </div>
            <div class="main_button font16 mobile_font16" @click="authorizationClick('st')" v-else-if="!isApproveST">
              ST {{$t("message.approve")}}<BtnLoading :isloading="stisloading"></BtnLoading>
            </div>
          </div>
          <div v-if="activetype == 1">
            <div class="main_button font16 mobile_font16" @click="buyBondFun" v-if="isApproveBUSD">
              {{$t("message.tip.self_buy")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="main_button font16 mobile_font16" @click="authorizationClick('busd')" v-else-if="!isApproveBUSD">
              BUSD {{$t("message.approve")}}<BtnLoading :isloading="busdisloading"></BtnLoading>
            </div>
          </div>
          <div v-if="activetype == 2">
            <div class="main_button font16 mobile_font16" @click="buyBondFun" v-if="isApproveST">
              {{$t("message.tip.self_buy")}}<BtnLoading :isloading="buyLoading"></BtnLoading>
            </div>
            <div class="main_button font16 mobile_font16" @click="authorizationClick('st')" v-else-if="!isApproveST">
              ST {{$t("message.approve")}}<BtnLoading :isloading="stisloading"></BtnLoading>
            </div>
          </div>
          
        </div>
        <div class="tipbox font12" :class="isEnLang?'en_medium':''">
          <p class="font14 mobile_font14" :class="isEnLang?'en_Bold':''">
            <span>{{$t("message.bond.txt27")}}</span>
            <span v-if="userTaxRateStatus">{{(Number(obj.baseRate) + Number(additional4)) | SquareRoot}}%</span>
            <BtnLoading :isloading="true" v-else></BtnLoading>
          </p>
          <p class="color1"><span>{{$t("message.bond.txt28")}}</span><span>{{obj.baseRate | SquareRoot}}%</span>
          <p class="color2"><span>{{$t("message.bond.txt30")}}</span><span>{{additional1 | SquareRoot}}%</span>
          <p class="color3"><span>{{$t("message.bond.txt29")}}</span><span>{{additional2 | SquareRoot}}%</span>
          <p class="color4"><span>{{$t("message.bond.txt31")}}</span><span>{{additional3 | SquareRoot}}%</span>
          <p class="font14 mobile_font14" @click="AddQuesFun('message.bond.txt_tax',$event)" :class="isEnLang?'en_Bold':''">
            <span class="has_question_icon" :title='$t("message.bond.txt_tax")'>{{$t("message.bond.txt32")}}</span>
            <span class="userTaxRateStatus">
              <span>{{userTaxRate}}%</span>
              <span v-if="(isThan1000 && BUSDmsg) || (isThan1000 && STmsg)">( + {{additionalTaxRate | MultiplyBySquare}}%)</span>
              <span v-else>( + 0.0%)</span>
            </span>
          </p>
          <p class="font14 mobile_font14" @click="AddQuesFun('message.bond.txt_80_ques',$event)" :class="isEnLang?'en_Bold':''">
            <span class="has_question_icon" :title='$t("message.bond.txt_80_ques")'>{{$t("message.bond.txt80")}}</span>
            <span>{{userSurplusNum | PriceConversion}} ST-BUSD LP</span>
          </p>
          <p class="font14 mobile_font14" :class="isEnLang?'en_Bold':''">
            <span>{{$t("message.bond.txt33")}}</span>
            <span>{{userbuylp | PriceConversion}} ST-BUSD LP ( ≈ $ {{useReadyBy | PriceConversion}})</span>
          </p>
          <p>{{$t("message.bond.txt34")}}</p>
        </div>
      </div>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
    </div>
    <ToolTip :TooltipStatus="TooltipStatus" :isshowTip="isshowTip" @sureclick="sureclick"></ToolTip>
    <MessageBox ref="mychildAdd" :clientX='clientX' :clientY="clientY" :content="datacontent"></MessageBox>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MessageBox from "./MessageBox.vue";
import ToolTip from "./Tooltip.vue";
import { bondDepository,token,contract,getSigner,util } from 'sealemlab-sdk'
export default {
  watch:{
    'addlpDis'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
        this.getUserSurplusNum(res => {
          // console.log('用户剩余购买数量useNum:以及税率 ',res);
          this.userSurplusNum = res.userSurplusNum // 用户剩余购买量
          this.useBuyNumStatus = true
          this.useReadyBy = res.useReadyBy
          this.additional1 = res.additional1//邀请购买利率
          this.additional2 = res.additional2//邀请质押利率
          this.additional3 = res.additional3//质押利率
          this.additional4 = res.additional4//总个人额外利率
          this.userTaxRateStatus = true // 获取到总个人额外利率
          this.isWriteStatus = false // 是否可以输入
          this.userbuylp = res.userbuylp
        })
      }else{
        document.body.style.overflow='visible'
      }
    },
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == -1 || newValue == undefined){
          this.allLoading = false
          this.isApproveST = this.isApproveBUSD = true
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
            this.$utils.getUserCoinQuantity(token().BUSD,'busd',this.getAccount)
            this.$utils.getUserCoinQuantity(token().ST,'st',this.getAccount)
            // console.log("切换账号重新判断授权")
          },2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    MessageBox,ToolTip
  },
  computed: {
    ...mapGetters(["isEnLang","getUserCoin","getNoticeNum","getAccount","getAccountStatus"]),
    userRate(){
      return Number(this.obj.baseRate) + Number(this.additional4)
    },
    isThan1000:{
      get(){
        return Number(this.useReadyBy) + Number(this.moneyArr[0].num) > 1000
      },
      set(val){
        console.log('设置是否大于1000的val: ', val);
      }
    },
    additionalTaxRate(){ // 用户已经购买额加上即将要购买额是否超过额定额度(每1000增加0.1%---(0.001))
      let num = Math.floor((Number(this.useReadyBy) + Number(this.moneyArr[0].num)) / 1000) * 0.001
      if(num >= 0.09){
        return 0.09
      }else{
        return num
      }
    },
  },
  props: {
    addlpDis: {
      type: Boolean,
      default: false
    },
    newBondID:{
      type: [String, Number],
      default: ''
    },
    obj: {
      type: Object,
      default: function () { return {} }
    }
  },
  data(){
    return {
      userbuylp:0,//用户已经购买的lp
      isshowTip:true,
      TooltipStatus:false,
      userTaxRateStatus:false,//总额外利率获取中
      isWriteStatus:true,//输入框是否可以输入 (税率拿不到,计算会出错)
      useBuyNumStatus:false,// 用户剩余购买量状态判断
      additional1:0,//邀请购买利率
      additional2:0,//邀请质押利率
      additional3:0,//质押利率
      additional4:0,//总个人额外利率
      changeLpNum:0,// 其他币转换的lp数量
      userTaxRate:1,
      useReadyBy:0,
      userSurplusNum:0,//用户剩余购买量
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
      userBuyStatus:false, // 用户购买成功以后此变量刷新,返回父页面进行刷新订单及其他操作
    }
  },
  methods: {
    buyBondFun(){
      if(!this.useBuyNumStatus){
        return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_userBuyNum'}));
      }
      if(this.userSurplusNum == 0){
        return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_userBuy'}));
      }
      if(this.allLoading || this.buyLoading)return
      let address = localStorage.getItem('Invitee')
      let token0 = 0 //st
      let token1 = 0 //busd
      if(this.activetype == 0){
        if(!this.STmsg || !this.BUSDmsg){
          return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_write'}));
        }
        token0 = util.parseUnits(this.STmsg + '')  //this.$utils.convertNormalToBigNumber(this.STmsg, 18)
        token1 = util.parseUnits(this.BUSDmsg + '') //this.$utils.convertNormalToBigNumber(this.BUSDmsg, 18)
      }else if(this.activetype == 1){
        if(!this.BUSDmsg){
          return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_write'}));
        }
        token1 = util.parseUnits(this.BUSDmsg + '') //this.$utils.convertNormalToBigNumber(this.BUSDmsg, 18)
        token0 = 0
      }else if(this.activetype == 2){
        if(!this.STmsg){
          return this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_write'}));
        }
        token1 = 0
        token0 = util.parseUnits(this.STmsg + '') //this.$utils.convertNormalToBigNumber(this.STmsg, 18)
      }
      this.buyLoading = true
      // console.log('this.newBondID,token0,token1,0,address: ', this.newBondID,token0,token1,0,address);
      bondDepository().connect(getSigner()).swapAndAddLiquidityAndBond(this.newBondID,token0,token1,0,address).then(async res => {
        // console.log('购买债券res: ', res);
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res.hash}));
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          this.buyLoading = false
          this.resetData()
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
          this.$utils.getUserCoinQuantity(token().BUSD,'busd',this.getAccount)
          this.$utils.getUserCoinQuantity(token().ST,'st',this.getAccount)
          this.userBuyStatus = true
          this.useBuyNumStatus = false
          this.userTaxRateStatus = false // 获取额外利率
          this.isWriteStatus = true // 是否可以输入
          let that = this
          that.getUserSurplusNum(res => {
            // console.log("购买成功以后刷新用户的税率等等")
            that.userSurplusNum = res.userSurplusNum
            that.useBuyNumStatus = true
            that.useReadyBy = res.useReadyBy
            that.additional1 = res.additional1//邀请购买利率
            that.additional2 = res.additional2//邀请质押利率
            that.additional3 = res.additional3//质押利率
            that.additional4 = res.additional4//总个人额外利率
            
            that.userbuylp = res.userbuylp // 用户已经购买的lp数量
            that.userTaxRateStatus = true // 获取总个人额外利率
            that.isWriteStatus = false // 是否可以输入
          })
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
            // console.log('busd授权结果res: ', res);
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
            // console.log('st授权结果res: ', res);
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
    busdInputClick(data){
      if(this.activetype == 1){
        if(data > 10000){
          this.TooltipStatus = true
        }
      }
      if(!data){
        this.STmsg = ''
        this.resetData()
      }else if(Number(data) <= Number(this.getUserCoin.busd)){
        this.BUSDmsg = data
        this.STmsg = Number(data) / this.getUserCoin.stPrice 
      }else{
        this.BUSDmsg = this.getUserCoin.busd < 1e-8?0:this.getUserCoin.busd
        this.STmsg = Number(this.BUSDmsg) / this.getUserCoin.stPrice
      }
      this.youChangeIChange()
    },
    inputClick(data){
      if(this.activetype == 2){
        if(data * this.getUserCoin.stPrice > 10000){
          this.TooltipStatus = true
        }
      }
      if(!data){
        this.BUSDmsg = ''
        this.resetData()
      }else if(Number(data) <= Number(this.getUserCoin.st)){
        this.STmsg = data
        this.BUSDmsg = Number(data) * this.getUserCoin.stPrice
      }else{
        this.STmsg = this.getUserCoin.st < 1e-8?0:this.getUserCoin.st
        this.BUSDmsg = Number(this.STmsg) * this.getUserCoin.stPrice
      }
      this.youChangeIChange()
    },
    typeClick(item,index){
      this.isshowTip = true
      this.arr.forEach(item => {
        item.status = false
      })
      item.status = true
      this.activetype = index
      this.resetData()
    },
    // 弹窗关闭
    closeProup () {
      this.isshowTip = true
      this.TooltipStatus = false
      this.userSurplusNum = this.useReadyBy = this.additional1 = this.additional2 = this.additional3 = this.additional4 = this.activetype = 0
      this.resetData()
      this.$emit('closeLP',this.userBuyStatus)
    },
    maxClick(data){
      if(this.isWriteStatus)return
      if(this.activetype == 0 ){
        if(data == 'busd'){
          let userBusdNum = this.getUserCoin.busd > 1e-8?this.getUserCoin.busd:0
          let changest_ = Number(userBusdNum) / this.getUserCoin.stPrice
          // console.log('max点击时转换的st数量changest_: ', changest_)
          // console.log("用户拥有的st数量:",this.getUserCoin.st)
          if(changest_ > this.getUserCoin.st){
            this.BUSDmsg = this.getUserCoin.st * this.getUserCoin.stPrice
            this.STmsg = this.getUserCoin.st
          }else{
            this.BUSDmsg = userBusdNum
            this.STmsg = Number(userBusdNum) / this.getUserCoin.stPrice
          }
          // this.BUSDmsg = this.getUserCoin.busd > 1e-8?this.getUserCoin.busd:0
          // this.STmsg = Number(this.BUSDmsg) / this.getUserCoin.stPrice
        }else{
          let userSTNum = this.getUserCoin.st > 1e-8?this.getUserCoin.st:0
          let changeBUSD_ = Number(userSTNum) * this.getUserCoin.stPrice
          if(changeBUSD_ > this.getUserCoin.busd){
            this.STmsg = this.getUserCoin.busd / this.getUserCoin.stPrice
            this.BUSDmsg = this.getUserCoin.busd
          }else{
            this.STmsg = userSTNum
            this.BUSDmsg = userSTNum * this.getUserCoin.stPrice
          }
          // this.STmsg = this.getUserCoin.st > 1e-8?this.getUserCoin.st:0
          // this.BUSDmsg = Number(this.STmsg) * this.getUserCoin.stPrice
        }
      }else if(this.activetype == 1){
        if(this.getUserCoin.busd > 10000){
          this.TooltipStatus = true
        }
        this.BUSDmsg = this.getUserCoin.busd > 1e-8?this.getUserCoin.busd:0
      }else if(this.activetype == 2){
        if(this.getUserCoin.st * this.getUserCoin.stPrice > 10000){
          this.TooltipStatus = true
        }
        this.STmsg = this.getUserCoin.st > 1e-8?this.getUserCoin.st:0
      }
      this.youChangeIChange()
    },
    getUserSurplusNum(calback){
      let obj = {}
      this.userTaxRateStatus = false
      // 获取某用户某期债券剩余可购买LP数量
      bondDepository().getUserLeftLpCanBuy(this.getAccount,this.newBondID).then(res => {
        // console.log('获取某用户某期债券剩余可购买LP数量res: ', res);
        obj.userSurplusNum = util.formatEther(res)  //this.$utils.convertBigNumberToNormal(Number(res), 2)
        calback(Object.assign({},obj))
      })
      // 个人税率
      // bondDepository().getUserTaxRate(this.getAccount,this.newBondID).then(res => {
      //   console.log('个人税率res: ', res);
      //   obj.userTaxRate = Number(res)
      //   calback(Object.assign({},obj))
      // })
      // 获取用户某期债券的税前购买USD金额
      bondDepository().userEpochUsdPayinBeforeTax(this.getAccount,this.newBondID).then(res => {
        // console.log('获取用户某期债券的税前购买USD金额: ', res);
        obj.useReadyBy = util.formatEther(res)  //this.$utils.convertBigNumberToNormal(Number(res), 2)
        calback(Object.assign({},obj))
      })
      // 获取某用户的某期债券的个人额外利率数组，数组元素分别为邀请购买利率、邀请质押利率、质押利率、总个人额外利率（以上3个利率之和，最大30%）
      bondDepository().getUserExtraRates(this.getAccount,this.newBondID).then(res => {
        // console.log('某用户的额外利率res: ', res);
        obj.additional1 = Number(res[0])
        obj.additional2 = Number(res[1])
        obj.additional3 = Number(res[2])
        obj.additional4 = Number(res[3])
        calback(Object.assign({},obj))
      })
      // 获取用户某期债券的LP购买量
      bondDepository().userEpochLpBuyAmount(this.getAccount,this.newBondID).then(res => {
        // console.log('获取用户某期债券的LP购买量: ', res);
        obj.userbuylp = util.formatEther(res) //this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
        calback(Object.assign({},obj))
      })
    },
    youChangeIChange(){
      // console.log("调用you change i change")
      if(this.activetype == 0){
        this.moneyArr[0].num = this.$utils.getBit(Number(this.BUSDmsg) * 2)
      }else if(this.activetype == 1){
        this.moneyArr[0].num = this.$utils.getBit(Number(this.BUSDmsg))
      }else if(this.activetype == 2){
        this.moneyArr[0].num = this.$utils.getBit(Number(this.STmsg) * this.getUserCoin.stPrice)
      }
      if(this.isThan1000){
        this.moneyArr[1].num = this.$utils.getBit(((Number(this.userRate) / 1e4) - (0.01 + Number(this.additionalTaxRate))) * this.moneyArr[0].num,2)
      }else{
        this.moneyArr[1].num = this.$utils.getBit(((Number(this.userRate) / 1e4) - 0.01) * this.moneyArr[0].num,2)
      }
      this.moneyArr[2].num = this.$utils.getBit(Number(this.moneyArr[0].num) + Number(this.moneyArr[1].num))
      this.changeLpNum = this.$utils.getBit( Number(this.moneyArr[0].num) / this.getUserCoin.stlpPrice)
    },
    resetData(){
      this.changeLpNum = 0
      this.BUSDmsg = this.STmsg = ''
      this.moneyArr.forEach(item => {
        item.num = 0
      })
    },
    sureclick(){
      this.TooltipStatus = false
      this.isshowTip = false
    }
  }
}
</script>
<style lang="scss" scoped>
.userTaxRateStatus{
  display: flex;
  align-items: center;
  span{
    &:nth-child(1){
      margin-right: 5px;
    }
  }
}
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
  height: 85%;
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
  .balance_{
    width: 100%;
    text-align: right;
    font-weight: 400;
    color: #8B8484;
    line-height: 14px;
  }
  .add_balance_{
    margin-bottom: 20px;
  }
  .inputbox{
    width: 100%;
    margin-bottom: 30px;
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
        justify-content: center;
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
      &:nth-child(1){
        margin-bottom: 15px;
        span{
          font-weight: 500;
          color: #CED3D9;
          line-height: 17px;
          margin-bottom: 0;
        }
      }
      &:nth-child(6){
        margin-top: 15px;
      }
      &:nth-child(6),&:nth-child(7),&:nth-child(8){
        span{
          font-weight: 500;
          color: #CED3D9;
          line-height: 17px;
        }
      }
      &:nth-last-child(1){
        margin-top: 10px;
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
  width: 100%;
  height: 90%;
  overflow: auto;
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