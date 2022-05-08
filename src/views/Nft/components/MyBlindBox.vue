<template>
  <div class="blind_box">
    <p class="title_box font30">{{$t("message.nft.txt37")}}</p>
    <div class="box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div class="imgbox" v-for="(item,index) in arr" :key="index" @click="openBoxFun(item)">
        <!-- <img :src="item.src" class="myboximg" /> -->
        <span class="font16 box_style">{{item}}</span>
      </div>
      <div class="bottom_loading font16" v-if="arr.length > 10">
        <span v-if="loadMoreStatus">Loading...</span>
        <span v-else-if="!loadMoreStatus">End</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sb, getSigner } from "sacredrealm-sdk";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue"])
  },
  data(){
    return{
      loadMoreStatus:true,
      bucy: false,
      // arr:[
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      //   {src:`${this.$store.state.imgUrl}mybox.png`},
      // ],
      arr:[],
      pageinfo:{
        size:10,
        num:0
      }
    }
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.getUserBindbox(this.pageinfo)
          this.watchResult()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus) {
        this.getUserBindbox(this.pageinfo)
        this.busy = false
      }
    },
    getUserBindbox(info,isload = false){//cursor:指针,从哪个地方开始获取盲盒 size:获取的盲盒数量
      sb().tokensOfOwnerBySize(this.getAccount, info.num, info.size).then(res => {
        // console.log('获取某用户基于指针（从0开始）和数量的盲盒ID数组，以及最后一个数据的指针res: ', res);
        this.pageinfo.num = res[1]
        if(isload){
          console.log("开完盒子后重新获取用户的盒子")
          if(res[0].length > 0){
            this.loadMoreStatus = true
            this.arr = res[0]
          }else{
            this.loadMoreStatus = false
          }
        }else{
          if(res[0].length > 0){
            this.loadMoreStatus = true
            this.arr = this.arr.concat(res[0])
          }else{
            this.loadMoreStatus = false
          }
        }
      }).catch(() => {
        this.loadMoreStatus = false
      })
    },
    openBoxFun(item){
      console.log('item: ', item);
      sb().connect(getSigner()).openBoxes([item]).then(res => {
        console.log('开盒子res: ', res);
      }).catch(err => {
        console.log("开盒子错误",err)
      })
    },
    // 监听盲盒开奖结果
    watchResult() {
      let filter = sb().filters.SpawnSns(this.getAccount);
      sb().on(filter, (user, boxslengths, boxarrID, events, ultras) => {
        if(boxarrID){
          this.getUserBindbox(this.pageinfo,true)
        }
        console.log('监听盲盒开奖结果: user', user)
        console.log('监听盲盒开奖结果: boxslengths',boxslengths)
        console.log('监听盲盒开奖结果: boxarrID', boxarrID);
        console.log('监听盲盒开奖结果: events',events);
        console.log('监听盲盒开奖结果: ultras',ultras);
      });
    },
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
    max-height:400px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbox{
      cursor: pointer;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      .box_style{
        width: 90%;
        height: 160px;
        text-align: center;
        line-height: 160px;
        background: rgb(247, 175, 175);
        color: #000;
        font-weight: bolder;
      }
      .myboximg{
        width: 100%;
        max-width: 204px;
      }
    }
    
  }
}
.bottom_loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>