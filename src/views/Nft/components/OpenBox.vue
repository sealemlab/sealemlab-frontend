<template>
  <div class="open_box" v-if="openStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font30">{{$t("message.nft.txt39")}}</p>
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
        <div class="onebox" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item,index)">
          <img :src="`${$store.state.imgUrl}mybox1.png`" class="card_picture" />
          <span>{{item.num}}</span>
          <div class="box_select">
            <span class="selected" v-if="item.status"></span>
          </div>
        </div>
      </div>
    </div>
    <img :src="`${$store.state.imgUrl}back.png`" class="close_img" @click.stop="closeOpen"/>
    <div class="open_btn">{{$t("message.nft.txt42")}}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue","getUserBoxInfo"]),
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
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  data(){
    return{
      selectALLBtn:false,//全选按钮的状态
      selectedNUM:0,//选中的盲盒数量
      pageshowarr:[],//页面展示的盲盒数组
      timerll:null,
      selectNum:5,//最多选择数量
      isdown:false,// 再次执行轻通知的动画
    }
  },
  methods: {
    // 获取用户的所有盲盒信息
    getUserAllBox(){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('sb_count')){
          console.log(' this.getUserBoxInfo: ',  this.getUserBoxInfo);
          clearInterval(this.timerll)
          this.pageshowarr = JSON.parse(this.getUserBoxInfo).filter(data => {
            return data.type == this.boxtype
          })
          console.log('this.pageshowarr: ', this.pageshowarr.length);
        }
      }, 500);
    },
    // 弹窗关闭
    closeOpen () {
      this.selectALLBtn = false
      this.selectedNUM = 0
      this.$emit('closeOpen')
    },
    cardClick(data,index){
      if(this.selectedNUM >= this.selectNum){
        if(data.status){
          data.status = false
          this.selectedNUM--
          this.selectALLBtn = false
        }else{
          if(!this.isdown){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':`最多 ${this.selectNum}个`}));
            this.isdown = true
            setTimeout(() => {
              this.isdown = false
              this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
            }, 3000);
          }
        }
        return
      }
      data.status = !data.status

      if(data.status){
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
          item.status = false
        })
        this.selectedNUM = 0
      }else{
        // 最多选择5张
        this.selectALLBtn = this.selectStatus = true
        if(this.pageshowarr.length < this.selectNum + 1){
          this.pageshowarr.forEach(item => {
            item.status = true
          })
          this.selectedNUM = this.pageshowarr.length
        }else{
          console.log("全选按钮的else状态")
          this.pageshowarr.forEach(item =>{
            item.status = false
          })
          this.pageshowarr.forEach((item,index) => {
            if(index <= this.selectNum - 1){
              item.status = true
            }
          })
          this.selectedNUM = this.pageshowarr.filter(item => {return item.status == true}).length
          if(!this.isdown){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':`最多 ${this.selectNum}个`}));
            this.isdown = true
            setTimeout(() => {
              this.isdown = false
              this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
            }, 3000);
          }
        }
      }
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
  z-index: 2;
  backdrop-filter: blur(6px);
  .proup_boxs{
    position: relative;
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .propu_title_txt{
      width: 100%;
      text-align: center;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 42px;
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
        color: #FFFFFF;
        margin-left: 5px;
      }
    }
    .cardarr_class{
      width: 90vw;
      margin: 0 auto;
      max-height: calc(100%-200px);
      overflow: auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 20px;
      max-height: 600px;
      padding-bottom: 240px;
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
      }
    }
  }
  .close_img{
    position: absolute;
    top: 70px;
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
    text-align: center;
    line-height: 54px;
    font-weight: 600;
    color: #000000;
  }
}
</style>