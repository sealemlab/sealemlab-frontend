<template>
  <div class="input_proup" v-if="inviteDis">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18" :class="isEnLang?'en_Bold':''">{{$t("message.user.txt22")}}</p>
      <div class="add_overflow_box">
        <div class="tipbox font12" :class="isEnLang?'en_medium':''">
          <p class="p_title font16" :class="isEnLang?'en_Bold':''">{{$t("message.user.txt23")}}</p>
          <div @click="copyClick">
            <span>https://sealemlab.com/#/bond/{{getAccount}}</span>
            <svg t="1653893405932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18173" width="16" height="16"><path d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z" p-id="18174" fill="#8F8E8E"></path></svg>
          </div>
          <p class="p_title add_top_p font16" :class="isEnLang?'en_Bold':''">{{$t("message.user.txt24")}}</p>
          <p class="p_content">{{$t("message.user.txt25")}}</p>
          <p class="p_content">{{$t("message.user.txt26")}}</p>
          <p class="p_content">{{$t("message.user.txt27")}}</p>
          
        </div>
      </div>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  watch:{
    inviteDis(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  computed: {
    ...mapGetters(["isEnLang","getAccount"])
  },
  props: {
    inviteDis: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 弹窗关闭
    closeProup () {
      this.$emit('closeInvite')
    },
    bondFun(){
      this.$emit('sureclick')
    },
    copyClick(){
      let istrue = process.env.NODE_ENV === "production"
      if(istrue){
        this.$utils.copyClick(`https://sealemlab.com/#/bond/${this.getAccount}`)
      }else{
        this.$utils.copyClick(`https://test.sealemlab.com/#/bond/${this.getAccount}`)
      }
      
      this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
    }
  }
}
</script>
<style lang="scss" scoped>
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
  height: auto;
  overflow: auto;
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
  .tipbox{
    width: 100%;
    display: flex;
    flex-direction: column;
    >div{
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      font-weight: 500;
      line-height: 20px;
      span{
        margin-right: 5px;
        color: #8F8E8E;
      }
    }
    .p_title{
      font-weight: bold;
      line-height: 19px;
      margin-bottom: 7px;
    }
    .add_top_p{
      margin-top: 56px;
      margin-bottom: 13px;
    }
    .p_content{
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 20px;
      color: #8F8E8E;
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
  height: 90%;
  overflow: auto;
  margin-top: 61px;
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
    .tipbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      >div{
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 500;
        line-height: 20px;
        span{
          margin-right: 5px;
        }
      }
      .p_title{
        font-weight: bold;
        line-height: 0.19rem;
        margin-bottom: 0;
      }
      .add_top_p{
        margin-top: 0.25rem;
        margin-bottom: 0.08rem;
      }
      .p_content{
        font-weight: 500;
        line-height: 0.12rem;
        margin-bottom: 0.15rem;
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
  .add_overflow_box{
    height: 90%;
    overflow: auto;
    margin-top: 0.12rem;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>