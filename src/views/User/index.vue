<template>
  <div class="user_center_page">
    <div class="user_info display_flex">
      <img src="../../assets/images/usercorebg.png" class="use_bg" />
      <div class="user_head_portrait display_flex">
        <img src="../../assets/images/userhead.png" class="user_head">
        <div class="user_name display_flex">
          <span class="font34 name_txt" :class="isEnLang?'en_Bold':'cn_lang'">名称</span>
          <img src="../../assets/images/write.png" class="img_write">
        </div>
        <div class="invitation_code font20" :class="isEnLang?'en_Bold':'cn_lang'">邀请链接:21233443535353</div>
      </div>
      <div class="content display_flex">
        <div class="box display_flex" v-for="(item, index) in walletArr" :key="index">
          <div class="coin_name display_flex font20" :class="isEnLang?'en_Bold':'cn_lang'">
            <div class="leftbox display_flex">
              <img :src="item.coin_logo" class="coin_log" />
              <span class="bnb_class">{{item.num}} {{item.company}}</span>
            </div>
            <span class="txt" v-if="item.explain">{{item.explain}}</span>
          </div>
          <div class="onelin display_flex font16" :class="isEnLang?'en_Bold':'cn_lang'">
            <span>{{item.name1}}</span>
            <span>{{item.num1}}(≈${{item.num1_money}})</span>
          </div>
          <div class="onelin display_flex font16" v-if="item.name2" :class="isEnLang?'en_Bold':'cn_lang'">
            <span>{{item.name2}}</span>
            <span>{{item.num2}}(≈${{item.num2_money}})</span>
          </div>
          <div class="onelin display_flex font16" v-if="item.name3" :class="isEnLang?'en_Bold':'cn_lang'">
            <span>{{item.name3}}</span>
            <div class="address display_flex">
              <span>{{item.address}}</span>
              <img src="../../assets/images/copy.png" class="copy_img" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_box display_flex">
      <ul class="display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
        <li class="font30" :class="{ active_li: li_index == index }" v-for="(item,index) in menuArr" :key="index" @click="liClick(index)">{{item.name}}</li>
      </ul>
      <div class="main">
        
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang"])
  },
  data(){
    return {
      li_index:0,
      walletArr:[{
        coin_logo:require('../../assets/images/stlogo.png'),
        company:'BNB',
        num:10,
        name1:'钱包余额',
        num1:100,
        num1_money:100
      },
      {
        coin_logo:require('../../assets/images/stlogo.png'),
        company:'ST',
        num:10,
        explain:'余额',
        name1:'钱包余额',
        num1:100,
        num1_money:100,
        name2:'可用',
        num2:200,
        num2_money:200,
        name3:'合约',
        address:'0xsdf***fdhd'
      },
      {
        coin_logo:require('../../assets/images/stlogo.png'),
        company:'SR',
        num:10,
        explain:'提现',
        name1:'钱包余额',
        num1:100,
        num1_money:100,
        name2:'可提现',
        num2:200,
        num2_money:200,
        name3:'合约',
        address:'0xsdf***fdhd'
      }
      ],
      menuArr:[
        {name:'资产'},
        {name:'邀请奖励'},
        {name:'盲盒'},
      ]
    }
  },
  methods:{
    liClick(index){
      this.li_index = index
    }
  }
}
</script>
<style lang="scss" scoped>
.user_center_page{
  width: 100%;
  margin-top: -80px;
  .user_info{
    position: relative;
    width: 100%;
    min-height: 510px;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
    padding-top: 155px;
    .use_bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
      object-fit: contain;
    }
    .user_head_portrait{
      flex-direction: column;
      align-items: center;
      .user_head{
        width: 133px;
      }
      .user_name{
        margin: 20px 0;
        align-items: center;
        .name_txt{
          font-weight: normal;
          color: #00C1FF;
          line-height: 43px;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .img_write{
          width: 28px;
        }
      }
      .invitation_code{
        border-radius: 15px;
        box-shadow: inset -2px 1px 22px 0 #F3D67D;
        padding: 0 20px;
        font-weight: normal;
        color: #FFFFFF;
        height: 39px;
        line-height: 39px;
      }
    }
    .content{
      width: calc(100% - 300px);
      justify-content: space-between;
      .box{
        width: 30%;
        padding: 15px 19px;
        flex-direction: column;
        background: url("../../assets/images/balancebg.png") no-repeat;
        background-size: 100% 100%;
        .coin_name{
          align-items: center;
          justify-content: space-between;
          .leftbox{
            align-items: center;
            .coin_log{
              width: 36px;
            }
            .bnb_class{
              margin-left: 18px;
              font-weight: bold;
              color: #FFFFFF;
              line-height: 24px;
            }
          }
          .txt{
            font-weight: normal;
            color: #FFFFFF;
            line-height: 25px;
          }
        }
        .onelin{
          margin-top: 13px;
          align-items: center;
          justify-content: space-between;
          .address{
            align-items: center;
            .copy_img{
              width: 11px;
              margin-left: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .content_box{
    width: 100%;
    background: #000;
    padding: 0 70px;
    ul{
      flex-direction: column;
      margin-top: 80px;
      li{
        // margin-top: 80px;
        font-weight: normal;
        color: #FFFFFF;
        line-height: 86px;
        width: 171px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: #fff;
        padding-left: 68px;
        cursor: pointer;
      }
      .active_li{
        background: linear-gradient(90deg,#BF9A50,rgba(7,31,58,0) 100%,#B89B5B 0);
      }
    }
  }
}
</style>