<template>
  <div class="open_box" v-if="openStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font32 mobile_font20" :class="isEnLang?'en_heavy':''">{{$t("message.nft.txt39")}}</p>
      <p class="propu_title_txt font16">{{$t("message.nft.txt40")}}</p>
      <!-- 全选按钮 -->
      <div class="select_content" @click="selectAllClick">
        <div class="select">
          <span class="selected" v-if="selectALLBtn || selectStatus"></span>
        </div>
        <span class="select_ttx font16">{{$t("message.nft.txt41")}}</span>
      </div>
      <!-- 页面展示数组 -->
      <div class="cardarr_class">
        <!-- <div class="onebox" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item)">
          <img :src="`${$store.state.imgUrl}mybox1.webp`" class="card_picture" />
          <span class="boxID"># {{item.nftId}}</span>
          <div class="box_select">
            <span class="selected" v-if="item.status"></span>
          </div>
        </div> -->
        <BoxComponents :nftArr="pageshowarr" @nftFun="cardClick"></BoxComponents>
      </div>
    </div>
    <img :src="`${$store.state.imgUrl}back.webp`" class="close_img" @click.stop="closeOpen"/>
    <div class="open_btn mobile_font16" :class="isEnLang?'en_Bold':''" @click="openboxFun">
      {{$t("message.nft.txt42")}}
      <BtnLoading :isloading="openstatus"></BtnLoading>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { sb,getSigner } from "sealemlab-sdk";
