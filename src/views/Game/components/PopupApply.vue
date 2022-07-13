<template>
  <div class="popup" v-if="proupClaimStatus">
    <div class="inset">
      <div class="close_img" @click="closePopup"></div>
      <div class="content">
        <div class="title">{{ $t("message.gamepage.txt59") }}</div>
        <!-- 给自己充值 -->
        <div class="box">
          <div class="title">{{ $t("message.gamepage.text31") }}</div>
          <div class="inputbox">
            <Input :fontSize="getIsMobile?'0.14rem':'16px'" :modelValue="SRmsg" type="number" :placeholder='$t("message.gamepage.text32")' @input="busdInputClick" class="me_input"></Input>
            <div class="sr">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <div class="inputbtn" @click="maxClick">{{ $t("message.gamepage.text33") }}</div>
            <div class="tip font12" :class="isEnLang?'en_medium':''">
              {{ $t("message.gamepage.text34") }}: {{usernum | PriceConversion}}
            </div>
          </div>
        </div>
        <!-- shortcut -->
        <div class="box">
          <div class="title">{{ $t("message.gamepage.text35") }}</div>
          <div class="list">
            <span :class="index == selectIndex?'active_span':''" v-for="(item,index) in rechargeArr" :key="index" @click="selectFun(item,index)">
              {{item}}
            </span>
          </div>
        </div>
        <div class="btn" @click="applyClick">
          {{ $t("message.gamepage.txt59") }}
          <BtnLoading :isloading="doingLoading"></BtnLoading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getIsMobile","getLogin","isEnLang","getNoticeNum","getAccount","getAccountStatus"]),
  },
  props: {
    usernum:{
      type: [String,Number],
      default: 0
    },
    proupClaimStatus:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      doingLoading:false,
      SRmsg:'',
      rechargeArr:[30000,60000,120000,240000,480000],
      selectIndex:-1,
      applyStatus:false
    }
  },
  watch: {
    'getAccountStatus': {
      handler: function (newValue) {
        if (newValue == -1 || newValue == undefined) {
          this.$parent.proupClaimStatus = false;
        } else if (newValue > 0) {
          this.$parent.proupClaimStatus = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    closePopup() {
      this.SRmsg = ''
      this.$emit('closeApply',this.applyStatus)
    },
    maxClick(){
      this.SRmsg = this.usernum
    },
    busdInputClick(data){
      if(Number(this.usernum) >= Number(data)){
        this.SRmsg = data
      }else{
        this.SRmsg = this.usernum
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt51'}));
      }
    },
    selectFun(item,index){
      if(Number(this.usernum) >= Number(item)){
        this.SRmsg = item
        this.selectIndex = index
      }else{
        this.SRmsg = this.usernum
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt51'}));
      }
    },
    applyClick(){
      if (this.doingLoading) return;
      if(!this.SRmsg){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt56'}));
        return
      }
      if(Number(this.SRmsg) > Number(this.usernum)){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.gamepage.txt51'}));
        return
      }
      this.doingLoading = true;
      // 提现申请
      this.$api.applyFun({amount:this.SRmsg}, { headers: { Authorization: "Bearer " + this.getLogin.token } })
        .then(res => {
          console.log('提现申请res: ', res);
          this.doingLoading = false;
          if(res.code != 200){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':res.msg}));
            return
          }
          this.SRmsg = ''
          this.applyStatus = true
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':res.msg}));
        })
        .catch(err => {
          console.log('提现申请err: ', err);
          this.doingLoading = false;
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':err.msg}));
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100vw;
  height: 100vh;
  background: rgba(51, 51, 51, 0.25);
  backdrop-filter: blur(11px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inset {
  padding: 1rem 5rem;
  background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
  border-radius: 18px;
  border: 1px solid rgba(68, 67, 67, 0.47);
  position: relative;
  .close_img {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    background: url($bg_url + "close.webp") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 1rem;
    right: 3rem;
  }
  .content {
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #eccf83;
      margin-bottom: 2rem;
    }
    .box {
      margin-bottom: 2rem;
      .title {
        text-align: left;
        margin-bottom: 1rem;
      }
      .inputbox {
        width: 25rem;
        height: 2.5rem;
        position: relative;
        margin-top: 0.5rem;
        .me_input {
          width: 100%;
          height: 100%;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 8px;
          border: 1px solid #373636;
          padding: 0 5rem;
          color: #ced3d9;
          font-weight: 600;
        }
        .sr {
          width: fit-content;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 1rem;
          top: 0;
          font-size: 16px;

          font-weight: 600;

          img {
            width: 23px;
            height: 23px;
            margin-right: 5px;
          }
        }
        .inputbtn {
          width: 5rem;
          height: 100%;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 8px;
          backdrop-filter: blur(14px);
          font-size: 22px;

          font-weight: bold;
          color: #000000;
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .tip {
          font-weight: 400;
          color: #8b8484;
          position: absolute;
          top: -1.2rem;
          right: 0;
        }
      }
      .list {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #8f8e8e;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        span {
          padding: 10px;
          border: 1px solid transparent;
          &.active,
          &:hover {
            color: #edd07e;
            background: #171718;
            box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
            border-radius: 4px;
            border: 1px solid #373636;
          }
        }
        .active_span{
          color: #edd07e;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 4px;
          border: 1px solid #373636;
        }
      }
    }
    .btn {
      margin: 0 auto;
      width: 18rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      font-weight: 600;
      color: #000000;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 980px) {
  .inset {
    padding: 0.2rem;
    .close_img {
      width: 0.2rem;
      height: 0.2rem;
      top: 0.2rem;
      right: 0.2rem;
    }
    .content {
      .title {
        font-size: 0.18rem;
        margin-bottom: 0.2rem;
      }
      .box {
        margin-bottom: 0.2rem;
        .title {
          font-size: 0.14rem;
          margin-bottom: 0.2rem;
        }
        .inputbox {
          width: 2.5rem;
          height: 0.3rem;
          margin-top: 0.1rem;
          .me_input {
            width: 100%;
            height: 100%;
            background: #171718;
            box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
            border-radius: 8px;
            border: 1px solid #373636;
            padding: 0 0.1rem 0 0.55rem;
            color: #ced3d9;
            font-weight: 600;
          }
          .sr {
            left: 0.1rem;
            font-size: 0.12rem;
            img {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.05rem;
            }
          }
          .inputbtn {
            width: 0.6rem;
            height: 100%;
            font-size: 0.12rem;
          }
          .tip {
            font-size: 10px;
            top: -0.2rem;
          }
        }
        .list {
          font-size: 0.12rem;
          span {
            padding: 0.05rem;
          }
        }
      }
      .btn {
        width: 1.8rem;
        height: 0.35rem;
        font-size: 0.16rem;
      }
    }
  }
}
</style>
