<template>
  <div class="active_page_coin">
    <div class="top_box">
      <p
        class="font35 mobile_font20 mobile_left"
        :class="isEnLang ? 'en_Bold' : ''"
      >
        {{ $t("message.acticePage.title1") }}
      </p>
      <!-- 倒计时 -->
      <div class="timebox">
        <div class="onebox">
          <span
            class="font45 mobile_font24"
            :class="isEnLang ? 'en_Bold' : ''"
            >{{ countTime.d }}</span
          >
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">DAYS</span>
        </div>
        <div class="line font45 mobile_font24">:</div>
        <div class="onebox">
          <span
            class="font45 mobile_font24"
            :class="isEnLang ? 'en_Bold' : ''"
            >{{ countTime.h }}</span
          >
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">HRS</span>
        </div>
        <div class="line font45 mobile_font24">:</div>
        <div class="onebox">
          <span
            class="font45 mobile_font24"
            :class="isEnLang ? 'en_Bold' : ''"
            >{{ countTime.m }}</span
          >
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">MIN</span>
        </div>
        <div class="line font45 mobile_font24">:</div>
        <div class="onebox">
          <span
            class="font45 mobile_font24"
            :class="isEnLang ? 'en_Bold' : ''"
            >{{ countTime.s }}</span
          >
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">SEC</span>
        </div>
      </div>
      <p class="font24" :class="isEnLang ? 'en_medium' : ''" v-if="!startAndEnd">
        {{ $t("message.acticePage.title2") }}
      </p>
      <p class="font24" :class="isEnLang ? 'en_medium' : ''" v-else>
        {{ $t("message.acticePage.title2_1") }}
      </p>
    </div>
    <div class="content">
      <div class="left_box">
        <div class="onebox">
          <p>
            <span
              class="font24 mobile_font20"
              :class="isEnLang ? 'en_Bold' : 'cn_lang'"
              >{{ $t("message.acticePage.txt1") }}</span
            >
            <span class="font12 btn_black" :class="isEnLang ? 'en_Bold' : 'cn_lang'" v-if="arr[0].num == arr[2].num">{{ $t("message.tip.self_sold") }}</span>
            <span class="font12 btn_black" :class="isEnLang ? 'en_Bold' : 'cn_lang'" v-else-if="!startAndEnd">{{$t("message.tip.self_Nobegin")}}</span>
            <span class="font12" :class="isEnLang ? 'en_Bold' : 'cn_lang'" v-else-if="startAndEnd">{{
              $t("message.acticePage.txt2")
            }}</span>
          </p>
          <div class="allbox">
            <div class="Onegroup" v-for="(item, index) in arr" :key="index">
              <span
                class="font16 mobile_font14"
                :class="isEnLang ? 'en_medium' : 'cn_lang'"
                >{{ $t(item.title) }}</span
              >
              <span
                class="font24 mobile_font18"
                :class="isEnLang ? 'en_Bold' : 'cn_lang'"
                >$ {{ item.busdnum | PriceConversion}}</span>
              <span
                class="font24 mobile_font18"
                :class="isEnLang ? 'en_Bold' : 'cn_lang'"
                >≈ {{item.num | PriceConversion}} ST</span>
            </div>
          </div>
          <div class="progress_box">
            <div class="box">
              <div class="load" :style="{ width: width + '%' }"></div>
            </div>
            <span>{{ percentage }} %</span>
          </div>
        </div>
        <div class="three_box">
          <div v-for="(item, index) in arr1" :key="index">
            <div class="package_box">
              <div class="iconbox_">
                <svg
                  t="1653724466948"
                  class="icon"
                  viewBox="0 0 1107 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="36756"
                  width="16"
                  height="16"
                  v-if="index == 0"
                >
                  <path
                    d="M563.323289 661.336738a330.663562 330.663562 0 1 0-330.531877-330.663562 331.190306 331.190306 0 0 0 330.531877 330.663562z"
                    fill="#CED3D9"
                    p-id="36757"
                  ></path>
                  <path
                    d="M1106.528066 975.53955c-16.724123-134.319727-137.611877-293.001365-273.38015-373.066457a381.889419 381.889419 0 0 1-539.912627-0.65843C157.335331 679.246035 18.274908 834.635523 0.365611 975.53955a42.797952 42.797952 0 0 0 37.26714 48.065392h1031.628175A43.061324 43.061324 0 0 0 1106.528066 975.53955z"
                    fill="#CED3D9"
                    p-id="36758"
                  ></path>
                </svg>
                <svg
                  t="1655116490741"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="23112"
                  width="16"
                  height="16"
                  v-if="index == 1"
                >
                  <path
                    d="M576.2048 229.7856l76.8-85.6064a31.9488 31.9488 0 0 0-23.808-53.3504H394.9056a32 32 0 0 0-23.8592 53.3504l76.288 84.8896a384 384 0 0 0-321.0752 378.4192v217.344A104.448 104.448 0 0 0 230.4 929.1264h558.6432a104.448 104.448 0 0 0 104.3456-104.2944v-217.344a384 384 0 0 0-317.184-377.7024z m-18.688-74.9568L512 205.4144l-45.4656-50.5856zM829.44 824.832a40.3456 40.3456 0 0 1-40.3456 40.2944H230.4a40.3456 40.3456 0 0 1-40.2944-40.2944v-217.344a319.5904 319.5904 0 1 1 639.1296 0z"
                    fill="#CED3D9"
                    p-id="23113"
                  ></path>
                  <path
                    d="M536.2176 749.6192v36.1984a8.192 8.192 0 0 1-7.9872 7.9872H492.032a8.192 8.192 0 0 1-7.9872-7.9872v-34.048a315.8528 315.8528 0 0 1-52.1728-6.9632 8.0896 8.0896 0 0 1-7.4752-7.9872v-28.7232a7.6288 7.6288 0 0 1 7.4752-7.4752h1.0752c15.9744 2.1504 55.9104 4.2496 70.8096 4.2496 35.84 0 46.08-12.7488 46.08-36.1984 0-15.36-7.4752-23.3984-34.0992-39.3728l-52.736-31.4368c-37.2736-21.8112-47.36-45.2608-47.36-73.472 0-36.7616 18.0736-65.4848 68.1472-73.472v-33.5872A8.192 8.192 0 0 1 492.032 409.6h36.1984a8.192 8.192 0 0 1 7.9872 7.9872v31.9488a438.6304 438.6304 0 0 1 56.32 6.4c4.2496 1.0752 7.424 3.7376 7.424 7.4752v29.7984a6.8608 6.8608 0 0 1-6.912 7.4752h-1.0752c-26.624-2.6624-52.6848-4.2496-78.7968-4.2496C483.5328 496.1792 471.04 506.88 471.04 524.3904c0 13.312 6.9632 21.2992 33.024 35.84l47.9232 26.624c44.1856 24.4736 55.9104 50.0224 55.9104 81.92 0.2048 33.9968-17.8688 70.7072-71.68 80.8448z"
                    fill="#CED3D9"
                    p-id="23114"
                  ></path>
                </svg>
                <svg
                  t="1655116332365"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="21213"
                  width="16"
                  height="16"
                  v-if="index == 2"
                >
                  <path
                    d="M909.682 793.56v49.444a133.224 133.224 0 0 1-133.156 132.959H247.474a132.958 132.958 0 0 1-133.156-132.959V180.996A133.224 133.224 0 0 1 247.474 48.037h529.117c73.505 0 133.091 59.453 133.091 132.959v98.691a33.67 33.67 0 0 1-33.14 33.472 32.809 32.809 0 0 1-33.14-33.472V180.73c0-36.189-29.561-66.412-65.95-66.412H246.548c-35.725 0-65.949 29.76-65.949 66.412v662.472c0 36.257 29.561 66.48 65.95 66.48h530.838c35.792 0 66.016-29.76 66.016-66.412v-98.957c0-18.493 15.376-33.472 33.14-33.472 18.293 0 33.14 14.184 33.14 33.472v49.246zM428.421 515.712L605.986 664.71a33.803 33.803 0 0 1 4.572 47.125 33.272 33.272 0 0 1-47.19 3.646l-228.8-191.948a34.134 34.134 0 0 1-11.93-29.694 34.266 34.266 0 0 1 11.663-31.55l228.8-192.013a33.34 33.34 0 0 1 47.193 3.711 33.803 33.803 0 0 1-4.573 47.126L452.745 449.43h427.508a33.206 33.206 0 0 1 0 66.28H428.421z"
                    p-id="21214"
                    fill="#CED3D9"
                  ></path>
                </svg>
              </div>
              <p class="font16" :class="isEnLang ? 'en_medium' : ''">
                {{ $t(item.title) }}
              </p>
            </div>
            <p class="font20" :class="isEnLang ? 'en_Bold' : ''">
              {{ $t(item.num) }}
            </p>
          </div>
        </div>
        <div class="learnbox">
          <div class="left font20" :class="isEnLang ? 'en_medium' : ''">
            <span>{{ $t("message.acticePage.txt12") }}</span>
            <span>{{ $t("message.acticePage.txt13") }}</span>
          </div>
          <div class="btn font16" :class="isEnLang ? 'en_Bold' : ''">
            <a :href="isEnLang?'https://lab-sealem.gitbook.io/sealem-lab/tokenomics/st':'https://lab-sealem.gitbook.io/slmcn/dai-bi-jing-ji-xue/st'" target="_blank" rel="noopener noreferrer" >{{ $t("message.acticePage.txt14") }}</a>
          </div>
        </div>
      </div>
      <div class="right_box">
        <p class="font24 mobile_font20" :class="isEnLang ? 'en_Bold' : ''">
          {{ $t("message.acticePage.txt15") }}
        </p>
        <p class="font16 mobile_font14" :class="isEnLang ? 'en_medium' : ''" @click="addAddress">
          ST {{ $t("message.acticePage.txt30") }}: {{stAddress}}
          <img :src="`${$store.state.imgUrl}add.webp`" class="add_img" />
        </p>
        <div
          class="box1 font16 mobile_font14"
          :class="isEnLang ? 'en_medium' : ''"
        >
          <p>
            {{ $t("message.acticePage.txt17") }}
            <span v-if="nowPriceStatus"> 1 ST = {{nowPrice | PriceConversion}} BUSD</span>
            <BtnLoading :isloading="true" v-else></BtnLoading>
          </p>
          <p>{{ $t("message.acticePage.txt18") }} {{userBuyMax * nowPrice | PriceConversion(0)}} BUSD</p>
        </div>
        <div
          class="box2 box1 font16 mobile_font16"
          :class="isEnLang ? 'en_medium' : ''"
        >
          <div>
            <span class="span1">{{ $t("message.acticePage.txt16") }}</span>
            <span class="span2">{{getUserCoin.busd | PriceConversion}} BUSD</span>
          </div>
          <div>
            <!-- <span class="span1">0.345</span> -->
            <Input
              :modelValue="inputvalue"
              type="number"
              :placeholder="$t('message.bond.txt23')"
              @input="InputClick"
            ></Input>
            <p>
              <span
                class="span_btn font12 mobile_font12"
                :class="isEnLang ? 'en_Bold' : ''"
                @click="maxClick"
                >MAX</span
              >
              <span class="span2">BUSD</span>
            </p>
          </div>
          <div class="add_box_st" v-if="inputvalue">{{ $t("message.acticePage.txt24") }}{{userbuyst | PriceConversion(4)}}</div>
        </div>
        <div class="tip_txt font12" :class="isEnLang ? 'en_medium' : ''">
          <img :src="`${$store.state.imgUrl}ques_new.webp`" class="ques_img" />
          {{ $t("message.acticePage.txt22") }}
        </div>
        <!-- 购买 --><!-- v-show="arr[0].num != arr[2].num"-->
        <div class="main_button font18 mobile_font16" :class="{ en_Bold: isEnLang,disable_bnb:(userIsWhiteList?false:true) || !startAndEnd}">
          <!-- {{ $t("message.acticePage.txt23") }} -->
          <FunBtn
            :allLoading="allLoading"
            :isapprove="isapprove"
            :approveloading="buy_isloading"
            :isloading="buy_isloading"
            :word="btntxt"
            ref="mychild"
            @sonapprove="sonapprove"
            @dosomething="userBuyIdo"
          />
        </div>
        <!-- (arr[0].num == arr[2].num || !startAndEnd) ?'message.tip.self_sold': 'message.acticePage.txt23' -->
      </div>
      <div class="mobile_three_box">
        <div v-for="(item, index) in arr1" :key="index">
          <div class="package_box">
            <div class="iconbox_">
              <svg
                t="1653724466948"
                class="icon"
                viewBox="0 0 1107 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="36756"
                width="16"
                height="16"
              >
                <path
                  d="M563.323289 661.336738a330.663562 330.663562 0 1 0-330.531877-330.663562 331.190306 331.190306 0 0 0 330.531877 330.663562z"
                  fill="#CED3D9"
                  p-id="36757"
                ></path>
                <path
                  d="M1106.528066 975.53955c-16.724123-134.319727-137.611877-293.001365-273.38015-373.066457a381.889419 381.889419 0 0 1-539.912627-0.65843C157.335331 679.246035 18.274908 834.635523 0.365611 975.53955a42.797952 42.797952 0 0 0 37.26714 48.065392h1031.628175A43.061324 43.061324 0 0 0 1106.528066 975.53955z"
                  fill="#CED3D9"
                  p-id="36758"
                ></path>
              </svg>
            </div>
            <p class="font16" :class="isEnLang ? 'en_medium' : ''">
              {{ $t(item.title) }}
            </p>
          </div>
          <p class="font20" :class="isEnLang ? 'en_Bold' : ''">
            {{ $t(item.num) }}
          </p>
        </div>
      </div>
      <div class="mobile_learnbox">
        <div class="left font20" :class="isEnLang ? 'en_medium' : ''">
          <span>{{ $t("message.acticePage.txt12") }}</span>
          <span>{{ $t("message.acticePage.txt13") }}</span>
        </div>
        <div class="btn font16" :class="isEnLang ? 'en_Bold' : ''">
          <a :href="isEnLang?'https://lab-sealem.gitbook.io/sealem-lab/tokenomics/st':'https://lab-sealem.gitbook.io/slmcn/dai-bi-jing-ji-xue/st'" target="_blank" rel="noopener noreferrer" >{{ $t("message.acticePage.txt14") }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ido,contract,getSigner,token,wallet } from 'sealemlab-sdk'
