<template>
  <div class="my_nft">
    <p class="title_nft font30">{{$t("message.nft.txt38")}}</p>
    <div class="box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div class="imgbox" v-for="(item,index) in arr" :key="index" @click="nftFun(item)">
        <img :src="item.src" class="mynftimg" />
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
import { sn, getSourceUrl } from "sacredrealm-sdk";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue"])
  },
  data(){
    return{
      loadMoreStatus:true,
      bucy: false,
      arr:[
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
        {src:`${this.$store.state.imgUrl}mynft.webp`},
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
    loadMore() {
      this.busy = true;
      // console.log("加载更多")
      if(this.loadMoreStatus) {
        this.getUserBindbox(this.nums,10)
        this.busy = false
      }
    },
    getUserBindbox(cursor, size){//获取某用户基于指针（从0开始）和数量的装备ID数组，以及最后一个数据的指针
      sn().tokensOfOwnerBySize(this.getAccount, cursor, size).then(res => {
        console.log('获取某用户基于指针（从0开始）和数量的装备ID数组，以及最后一个数据的指针res: ', res);
        this.nums = res[1]
        if(res[0].length > 0){
          this.loadMoreStatus = true
          this.arr = this.arr.concat(res[0])
        }else{
          this.loadMoreStatus = false
        }
        
      })
      // .catch(() => {
        
      // })
    },
    nftFun(item){
      console.log('item: ', item);
      sn().getDatas(129, 'attr').then(res => {
        console.log('getDatas-----res: ', res);
        let aa = getSourceUrl(res)
        console.log('aa: ', aa);
      })
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
.bottom_loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
</style>