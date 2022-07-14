<template>
  <div class="gamebox">
    <div class="game_title font32" :class="isEnLang?'en_heavy':''">{{ $t("message.gamepage.text38") }}</div>
    <div class="box1" :class="isEnLang?'en_Bold':''">
      <div>
        <div class="label">{{ $t("message.gamepage.text16") }}</div>
        <div class="content">{{ getLogin.mailAccount | mailEllipsis }}</div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text17") }}</div>
        <div class="content">{{ getLogin.addr | ellipsis }}</div>
      </div>
    </div>
    <!-- 用户sr余额 可提取sr 冻结sr -->
    <div class="add_box1" :class="isEnLang?'en_Bold':''">
      <!-- Wallet Balance -->
      <div>
        <div class="label">{{ $t("message.gamepage.text18") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <div class="balance">{{getUserCoin.sr | PriceConversion | Thousandths}}</div>
            <div class="btn" @click="openRecharge">{{ $t("message.gamepage.text19") }}</div>
          </div>
        </div>
      </div>
      <!-- Claimable -->
      <div>
        <div class="label">{{ $t("message.gamepage.text20") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <div class="balance">{{claimValue | PriceConversion | Thousandths}}</div>
            <!-- <input type="number" :value="claimValue" disabled /> -->
            <div class="btn" @click="ApplyFun">{{ $t("message.gamepage.text21") }}</div>
          </div>
        </div>
      </div>
      <!-- Locked -->
      <div>
        <div class="label has_question_icon" @click="AddQuesFun('message.gamepage.txt44',$event)" >{{ $t("message.gamepage.txt20_1") }}</div>
        <div class="content question_content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <div class="balance locked_input">{{lockedValue | PriceConversion | Thousandths}}</div>
            <!-- <input type="number" :value="lockedValue" class="locked_input" disabled /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- History -->
    <div class="box2 font32">
      <div class="box2_title mobile_font18" :class="isEnLang?'en_heavy':''">{{ $t("message.gamepage.text24") }}</div>
      <div class="btns font22 mobile_font14" :class="isEnLang?'en_Bold':''">
        <!-- claim -->
        <div @click="ClaimFun('claim')" :class="{ active: isShowClaimList }">{{ $t("message.gamepage.text23") }}</div>
        <!-- Recharge -->
        <div @click="ClaimFun('recharge')" :class="{ active: !isShowClaimList }">{{ $t("message.gamepage.text19") }}</div>
      </div>
      <!-- <div class="btns font20" :class="isEnLang?'en_Bold':''" v-if="isShowClaimList">
        <div class="_btn" :class="applyHistory?'btn_normal':''" @click="applyHistory = true">{{ $t("message.gamepage.txt40") }}</div>
        <div class="_btn" :class="applyHistory?'':'btn_normal'" @click="applyHistory = false">{{ $t("message.gamepage.txt41") }}</div>
      </div> -->
    </div>
    <!-- 表格 -->
    <div class="box3">
      <table>
        <thead>
          <tr :class="isEnLang?'en_Bold':''">
            <th>{{ $t("message.gamepage.text25") }}</th>
            <th>{{ $t("message.gamepage.text26") }}</th>
            <th>{{ $t("message.gamepage.text27") }}</th>
          </tr>
        </thead>
        <tbody v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
          <tr v-for="(item,index) in list" :key="index">
            <td >{{item.createTime}}</td>
            <td >
              <div>
                <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
                <span>{{item.amount | PriceConversion |Thousandths}}</span>
              </div>
            </td>
            <td>
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-if="item.tbStatus == -1">{{ $t("message.gamepage.txt45") }}</div>
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-if="item.tbStatus == 0">{{ $t("message.gamepage.txt46") }}</div>
              <div class="claim_btn btn_normal font12" :class="isEnLang?'en_Bold':''" v-if="item.tbStatus == 1" @click="userClaim(item)">
                <span v-if="!getIstrue" @click.stop="connectFun">Connect</span>
                <span v-else>{{ $t("message.gamepage.txt47") }}</span>
                <BtnLoading :isloading="item.claimLoading"></BtnLoading>
              </div>
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-if="item.tbStatus == 2">{{ $t("message.gamepage.txt48") }}</div>
            </td>
          </tr>
          <tr v-if="list.length == 0 && getLogin.loginStatus && loadMoreStatus">
            <div class="loading_box_content">
              <LoadingAnmation></LoadingAnmation>
            </div>
          </tr>
          <tr v-else-if="list.length == 0 || !getLogin.loginStatus">
            <div class="loading_box_content" >
              <svg t="1653726615818" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="84371" width="200" height="200"><path d="M102.4 634.88h13.824c3.584 0 6.656 3.072 6.656 6.656 0 3.584-3.072 6.656-6.656 6.656H102.4v13.824c0 3.584-3.072 6.656-6.656 6.656-2.048 0-3.584-0.512-4.608-2.048-1.536-1.024-2.048-3.072-2.048-4.608v-13.824h-13.824c-3.584 0-6.656-3.072-6.656-6.656 0-3.584 3.072-6.656 6.656-6.656h13.824v-13.824c0-3.584 3.072-6.656 6.656-6.656 3.584 0 6.656 3.072 6.656 6.656v13.824z m901.12-54.784v-13.824c0-2.048-0.512-3.584-2.048-4.608-1.536-1.024-3.072-2.048-4.608-2.048-3.584 0-6.656 3.072-6.656 6.656v13.824h-13.824c-2.048 0-3.584 0.512-4.608 2.048-1.024 1.536-2.048 3.072-2.048 4.608 0 3.584 3.072 6.656 6.656 6.656h13.824v13.824c0 3.584 3.072 6.656 6.656 6.656 3.584 0 6.656-3.072 6.656-6.656V593.92h13.824c3.584 0 6.656-3.072 6.656-6.656 0-3.584-3.072-6.656-6.656-6.656H1003.52z m-496.128 225.28H163.84a13.98784 13.98784 0 0 1-13.824-13.824c0-7.68 6.144-13.824 13.824-13.824h61.952c-4.608-8.192-7.168-17.92-7.168-27.136V354.816c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h40.96V286.72c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h327.68c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v396.288c0 9.728-2.56 19.456-7.168 27.136H819.2c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-163.84v13.824c0 9.728-2.56 19.456-7.168 27.136h7.168c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-71.68c6.144 10.24 5.12 24.064-4.096 33.28-5.12 5.12-12.288 8.192-19.456 8.192s-14.336-3.072-19.456-8.192l-33.28-34.304z m50.176-27.136h43.52c14.848 0 27.136-12.288 27.136-27.136V354.304c0-14.848-11.776-26.624-26.112-26.624H271.872c-14.336 0-26.112 11.776-26.112 26.624v396.8c0 15.36 12.288 27.136 27.136 27.136h207.36l-7.168-7.168c-7.168-6.656-9.728-16.896-7.168-26.624l-12.8-12.8c-39.936 29.696-96.768 23.552-129.536-14.336-32.768-37.888-30.72-94.72 4.608-130.048 35.328-35.328 92.16-37.888 130.048-4.608 37.888 32.768 44.032 89.6 13.824 129.536l12.8 12.8c9.216-2.56 19.456 0 26.624 7.168l46.08 46.08z m97.792-68.608h40.96c14.848 0 27.136-12.288 27.136-27.136V286.72c0-15.36-12.288-27.136-27.136-27.136H368.64c-14.848 0-27.136 12.288-27.136 27.136v13.824h259.584c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v354.816z m-481.28-501.76h20.48c5.632 0 10.24 4.608 10.24 10.24s-4.608 10.24-10.24 10.24h-20.48v20.48c0 5.632-4.608 10.24-10.24 10.24-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168v-20.48h-20.48c-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168 0-5.632 4.608-10.24 10.24-10.24h20.48v-20.48c0-5.632 4.608-10.24 10.24-10.24s10.24 4.608 10.24 10.24v20.48z m-160.256 583.68c0-7.68 6.144-13.824 13.824-13.824h81.92c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-81.92c-3.584 0-7.168-1.536-9.728-4.096-3.072-2.56-4.096-6.144-4.096-9.728z m430.592-88.064c26.624-26.624 26.624-70.144 0-96.768-26.624-26.624-70.144-26.624-96.768 0-26.624 26.624-26.624 70.144 0 96.768 26.624 26.624 70.144 26.624 96.768 0zM300.544 381.952c0-7.68 6.144-13.824 13.824-13.824h150.016c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.608c0-7.68 6.144-13.824 13.312-13.824H532.48c7.68 0 13.312 6.144 13.312 13.824 0 7.68-6.144 13.824-13.312 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.096c0-7.68 6.144-13.824 13.824-13.824H409.6c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728zM40.96 436.736c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-18.432 40.96-40.96 40.96z m0-20.48c7.168 0 13.824-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m846.336-61.44c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-17.92 40.96-40.96 40.96z m0-20.48c7.168 0 14.336-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m0 0" fill="#CDCDCD" p-id="84372"></path></svg>
              {{$t("message.tip.self_txt13")}}
            </div>
          </tr>
          <tr class="bottom_loading font16" v-if="list.length > 9">
            <span v-if="loadMoreStatus">Loading...</span>
            <span v-else-if="!loadMoreStatus">End</span>
          </tr>
        </tbody>
      </table>
    </div>  
    <MessageBox ref="mychildAdd" :clientX='clientX' :clientY="clientY" :content="datacontent"></MessageBox>
    <PopupRecharge @closeRecharge="closeRecharge" :proupRecharge="proupRecharge"></PopupRecharge>
    <ProupApply @closeApply="closeApply" :proupClaimStatus="proupClaimStatus" :usernum="claimValue"></ProupApply>
  </div>
</template>

<script>
import { srWithdraw,util,token,getSigner } from "sealemlab-sdk";
import { mapGetters } from "vuex";
import PopupRecharge from "./PopupRecharge.vue";
import ProupApply from "./PopupApply.vue";
import MessageBox from "@/views/Bond/MessageBox.vue";
export default {
  name: "RechargeClaim",
  components: { PopupRecharge,ProupApply,MessageBox },
  computed: { 
    ...mapGetters(["getLogin","isEnLang","getUserCoin","getAccount","getIstrue"]),
    // istrue(){
    //   return !this.isShowClaimList || !this.applyHistory
    // }
  },
  data() {
    return {
      isOneLoading:false,//第一次是否加载
      busy: false, // 为true则第一次不执行loadmore

      loadMoreStatus:true,
      claimValue:0,//可提取余额
      lockedValue:0,//冻结余额
      proupRecharge: false,
      proupClaimStatus:false,
      isShowClaimList: true,// calim / recharge
      // applyHistory:true,// apply / calim 
      list:[],
      datacontent:'',
      clientX:0,
      clientY:0,
      claimPage:1,//提现页数
      recgargePage:1//充值页数
    };
  },
  created() {
    if (!this.getLogin.loginStatus) {
      this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: this.$t("message.gamepage.text39") }));
    }else{
      this.getUserGameBalance()
      this.ApplyForWithdrawal(1,callbackData => {
        this.list = JSON.parse(callbackData)
      })
    }
  },
  methods: {
    connectFun(){
      this.$store.commit("setwalletstatus", true);
    },
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus && this.isOneLoading) {
        // console.log("loadmore加载更多")
        if(this.isShowClaimList){
          console.log("调用提现记录方法")
          this.ApplyForWithdrawal(++this.claimPage,callbackData => {
            this.list = this.list.concat(JSON.parse(callbackData))
          })
        }else{
          console.log("调用充值记录方法")
          this.RechargeFun(++this.recgargePage,res => {
            this.list = this.list.concat(JSON.parse(res))
          })
        }
      }
    },
    AddQuesFun(data,e){
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY
      setTimeout(() => {
        this.$refs.mychildAdd.titleFun()
      },400)
    },
    closeApply(data){
      if(data){
        this.ApplyForWithdrawal(1,callbackData => {
          this.list = JSON.parse(callbackData)
        })
        this.getUserGameBalance()
      }
      this.proupClaimStatus = false
    },
    closeRecharge(data){
      if(data){
        this.getUserGameBalance().then(res1 => {
          console.log('balannce接口返回的res1: ', res1);
          if(res1){
            setTimeout(() => {
              this.recgargePage = 1
              this.RechargeFun(1,res => {
                this.list = JSON.parse(res)
              })
            },1500)
          }
        })
      }
      this.proupRecharge = false
    },
    openRecharge() {
      if (!this.getLogin.loginStatus) {
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt61'}));
        setTimeout(() => {
          this.proupRecharge = true;
        },2000)
      }else if(this.getLogin.addr.toLowerCase() != this.getAccount.toLowerCase()){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt62'}));
        setTimeout(() => {
          this.proupRecharge = true;
        },2000)
      }else{
        this.proupRecharge = true;
      }
      
    },
    ClaimFun(data){
      this.loadMoreStatus = true
      this.list = []
      if(data == 'claim'){
        this.isShowClaimList = true
        this.claimPage = 1
        this.ApplyForWithdrawal(1,callbackData => {
          this.list = JSON.parse(callbackData)
        })
      }else{
        this.isShowClaimList = false
        this.recgargePage = 1
        this.RechargeFun(1,res => {
          this.list = JSON.parse(res)
        })
      }
      // this.applyHistory = true
    },
    ApplyFun(){
      this.proupClaimStatus = true;
    },
    // 获取用户游戏内代币余额
    getUserGameBalance(){
      return new Promise((resolve,reject) => {
        this.$api.getUserSRBalance({}, { headers: { Authorization: "Bearer " + this.getLogin.token } })
          .then(res => {
            console.log('获取用户游戏内代币余额res: ', res);
            if(res.code == 200){
              this.claimValue = res.data.data.holdingAmount // 可用余额
              this.lockedValue = res.data.data.frezeeAmount // 冻结数量
              resolve(true)
            }else{
              resolve(false)
            }
          }).catch(() => {
            console.log('获取用户游戏内代币余额错误');
            reject(false)
          })
      })
    },
    // 充值记录
    RechargeFun(page,calback){
      this.$api.rechargeRecord({page:page}, { headers: { Authorization: "Bearer " + this.getLogin.token} })
        .then(res => {
          console.log('充值记录res: ', res);
          if(res.code == 200){
            let arr = res.data.records
            if(arr.length > 0){
              arr.forEach(element => {
                element.createTime = element.createTime.replace("T", "\n")
                element.tbStatus = 2
              });
              this.loadMoreStatus = this.isOneLoading = true
              this.busy = false
              calback(JSON.stringify(arr))
            }else{
              this.loadMoreStatus = this.isOneLoading = false
              this.busy = true
              calback(JSON.stringify([]))
            }
          }
        })
        .catch(err => {
          console.log('充值记录err: ', err);
        });
    },
    // 提现记录
    ApplyForWithdrawal(page,calback){
      this.$api.WithdrawalsRecord({page:page}, { headers: { Authorization: "Bearer " + this.getLogin.token } })
      .then(res => { // 0 审核中  1 审核通过  2 订单完成  -1 审核拒绝
        console.log('提现记录res: ', res);
        if(res.code == 200){
          let arr = res.data.records
          if(arr.length > 0){
            arr.forEach(element => {
              element.createTime = element.createTime.replace("T", "\n")
              element.claimLoading = false
            });
            calback(JSON.stringify(arr))
            this.loadMoreStatus = this.isOneLoading = true
            this.busy = false
          }else{
            this.loadMoreStatus = this.isOneLoading = false
            this.busy = true
            calback(JSON.stringify([]))
          }
        }
      })
      .catch(err => {
        console.log('提现记录err: ', err);
      });
    },
    // 用户提取游戏中的sr
    userClaim(item){
      console.log('item: ', item);
      if(item.claimLoading)return
      if(this.getLogin.addr.toLowerCase() != this.getAccount.toLowerCase()){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt60'}));
        return
      }
      item.claimLoading = true
      // 绑定提现订单签名
      this.$api.withdrawFun({id:item.id}, { headers: { Authorization: "Bearer " + this.getLogin.token } })
        .then(res => {
          // console.log('绑定提现订单签名res: ', res);
          if(res.code == 200){
            srWithdraw().connect(getSigner()).claimPayment(util.parseUnits(item.amount+''),item.id,res.data).then(async res1 => {
              this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.Withdrawing','link':res1.hash}));
              const etReceipt = await res1.wait();
              if(etReceipt.status == 1){
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt50'}));
                item.claimLoading = false
                this.$utils.getUserCoinQuantity(token().SR,'sr',this.getAccount)
                this.ApplyForWithdrawal(1,callbackData => {
                  this.list = JSON.parse(callbackData)
                })
                this.getUserGameBalance()
              }else{
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
                item.claimLoading = false
              }
            }).catch(() => {
              item.claimLoading = false
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
            })
          }else{
            item.claimLoading = false
          }
        })
        .catch(err => {
          console.log('绑定提现订单签名err: ', err);
          item.claimLoading = false
        });
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      const index = value.length;
      return value.slice(0, 6) + "..." + value.slice(index - 4, index);
    },
    mailEllipsis(value) {
      if (!value) return "";
      const index = value.length;
      const index2 = value.indexOf("@");
      return value.slice(0, 2) + "***" + value.slice(index2, index);
    },
  }
};
</script>

