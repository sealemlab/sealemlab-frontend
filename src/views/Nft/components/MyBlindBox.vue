<template>
  <div class="blind_box">
    <p class="title_box font32 mobile_font20" :class="isEnLang?'en_heavy':''">{{$t("message.nft.txt37")}}</p>
    <div class="boxs_">
      <div class="onebox" v-for="(item,index) in list" :key="index" @click="openBox(item)">
        <img :src="item.src" class="img_" />
        <div class="line_ font14">
          <span>{{$t(item.title)}}</span>
          <div class="add_bottom">
            <BtnLoading :isloading="true" v-if="item.status"></BtnLoading>
            <span v-else>{{item.num}}</span>
            <span class="font12">{{$t("message.nft.txt57")}}</span>
          </div>
        </div>
      </div>
    </div>
    <OpenNft :openStatus="openStatus" :boxtype="boxtype" @closeOpen="closeOpen"></OpenNft>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OpenNft from './OpenBox.vue'
export default {
  computed: {
    ...mapGetters(["getNoticeNum","getAccount","getIstrue","getUserBoxInfo","isEnLang"])
  },
  components:{
    OpenNft
  },
  data(){
    return{
      boxtype:0,//默认展示的是哪个类型的盲盒
      openStatus:false,// 打开盲盒详情页面状态
      list:[
        {src:`${this.$store.state.imgUrl}mybox1.webp`,num:0,title:'message.nft.txt53',status:true,type:0},
        {src:`${this.$store.state.imgUrl}mybox1.webp`,num:0,title:'message.nft.txt54',status:true,type:1},
        {src:`${this.$store.state.imgUrl}mybox1.webp`,num:0,title:'message.nft.txt55',status:true,type:2},
        {src:`${this.$store.state.imgUrl}mybox1.webp`,num:0,title:'message.nft.txt56',status:true,type:3},
      ],
      timerll:null,
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
    'openStatus': {
      handler: function (newValue,oldvalue) {
        if(!newValue && oldvalue){ //页面打开又关闭状态
          this.getUserAllBox()
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
      },1000);
    },
    closeOpen(){
      this.openStatus = false
    },
    openBox(item){
      console.log('item: ', item);
      if(item.status){
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt46'}));
          this.$store.commit("setNoticeNum",true)
        }
      }else if(item.num == 0){
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.nft.txt47'}));
          this.$store.commit("setNoticeNum",true)
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
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 600;
    color: #CED3D9;
    line-height: 63px;
  }
  .boxs_{
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
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
        width: auto;
        max-width: 204px;
        padding:8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: url($bg_url + "boxs_border.webp") no-repeat;
        background-size: 100% 100%;
        > span{
          width: 100%;
          display: inline-block;
          font-weight: 600;
          color: #CED3D9;
          line-height: 20px;
        }
        .add_bottom{
          margin-top: 8px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          span{
            font-weight: 600;
            color: #CED3D9;
            line-height: 20px;
            &:nth-child(2){
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
}
@media screen and (max-width: 980px) {
  .blind_box {
    .title_box{
      font-weight: 600;
      color: #CED3D9;
      line-height: 0.21rem;
      margin-bottom: 0.32rem;
      width: 100%;
      text-align: left;
    }
    .boxs_{
      margin-top: 0.3rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .onebox{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .img_{
          width: 95%;
          min-height: 2rem;
          max-width: 2.04rem;
        }
        .line_{
          margin-top: 0.14rem;
          width: auto;
          max-width: 2.04rem;
          padding:0.08rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: url($bg_url + "boxs_border.webp") no-repeat;
          background-size: 100% 100%;
          > span{
            font-weight: 600;
            color: #CED3D9;
            line-height: 0.2rem;
          }
          .add_bottom{
            margin-top: 0.05rem;
            span{
              &:nth-child(2){
                width: 0.46rem;
                height: 0.19rem;
                background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
                box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
                border-radius: 0.04rem;
                text-align: center;
                line-height: 0.19rem;
                color: #000000;
              }
            }
          }
        }
      }
    }
  }
}
</style>