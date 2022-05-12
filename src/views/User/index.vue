<template>
  <div class="user_center_page">
    <div class="user_info display_flex">
      <div class="user_head_portrait display_flex">
        <span class="font20 user_name">{{getLogin.username?getLogin.username:'暂未登录'}}</span>
        <div class="invitation_code font16">邀请链接:21233443535353</div>
      </div>
      <div class="content display_flex" v-if="li_index == 0">
        <div class="box display_flex" v-for="(item, index) in walletArr" :key="index">
          <div class="coin_name display_flex font20">
            <div class="leftbox display_flex">
              <img :src="item.coin_logo" class="coin_log" />
              <span class="bnb_class">{{item.company}}</span>
            </div>
            <span class="txt" v-if="item.explain">{{item.explain}}</span>
          </div>
          <div class="onelin display_flex font16">
            <span>{{item.name1}}</span>
            <span>{{item.num1}}(≈${{item.num1_money}})</span>
          </div>
          <div class="onelin display_flex font16" v-if="item.name2">
            <span>{{item.name2}}</span>
            <span>{{item.num2}}(≈${{item.num2_money}})</span>
          </div>
          <div class="onelin display_flex font16" v-if="item.name3">
            <span>{{item.name3}}</span>
            <div class="address display_flex">
              <span>{{item.address}}</span>
              <img :src="`${$store.state.imgUrl}add.webp`" class="copy_img" />
            </div>
          </div>
        </div>
      </div>
      <div class="invite_content content display_flex" v-if="li_index == 1">
        <div class="invite_title display_flex">
          <div class="left display_flex">
            <span class="font35">总收入</span>
            <div class="income_box display_flex font26">
              <div class="imgbox display_flex">
                <img :src="`${$store.state.imgUrl}stlogo.webp`" class="homebg" />
                <span>ST</span>
              </div>
              <span>100</span>
            </div>
          </div>
          <div class="left display_flex">
            <span class="font35">当期收入</span>
            <div class="income_box display_flex font26">
              <div class="imgbox display_flex">
                <img :src="`${$store.state.imgUrl}srlogo.webp`" class="homebg" />
                <span>SR</span>
              </div>
              <span>100</span>
            </div>
          </div>
        </div>
        <!-- <p class="message font16" :class="isEnLang?'en_Regular':'cn_lang'">提示：您的帳戶中至少需要一個 NFT 才能獲得推薦收入.</p> -->
      </div>
      <div class="feedback_page font30" v-if="li_index == 2">
        意见反馈
      </div>
    </div>
    <div class="content_box display_flex">
      <ul class="display_flex">
        <li class="font24" :class="{ active_li: li_index == index }" v-for="(item,index) in menuArr" :key="index" @click="liClick(item,index)">{{item.name}}</li>
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
    ...mapGetters(["isEnLang","getLogin"])
  },
  data(){
    return {
      li_index:0,
      walletArr:[{
        coin_logo:`${this.$store.state.imgUrl}bnblogo.webp`,
        company:'BNB',
        name1:'钱包余额',
        num1:100,
        num1_money:100
      },
      {
        coin_logo:`${this.$store.state.imgUrl}stlogo.webp`,
        company:'ST',
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
        coin_logo:`${this.$store.state.imgUrl}srlogo.webp`,
        company:'SR',
        explain:'Claim',
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
        {name:'Feedback',link:'/user/feedback/2'},
      ]
    }
  },
  methods:{
    liClick(item,index){
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
    padding-top: 75px;
    background-image: url($bg_url + "bondbg.webp");
    background-size: 100% 100%;
    .user_head_portrait{
      flex-direction: column;
      align-items: center;
      .user_name{
        font-weight: bold;
        color: #ECCF83;
        line-height: 24px;
      }
      .invitation_code{
        font-weight: normal;
        color: #FFFFFF;
        line-height: 20px;
        margin-top: 32px;
      }
    }
    .content{
      width: calc(100% - 230px);
      justify-content: space-between;
      .box{
        width: 30%;
        padding: 15px 19px;
        flex-direction: column;
        background: rgba(248, 229, 186, 0.23);
        border-radius: 14px;
        .coin_name{
          align-items: center;
          justify-content: space-between;
          .leftbox{
            align-items: center;
            .coin_log{
              width: 36px;
            }
            .bnb_class{
              margin-left: 10px;
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
      padding: 0 30px;
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
            background: rgba(248, 229, 186, 0.23);
            border-radius: 14px;
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
    .feedback_page{
      width: calc(100% - 230px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #FFFFFF;
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
        line-height: 48px;
        width: 248px;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        color: #fff;
        padding-left: 60px;
        cursor: pointer;
      }
      .active_li{
        background: linear-gradient(90deg,#BF9A50,rgba(7,31,58,0) 100%,#B89B5B 0);
      }
    }
    .main{
      width: 100%;
      // padding-left: 60px;
    }
  }
}
</style>