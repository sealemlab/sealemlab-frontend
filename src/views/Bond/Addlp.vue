<template>
  <div class="input_proup" v-if="addlpDis">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">ADD&nbsp;&nbsp;&nbsp;LP</p>
      <div class="box">
        <span class="font20 lp_class">LP种类</span>
        <div class="select_box">
          <span class="font16">BNB-ST</span>
          <span class="triangle_calss"></span>
        </div>
      </div>
      <p class="balance_txt font16">BNB balance: 10.234567</p>
      <p class="title_ font20">BNB-ST LP PURCHASED</p>
      <div class="content font16">
        <p class="p1 p">10 BNB</p>
        <p class="p2 p"><img src="../../assets/images/change.png" class="change_img" /></p>
        <p class="p3 p">5.045789 BNB-ST LP</p>
      </div>
      <div class="moneybox">
        <div class="onebox font14">$ 500</div>
        <div class="onebox font14">$ 500</div>
        <div class="onebox font14">$ 500</div>
        <div class="onebox font14">$ 500</div>
      </div>
      <div class="main_button font16" @click="bondFun">{{$t("message.bond.txt1")}}</div>
      <img src="../../assets/images/close.png" class="close_img" @click.stop="closeProup"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  watch:{
    addlpDis(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  computed: {
    ...mapGetters(["isEnLang"])
  },
  props: {
    addlpDis: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 弹窗关闭
    closeProup () {
      this.$emit('closeLP')
    },
    bondFun(){
      this.$emit('sureclick')
    }
  }
}
</script>
<style lang="scss" scoped>
.input_proup {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999999;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  .proup_boxs{
    position: relative;
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 100px;
    background-image: url("../../assets/images/proupbg.png");
    background-size: 100% 100%;
    .propu_title_txt{
      font-weight: bold;
      color: #ECCF83;
      line-height: 29px;
    }
    .box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 34px;
      .lp_class{
        font-weight: 600;
        color: #ECCF83;
        line-height: 28px;
      }
      .select_box{
        position: relative;
        width: calc(100% - 100px);
        height: 52px;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 8px;
        border: 1px solid #373636;
        text-align: center;
        line-height: 50px;
        font-weight: 400;
        color: #FFFFFF;
        .triangle_calss{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateX(-50%);
          width: 0px;
          height: 0px;
          border: 8px solid transparent;
          border-top-color: #ccc;
        }
      }
    }
    .balance_txt{
      margin-top: 10px;
      width: 100%;
      text-align: right;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 19px;
    }
    .title_{
      margin-top: 23px;
      width: 100%;
      font-weight: 600;
      color: #ECCF83;
      line-height: 28px;
    }
    .content{
      margin-top: 18px;
      padding: 10px 0;
      width: 100%;
      // height: 86px;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 8px;
      border: 1px solid #373636;
      .p{
        width: 100%;
        text-align: right;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
      }
      .p1{
        padding-right: 35px;
      }
      .p2{
        padding-right: 5px;
        .change_img{
          width: 17px;
        }
      }
      .p3{
        padding-right:35px;
      }
    }
    .moneybox{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;
      padding: 0 30px;
      .onebox{
        padding:5px 10px;
        background: #373636;
        border-radius: 16px;
      }
    }
    .main_button{
      width: 330px;
      height: 45px;
      margin: 48px 0 37px;
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
    .close_img{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      cursor: pointer;
    }
  }
}
</style>