<style lang="scss" scoped>
.gamebox {
  width: 100%;
  height: auto;
}
.game_title {
  margin-bottom: 30px;
}
.box1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    padding-right: 1rem;
    padding-bottom: 2rem;
    font-size: 18px;
    display: flex;
    align-items: center;
    &:nth-child(even) {
      padding-right: 0;
    }
  }
  .label {
    min-width: 200px;
  }
  .content {
    width: calc(100% - 200px);
    font-size: 18px;
    // font-family: SFCompactDisplay-Medium, SFCompactDisplay;
    font-weight: 500;
    display: flex;
    align-items: center;
    .inputbox {
      width: 100%;
      height: 2rem;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
      border-radius: 8px;
      border: 1px solid #373636;
      position: relative;
      .left {
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        img {
          width: 23px;
          height: 23px;
          margin: 0 5px;
        }
      }
      input {
        width: 100%;
        height: 100%;
        background: none;
        padding: 0 5.5rem 0 3.5rem;
        font-size: 18px;
        color: #ced3d9;
        text-align: right;
      }
      .btn {
        cursor: pointer;
        width: 5rem;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        &.disable {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
          cursor: not-allowed;
        }
        &.comingsoon {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
        }
      }
    }
  }
}
.add_box1{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 33%;
    padding-bottom: 2rem;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .label {
    margin-right: 10px;
  }
  .content {
    width: calc(100% - 100px);
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    .inputbox {
      width: 100%;
      height: 2rem;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
      border-radius: 8px;
      border: 1px solid #373636;
      position: relative;
      display: flex;
      align-items: center;
      .left {
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        img {
          width: 23px;
          height: 23px;
          margin: 0 5px;
        }
      }
      input {
        width: 100%;
        height: 100%;
        background: none;
        padding: 0 5.5rem 0 3.5rem;
        font-size: 18px;
        color: #ced3d9;
        text-align: right;
      }
      .balance{
        width: 100%;
        background: none;
        padding: 0 5.5rem 0 3.5rem;
        font-size: 18px;
        color: #ced3d9;
        text-align: right;
      }
      .locked_input{
        padding: 0 0.8rem 0 3.5rem;
      }
      .btn {
        cursor: pointer;
        width: 5rem;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        &.disable {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
          cursor: not-allowed;
        }
        &.comingsoon {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
        }
      }
    }
  }
  .question_content{
    width: calc(100% - 50px);
    margin-left: 1.5rem;
  }
}
.box2 {
  margin-top: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #242222;
  .btns {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    div {
      width: 10rem;
      height: 2.5rem;
      margin-right: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8f8e8e;
      cursor: pointer;
      border-radius: 4px;
      &.active {
        color: #edd07e;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
        border: 1px solid #373636;
      }
    }
    ._btn{
      color: #CED3D9 ;
      background: linear-gradient(180deg, #6D6D6D 0%, #595858 100%) ;
    }
  }
}
.box3 {
  margin: 2rem 0;
  width: 100%;
  height: auto;
  table {
    width: 100%;
    position: relative;
    background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 8px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    overflow: hidden;
    padding:0 0 1rem 7rem;
    thead {
      width: calc(100% - 7.5rem);
      // padding-right: 10px;
      background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
      position: absolute;
      top: 0;
    }
    tbody {
      display: block;
      width: 100%;
      height: 20rem;
      max-height: 20rem;
      margin-top: 3rem;
      overflow-y: auto;
    }
    tr {
      width: 100%;
      display: flex;
      align-items: center;
      th {
        width: 33%;
        // padding-left: 20px;
        height: 3rem;
        line-height: 3rem;
        font-size: 24px;
        font-weight: 500;
        text-align: left;
      }
      td {
        width: 33%;
        padding: 0.5rem 0;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        // justify-content: center;
        div {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin-left: 0.5rem;
          }
          img {
            width: 23px;
            height: 23px;
            cursor: pointer;
          }
        }
        .claim_btn{
          cursor: pointer;
          width: 98px;
          height: 34px;
          border-radius: 4px;
          backdrop-filter: blur(14px);
        }
        .claim_txt{
          font-weight: 500;
          color: #CED3D9;
          line-height: 19px;
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .game_title {
    font-size: 0.2rem;
    margin-top: 0.8rem;
    margin-bottom: 0.2rem;
  }
  .box1 {
    margin-top: 0.3rem;
    > div {
      width: 100%;
      padding-right: 0;
      padding-bottom: 0.2rem;
      font-size: 0.14rem;
      justify-content: space-between;
    }
    .label {
      min-width: 0.2rem;
    }
    .content {
      width: auto;
      font-size: 0.12rem;
      .inputbox {
        width: 100%;
        height: 0.3rem;
        .left {
          img {
            width: 0.2rem;
            height: 0.2rem;
            margin: 0.05rem;
          }
        }
        input {
          font-size: 0.12rem;
          padding: 0 0.65rem 0 0.5rem;
        }
        .btn {
          width: 0.6rem;
          height: 100%;
          font-size: 0.12rem;
        }
      }
    }
  }
  .add_box1{
    > div {
      width: 100%;
      padding-bottom: 0.1rem;
      font-size: 0.16rem;
      display: flex;
      align-items: center;
    }
    .label {
      margin-right: 0.1rem;
    }
    .content {
      width: calc(100% - 0.7rem);
      font-size: 18px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .inputbox {
        width: 100%;
        height: 0.5rem;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
        border-radius: 8px;
        border: 1px solid #373636;
        position: relative;
        display: flex;
        align-items: center;
        .left {
          width: fit-content;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          img {
            width: 23px;
            height: 23px;
            margin: 0 5px;
          }
        }
        input {
          width: 100%;
          height: 100%;
          background: none;
          padding: 0 0.7rem 0 0;
          font-size: 0.14rem;
          color: #ced3d9;
          text-align: right;
        }
        .balance{
          width: 100%;
          background: none;
          padding: 0 1rem 0 0rem;
          font-size: 0.14rem;
          color: #ced3d9;
          text-align: right;
        }
        .locked_input{
          padding: 0 0.8rem 0 3.5rem;
        }
        .btn {
          cursor: pointer;
          width: auto;
          padding: 0 0.1rem;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 4px;
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: #000000;
          &.disable {
            background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
            color: #e0d9d9;
            cursor: not-allowed;
          }
          &.comingsoon {
            background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
            color: #e0d9d9;
          }
        }
      }
    }
  }
  .box2 {
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    .btns {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      div {
        width: 50%;
        height: 0.5rem;
        margin-right: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8f8e8e;
        cursor: pointer;
        border-radius: 4px;
        &.active {
          color: #edd07e;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border: 1px solid #373636;
        }
      }
      ._btn{
        color: #CED3D9 ;
        background: linear-gradient(180deg, #6D6D6D 0%, #595858 100%) ;
      }
    }
  }
  .box3 {
    margin: 0.2rem 0;
    table {
      padding-left: 0;
      thead {
        width: 100%;
        background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
        position: absolute;
        top: 0;
      }
      tbody {
        display: block;
        width: 100%;
        height: 3rem;
        margin-top: 0.3rem;
        overflow-y: auto;
      }
      tr {
        width: 100%;
        display: flex;
        align-items: center;
        th {
          width: 33%;
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.16rem;
          font-weight: 500;
          text-align: left;
        }
        td {
          width: 33%;
          padding: 0.2rem 0;
          font-size: 0.14rem;
          font-weight: 500;
          display: flex;
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              margin-left: 0.05rem;
            }
            img {
              width: 23px;
              height: 23px;
              cursor: pointer;
            }
          }
          .claim_btn{
            cursor: pointer;
            width: 98px;
            height: 34px;
            border-radius: 4px;
            backdrop-filter: blur(14px);
          }
          .claim_txt{
            font-weight: 500;
            color: #CED3D9;
            line-height: 19px;
          }
        }
      }
    }
  }
}
</style>
