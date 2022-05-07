<template>
  <div class="proup_page" v-if="proupStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">{{$t("message.tip.txt3")}}</p>
      <div class="proup_content">
        <img :src="`${$store.state.imgUrl}success.png`" class="success_img" />
        {{$t(content)}}
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
    }
  },
  watch:{
    proupStatus(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  methods: {
    // 弹窗关闭
    closeProup () {
      this.$emit('closeProup')
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