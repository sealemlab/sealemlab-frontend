<template>
  <div class="proup_page" v-if="proupStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">{{$t("message.tip.txt3")}}</p>
      <div class="proup_content" v-if="isProgress">
        <img :src="`${$store.state.imgUrl}success.png`" class="success_img" />
        {{$t(content)}}
      </div>
      <div class="progress" v-else>
        <div class="box" id="div_box">
          <div class="load" ref="load"></div>
        </div>
        <span class="txt font16">{{progressTXt}}%</span>
      </div>
      <img :src="`${$store.state.imgUrl}close.png`" class="close_img" @click.stop="closeProup"/>
    </div>
  </div>
</template>
<script>
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
    },
  },
  data(){
    return{
      progressTXt:0
    }
  },
  watch:{
    proupStatus(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
    isProgress(newvala){
      if(newvala){
        this.progressFun()
      }else{
        this.progressTXt = 0
        this.$refs.load.style.width = 0
      }
    },
  },
  methods: {
    // 弹窗关闭
    closeProup () {
      this.$emit('closeProup')
    },
    progressFun(){
      let i = 0
      let timer = setInterval(function(){
      if(i<100){
          i+=1;
          this.progressTXt = i+'%';
          this.$refs.load.style.width = i*3+'px';
      }
      if(i>=100){
        clearInterval(timer);
      }
    },100);
    }
  },
  // mounted(){

  // }
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
    background-image: url($bg_url + "proupbg.png");
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
    color: red;

  }
}
</style>