<template>
  <div class="my_nft">
    <p class="title_nft font30">My NFT</p>
    <div class="box">
      <div class="imgbox" v-for="(item,index) in arr" :key="index">
        <img :src="item.src" class="mynftimg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arr:[
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
        {src:`${this.$store.state.imgUrl}mynft.png`},
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.my_nft {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title_nft{
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
      .mynftimg{
        width: 100%;
        max-width: 204px;
      }
    }
    
  }
}
</style>