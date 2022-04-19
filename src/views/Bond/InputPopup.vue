<template>
  <div class="input_proup" v-if="proupDis">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">ST-BUSD  LP</p>
      <div class="propu_content">
        <div class="left_">
          <div class="layout_box">
            <span class="font20 text_">Bond price</span>
            <div class="radious font12">?</div>
          </div>
          <span class="font16 distance" :class="isEnLang?'en_Regular':'cn_lang'">$123</span>
        </div>
        <div class="left_">
          <span class="font20 text_">Market price</span>
          <span class="font16 distance" :class="isEnLang?'en_Regular':'cn_lang'">$123</span>
        </div>
      </div>
      <div class="input_box">
        <input
          type="text"
          v-model="peopleAddress"
          class="input font16"
          placeholder="Please enter the content"
        />
        <div class="btn font16" @click="besure">
          MAX
        </div>
      </div>
      <div class="main_button font16">Bond</div>
      <div class="line_box">
        <div class="layout_box">
          <span class="font14 wallet_">Wallet balance</span>
          <div class="radious font12">?</div>
        </div>
        <span class="font14 price_txt">12.234  ST-BUSD LP</span>
      </div>
      <div class="line_box">
        <div class="layout_box">
          <span class="font14 wallet_">Expected income</span>
          <div class="radious font12">?</div>
        </div>
        <span class="font14 price_txt">12.234 ST</span>
      </div>
      <div class="line_box">
        <div class="layout_box">
          <span class="font14 wallet_">Maximum purchase</span>
          <div class="radious font12">?</div>
        </div>
        <span class="font14 price_txt">12.234 ST-BUSD LP</span>
      </div>
      <div class="line_box">
        <div class="layout_box">
          <span class="font14 wallet_">duration</span>
          <div class="radious font12">?</div>
        </div>
        <span class="font14 price_txt">2 days</span>
      </div>
      <img src="../../assets/images/close.png" class="close_img" @click.stop="closeProup"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang"])
  },
  props: {
    proupDis: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 弹窗关闭
    closeProup () {
      this.$emit('closeProup')
    },
    // 去绑定
    besurefun(){
      this.$emit('besurefun')
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
    .propu_content{
      width: 100%;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left_{
        display: flex;
        flex-direction: column;
        align-items: center;
        .distance{
          margin-top: 8px;
        }
      }
    }
    .input_box {
      width: 100%;
      height: 46px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 8px;
      border: 1px solid #373636;
      margin-top: 42px;
      .input {
        background: transparent;
        height: 100%;
        border: none;
        outline: none;
        color: #ffffff;
        padding-left: 15px;
        width: calc(100% - 96px);
      }
      .btn {
        cursor: pointer;
        width: 96px;
        height: 46px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 8px;
        backdrop-filter: blur(14px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #000000;
      }
    }
    .main_button{
      width: 216px;
      height: 45px;
      margin: 50px 0 37px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #000000;
    }
    .line_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .price_txt{
        font-weight: 400;
        color: #969090;
        line-height: 16px;
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
  .layout_box{
    position: relative;
    width: fit-content;
    .text_{
      font-weight: bold;
      color: #FFFFFF;
      line-height: 36px;
    }
    .radious{
      position: absolute;
      right: -20px;
      top: 2px;
      width: 14px;
      height: 14px;
      border: 1px solid #A9A7A7;
      filter: blur(0px);
      font-weight: 400;
      color: #A9A7A7;
      line-height: 15px;
      border-radius: 50%;
      text-align: center;
    }
    .wallet_{
      font-weight: 400;
      color: #969090;
      line-height: 16px;
    }
  }
}
</style>