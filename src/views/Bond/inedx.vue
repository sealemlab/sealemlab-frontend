<template>
  <div class="bond_page">
    <div class="bond_introduce">
      <img :src="`${$store.state.imgUrl}newbondbg.png`" class="bond_bg" />
      <div class="txt_box">
        <img :src="`${$store.state.imgUrl}BOND.png`" class="bond_img" />
        <div class="introducebox font14">
          <div class="onebox">
            <span class="txt1">{{$t("message.bond.txt2_1")}}</span>
          </div>
          <div class="onebox height_">
            <span class="txt1">{{$t("message.bond.txt2_2")}}</span>
          </div>
          <div class="onebox height_">
            <span class="txt1">{{$t("message.bond.txt2_3")}}</span>
          </div>
        </div>
      </div> 
    </div>
    <div class="content">
      <!-- 标题 -->
      <div class="layout_box">
        <span class="font30 text_">{{$t("message.bond.txt1")}}</span>
        <div class="radious font12">?</div>
      </div>
      <!-- 表格 -->
      <div class="container">
        <div class="title_box font24">
          <span class="font_class">{{$t("message.bond.txt3")}}</span>
          <span class="font_class">$123456</span>
          <span class="font_class"></span>
          <span class="font_class">ST {{$t("message.bond.txt4")}}</span>
          <span class="font_class">$100000</span>
        </div>
        <div class="list_title_box font20">
          <span class="list_font_class">{{$t("message.bond.txt1")}}</span>
          <span class="list_font_class">{{$t("message.bond.txt4")}}</span>
          <span class="list_font_class">{{$t("message.bond.txt5")}}</span>
          <span class="list_font_class">{{$t("message.bond.txt6")}}</span>
          <div class="list_font_class"></div>
        </div>
        <div class="coin_box">
          <div class="alone_box font16" v-for="(item,index) in coinArr" :key="index">
            <div class="second_box">
              <span class="line_txt">{{item.title}}</span>
              <div class="line_radious">
                <span class="line_txt">{{$t("message.bond.txt7")}}</span>
                <img :src="`${$store.state.imgUrl}link.png`" class="link_img" />
              </div>
            </div>
            <span class="coin_class">$ {{item.price}}</span>
            <span class="coin_class">{{item.num}}%</span>
            <span class="coin_class">{{item.day}} {{$t("message.bond.txt19")}}</span>
            <div class="coin_class">
              <span class="btn_txt font12" @click="BondClick(1)">{{$t("message.bond.txt1")}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 标题 -->
      <div class="layout_box">
        <span class="font30 text_">{{$t("message.bond.txt8")}}</span>
        <div class="radious font12">?</div>
      </div>
      <!-- 表格外层标题 -->
      <div class="list_title font24">
        <div class="layout_box margin0">
          <span class="insert">{{$t("message.bond.txt9")}}</span>
          <div class="radious font12">?</div>
        </div>
        <span class="txt_">$200000</span>
        <span class="btn_txt bg_color">{{$t("message.bond.txt10")}}</span>
        <span class="txt_"></span>
        <div class="layout_box margin0">
          <!-- <span class="insert">{{$t("message.bond.txt11")}}</span>
          <div class="radious font12">?</div> -->
        </div>
        <span class="txt_"></span>
        <!-- <span class="txt_">$3000000</span> -->
        <!-- <span class="btn_txt">{{$t("message.bond.txt12")}}</span> -->
      </div>
      <!-- 表格内层标题 -->
      <div class="list_title self_calss_list font20">
        <span class="empty_class color_fff">{{$t("message.bond.txt1")}}</span>
        <span class="empty_class color_fff">{{$t("message.bond.txt13")}}</span>
        <span class="empty_class color_fff">{{$t("message.bond.txt14")}}</span>
        <span class="empty_class color_fff">{{$t("message.bond.txt15")}}</span>
      </div>
      <!-- 表格 -->
      <div class="outbox_">
        <div class="list_title self_class_expecil font16" v-for="(item,index) in list" :key="index">
          <span class="empty_class">{{item.title}}</span>
          <span class="empty_class">{{item.price}}</span>
          <span class="empty_class">{{item.num}}%</span>
          <span class="empty_class">$ {{item.day}}</span>
        </div>
      </div>
    </div>
    <!-- <InputProup :afferentStatus="afferentStatus" :proupDis="proupDis" @sureclick="proupClick" @closeProup="closeProup">
      <Input slot="input_slot" @blurEvent="blurEvent" @focusEvent="focusEvent" :placeholder='$t("message.bond.txt16")' @input="inputClick"></Input>
    </InputProup> -->
    <AddLp :addlpDis="addlpDis" @closeLP="closeLP"></AddLp>
  </div>
</template>

<script>
// import InputProup from './InputPopup.vue'
import AddLp from './Addlp.vue'
export default {
  components:{
    // InputProup,
    AddLp
  },
  data(){
    return{
      addlpDis:false,//一键购买lp弹窗状态
      // afferentStatus:false,//input 校验状态
      // inputvalue:"",
      // proupDis:false,//弹窗变量
      coinArr:[
        {
          title:'ST-BNB',
          price:'1234',
          num:3,
          day:5
        },
        {
          title:'ST-BNB',
          price:'1234',
          num:3,
          day:5
        },
        {
          title:'ST-BNB',
          price:'1234',
          num:3,
          day:5
        }
      ],
      list:[
        {
          title:'ST-BNB',
          price:'1234',
          num:3,
          day:5
        },
        {
          title:'ST-BNB',
          price:'1234',
          num:3,
          day:5
        },
      ]
    }
  },
  methods:{
    closeLP(){
      this.addlpDis = false
    },
    // blurEvent(){
    //   if(!this.inputvalue)this.afferentStatus = true
    // },
    // focusEvent(){
    //   this.afferentStatus = false
    // },
    // inputClick(val){
    //   this.inputvalue = val
    // },
    // 弹窗按钮的确认事件
    // proupClick(){
    //   if(!this.inputvalue){
    //     this.afferentStatus = true
    //   }
    // },
    // closeProup(){
    //   this.proupDis = this.afferentStatus = false
    // },
    BondClick(data){
      // this.proupDis = true
      this.addlpDis = true
    }
  }
};
</script>

<style lang="scss" scoped>
.bond_page {
  width: 100%;
  .bond_introduce{
    width: 100%;
    position: relative;
    .bond_bg{
      width: 100%;
      min-height: 350px;
    }
    .txt_box{
      position: absolute;
      top: 150px;
      left: 0;
      width: 100%;
      padding: 0 5vw;
      display: flex;
      flex-direction: column;
      .bond_img{
        width: 156px;
      }
      .introducebox{
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 30px;
        .onebox{
          padding: 10px;
          width: 200px;
          height: 50px;
          background: rgba(248, 229, 186, 0.23);
          border-radius: 14px;
          text-align: center;
          .txt1{
            font-weight: 600;
            color: #FFFFFF;
          }
        }
        .height_{
          line-height: 30px;
          margin-left: 15px;
        }
      }
      .txt2{
        font-weight: 400;
        color: #FFFFFF;
        line-height: 19px;
        margin-bottom: 10px;
      }
    }
  }
  .layout_box{
    width: fit-content;
    position: relative;
    margin: 56px 0;
    .text_{
      font-weight: bold;
      color: #FFFFFF;
      line-height: 36px;
    }
    .insert{
      font-weight: 600;
      color: #ECCF83;
      line-height: 29px;
    }
    .radious{
      position: absolute;
      right: -20px;
      top: 2px;
      width: 14px;
      height: 14px;
      border: 1px solid #A9A7A7;
      filter: blur(0px);
      font-weight: 400;
      color: #A9A7A7;
      line-height: 15px;
      border-radius: 50%;
      text-align: center;
      // transform: scale(0.5);
    }
  }
  .btn_txt{
    display: inline-block;
    width: 98px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    color: #fff;
    background: #373636;
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
    border-radius: 4px;
    backdrop-filter: blur(14px);
    cursor: pointer;
  }
  .bg_color{
    color: #101010;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
  }
  .empty_class{
    display: inline-block;
    min-width: 25%;
    font-weight: 600;
    color: #A9A7A7;
    line-height: 22px;
  }
  .list_title_box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list_font_class{
      flex: 1;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 24px;
    }
  }
  .content{
    width: 90vw;
    background: #101010;
    margin: 0 auto;
    padding:1px 27px 58px 27px;
    .container{
      width: 100%;
      background: #151515;
      display: flex;
      flex-direction: column;
      padding:28px 31px;
      .title_box{
        width: 100%;
        padding-bottom: 28px;
        border-bottom: 2px solid #242222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 33px;
        .font_class{
          flex: 1;
          font-weight: 600;
          color: #ECCF83;
          line-height: 33px;
        }
      }
    }
    .coin_box{
      width: 100%;
      display: flex;
      flex-direction: column;
      .alone_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 36px;
        .coin_class{
          flex: 1;
          font-weight: 600;
          color: #A9A7A7;
          line-height: 22px;
        }
        .second_box{
          flex: 1;
          display: flex;
          flex-direction: column;
          .line_txt{
            font-weight: 600;
            color: #A9A7A7;
            line-height: 22px;
          }
          .line_radious{
            .link_img{
              width: 12px;
              margin-left: 5px;
            }
          }
        }
      }
    }
    .list_title{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      padding-bottom: 39px;
      border-bottom: 2px solid #242222;
      .txt_{
        font-weight: 600;
        color: #ECCF83;
        line-height: 29px;
      }
    }
    .self_calss_list{
      margin-top: 39px;
      border: none;
    }
    .self_class_expecil{
      border: none;
    }
    .outbox_{
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>