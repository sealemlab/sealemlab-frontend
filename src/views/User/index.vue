<template>
  <div class="user_center_page">
    <div class="user_info display_flex">
      <div class="user_head_portrait display_flex">
        <span class="font20 user_name">xxxx@xx.xx</span>
        <div class="invitation_code font16" :class="isEnLang?'en_Bold':''">{{ $t("message.user.txt5") }}</div>
      </div>
      <div class="content display_flex" v-if="li_index == 0">
        <div class="outbox" v-for="(item, index) in walletArr" :key="index">
          <div class="box display_flex">
            <div class="coin_name display_flex font20">
              <div class="leftbox display_flex">
                <img :src="item.coin_logo" class="coin_log" />
                <span class="bnb_class">{{item.company}}</span>
              </div>
            </div>
            <div class="outbox_add">
              <div class="onelin display_flex font16">
                <span>{{$t(item.name1)}}</span>
                <span>{{item.num1}}(≈${{item.num1_money}})</span>
              </div>
              <div class="onelin display_flex font16" v-if="item.name3">
                <span>{{$t(item.name3)}}</span>
                <div class="address display_flex">
                  <span>{{item.address}}</span>
                  <img :src="`${$store.state.imgUrl}add.webp`" class="copy_img" />
                </div>
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="invite_content content display_flex" v-if="li_index == 1">
        <div class="invite_title display_flex font20" :class="isEnLang?'en_Bold':''">
          <div class="left display_flex">
            <span class="font24 mobile_font14">{{$t("message.user.txt11")}}</span>
            <div class="income_box display_flex font26">
              <div class="imgbox display_flex">
                <img :src="`${$store.state.imgUrl}stlogo.webp`" class="homebg" />
                <span >ST</span>
              </div>
              <span>100</span>
            </div>
          </div>
          <div class="left display_flex">
            <span class="font24 mobile_font14">{{$t("message.user.txt12")}}</span>
            <div class="income_box display_flex font26">
              <div class="imgbox display_flex">
                <img :src="`${$store.state.imgUrl}srlogo.webp`" class="homebg" />
                <span>SR</span>
              </div>
              <span>100</span>
            </div>
          </div>
        </div>
        <p class="message font16" :class="isEnLang?'en_Regular':'cn_lang'">{{$t("message.user.txt13")}}</p>
      </div>
      <div class="feedback_page" :class="isEnLang?'en_medium':''" v-if="li_index == 2">
        <span class="font30">{{$t("message.user.txt10")}}</span>
        <span class="font24">{{$t("message.user.txt14")}}</span>
      </div>
      <ul class="ul_calss">
        <li class="font24" :class="{ active_li: li_index == index }" v-for="(item,index) in menuArr" :key="index" @click="liClick(item,index)">{{$t(item.name)}}</li>
      </ul>
    </div>
    <div class="content_box display_flex">
      <ul class="display_flex">
        <li class="font24" :class="{ active_li: li_index == index }" v-for="(item,index) in menuArr" :key="index" @click="liClick(item,index)">{{$t(item.name)}}</li>
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
        coin_logo:`${this.$store.state.imgUrl}bnblogo.webp`,
        company:'BNB',
        name1:'message.user.txt6',
        num1:0,
        num1_money:0
      },
      {
        coin_logo:`${this.$store.state.imgUrl}stlogo.webp`,
        company:'ST',
        name1:'message.user.txt6',
        num1:0,
        num1_money:0,
        num2_money:0,
        name3:'message.user.txt7',
        address:'0x********'
      },
      {
        coin_logo:`${this.$store.state.imgUrl}srlogo.webp`,
        company:'SR',
        name1:'message.user.txt6',
        num1:0,
        num1_money:0,
        num2_money:0,
        name3:'message.user.txt7',
        address:'0x********'
      }
      ],
      menuArr:[
        {name:'message.user.txt8',link:'/user/assets/0'},
        {name:'message.user.txt9',link:'/user/invite/1'},
        {name:'message.user.txt10',link:'/user/feedback/2'},
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
        width: 163px;
        height: 48px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        font-weight: bold;
        color: #000000;
        line-height: 48px;
        text-align: center;
        margin-top: 32px;
      }
    }
    .content{
      width: calc(100% - 230px);
      justify-content: space-between;
      .outbox{
        width: 30%;
        display: flex;
        flex-direction: column;
        .box{
          min-height: 135px;
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
          .outbox_add{
            display: flex;
            flex-direction: column;
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
        .line {
          width: 50%;
          height: 4px;
          margin: 0 auto;
          background: #f0ce75;
          border-radius: 2px;
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span{
        &:nth-child(1){
          font-weight: 600;
          line-height: 42px;
          color: #FFFFFF;
        }
        &:nth-child(2){
          font-weight: 500;
          color: #FFFFFF;
          line-height: 29px;
          margin-top: 30px;
        }
      }
      
    }
    .ul_calss{
      display: none;
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
        cursor: pointer;
      }
      .active_li{
        color: #BF9A50;
      }
    }
    .main{
      width: 100%;
    }
  }
}
@media screen and (max-width: 980px) {
  .user_center_page{
    min-height: 2rem;
    margin-top: 0;
    padding-top: 0.8rem;
    .user_info{
      position: relative;
      width: 100%;
      min-height: 3rem;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0 0.2rem;
      padding-top: 0.14rem;
      background-image: url($bg_url + "bondbg.webp");
      background-size: 100% 100%;
      .user_head_portrait{
        flex-direction: column;
        align-items: center;
        .user_name{
          font-weight: bold;
          color: #ECCF83;
          line-height: 0.24rem;
        }
        .invitation_code{
          width: auto;
          height: 0.24rem;
          padding: 0 0.03rem;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.04rem;
          backdrop-filter: blur(14px);
          font-weight: bold;
          color: #000000;
          line-height: 0.24rem;
          text-align: center;
          margin-top: 0.1rem;
        }
      }
      .content{
        width: 100%;
        margin-top: 0.5rem;
        flex-direction: column;
        justify-content: space-between;
        .outbox{
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 0.12rem;
          .box{
            min-height: 0.1rem;
            padding:0 0.2rem;
            min-height: 0.4rem;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: rgba(248, 229, 186, 0.23);
            border-radius: 14px;
            .coin_name{
              align-items: center;
              justify-content: space-between;
              .leftbox{
                align-items: center;
                .coin_log{
                  width: 0.14rem;
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
            .outbox_add{
              width: 80%;
              padding: 0 0.1rem;
              .onelin{
                margin-top: 0;
                height: 0.2rem;
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
          .line {
            display: none;
          }
        }
      }
      .invite_content{
        flex-direction: column;
        padding:0;
        .invite_title{
          width: 100%;
          align-items: center;
          justify-content: space-between;
          .left{
            width:49%;
            flex-direction: column;
            .income_box{
              margin-top: 0.15rem;
              width: 100%;
              height: 0.3rem;
              align-items: center;
              justify-content: space-between;
              padding: 0 0.1rem;
              background: rgba(248, 229, 186, 0.23);
              border-radius: 0.05rem;
              .imgbox{
                align-items: center;
                .homebg{
                  width: 0.15rem;
                  margin-right: 0.08rem;
                }
              }
            }
          }
        }
        .message{
          margin-top: 0.3rem;
          font-weight: normal;
          color: #ccc;
          line-height: 0.2rem;
        }
      }
      .feedback_page{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0 0.1rem;
        span{
          &:nth-child(1){
            font-weight: 600;
            line-height: 0.42rem;
            color: #FFFFFF;
            margin-top: 0.2rem;
          }
          &:nth-child(2){
            font-weight: 500;
            color: #FFFFFF;
            line-height: 0.29rem;
            margin-top: 0.15rem;
          }
        }
        
      }
      .ul_calss{
        position: absolute;
        right: 0;
        top: 0.3rem;
        display: flex;
        li{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 0.24rem;
          padding: 0 0.05rem;
          display: flex;
          align-items: center;
          color: #fff;
        }
        .active_li{
          color: #BF9A50;
        }
      }
    }
    .content_box{
      width: 100%;
      background: #000;
      padding:0.2rem;
      ul{
        display: none;
      }
      .main{
        width: 100%;
      }
    }
  }
}
</style>