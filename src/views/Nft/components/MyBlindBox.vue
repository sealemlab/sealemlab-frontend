<template>
  <div class="blind_box">
    <p class="title_box font30">{{$t("message.nft.txt37")}}</p>
    <div class="boxs_">
      <div class="onebox" v-for="(item,index) in list" :key="index" @click="openBoxFun(item)">
        <img :src="item.src" class="img_" />
        <div class="line_ font14">
          <span>{{$t(item.title)}}</span>
          <BtnLoading :isloading="true" v-if="item.status"></BtnLoading>
          <span v-else>{{item.num}}</span>
          <span class="font12">{{$t("message.nft.txt57")}}</span>
        </div>
      </div>
    </div>
    <OpenNft :openStatus="openStatus" :boxtype="boxtype" @closeOpen="closeOpen"></OpenNft>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sb } from "sacredrealm-sdk";
import OpenNft from './OpenBox.vue'
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue","getUserBoxInfo"])
  },
  components:{
    OpenNft
  },
  data(){
    return{
      boxtype:0,//默认展示的是哪个类型的盲盒
      openStatus:false,// 打开盲盒详情页面状态
      list:[
        {src:`${this.$store.state.imgUrl}mybox1.png`,num:0,title:'message.nft.txt53',status:true,type:0},
        {src:`${this.$store.state.imgUrl}mybox1.png`,num:0,title:'message.nft.txt54',status:true,type:1},
        {src:`${this.$store.state.imgUrl}mybox1.png`,num:0,title:'message.nft.txt55',status:true,type:2},
        {src:`${this.$store.state.imgUrl}mybox1.png`,num:0,title:'message.nft.txt56',status:true,type:3},
      ],
      timerll:null,
      isdown:false
    }
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.list.forEach(item => {
            item.status = true
          })
          this.getUserAllBox() // 获取用户盲盒信息
          // this.watchResult()
        }else{
          this.list.forEach(item => {
            item.num = 0
            item.status = false
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    // 获取用户的所有盲盒信息
    getUserAllBox(){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('sb_count')){
          clearInterval(this.timerll)
          this.list[0].num = JSON.parse(this.getUserBoxInfo).filter(data => {return data.type == 0}).length
          this.list[1].num = JSON.parse(this.getUserBoxInfo).filter(data => {return data.type == 1}).length
          this.list[2].num = JSON.parse(this.getUserBoxInfo).filter(data => {return data.type == 2}).length
          this.list[3].num = JSON.parse(this.getUserBoxInfo).filter(data => {return data.type == 3}).length
          this.list.forEach(item => {
            item.status = false
          })
        }
      }, 500);
    },
    closeOpen(){
      this.openStatus = false
    },
    openBoxFun(item){
      console.log('item: ', item);
      if(item.status){
        if(!this.isdown){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt46'}));
          this.isdown = true
          setTimeout(() => {
            this.isdown = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
          }, 2500);
        }
      }else if(item.num == 0){
        if(!this.isdown){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt47'}));
          this.isdown = true
          setTimeout(() => {
            this.isdown = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
          }, 2500);
        }
      }else{
        this.openStatus = true
        this.boxtype = item.type
      }
      // sb().connect(getSigner()).openBoxes([item]).then(res => {
      //   console.log('开盒子res: ', res);
      // }).catch(err => {
      //   console.log("开盒子错误",err)
      // })
    },
    // 监听盲盒开奖结果
    watchResult() {
      let filter = sb().filters.SpawnSns(this.getAccount);
      sb().on(filter, (user, boxslengths, boxarrID, events, ultras) => {
        if(boxarrID){
          this.getUserBindbox(this.pageinfo,true)
        }
        // console.log('监听盲盒开奖结果: user', user)
        // console.log('监听盲盒开奖结果: boxslengths',boxslengths)
        // console.log('监听盲盒开奖结果: boxarrID', boxarrID);
        // console.log('监听盲盒开奖结果: events',events);
        // console.log('监听盲盒开奖结果: ultras',ultras);
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
  .boxs_{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .onebox{
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      .img_{
        width: 95%;
        min-height: 200px;
        max-width: 204px;
      }
      .line_{
        margin-top: 14px;
        width: 95%;
        height: 37px;
        max-width: 204px;
        padding:0 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url($bg_url + "boxs_border.png") no-repeat;
        background-size: cover;
        span{
          font-weight: 600;
          color: #FFFFFF;
          line-height: 20px;
          &:last-child{
            width: 56px;
            height: 19px;
            background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
            box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
            border-radius: 4px;
            text-align: center;
            line-height: 19px;
            color: #000000;
          }
        }
      }
    }
  }
}
</style>