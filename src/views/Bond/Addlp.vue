<template>
  <div class="input_proup" v-if="addlpDis">
    <div class="proup_boxs">
      <p class="propu_title_txt font24 mobile_font18">{{$t("message.bond.txt20")}}</p>
      <p class="title_ font16 mobile_font14">{{$t("message.bond.txt21")}}</p>
      <div class="content">
        <div class="box" v-for="(item,index) in arr" :key="index" @click="typeClick(item,index)">
          <span class="type_ font12" :class="index == activetype?'activeClass':''">{{item.title}}</span>
        </div>
      </div>
      <!-- busd输入框 -->
      <div class="inputbox" v-if="activetype == 0 || activetype == 1">
        <p class="font12 balance_">BUSD {{$t("message.bond.txt22")}}: 0</p>
        <div class="inputcontent">
          <div class="left_content">
            <img :src="`${$store.state.imgUrl}busd.webp`" class="busd_img" />
            <span class="busd_txt font14">BUSD</span>
          </div>
          <div class="center_content">
            <Input @blurEvent="busdBlurEvent" @focusEvent="busdFocusEvent" :placeholder='$t("message.bond.txt23")' @input="busdInputClick"></Input>
          </div>
          <div class="max_btn font16">MAX</div>
        </div>
      </div>
      <!-- st输入框 -->
      <div class="inputbox" v-if="activetype == 0 || activetype == 2">
        <p class="font12 balance_">ST {{$t("message.bond.txt22")}}: 0</p>
        <div class="inputcontent">
          <div class="left_content">
            <img :src="`${$store.state.imgUrl}stlogo.webp`" class="busd_img" />
            <span class="busd_txt font14">ST</span>
          </div>
          <div class="center_content">
            <Input @blurEvent="blurEvent" @focusEvent="focusEvent" :placeholder='$t("message.bond.txt23")' @input="inputClick"></Input>
          </div>
          <div class="max_btn font16">MAX</div>
        </div>
      </div>
      <!-- 投入以及收益 -->
      <div class="profit_box">
        <div class="onebox">
          <p class="font14 _txt">{{$t("message.bond.txt24")}}</p>
          <div class="border_ font12">
            <span class="span1">0</span>
            <span class="span1">BUSD</span>
          </div>
        </div>
        <div class="onebox">
          <p class="font14 _txt">{{$t("message.bond.txt25")}}</p>
          <div class="border_ font12">
            <span class="span1">0</span>
            <span class="span1">BUSD</span>
          </div>
        </div>
        <div class="onebox">
          <p class="font14 _txt">{{$t("message.bond.txt26")}}</p>
          <div class="border_ font12">
            <span class="span1">0</span>
            <span class="span1">BUSD</span>
          </div>
        </div>
      </div>
      <div class="main_button font16" @click="bondFun">Approve</div>
      <div class="tipbox font12">
        <p class="font14"><span>{{$t("message.bond.txt27")}}</span><span>20%</span></p>
        <p class="color1"><span>{{$t("message.bond.txt28")}}</span><span>16%</span>
        <p class="color2"><span>{{$t("message.bond.txt30")}}</span><span>1%</span>
        <p class="color3"><span>{{$t("message.bond.txt29")}}</span><span>3%</span>
        <p class="color4"><span>{{$t("message.bond.txt31")}}</span><span>1%</span>
        <p class="font14"><span>{{$t("message.bond.txt32")}}</span><span>1%</span></p>
        <p class="font16"><span>{{$t("message.bond.txt33")}}</span><span>$0</span></p>
        <p>{{$t("message.bond.txt34")}}</p>
      </div>
      <img :src="`${$store.state.imgUrl}close.webp`" class="close_img" @click.stop="closeProup"/>
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
          title:'BUSD&ST',
        },
        {
          title:'BUSD',
        },
        {
          title:'ST',
        }
      ]
    }
  },
  methods: {
    busdBlurEvent(){
      console.log("失焦")
    },
    busdFocusEvent(){
      console.log("聚焦")
    },
    busdInputClick(){
      console.log("input")
    },
    blurEvent(){
      console.log("失焦")
    },
    focusEvent(){
      console.log("聚焦")
    },
    inputClick(){
      console.log("input")
    },
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
}
.proup_boxs{
    position: relative;
    width: 50vw; 
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 100px;
    background-image: url($bg_url + "proupbg.webp");
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
      }
    }
    .inputbox{
      width: 100%;
      margin-bottom: 30px;
      .balance_{
        width: 100%;
        text-align: right;
        font-weight: 400;
        color: #8B8484;
        line-height: 14px;
      }
      .inputcontent{
        padding-left: 14px;
        margin-top: 8px;
        width: 100%;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 8px;
        border: 1px solid #373636;
        .left_content{
          display: flex;
          justify-content: center;
          align-items: center;
          .busd_img{
            width: 17px;
            margin-right: 5px;
          }
          .busd_txt{
            font-weight: 600;
            color: #FFFFFF;
            line-height: 20px;
          }
        }
        .center_content{
          width: 70%;
        }
        .max_btn{
          width: 72px;
          height: 38px;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 8px;
          text-align: center;
          line-height: 38px;
          color: #000000;
          font-weight: bolder;
        }
      }
    }
    .profit_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .onebox{
        ._txt{
          font-weight: 600;
          color: #FFFFFF;
          line-height: 20px;
        }
        .border_{
          margin-top: 8px;
          min-width: 100px;
          padding: 0 10px;
          height: 23px;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 4px;
          border: 1px solid #373636;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .span1{
            font-weight: 600;
            color: #F0D48D;
            line-height: 14px;
          }
        }
      }
    }
    .main_button{
      width: 75%;
      min-height: 45px;
      margin: 35px 0 37px;
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
      width: 100%;
      display: flex;
      flex-direction: column;
      p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 400;
        color: #A4A4A4;
        line-height: 14px;
        &:nth-child(1),&:nth-last-child(2),&:nth-last-child(3){
          margin-bottom: 15px;
          // margin-top: 15px;
          span{
            font-weight: 500;
            color: #FFFFFF;
            line-height: 17px;
            margin-bottom: 0;
          }
        }
        &:nth-last-child(3){
          margin-top: 15px;
        }
        span{
          margin-bottom: 8px;
        }
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
@media screen and (max-width: 980px) {
  .proup_boxs{
    position: relative;
    width: 90%; 
    height: 90%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    background: url($bg_url + "proupbg.webp") no-repeat;
    background-size: cover;
    border-radius: 0.2rem;
    .propu_title_txt{
      font-weight: bold;
      color: #ECCF83;
      line-height: 0.2rem;
    }
    .title_{
      width: 100%;
      margin-top: 0.2rem;
      font-weight: 600;
      color: #ECCF83;
      line-height: 0.2rem;
    }
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      .box{
        display: flex;
        flex-direction: column;
        cursor: pointer;
        min-height: 0.5rem;
        .type_{
          width: 0.9rem;
          display: inline-block;
          height: 0.22rem;
          background: #373636;
          box-shadow: 0px 4px 14px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.05rem;
          text-align: center;
          line-height: 0.22rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.1rem;
        }
        .activeClass{
          background: #F0D48D;
          color: #000000;
        }
      }
    }
    .inputbox{
      width: 100%;
      margin-bottom: 0.3rem;
      .balance_{
        width: 100%;
        text-align: right;
        font-weight: 400;
        color: #8B8484;
        line-height: 0.14rem;
      }
      .inputcontent{
        padding-left: 0.1rem;
        margin-top: 0.08rem;
        width: 100%;
        height: 0.38rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 0.08rem;
        border: 1px solid #373636;
        .left_content{
          display: flex;
          justify-content: center;
          align-items: center;
          .busd_img{
            width: 0.2rem;
            margin-right: 0.05rem;
          }
          .busd_txt{
            font-weight: 600;
            color: #FFFFFF;
            line-height: 0.2rem;
          }
        }
        .center_content{
          width: 70%;
        }
        .max_btn{
          width: 0.72rem;
          height: 0.38rem;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.08rem;
          text-align: center;
          line-height: 0.38rem;
          color: #000000;
          font-weight: bolder;
        }
      }
    }
    .profit_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .onebox{
        ._txt{
          font-weight: 600;
          color: #FFFFFF;
          line-height: 0.2rem;
        }
        .border_{
          margin-top: 0.08rem;
          min-width: 0.8rem;
          padding: 0 0.1rem;
          height: 0.23rem;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 0.04rem;
          border: 1px solid #373636;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .span1{
            font-weight: 600;
            color: #F0D48D;
            line-height: 0.14rem;
          }
        }
      }
    }
    .main_button{
      width: 75%;
      min-height: 0.45rem;
      margin: 0.35rem 0 0.37rem;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 0.04rem;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #000000;
      cursor: pointer;
    }
    .tipbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 400;
        color: #A4A4A4;
        line-height: 0.14rem;
        &:nth-child(1),&:nth-last-child(2),&:nth-last-child(3){
          margin-bottom: 0.15rem;
          span{
            font-weight: 500;
            color: #FFFFFF;
            line-height: 0.17rem;
            margin-bottom: 0;
          }
        }
        &:nth-last-child(3){
          margin-top: 0.15rem;
        }
        span{
          margin-bottom: 0.08rem;
        }
      }
    }
    .close_img{
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      width: 0.28rem;
      cursor: pointer;
    }
  }
}
</style>