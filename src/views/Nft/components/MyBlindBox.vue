<template>
  <div class="blind_box">
    <p class="title_box font30">我的盲盒</p>
    <div class="box">
      <div class="imgbox" v-for="(item,index) in arr" :key="index">
        <img :src="item.src" class="myboximg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arr:[
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
        {src:`${this.$store.state.imgUrl}mybox.png`},
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.blind_box {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title_box{
    font-weight: 600;
    color: #FFFFFF;
    line-height: 42px;
    margin-bottom: 60px;
  }
  .box{
    width: 100%;
    max-height: 100vh;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbox{
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 60px;
      .myboximg{
        width: 100%;
        max-width: 204px;
      }
    }
    
  }
}
</style>