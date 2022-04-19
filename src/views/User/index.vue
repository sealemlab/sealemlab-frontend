<template>
  <div class="user_center_page">
    <div class="user_info display_flex">
      <!-- <img src="../../assets/images/usercorebg.png" class="use_bg" /> -->
      <div class="user_head_portrait display_flex">
        <img src="../../assets/images/userhead.png" class="user_head">
        <div class="user_name display_flex">
          <span class="font34 name_txt" :class="isEnLang?'en_Bold':'cn_lang'">名称</span>
          <img src="../../assets/images/write.png" class="img_write">
        </div>
        <div class="invitation_code font20" :class="isEnLang?'en_Bold':'cn_lang'">邀请链接:21233443535353</div>
      </div>
      <div class="content display_flex" v-if="li_index == 0">
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
      <div class="invite_content content display_flex" v-if="li_index == 1">
        <div class="invite_title display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
          <div class="left display_flex">
            <span class="font35">总收入</span>
            <div class="income_box display_flex font26">
              <div class="imgbox display_flex">
                <img src="../../assets/images/stlogo.png" class="homebg" />
                <span>ST</span>
              </div>
              <span>100</span>
            </div>
          </div>
          <div class="left display_flex">
            <span class="font35">当期收入</span>
            <div class="income_box display_flex font26">
              <div class="imgbox display_flex">
                <img src="../../assets/images/srlogo.png" class="homebg" />
                <span>SR</span>
              </div>
              <span>100</span>
            </div>
          </div>
        </div>
        <p class="message font16" :class="isEnLang?'en_Regular':'cn_lang'">提示：您的帳戶中至少需要一個 NFT 才能獲得推薦收入.</p>
      </div>
      <div class="bindbox_page" v-if="li_index == 2">
        <div class="bind_left">
          <span class="font35 my_box">我的盲盒</span>
          <span class="font16 _open">批量打开</span>
        </div>
        <img src="../../assets/images/box.png" class="bindimg" />
      </div>
    </div>
    <div class="content_box display_flex">
      <ul class="display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
        <li class="font30" :class="{ active_li: li_index == index }" v-for="(item,index) in menuArr" :key="index" @click="liClick(item,index)">{{item.name}}</li>
      </ul>
      <div class="main">
        <router-view />
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
        {name:'资产',link:'/user/assets/0'},
        {name:'邀请奖励',link:'/user/invite/1'},
        {name:'盲盒',link:'/user/blindbox/2'},
      ]
    }
  },
  methods:{
    liClick(item,index){
      console.log('index: ', index);
      this.li_index = index
      this.$router.push(item.link)
    }
  },
  mounted(){
    this.li_index = this.$route.params.id
  }
}
</script>
<style lang="scss" scoped>
.user_center_page{
  width: 100%;
  min-height: calc(100vh - 400px);
  margin-top: -80px;
  .user_info{
    position: relative;
    width: 100%;
    min-height: 510px;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
    padding-top: 155px;
    background-image: url("../../assets/images/usercorebg.png");
    background-size: 100% 100%;
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
    .invite_content{
      flex-direction: column;
      .invite_title{
        width: 100%;
        align-items: center;
        justify-content: space-between;
        .left{
          flex-direction: column;
          .income_box{
            margin-top: 26px;
            width: 334px;
            height: 86px;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            background-image: url("../../assets/images/income.png");
            background-size: 100% 100%;
            .imgbox{
              align-items: center;
              .homebg{
                width: 47px;
                margin-right: 14px;
              }
            }
          }
        }
      }
      .message{
        margin-top: 30px;
        font-weight: normal;
        color: #ccc;
        line-height: 20px;
      }
    }
    .bindbox_page{
      width: calc(100% - 230px);
      display: flex;
      align-items: center;
      .bind_left{
        display: flex;
        flex-direction: column;
        .my_box{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 43px;
        }
        ._open{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 20px;
        }
      }
      .bindimg{
        width:80%;
      }
    }
  }
  .content_box{
    width: 100%;
    background: #000;
    padding: 80px 70px;
    ul{
      flex-direction: column;
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
    .main{
      width: 100%;
      padding-left: 60px;
    }
  }
}
</style>