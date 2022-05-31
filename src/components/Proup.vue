<template>
  <div class="proup_page" v-if="proupStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18" :class="isEnLang?'en_heavy':''">{{getProgressInfo.title?$t(getProgressInfo.title):$t(getProupInfo.title)}}</p>
      <div class="proup_content" v-if="isProgress">
        <img :src="`${$store.state.imgUrl}success.webp`" class="success_img" />
        {{$t(content)}}
      </div>
      <div class="progress" v-else>
        <p class="bscscan fotn16">
          <a :href="`${$store.state.BSC_BROWSER}${getProupInfo.link}`" target="_blank" rel="noopener noreferrer">view on bscscan</a>
          <img :src="`${$store.state.imgUrl}link.webp`" class="link_img" />
        </p>
        <div class="box">
          <div class="load" :style="{width}"></div>
        </div>
        <span class="txt font16">{{progressTXt}}%</span>
      </div>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    proupStatus: {
      type: Boolean,
      default: false
    },
    content:{
      type: String,
      default: ''
    },
    isProgress:{
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      progressTXt:0,
      width:0,
      timer:null
    }
  },
  watch:{
    proupStatus(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
        this.progressTXt = 0
        this.width = 0
      }
    },
    isProgress(newvala){
      if(!newvala){
        this.progressFun()
      }
    },
    getProgressInfo(newvala){
      if(newvala.value == 100){
        this.progressTXt = 100
        this.width = '100%'
      }
    },
  },
  computed: { 
    ...mapGetters(["getProgressInfo","getProupInfo","isEnLang"])
  },
  methods: {
    // 进度条展示
    // this.$store.commit("setProupStatus", JSON.stringify({'status':true,'content':'','isProgress':false}));
    // 弹窗关闭
    closeProup () {
      this.$emit('closeProup')
    },
    progressFun(){
      clearInterval(this.timer)
      let num = Math.round((99 - 90) * Math.random() + 90)
      this.timer = setInterval(() => {
        if(this.getProgressInfo.value < 100){
          if(this.getProgressInfo.value >= num){
            this.getProgressInfo.value = num
          }else{
            this.getProgressInfo.value += 1
          }
          this.progressTXt = this.getProgressInfo.value;
          this.width = this.getProgressInfo.value + '%';
        }
        if(this.getProgressInfo.value >= 100){
          clearInterval(this.timer);
          setTimeout(() => {
            this.$emit('closetimer')
          },1500)
        }
      },100)
    }
  }
}
</script>
<style lang="scss" scoped>
.proup_page {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
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
    background-image: url($bg_url + "proupbg.webp");
    background-size: 100% 100%;
    .propu_title_txt{
      font-weight: bold;
      color: #ECCF83;
      line-height: 29px;
    }
    .proup_content{
      width: 100%;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .success_img{
        width: 80%;
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
}
.progress{
  width: 100%;
  margin-top: 30px;
  .bscscan{
    cursor: pointer;
    width: 100%;
    padding-right: 20px;
    text-align: right;
    font-weight: 400;
    color: #969090;
    line-height: 19px;
    margin-bottom: 15px;
    .link_img{
      width: 12px;
      margin-left: 5px;
    }
  }
  .box{
    width: 100%;
    height: 27px;
    background: #171718;
    box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
    border-radius: 13px;
    .load{
      width:0;
      height:27px;
      background: linear-gradient(180deg, #F2D47B 0%, #F7E9B9 52%, #F0CE75 100%);
      border-radius: 13px;
    }
  }
  .txt{
    display: inline-block;
    color: #F2D47B;
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
}
@media screen and (max-width: 980px) {
  .proup_page{
    .proup_boxs{
      position: relative;
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.2rem;
      background-image: url($bg_url + "proupbg.webp");
      background-size: 100% 100%;
      .propu_title_txt{
        font-weight: bold;
        color: #ECCF83;
        line-height: 29px;
      }
      .proup_content{
        width: 100%;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .success_img{
          width: 80%;
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
  }
}
</style>