import BoxComponents from "@/components/BoxComponents.vue"
export default {
  computed: {
    ...mapGetters(["getNoticeNum","getAccount","getIstrue","getUserBoxInfo","isEnLang"]),
    selectStatus: {
      get() {
        if(this.selectedNUM == 0){
          return false
        }
        if(this.pageshowarr.length >= 5){
          return 5 == this.selectedNUM
        }else{
          return this.pageshowarr.length == this.selectedNUM
        }
      },
      set(newValue) {
        return newValue;
      }
    },
  },
  components:{
    BoxComponents
  },
  props: {
    openStatus: {
      type: Boolean,
      default: false
    },
    boxtype:{
      type: Number,
      default: 0
    }
  },
  watch:{
    openStatus(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
        this.getUserAllBox()
        this.watchResult()
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  data(){
    return{
      openstatus:false,//打开盒子按钮loading
      selectALLBtn:false,//全选按钮的状态
      selectedNUM:0,//选中的盲盒数量
      pageshowarr:[],//页面展示的盲盒数组
      timerll:null,
      selectNum:5,//最多选择数量
    }
  },
  methods: {
    // 获取用户的所有盲盒信息
    getUserAllBox(){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('sb_count')){
          // console.log(' this.getUserBoxInfo: ',  this.getUserBoxInfo);
          clearInterval(this.timerll)
          let arr = JSON.parse(this.getUserBoxInfo)
          arr.forEach(item => {
            item.showSelect = true
            item.selectStatus = false
          })
          this.pageshowarr = arr.filter(data => {
            return data.type == this.boxtype
          })
          // console.log('this.pageshowarr: ', this.pageshowarr.length);
        }
      }, 500);
    },
    // 弹窗关闭
    closeOpen () {
      this.selectALLBtn = false
      this.selectedNUM = 0
      this.$emit('closeOpen')
    },
    // 选择盒子
    cardClick(data){
      if(this.selectedNUM >= this.selectNum){
        if(data.selectStatus){
          data.selectStatus = false
          this.selectedNUM--
          this.selectALLBtn = false
        }else{
          if(!this.getNoticeNum){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':`message.tip.self_txt10`}));
            this.$store.commit("setNoticeNum",true)
          }
        }
        return
      }
      data.selectStatus = !data.selectStatus

      if(data.selectStatus){
        this.selectedNUM++
      }else{
        this.selectedNUM--
        this.selectALLBtn = false
      }
    },
    // 全选按钮选中事件
    selectAllClick(){
      if(this.pageshowarr.length == 0)return
      if(this.selectALLBtn || this.selectStatus){
        this.selectALLBtn = this.selectStatus = false
        this.pageshowarr.forEach(item => {
          item.selectStatus = false
        })
        this.selectedNUM = 0
      }else{
        // 最多选择5张
        this.selectALLBtn = this.selectStatus = true
        if(this.pageshowarr.length < this.selectNum + 1){
          this.pageshowarr.forEach(item => {
            item.selectStatus = true
          })
          this.selectedNUM = this.pageshowarr.length
        }else{
          // console.log("全选按钮的else状态")
          this.pageshowarr.forEach(item =>{
            item.selectStatus = false
          })
          this.pageshowarr.forEach((item,index) => {
            if(index <= this.selectNum - 1){
              item.selectStatus = true
            }
          })
          this.selectedNUM = this.pageshowarr.filter(item => {return item.selectStatus == true}).length
          if(!this.getNoticeNum){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':`message.tip.self_txt10`}));
            this.$store.commit("setNoticeNum",true)
          }
        }
      }
    },
    // 开盒子
    openboxFun(){
      if(this.openstatus)return
      let arr = []
        console.log('this.pageshowarr: ', this.pageshowarr);
      this.pageshowarr.forEach(item => {
        if(item.selectStatus){
          arr.push(item.nftId)
        }
      })
      if(arr.length == 0){
        if(!this.getNoticeNum){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.txt6'}));
          this.$store.commit("setNoticeNum",true)
        }
        return
      }
      this.openstatus = true
        console.log('arr: ', arr);
      sb().connect(getSigner()).openBoxes(arr).then(res => {
        console.log('开盒子res: ', res);
        // 进度条
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt11','link':res.hash}));
        this.openstatus = false
      }).catch(() => {
        console.log("开盒子错误")
        this.openstatus = false
      })
    },
    // 监听盲盒开奖结果
    watchResult() {
      let filter = sb().filters.SpawnSns(this.getAccount);
      sb().on(filter, (user, boxslengths, boxarrID, events, ultras) => {
        if(boxarrID){
          this.$utils.ProcessingFunction(boxarrID).then(res => {
            console.log('监听盲盒开奖结果De ---ProcessingFunction: ', res);
            if(res.length > 0){
              this.$store.dispatch("setPrizeInfo", JSON.stringify({'status':true,'boxarr':res}));
            }
          })
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          this.$utils.newgetUserBoxInfoFun(this.getAccount).then(res => {
            sessionStorage.setItem("sb_count", res)
            this.getUserAllBox()
          })
        }else{
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
        }
        this.selectedNUM = 0
        this.selectALLBtn = false
        console.log('监听盲盒开奖结果: user', user)
        console.log('监听盲盒开奖结果: boxslengths',boxslengths)
        console.log('监听盲盒开奖结果: boxarrID', boxarrID);
        console.log('监听盲盒开奖结果: events',events);
        console.log('监听盲盒开奖结果: ultras',ultras);
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.open_box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  backdrop-filter: blur(6px);
  .proup_boxs{
    position: relative;
    width: 100%;
    padding-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .propu_title_txt{
      width: 100%;
      // text-align: center;
      font-weight: 600;
      color: #CED3D9;
      line-height: 40px;
      padding-left: 5vw;
    }
    .select_content{
      width: 100%;
      padding-right: 5vw;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
      .select{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid #ECCF83;
        display: flex;
        justify-content: center;
        align-items: center;
        .selected{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ECCF83;
        }
      }
      .select_ttx{
        color: #CED3D9;
        margin-left: 5px;
      }
    }
    .cardarr_class{
      width: 90vw;
      margin: 0 auto;
      // height: calc(100%-200px);
      overflow: auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 20px;
      max-height: 600px;
      // padding-bottom: 240px;
      // padding-bottom: 310px;
      .onebox{
        position: relative;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-bottom: 20px;
        .card_picture{
          width: 90%;
          max-width: 204px;
        }
        .box_select{
          position: absolute;
          right: 18px;
          top: 4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #ECCF83;
          display: flex;
          justify-content: center;
          align-items: center;
          .selected{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ECCF83;
          }
        }
        .boxID{
          position: absolute;
          top: 10px;
          left: 20px;
          color: red;
        }
      }
    }
  }
  .close_img{
    position: absolute;
    top: 30px;
    left: 5vw;
    width: 55px;
    cursor: pointer;
  }
  .open_btn{
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    left: 50%;
    z-index: 8;
    transform: translateX(-50%);
    width: 330px;
    height: 54px;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #000000;
  }
}
@media screen and (max-width: 980px) {
  .open_box {
    z-index: 100;
    backdrop-filter: blur(6px);
    .proup_boxs{
      position: relative;
      width: 100%;
      padding-top: 0.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .propu_title_txt{
        width: 100%;
        // text-align: center;
        font-weight: 600;
        color: #CED3D9;
        line-height: 0.23rem;
      }
      .select_content{
        width: 100%;
        padding-right: 5vw;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 0.15rem;
        cursor: pointer;
        .select{
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #ECCF83;
          display: flex;
          justify-content: center;
          align-items: center;
          .selected{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ECCF83;
          }
        }
        .select_ttx{
          color: #CED3D9;
          margin-left: 5px;
        }
      }
      .cardarr_class{
        width: 90vw;
        margin: 0 auto;
        // max-height: calc(100%-2rem);
        overflow: auto;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 0.2rem;
        max-height: 6rem;
        padding-bottom: 1.9rem;
        .onebox{
          position: relative;
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          margin-bottom: 0.2rem;
          .card_picture{
            width: 90%;
            max-width: 2.04rem;
          }
          .box_select{
            position: absolute;
            right: 0.1rem;
            top: 0.04rem;
            width: 0.18rem;
            height: 0.18rem;
            border-radius: 50%;
            border: 1px solid #ECCF83;
            display: flex;
            justify-content: center;
            align-items: center;
            .selected{
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              background: #ECCF83;
            }
          }
          .boxID{
            position: absolute;
            top: 10px;
            left: 20px;
            color: red;
          }
        }
      }
    }
    .close_img{
      position: absolute;
      top: 0.3rem;
      left: 0.2rem;
      width: 0.25rem;
      cursor: pointer;
    }
    .open_btn{
      cursor: pointer;
      position: fixed;
      bottom: 20px;
      left: 50%;
      z-index: 8;
      transform: translateX(-50%);
      width: 330px;
      height: 54px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
    }
  }
}
</style>