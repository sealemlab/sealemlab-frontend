<template>
  <div class="bind_wallet_page">
    <div class="box">
      <div class="btn fotn18" @click="bindWallet">
        {{$t("message.account.txt17")}}
        <BtnLoading :isloading="bindStatus"></BtnLoading>
      </div>
      <p class="txt_ font16">
        {{$t("message.account.txt18")}} <br />
        {{$t("message.account.txt19")}}
      </p>
      <p class="font24 name_" v-if="haveWallet">{{$t("message.account.txt20")}}</p>
      <div class="content" v-if="haveWallet">
        <span class="span1 font16">0xf58168f23a5a4008732e056ca5f06f7cadf86d38</span>
        <span class="btn_small font14">{{$t("message.account.txt21")}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSigner } from "sacredrealm-sdk";
export default {
  computed: { ...mapGetters(["getLogin","getIstrue","getAccount"]) },
  data(){
    return{
      bindStatus:false,//绑定钱包状态
      isdown:false,
      haveWallet:false,
      roundnum:'' //后台给的随机数
    }
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.getAPIRoundNum()
        }else{
          this.roundnum = ''
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    bindWallet(){
      if(this.bindStatus)return
      if(!this.getLogin){
        if(!this.isdown){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.account.txt32'}));
          this.isdown = true
          setTimeout(() => {
            this.isdown = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
          }, 2000);
        }
        return
      }
      if(!this.getIstrue){
        if(!this.isdown){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.account.txt33'}));
          this.isdown = true
          setTimeout(() => {
            this.isdown = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
          }, 2000);
        }
        return
      }
      getSigner().signMessage(this.roundnum).then(signature => {
        // console.log('signature: ', signature);
        this.$api.bindWallet({addr:this.getAccount,sign:signature}).then(res => {
          // console.log('res: ', res);
          
        }).catch(() => {
          console.log("绑定接口错误")
        });
      }).catch(() => {
        console.log("签名失败")
      })
    },
    getAPIRoundNum(){
      this.$api.getRoundNum({"addr":this.getAccount}).then(res => {
        // console.log('获取后台给的随机数res: ', res);
        if(res.code == 200){
          this.roundnum = res.data
        }else{
          this.roundnum = ''
        }
      }).catch(() => {
        this.roundnum = ''
        // console.log("获取后台给的随机数res错误")
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.bind_wallet_page{
  width: 90%;
  margin: 0 auto;
  margin-top: 67px;
  .box{
    width: 100%;
    display: flex;
    background: #101010;
    border: 2px solid #242222;
    padding: 40px 119px;
    display: flex;
    flex-direction: column;
    .btn{
      width: 100%;
      height: 54px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      border-radius: 4px;
      font-weight: 600;
      color: #000000;
      line-height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      cursor: pointer;
    }
    .txt_{
      font-weight: 400;
      color: #706E6E;
      line-height: 32px;
    }
    .name_{
      font-weight: 600;
      color: #FFFFFF;
      line-height: 22px;
      margin-top: 60px;
    }
    .content{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding-left: 20px;
      margin-top: 15px;
      .span1{
        font-weight: 400;
        color: #FFFFFF;
        line-height: 32px;
      }
      .btn_small{
        width: 93px;
        height: 34px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #000000;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>