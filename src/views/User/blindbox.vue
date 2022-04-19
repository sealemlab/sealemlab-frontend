<template>
  <div class="blind_page display_flex">
    <div class="content">
      <div class="onebox" v-for="(item, index) in list" :key="index">
        <img :src="item.src" class="show_boximg" />
        <div class="border_class">
          <span class="font16 _txt">{{item.title}}</span>
          <span class="open_btn font12">打开</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang"])
  },
  data(){
    return{
      list:[
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
        {
          src:require("../../assets/images/showbox.png"),
          title:'abnu #3456',
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.blind_page{
  width: 100%;
  flex-direction: column;
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .onebox{
      width: 24%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 72px;
      .show_boximg{
        width: 100%;
        max-width: 189px;
      }
      .border_class{
        max-width: 189px;
        width: 100%;
        display: flex;
        padding: 0 8px;
        padding-right: 0;
        justify-content: space-between;
        align-items: center;
        margin-top: 14px;
        background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
        border-radius: 4px;
        border: 1px solid #ECCF83;
        backdrop-filter: blur(14px);
        ._txt{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 20px;
        }
        .open_btn{
          min-width: 64px;
          min-height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 4px;
          backdrop-filter: blur(14px);
          cursor: pointer;
        }
      }
    }
  }
}
</style>