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
import { mapGetters } from "vuex";
import { sb } from "sacredrealm-sdk";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue"])
  },
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
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.getUserBindbox(0,10)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    getUserBindbox(cursor, size){//cursor:指针,从哪个地方开始获取盲盒 size:获取的盲盒数量
      sb().tokensOfOwnerBySize(this.getAccount, cursor, size).then(res => {
        console.log('获取某用户基于指针（从0开始）和数量的盲盒ID数组，以及最后一个数据的指针res: ', res);
      })
      // .catch(() => {
        
      // })
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