export default {
  computed: { ...mapGetters(["getUserCoin","isEnLang", "getAccountStatus", "getIstrue","getAccount"]),
    stAddress(){
      return this.$utils.getSubStr(token().ST, 6);
    }
  },
  data () {
    return {
      btntxt:'message.acticePage.txt23',
      buy_isloading: false, // 按钮loading
      isapprove: false, //是否授权
      allLoading:true,// 授权/操作按钮在没有进行判断之前,全部转圈圈状态
      inputvalue: '',
      countTime: { d: "00", h: "00", m: "00", s: "00" },
      countTimeOBJ: null,
      arr: [
        { title: 'message.acticePage.txt3', num: 0,busdnum:0 },
        { title: 'message.acticePage.txt4', num: 0,busdnum:0 },
        // { title: 'message.acticePage.txt5', num: 0},
        { title: 'message.acticePage.txt6', num: 0,busdnum:0 },
      ],
      arr1: [
        { title: 'message.acticePage.txt7', num: "message.acticePage.txt8" },
        { title: 'message.acticePage.txt9', num: "message.acticePage.txt9_1" },
        { title: 'message.acticePage.txt10', num: "message.acticePage.txt11" },
      ],
      nowPrice:0,
      nowPriceStatus:false,
      userBuyMax:0,
      idoAddress:'',
      payAddress:'',// 获取某IDO的支付代币地址
      userIsWhiteList:false,// 默认用户不在白名单
      // userBuynum:0,// 用户已经购买的数量
      userRemaining:0,// 用户剩余购买量
      setIntervalOBJ:null,
      userbuyst:0,//用户输入u换成的st数量
      idoID:0,//本期售卖id
      disableBth:true,// 按钮禁止点击
      percentage:0,
      width:0,
      progressTimer:null,
      startTime:0,
      endTime:0,
      pageTimer:null,
      getEndTimeStatus:false,
      startAndEnd:true,// 开始售卖前 跟结束售卖后 此变量为假
      showNoSellStatus:false,// 没有开始售卖前  此状态为假
    }
  },
  watch:{
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == 0){
          this.userConnectInfo(this.idoID)
          this.userIsWhiteList = false
        }else if(newValue > 0){
          this.$utils.antiShakeFun(() => {
            this.userConnectInfo(this.idoID)
          },2000)()
        }
      },
      deep: true,
      immediate: true,
    },
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.allLoading = true
          clearInterval(this.setIntervalOBJ);
          this.setIntervalOBJ = setInterval(() => {
            // if(this.countTimeOBJ == 0){
            //   this.allLoading = false
            //   clearInterval(this.setIntervalOBJ);
            //   return
            // }
            if (this.payAddress) {
              clearInterval(this.setIntervalOBJ);
              this.$refs.mychild.isApproveFun(this.payAddress, contract().IDO).then((res) => {
                if (res) {
                  this.isapprove = true;
                } else {
                  this.isapprove = false;
                }
                this.allLoading = false
              });
            }
            // console.log("判断是否授权中")
          }, 1000);
        }else{
          this.allLoading = false
          this.nowPriceStatus = true
        }
      },
      deep: true,
      immediate: true,
    },
    $route(to) {
      this.idoID = to.params.id
      this.getIdoInfo(this.idoID)
      this.inputvalue = ''
    }
  },
  methods: {
    addAddress(){
      wallet.addST(`https:${this.$store.state.imgUrl}stlogo.webp`)
    },
    // 去授权
    sonapprove() {
      if(!this.userIsWhiteList){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.acticePage.txt26'}));
        return
      }
      if (this.buy_isloading) return;
      this.buy_isloading = true;
      this.$refs.mychild.goApproveFun(this.payAddress, contract().IDO)
        .then((res) => {
          this.buy_isloading = false;
          if(res){
            this.isapprove = true;
            // if(!this.getNoticeNum){
            //   this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
            //   this.$store.commit("setNoticeNum",true)
            // }
          }else{
            this.isapprove = false;
          }
          this.allLoading = false
          // this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
        })
    },
    InputClick (data) {
      if(!data){this.userbuyst = 0}
      // console.log('input输入框', data)
      if(Number(data) > Number(this.getUserCoin.busd)){
        this.inputvalue = this.getUserCoin.busd
        this.userbuyst = this.getUserCoin.busd / this.nowPrice
      }else{
        this.inputvalue = data
        if(data / this.nowPrice < 1e-8){
          this.userbuyst = 0.0
        }else{
          this.userbuyst = data / this.nowPrice
        }
      }
    },
    maxClick(){
      // console.log('this.userRemaining: ', this.userRemaining);
        // console.log('this.nowPrice: ', this.nowPrice);
        // console.log('this.getUserCoin.busd: ', this.getUserCoin.busd);
      if(this.userRemaining * this.nowPrice <= this.getUserCoin.busd){
        this.inputvalue = this.userRemaining * this.nowPrice
        this.userbuyst = this.userRemaining
      }else{
        this.inputvalue = this.getUserCoin.busd
        this.userbuyst = this.getUserCoin.busd / this.nowPrice
      }
    },
    getUsetTime () {
      clearInterval(this.pageTimer)
      this.pageTimer = setInterval(() => {
        let nowTime = parseInt(new Date().getTime() / 1000)
        if(this.getEndTimeStatus){
          // console.log("获取到结束时间",this.endTime,nowTime)
          // 活动已结束
          if(this.endTime < nowTime){
            this.btntxt = 'message.tip.self_sold'
            this.startAndEnd = false
            clearInterval(this.pageTimer)
            return
          }
        }
        if(this.startTime > 0){
          // 售卖前的倒计时
          if(nowTime < this.startTime){
            this.btntxt = 'message.acticePage.txt23'
            this.startAndEnd = false
            clearInterval(this.countTimeOBJ)
            this.$utils.customTime(this.startTime, data => {
              // console.log('data: ', data);
              this.countTimeOBJ = data.countdownObject
              if(this.countTimeOBJ == 0){
                this.startAndEnd = true
                this.userIsWhiteList = false
              }
              this.countTime = data.countTime
            });
          }else if(this.startTime <= nowTime < this.endTime){//正在售卖中
            this.btntxt = this.userIsWhiteList ?'message.acticePage.txt23':'message.acticePage.txt31'
            clearInterval(this.countTimeOBJ)
            this.startAndEnd = true
            this.$utils.customTime(this.endTime, data => {
              // console.log('data: ', data);
              this.countTimeOBJ = data.countdownObject
              if(this.countTimeOBJ == 0){
                this.startAndEnd = false
                this.userIsWhiteList = false
              }
              this.countTime = data.countTime
            });
          }
          // console.log("获取到开始时间",this.startTime)
        }
        // console.log("页面倒计时中")
      },1000)
    },
    getIdoInfo(idoID){
      // console.log("获取ido信息")
      // 获取某IDO的开始时间
      ido().startTimes(idoID).then(res => { 
        // console.log('获取某IDO的开始时间: ', res);
        this.startTime = Number(res)
        // let nowTime = parseInt(new Date().getTime() / 1000)
        // if(nowTime <= res){
        //   this.getUsetTime(res)
        // }
      })
      
      ido().endTimes(idoID).then(res1 => { 
        // console.log('获取某IDO的结束时间: ', res1);
        this.endTime = Number(res1)
        this.getEndTimeStatus = true
      })
      
      // 获取某IDO的代币地址
      ido().idoTokens(idoID).then(res => {
        // console.log('获取某IDO的代币地址res: ', res);
        this.idoAddress = res
      })
      // 获取某IDO的支付代币地址
      ido().tokenAddrs(idoID).then(res => {
        // console.log('获取某IDO的支付代币地址: ', res);
        this.payAddress = res
      })

      // 获取某IDO的用户最大可购买数量限制
      ido().userBuyLimits(idoID).then(res => { 
        // console.log('获取某IDO的用户最大可购买数量限制: ', res);
        this.userBuyMax = this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
      })

      this.refresh(idoID)
    },
    // 刷新占比进度条
    async refresh(idoID){
      // 获取某IDO的支付代币单价
      let price = await ido().tokenPrices(idoID)
      this.nowPrice = this.$utils.convertBigNumberToNormal(Number(price),0,18,true)
      this.nowPriceStatus = true
      
      // 获取某IDO的最大供应量
      let maxnum = await ido().tokenMaxSupplys(idoID)
      this.arr[2].num = this.$utils.convertBigNumberToNormal(Number(maxnum),0,18,true)
      this.arr[2].busdnum = maxnum / 1e18 * this.nowPrice

      // 获取某IDO的已售出数量
      ido().tokenSoldout(idoID).then(res => { 
        // console.log('获取某IDO的已售出数量: ', res);
        this.arr[0].num = this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
        this.arr[0].busdnum = res / 1e18 * this.nowPrice
        
        this.percentage = parseInt(Number(this.arr[0].num) / Number(this.arr[2].num) * 100) 
        this.progressFun()
      })
      // 获取某IDO的剩余可销售数量
      ido().getTokenLeftSupply(idoID).then(res => { 
        // console.log('获取某IDO的剩余可销售数量: ', res);
        this.arr[1].num = this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
        this.arr[1].busdnum = res / 1e18 * this.nowPrice
      })
    },
    userConnectInfo(idoID,iswhite = true){
      // console.log("获取用户信息")
      // // 获取某用户某IDO的已购买数量
      // ido().userTokenPurchased(this.getAccount,this.idoID).then(res => { 
      //   console.log('获取某用户某IDO的已购买数量: ', res);
      //   this.userBuynum = this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
      // })
      // 判断某用户是否在某IDO的白名单
      if(iswhite){
        // 获取某IDO的是否开启白名单
        ido().whiteListFlags(idoID).then(res => { 
          // console.log('获取某IDO的是否开启白名单: ', res);
          if(res){
            ido().getWhiteListExistence(idoID,this.getAccount).then(res1 => { 
              // console.log('判断某用户是否在某IDO的白名单: ', res1);
              this.userIsWhiteList = res1
            })
          }
        })
      }
      // 获取某用户某IDO的剩余购买限额
      ido().getUserTokenLeftSupply(idoID,this.getAccount).then(res => { 
        // console.log('获取某用户某IDO的剩余购买限额: ', res);
        this.userRemaining = this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
      })
    },
    // 用户购买
    userBuyIdo(){
      if (this.buy_isloading) return;
      if(this.countTimeOBJ != 0){
        if(!this.userIsWhiteList){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.acticePage.txt26'}));
          return
        }
        if(!this.inputvalue){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.acticePage.txt25'}));
          return
        }
        if(Number(this.userRemaining) < Number(this.userbuyst)){ // 用户剩余购买量
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.acticePage.txt27'}));
          return
        }
        if(Number(this.arr[1].num) < Number(this.userbuyst)){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.acticePage.txt28'}));
          return
        }
        this.buy_isloading = true
          console.log('this.userbuyst: ',this.$utils.convertNormalToBigNumber(648.7079203730402, 18), this.userbuyst);
        ido().connect(getSigner()).buyToken(this.$utils.convertNormalToBigNumber(this.userbuyst, 18),this.idoID).then(async res => {
          // console.log('购买idores: ', res);
          this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res.hash}));
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
            this.buy_isloading = false
            this.userbuyst = 0
            this.inputvalue = ''
            this.userConnectInfo(this.idoID,false)
            this.refresh(this.idoID)
            this.$utils.getUserCoinQuantity(token().BUSD,'busd',this.getAccount)
            this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          }else{
            this.buy_isloading = false
            this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
          }
        }).catch(() => {
          this.buy_isloading = false
        })
      }else{
        // console.log("活动已结束")
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.acticePage.txt29'}));
      }
    },
    progressFun(){
      clearInterval(this.progressTimer)
      this.progressTimer = setInterval(() => {
        if(!this.percentage){
          this.percentage = 0
          this.width = 0
          clearInterval(this.progressTimer)
          return
        }
        this.width += 5
        if(this.width >= this.percentage){
          this.width = this.percentage
          clearInterval(this.progressTimer)
        }
      },100)
    }
  },
  mounted () {
    this.idoID = this.$route.params.id
    this.getIdoInfo(this.idoID)
    this.getUsetTime()
  },
  beforeDestroy () {
    clearInterval(this.countTimeOBJ)
    clearInterval(this.pageTimer)
  }
}
</script>
<style lang="scss" scoped>
.active_page_coin {
  width: 100%;
  margin-bottom: 150px;
  .top_box {
    width: 100%;
    padding-top: 105px;
    min-height: 396px;
    background: url($bg_url + "ido.webp") no-repeat #000;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .timebox {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 56px 0 40px;
      .onebox {
        width: 95px;
        height: 95px;
        background: rgba(248, 229, 186, 0.06);
        border-radius: 7px;
        backdrop-filter: blur(4px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        span {
          &:nth-child(1) {
            font-weight: bold;
            color: #eccf83;
            line-height: 54px;
          }
          &:nth-child(2) {
            font-weight: 500;
            color: #8f8e8e;
            line-height: 16px;
          }
        }
      }
      .line {
        font-weight: 500;
        color: #eccf83;
        line-height: 63px;
        margin: 0 20px;
      }
    }
  }
  .content {
    width: 90vw;
    margin: 70px auto 0;
    display: flex;
    justify-content: space-between;
    .left_box {
      width: 68%;
      display: flex;
      flex-direction: column;
      .onebox {
        width: 100%;
        background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 12px;
        border: 1px solid rgba(68, 67, 67, 0.47);
        display: flex;
        flex-direction: column;
        padding: 20px;
        p {
          font-weight: bold;
          color: #ced3d9;
          line-height: 29px;
          display: flex;
          align-items: center;
          span {
            &:nth-child(2) {
              display: inline-block;
              padding: 0 5px;
              // height: 26px;
              line-height: 26px;
              background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
              border-radius: 4px;
              color: #0e0d0d;
              border: 1px solid rgba(255, 255, 255, 0.36);
              backdrop-filter: blur(14px);
              margin-left: 13px;
            }
          }
        }
        .allbox {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 42px;
          .Onegroup {
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              &:nth-child(1) {
                font-weight: 500;
                color: #8f8e8e;
                line-height: 19px;
              }
              &:nth-child(2) {
                font-weight: bold;
                color: #ced3d9;
                line-height: 29px;
                margin-top: 15px;
              }
            }
          }
        }
        .progress_box {
          width:100%;
          display: flex;
          align-items: center;
          margin: 56px 0 35px;
          .box {
            width: 100%;
            height: 17px;
            background: #373535;
            box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
              inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5),
              inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
            border-radius: 12px;
            .load {
              width: 0;
              height: 17px;
              background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
              border-radius: 12px;
              backdrop-filter: blur(14px);
            }
          }
          span {
            margin-left: 15px;
            font-weight: bold;
            color: #ced3d9;
            line-height: 24px;
            white-space:nowrap;
          }
        }
      }
      .three_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 52px;
        > div {
          width: 32%;
          height: 104px;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
            inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 12px;
          border: 1px solid #373636;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 20px 15px;
          .package_box {
            display: flex;
            align-items: center;
            .iconbox_ {
              margin-right: 5px;
            }
            p {
              font-weight: 500;
              color: #8f8e8e;
              line-height: 19px;
              white-space: nowrap;
              padding-left: 0;
            }
          }
          p {
            font-weight: bold;
            color: #ced3d9;
            line-height: 24px;
            padding-left: 20px;
          }
        }
      }
      .learnbox {
        margin-top: 51px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 12px;
        border: 1px solid rgba(68, 67, 67, 0.47);
        .left {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          color: #ced3d9;
          line-height: 32px;
        }
        .btn {
          padding: 0 20px;
          height: 48px;
          border-radius: 4px;
          border: 1px solid #ead28e;
          backdrop-filter: blur(14px);
          text-align: center;
          line-height: 48px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .right_box {
      width: 30%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 12px;
      border: 1px solid rgba(68, 67, 67, 0.47);
      p {
        &:nth-child(1) {
          font-weight: 500;
          color: #ced3d9;
          line-height: 29px;
        }
        &:nth-child(2) {
          font-weight: 500;
          color: #ced3d9;
          line-height: 19px;
          margin-top: 13px;
          cursor: pointer;
          .add_img{
            width: 10px;
          }
        }
      }
      .box1 {
        width: 100%;
        margin-top: 37px;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
          inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
        border-radius: 12px;
        border: 1px solid #373636;
        padding: 20px;
      }
      .box2 {
        margin-top: 33px;
        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(2) {
            margin-top: 15px;
          }
          .span1 {
            font-weight: 500;
            color: #8f8e8e;
            line-height: 19px;
          }
          .span2 {
            font-weight: 500;
            color: #ced3d9;
            line-height: 19px;
          }
          p {
            display: flex;
            align-items: center;
            margin-top: 0;
            .span_btn {
              cursor: pointer;
              padding: 0 5px;
              height: 21px;
              background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
              box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
              border-radius: 2px;
              backdrop-filter: blur(14px);
              text-align: center;
              line-height: 21px;
              font-weight: 500;
              color: #000000;
              margin-right: 8px;
            }
          }
        }
        .add_box_st{
          margin-top: 15px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
      }
      .tip_txt {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        color: #8f8e8e;
        line-height: 14px;
        margin-top: 24px;
        .ques_img {
          width: 11px;
          margin-right: 5px;
        }
      }
      .main_button {
        width: 100%;
        min-height: 45px;
        margin: 50px auto 0;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
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
    }
    .mobile_three_box,
    .mobile_learnbox {
      display: none;
    }
  }
}
@media screen and (max-width: 980px) {
  .active_page_coin {
    width: 100%;
    margin-bottom: 0.3rem;
    padding: 0 0.2rem;
    .top_box {
      width: 100%;
      padding-top: 1rem;
      padding-bottom: 0.1rem;
      min-height: 1.24rem;
      background: url($bg_url + "ido.webp") no-repeat #000;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .mobile_left {
        width: 100%;
        text-align: left;
      }
      .timebox {
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.2rem 0;
        .onebox {
          width: 0.62rem;
          padding: 0.1rem;
          height: 0.62rem;
          background: rgba(248, 229, 186, 0.06);
          border-radius: 0.07rem;
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          span {
            &:nth-child(1) {
              font-weight: bold;
              color: #eccf83;
              line-height: 0.29rem;
            }
            &:nth-child(2) {
              font-weight: 500;
              color: #8f8e8e;
              line-height: 0.12rem;
              margin-top: 0.05rem;
            }
          }
        }
        .line {
          font-weight: 500;
          color: #eccf83;
          line-height: 0.33rem;
          margin: 0 0.08rem;
        }
      }
    }
    .content {
      width: 100%;
      margin: 0.2rem auto 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .left_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .onebox {
          width: 100%;
          background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
          border-radius: 12px;
          border: 1px solid rgba(68, 67, 67, 0.47);
          display: flex;
          flex-direction: column;
          padding: 0.1rem;
          p {
            font-weight: bold;
            color: #ced3d9;
            line-height: 29px;
            span {
              &:nth-child(2) {
                display: inline-block;
                padding: 0 0.1rem;
                height: 0.22rem;
                line-height: 0.22rem;
                background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
                border-radius: 0.04rem;
                color: #0e0d0d;
                border: 1px solid rgba(255, 255, 255, 0.36);
                backdrop-filter: blur(14px);
                margin-left: 0.1rem;
              }
            }
          }
          .allbox {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.15rem;
            .Onegroup {
              width: 50%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              margin-bottom: 0.2rem;
              span {
                &:nth-child(1) {
                  font-weight: 500;
                  color: #8f8e8e;
                  line-height: 0.16rem;
                }
                &:nth-child(2) {
                  font-weight: bold;
                  color: #ced3d9;
                  line-height: 0.21rem;
                  margin-top: 0.05rem;
                }
              }
            }
          }
          .progress_box {
            width: 100%;
            display: flex;
            align-items: center;
            margin: 0.1rem 0 0.25rem;
            .box {
              width: 90%;
              height: 0.08rem;
              background: #373535;
              box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
                inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5),
                inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
              border-radius: 12px;
              .load {
                width: 0;
                height: 0.08rem;
                background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
                border-radius: 12px;
                backdrop-filter: blur(14px);
              }
            }
            span {
              margin-left: 15px;
              font-weight: bold;
              color: #ced3d9;
              line-height: 24px;
            }
          }
        }
        .three_box {
          display: none;
        }
        .learnbox {
          display: none;
        }
      }
      .right_box {
        margin-top: 0.15rem;
        width: 100%;
        padding: 0.1rem;
        display: flex;
        flex-direction: column;
        background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 12px;
        border: 1px solid rgba(68, 67, 67, 0.47);
        p {
          &:nth-child(1) {
            font-weight: bold;
            color: #ced3d9;
            line-height: 0.24rem;
          }
          &:nth-child(2) {
            font-weight: 500;
            color: #ced3d9;
            line-height: 0.16rem;
            margin-top: 0.08rem;
          }
        }
        .box1 {
          width: 100%;
          margin-top: 0.18rem;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
            inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 0.12rem;
          border: 1px solid #373636;
          padding: 0.2rem;
        }
        .box2 {
          margin-top: 0.25rem;
          > div {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:nth-child(2) {
              margin-top: 0.15rem;
            }
            .span1 {
              font-weight: 500;
              color: #8f8e8e;
              line-height: 0.19rem;
            }
            .span2 {
              font-weight: 500;
              color: #ced3d9;
              line-height: 0.19rem;
            }
            p {
              display: flex;
              align-items: center;
              margin-top: 0;
              .span_btn {
                padding: 0 0.08rem;
                height: 0.21rem;
                background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
                box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
                border-radius: 2px;
                backdrop-filter: blur(14px);
                text-align: center;
                line-height: 0.21rem;
                font-weight: 500;
                color: #000000;
                margin-right: 0.1rem;
              }
            }
          }
        }
        .tip_txt {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: 500;
          color: #8f8e8e;
          line-height: 0.14rem;
          margin-top: 0.49rem;
          .ques_img {
            width: 0.11rem;
            margin-right: 0.05rem;
          }
        }
        .main_button {
          width: 80%;
          min-height: 0.4rem;
          margin: 0.26rem auto 0.3rem;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
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
      }
      .mobile_three_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 0.3rem;
        > div {
          width: 100%;
          height: 0.8rem;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
            inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 0.04rem;
          border: 1px solid #373636;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.15rem 0.1rem;
          margin-bottom: 0.12rem;
          .package_box {
            display: flex;
            align-items: center;
            .iconbox_ {
              margin-right: 5px;
            }
            p {
              font-weight: 500;
              color: #8f8e8e;
              line-height: 0.16rem;
              margin-top: 0;
              padding-left: 0;
            }
          }
          p {
            font-weight: bold;
            color: #ced3d9;
            line-height: 0.21rem;
            margin-top: 0.12rem;
            padding-left: 0.2rem;
          }
        }
      }
      .mobile_learnbox {
        margin-top: 0.26rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.1rem;
        background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 0.04rem;
        border: 1px solid rgba(68, 67, 67, 0.47);
        .left {
          display: flex;
          flex-direction: column;
          line-height: 0.32rem;
          font-weight: 500;
          color: #ced3d9;
        }
        .btn {
          width: 95%;
          padding: 0;
          height: 0.4rem;
          border-radius: 0.04rem;
          border: 1px solid #ead28e;
          backdrop-filter: blur(14px);
          text-align: center;
          line-height: 0.4rem;
          font-weight: bold;
          margin-top: 0.14rem;
        }
      }
    }
  }
}
</style>