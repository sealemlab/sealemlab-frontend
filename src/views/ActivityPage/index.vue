<template>
  <div class="active_page_coin">
    <div class="top_box">
      <p class="font35" :class="isEnLang ? 'en_Bold' : ''">IDO sale</p>
      <div class="timebox">
        <div class="onebox">
          <span class="font45" :class="isEnLang ? 'en_Bold' : ''">{{countTime.d}}</span>
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">DAYS</span>
        </div>
        <div class="line font45">:</div>
        <div class="onebox">
          <span class="font45" :class="isEnLang ? 'en_Bold' : ''">{{countTime.h}}</span>
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">HRS</span>
        </div>
        <div class="line font45">:</div>
        <div class="onebox">
          <span class="font45" :class="isEnLang ? 'en_Bold' : ''">{{countTime.m}}</span>
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">MIN</span>
        </div>
        <div class="line font45">:</div>
        <div class="onebox">
          <span class="font45" :class="isEnLang ? 'en_Bold' : ''">{{countTime.s}}</span>
          <span class="font14" :class="isEnLang ? 'en_Bold' : ''">SEC</span>
        </div>
      </div>
      <p class="font24" :class="isEnLang ? 'en_medium' : ''">IDO begains in</p>
    </div>
    <div class="content">
      <div class="left_box">
        <div class="onebox">
          <p>
            <span class="font24" :class="isEnLang ? 'en_Bold' : 'cn_lang'">IDO PROGRESS</span>
            <span class="font12" :class="isEnLang ? 'en_Bold' : 'cn_lang'">Sale live</span>
          </p>
          <div class="allbox">
            <div class="Onegroup" v-for="(item,index) in arr" :key="index">
              <span class="font16" :class="isEnLang ? 'en_medium' : 'cn_lang'">{{item.title}}</span>
              <span class="font24" :class="isEnLang ? 'en_Bold' : 'cn_lang'">$ {{item.num}}</span>
            </div>
          </div>
          <div class="progress_box">
            <div class="box">
              <div class="load" :style="{width}"></div>
            </div>
            <span>{{width}}</span>
          </div>
        </div>
        <div class="three_box">
          <div v-for="(item,index) in arr1" :key="index">
            <p class="font16" :class="isEnLang ? 'en_medium' : ''">{{item.title}}</p>
            <p class="font20" :class="isEnLang ? 'en_Bold' : ''">{{item.num}}</p>
          </div>
        </div>
        <div class="learnbox">
          <div class="left font20" :class="isEnLang ? 'en_medium' : ''">
            <span>More information?</span>
            <span>Read the documentation.</span>
          </div>
          <div class="btn font16" :class="isEnLang ? 'en_Bold' : ''">
            Learn about ST tokenomics
          </div>
        </div>
      </div>
      <div class="right_box">
        <p class="font24" :class="isEnLang ? 'en_Bold' : ''">Buy ST</p>
        <p class="font16" :class="isEnLang ? 'en_medium' : ''">BNB balance: 1.567 </p>
        <div class="box1 font16" :class="isEnLang ? 'en_medium' : ''">
          <p>Offering price: $ 456 </p>
          <p>Your max buyable: 200000 </p>
        </div>
        <div class="box2 box1 font16" :class="isEnLang ? 'en_medium' : ''">
          <div>
            <span class="span1">Amount</span>
            <span class="span2">Avaliable:1.567</span>
          </div>
          <div>
            <span class="span1">0.345</span>
            <p>
              <span class="span_btn font12" :class="isEnLang ? 'en_Bold' : ''">MAX</span>
              <span class="span2">BNB</span>
            </p>
          </div>
        </div>
        <div class="tip_txt font12" :class="isEnLang?'en_medium':''">
          <img :src="`${$store.state.imgUrl}ques_new.webp`" class="ques_img"/>
          {{$t("message.bond.tip_txt")}}
        </div>
        <div class="main_button font18 mobile_font16" :class="isEnLang?'en_Bold':''">Purchse</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["isEnLang","getUserCoin","getIstrue"]) },
  data(){
    return{
      width:"20%",
      countTime:{ d:"00",h: "00", m: "00", s: "00" },
      countTimeOBJ:null,
      endtime:1656068646,
      arr:[
        {title:'Sold in current',num:1212},
        {title:'Sold in current',num:1212},
        {title:'Sold in current',num:1212},
        {title:'Sold in current',num:1212},
      ],
      arr1:[
        {title:'Who can join the presale?',num:"Anyone in whitelist"},
        {title:'Who can join the presale?',num:"Anyone in whitelist"},
        {title:'Who can join the presale?',num:"Anyone in whitelist"},
      ]
    }
  },
  methods:{
    getUsetTime(){
      clearInterval(this.countTimeOBJ)
      this.$utils.customTime(this.endtime,data => {
        // console.log('id的倒计时data: ', data.countTime);
        this.countTimeOBJ = data.countdownObject
        this.countTime = data.countTime
      });//结束时间
    },
  },
  mounted(){
    this.getUsetTime()
  },
  beforeDestroy(){
    clearInterval(this.countTimeOBJ)
  }
}
</script>
<style lang="scss" scoped>
.active_page_coin{
  width: 100%;
  margin-bottom: 150px;
  .top_box{
    width: 100%;
    padding-top: 105px;
    min-height: 396px;
    background:url($bg_url + "ido.webp") no-repeat #000;
    background-size: 100% 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    p{
      :nth-child(2){
        font-weight: 500;
        color: #CED3D9;
        line-height: 29px;
      }
    }
    .timebox{
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 56px 0 40px;
      .onebox{
        width: 95px;
        height: 95px;
        background: rgba(248, 229, 186, 0.06);
        border-radius: 7px;
        backdrop-filter: blur(4px);
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: space-around;
        span{
          &:nth-child(1){
            font-weight: bold;
            color: #ECCF83;
            line-height: 54px;
          }
          &:nth-child(2){
            font-weight: 500;
            color: #8F8E8E;
            line-height: 16px;
          }
        }
      }
      .line{
        font-weight: 500;
        color: #ECCF83;
        line-height: 63px;
        margin: 0 20px;
      }
    }
  }
  .content{
    width: 90vw;
    margin: 70px auto 0;
    display: flex;
    justify-content: space-between;
    .left_box{
      width: 68%;
      display: flex;
      flex-direction: column;
      .onebox{
        width: 100%;
        background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 12px;
        border: 1px solid rgba(68, 67, 67, 0.47);
        display: flex;
        flex-direction: column;
        padding: 20px;
        p{
          font-weight: bold;
          color: #CED3D9;
          line-height: 29px;
          span{
            &:nth-child(2){
              display: inline-block;
              padding: 0 5px;
              height: 26px;
              line-height: 26px;
              background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
              border-radius: 4px;
              color: #0E0D0D;
              border: 1px solid rgba(255, 255, 255, 0.36);
              backdrop-filter: blur(14px);
              margin-left: 13px;
            }
          }
        }
        .allbox{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 42px;
          .Onegroup{
            display: flex;
            flex-direction: column;
            align-items: center;
            span{
              &:nth-child(1){
                font-weight: 500;
                color: #8F8E8E;
                line-height: 19px;
              }
              &:nth-child(1){
                font-weight: bold;
                color: #CED3D9;
                line-height: 29px;
                margin-top: 15px;
              }
            }
          }
        }
        .progress_box{
          width: 100%;
          display: flex;
          align-items: center;
          margin: 56px 0 35px;
          .box{
            width: 90%;
            height: 17px;
            background: #373535;
            box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
            border-radius: 12px;
            .load{
              width:0;
              height: 17px;
              background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
              border-radius: 12px;
              backdrop-filter: blur(14px);
            }
          }
          span{
            margin-left: 15px;
            font-weight: bold;
            color: #CED3D9;
            line-height: 24px;
          }
        }
      }
      .three_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 52px;
        >div{
          width: 32%;
          height: 104px;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 12px;
          border: 1px solid #373636;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 20px;
          p{
            &:nth-child(1){
              font-weight: 500;
              color: #8F8E8E;
              line-height: 19px;
            }
            &:nth-child(2){
              font-weight: bold;
              color: #CED3D9;
              line-height: 24px;
            }
          }
        }
      }
      .learnbox{
        margin-top: 51px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 12px;
        border: 1px solid rgba(68, 67, 67, 0.47);
        .left{
          display: flex;
          flex-direction: column;
        }
        .btn{
          padding: 0 20px;
          height: 48px;
          border-radius: 4px;
          border: 1px solid #EAD28E;
          backdrop-filter: blur(14px);
          text-align: center;
          line-height: 48px;
          font-weight: bold;
        }
      }
    }
    .right_box{
      width: 30%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 12px;
      border: 1px solid rgba(68, 67, 67, 0.47);
      p{
        &:nth-child(1){
          font-weight: bold;
          color: #CED3D9;
          line-height: 29px;
        }
        &:nth-child(2){
          font-weight: 500;
          color: #CED3D9;
          line-height: 19px;
          margin-top: 13px;
        }
      }
      .box1{
        width: 100%;
        margin-top: 37px;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 12px;
        border: 1px solid #373636;
        padding: 20px;
      }
      .box2{
        margin-top: 33px;
        >div{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(2){
            margin-top: 15px;
          }
          .span1{
            font-weight: 500;
            color: #8F8E8E;
            line-height: 19px;
          }
          .span2{
            font-weight: 500;
            color: #CED3D9;
            line-height: 19px;
          }
          p{
            display: flex;
            align-items: center;
            margin-top: 0;
            .span_btn{
              padding: 0 5px;
              height: 21px;
              background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
              box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
              border-radius: 2px;
              backdrop-filter: blur(14px);
              text-align: center;
              line-height: 21px;
              font-weight: 500;
              color: #000000;
              margin-right: 8px;
            }
          }
        }
      }
      .tip_txt{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        color: #8F8E8E;
        line-height: 14px;
        margin-top: 24px;
        .ques_img{
          width: 11px;
          margin-right: 5px;
        }
      }
      .main_button{
        width: 100%;
        min-height: 45px;
        margin: 50px auto 0;
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
    }
  }
}
</style>