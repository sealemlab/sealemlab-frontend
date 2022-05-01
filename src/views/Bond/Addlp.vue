<template>
  <div class="input_proup" v-if="addlpDis">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">ST-BUSD LP BOND</p>
      <p class="title_ font16">PAY TO BOND</p>
      <div class="content">
        <div class="box" v-for="(item,index) in arr" :key="index" @click="typeClick(item,index)">
          <span class="type_ font12" :class="index == activetype?'activeClass':''">{{item.title}}</span>
          <span class="font12 txt" v-show="item.status">{{item.title}} balance: {{item.num}}</span>
        </div>
      </div>
      <p class="title_ font16">BUSD-ST LP BONDED</p>
      <div class="progress_box_">
        <div class="oneline">
          <Slider :min="0" :max="100" v-model="per" class="slider"></Slider>
          <span class="font12 Company">{{sliderValue}} BUSD</span>
        </div>
        <p class="font12 balance_">BUSD balance: 10.2345</p>
      </div>
      <div class="progress_box_">
        <div class="oneline">
          <Slider :min="0" :max="100" v-model="values" class="slider"></Slider>
          <span class="font12 Company">{{sliderValue2}} BUSD</span>
        </div>
        <p class="font12 balance_">ST balance: 10.2345</p>
      </div>
      <p class="title_ font16">7天预计收益</p>
      <div class="profitbox font14">70 BUSD</div>
      <div class="main_button font16" @click="bondFun">Approve&Add Liquidity&Bond</div>
      <div class="tipbox font12">
        <span>债券到期后,以ST发放本金和利息</span>
        <span>LP tokens will be automatically staked on the bond contract.</span>
        <span>预计收益按照当期利率调整</span>
      </div>
      <img :src="`${$store.state.imgUrl}close.png`" class="close_img" @click.stop="closeProup"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  watch:{
    addlpDis(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  computed: {
    ...mapGetters(["isEnLang"]),
    per: {
      get() {
        return 0;
      },
      set(val) {
        this.sliderValue = val
      }
    },
    values: {
      get() {
        return 0;
      },
      set(val) {
        this.sliderValue2 = val
      }
    },
  },
  props: {
    addlpDis: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      sliderValue:0,
      sliderValue2:0,
      activetype:0,
      arr:[
        {
          title:'BUSD-ST',
          num:12.66,
          status:true
        },
        {
          title:'BUSD',
          num:13,
          status:false
        },
        {
          title:'ST',
          num:14,
          status:false
        }
      ]
    }
  },
  methods: {
    typeClick(item,index){
      this.arr.forEach(item => {
        item.status = false
      })
      item.status = true
      this.activetype = index
    },
    // 弹窗关闭
    closeProup () {
      this.$emit('closeLP')
    },
    bondFun(){
      this.$emit('sureclick')
    }
  }
}
</script>
<style lang="scss" scoped>
.input_proup {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999999;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  .proup_boxs{
    position: relative;
    width: 50vw; 
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 100px;
    background-image: url($bg_url + "proupbg.png");
    background-size: 100% 100%;
    .propu_title_txt{
      font-weight: bold;
      color: #ECCF83;
      line-height: 29px;
    }
    .title_{
      width: 100%;
      margin-top: 23px;
      font-weight: 600;
      color: #ECCF83;
      line-height: 22px;
    }
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      margin-top: 20px;
      .box{
        display: flex;
        flex-direction: column;
        cursor: pointer;
        min-height: 50px;
        .type_{
          width: 102px;
          display: inline-block;
          height: 26px;
          background: #373636;
          box-shadow: 0px 4px 14px 0px rgba(42, 37, 30, 0.45);
          border-radius: 5px;
          text-align: center;
          line-height: 26px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .activeClass{
          background: #F0D48D;
          color: #000000;
        }
        .txt{
          font-weight: 400;
          color: #8B8484;
          line-height: 14px;
        }
      }
    }
    .progress_box_{
      width: 90%;
      display: flex;
      flex-direction: column;
      .oneline{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
        .slider{
          width: 80%;
        }
        .Company{
          margin-left: 10px;
        }
      }
      .balance_{
        width: 100%;
        text-align: right;
        font-weight: 400;
        color: #8B8484;
        line-height: 14px;
        margin-top: 10px;
      }
    }
    .profitbox{
      width: 85%;
      height: 38px;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 8px;
      border: 1px solid #373636;
      text-align: center;
      line-height: 36px;
      margin-top: 10px;
      font-weight: 600;
      color: #F0D48D;
    }
    .main_button{
      width: 75%;
      min-height: 45px;
      margin: 48px 0 37px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #000000;
      cursor: pointer;
    }
    .tipbox{
      width: 75%;
      display: flex;
      flex-direction: column;
      span{
        font-weight: 400;
        color: #FFFFFF;
        line-height: 14px;
        margin-bottom: 10px;
      }
    }
    .close_img{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      cursor: pointer;
    }
  }
}
</style>