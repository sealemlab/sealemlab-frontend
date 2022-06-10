<template>
  <div class="tip_input_proup" v-if="TooltipStatus && isshowTip">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18" :class="isEnLang?'en_Bold':''">{{$t("message.bond.tip_title_txt")}}</p>
      <div class="content font16 mobile_font14" :class="isEnLang?'en_Bold':''">
        <img :src="`${$store.state.imgUrl}ques_new.webp`" class="ques_img"/> {{$t("message.bond.tip_content_txt")}}
      </div>
      <div class="main_button font18 mobile_font16" :class="isEnLang?'en_Bold':''" @click="sureFun">{{$t("message.bond.tip_btn_txt")}}</div>
      <div class="tip_txt font16" :class="isEnLang?'en_medium':''">
        <img :src="`${$store.state.imgUrl}ques_new.webp`" class="ques_img"/>
        {{$t("message.bond.tip_txt")}}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang","getAccount","getIstrue"])
  },
  props: {
    TooltipStatus: {
      type: Boolean,
      default: false
    },
    isshowTip: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    sureFun(){
      this.$emit('sureclick')
    },
  }
}
</script>
<style lang="scss" scoped>
.tip_input_proup {
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
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 80px;
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
  .content{
    width: 100%;
    // display: flex;
    // align-items: center;
    font-weight: bold;
    color: #CED3D9;
    line-height: 26px;
    margin: 76px 0;
    .ques_img{
      width: 15px;
      margin-right: 5px;
    }
  }
  .main_button{
    width: 75%;
    min-height: 45px;
    margin: 0 auto;
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
  .tip_txt{
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #8F8E8E;
    line-height: 19px;
    margin-top: 15px;
    .ques_img{
      width: 11px;
      margin-right: 5px;
    }
  }
}
@media screen and (max-width: 980px) {
  .proup_boxs{
    position: relative;
    width: 90%;
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
    .content{
      width: 100%;
      font-weight: bold;
      color: #CED3D9;
      line-height: 26px;
      margin: 0.3rem 0;
      .ques_img{
        width: 15px;
        margin-right: 5px;
      }
    }
    .main_button{
      width: 75%;
      min-height: 0.45rem;
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
    .tip_txt{
      display: flex;
      align-items: center;
      font-weight: 500;
      color: #8F8E8E;
      line-height: 19px;
      margin-top: 15px;
      .ques_img{
        width: 11px;
        margin-right: 5px;
      }
    }
  }
}
</style>