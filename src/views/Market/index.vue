<template>
  <div class="market_page">
    <!-- 背景图 -->
    <div class="bg_">
      <div class="top_content">
        <div class="onebox" :class="isEnLang?'en_medium':''" v-for="(item,index) in arr" :key="index">
          <span class="font12">{{item.title}}</span>
          <span class="font14">{{item.address}}</span>
        </div>
      </div>
      <div class="change_txt">Welcome to NFTs mark</div>
    </div>
    <!-- 数据总结 -->
    <div class="data_display">
      <div class="onebox" v-for="(item,index) in arr2" :key="index">
        <span class="font24" :class="isEnLang?'en_Bold':''">{{item.num}}</span>
        <span class="font16" :class="isEnLang?'en_medium':''">{{item.title}}</span>
      </div>
    </div>
    <!-- 二级导航栏 -->
    <div class="page">
      <ul class="left_nav">
        <li>
          <div class="filter_box">
            <img :src="`${$store.state.imgUrl}accrow.webp`" class="filter_img" />
            <span class="font24" :class="isEnLang?'en_Bold':''">筛选</span>
          </div>
        </li>
        <li v-for="(item,index) in navArr" :key="index">
          <div class="game" @click="showItem(item,index)">
            <div class="title_left">
              <img :src="`${$store.state.imgUrl}accrow.webp`" class="game_img" />
              <span class="font16" :class="isEnLang?'en_Bold':''">{{item.title}}</span>
            </div>
            <img :src="`${$store.state.imgUrl}accrow.webp`" class="select_img" />
          </div>
          <div class="out_content" v-if="item.showStatus">
            <div class="id_box" v-if="item.id != 4 && item.id != 5">
              <div class="content" v-for="(item1,index1) in item.arr" :key="index1" @click="itemClick(item1,index1)">
                <span class="font14" :class="isEnLang?'en_Bold':''">{{item1.title}}</span>
                <div class="checkbox">
                  <span class="correct font18" v-show="item1.status"></span>
                </div>
              </div>
            </div>
            <div class="id_box" v-if="item.id == 4">
              <div class="price_box font14" :class="isEnLang?'en_Bold':''">
                <div class="select_coin">
                  <span>ST</span>
                  <img :src="`${$store.state.imgUrl}accrow.webp`" class="select_coin_img" />
                  <!-- <div class="select_content_coin"></div> -->
                </div>
                <div class="minbox">
                  <Input
                    :fontSize="'12px'"
                    :modelValue="MinInputvalue"
                    type="number"
                    :placeholder="$t('message.bond.txt23')"
                    @input="MinInputClick"
                  ></Input>
                </div>
                <span>to</span>
                <div class="minbox">
                  <Input
                    :fontSize="'12px'"
                    :modelValue="MaxInputvalue"
                    type="number"
                    :placeholder="$t('message.bond.txt23')"
                    @input="MaxInputClick"
                  ></Input>
                </div>
              </div>
            </div>
            <div class="id_box" v-if="item.id == 5">
              <div class="content" v-for="(item1,index1) in item.arr" :key="index1" @click="itemClick(item1,index1)">
                <p>
                  <span class="font14" :class="isEnLang?'en_Bold':''">{{item1.title}}</span>
                  <img :src="`${$store.state.imgUrl}start.webp`" class="start_img" />
                </p>
                <div class="checkbox">
                  <span class="correct font18" v-show="item1.status"></span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="right_content">
        <div class="top_search">
          <div class="seach font16" :class="isEnLang?'en_medium':''">
            <img :src="`${$store.state.imgUrl}accrow.webp`" class="seach_img" />
            Search by name or traits
          </div>
          <div class="sort_box">
            <span class="font16" :class="isEnLang?'en_medium':''">Sort by</span>
            <img :src="`${$store.state.imgUrl}accrow.webp`" class="select_img_xai" />
          </div>
          <div class="sell_btn btn_normal font16" :class="isEnLang?'en_Bold':''">Sell</div>
          <div class="sell_btn btn_black font16">History</div>
        </div>
        <div class="search_items font16" :class="isEnLang?'en_medium':''">
          <img :src="`${$store.state.imgUrl}accrow.webp`" class="refresh_img" />
          6789 items
        </div>
        <div class="select_item" v-if="selectArr.length > 0">
          <div class="oneitem  font20" :class="isEnLang?'en_Bold':''" v-for="(item,index) in selectArr" :key="index" @click="closeSelect(index)">
            <span>{{item.title}}</span>
            <span>x</span>
          </div>
          <span class="clear_btn font20" :class="isEnLang?'en_Bold':''" @click="clearBtn">Clear all</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang","getUserCoin","getNoticeNum","getAccount","getAccountStatus"])
  },
  data(){
    return {
      MinInputvalue:'',
      MaxInputvalue:'',
      arr:[
        {title:'Sacred Realm NFT合约',address:'0x01hy72k9a780h78992nfikga66809'},
        {title:'ST合约',address:'0x01hy72k9a780h78992nfikga66809'},
        {title:'ST余额',address:'5.00'}
      ],
      arr2:[
        {num:'$ 1000',title:"Total volume"},
        {num:'$ 1000',title:"Floor price"},
        {num:1000,title:"Items"},
        {num:1000,title:"Transactions"},
        {num:1000,title:"Holders"},
      ],
      navArr:[
        {
          id:1,
          title:'Game',
          showStatus:false,
          arr:[
            {
              title:'Sacred Realm',
              status:false
            }
          ]
        },
        {
          id:2,
          title:'Type',
          showStatus:false,
          arr:[
            {
              title:'Mystery Box',
              status:false
            },
            {
              title:'NFT',
              status:false
            }
          ]
        },
        {
          id:3,
          title:'On sale in',
          showStatus:false,
          arr:[
            {
              title:'ST',
              status:false
            },
            {
              title:'BUSD',
              status:false
            }
          ]
        },
        {
          id:4,
          title:'Price',
          showStatus:false,
          arr:[
            {
              title:'ST',
              status:false
            },
          ]
        },
        {
          id:5,
          title:'Stars',
          showStatus:false,
          arr:[
            {title:'4',status:false},
            {title:'5',status:false},
            {title:'6',status:false},
            {title:'7',status:false},
            {title:'8',status:false},
          ]
        },
        {
          id:6,
          title:'Rarity',
          showStatus:false,
          arr:[
            {title:'Normal',status:false},
            {title:'Medium',status:false},
            {title:'Rare',status:false},
            {title:'Epic',status:false},
            {title:'Legend',status:false}
          ]
        }
      ],
      selectArr:[
        {title:"111111"},
        {title:"222222"},
        {title:"333333"},
        {title:"444444"},
        {title:"555555"},
        {title:"666666"},
        {title:"777777"},
        {title:"8"},
        {title:"9"},
        {title:"10"},
        {title:"11"},
      ]
    }
  },
  methods:{
    showItem(item,index){
      console.log('item,index: ', item,index);
      item.showStatus = !item.showStatus
    },
    itemClick(item,index){
      console.log('item,index: ', item,index);
      item.status = !item.status
    },
    MinInputClick(data){
      console.log('data: ', data);
    },
    MaxInputClick(data){
      console.log('data: ', data);
    },
    closeSelect(index){
      this.selectArr.splice(index,1)
    },
    clearBtn(){
      this.selectArr = []
    }
  }
}
</script>
<style lang="scss" scoped>
.market_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  .bg_{
    width: 100%;
    min-height: 393px;
    background:url($bg_url + "marketbg.webp") no-repeat #000;
    background-size:100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 5vw 60px;
    .top_content{
      width: 100%;
      display: flex;
      padding-top: 90px;
      .onebox{
        padding: 5px 20px;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 4px;
        border: 1px solid #373636;
        display: flex;
        flex-direction: column;
        margin-right: 15px;
        span{
          &:nth-child(1){
            font-weight: 500;
            color: #8F8E8E;
            line-height: 12px;
          }
          &:nth-child(2){
            font-weight: 500;
            color: #CED3D9;
            line-height: 14px;
            margin-top: 5px;
          }
        }
      }
    }
    .change_txt{
      width: 100%;
    }
  }
  .data_display{
    width: 90vw;
    margin: 63px auto 70px;
    display: flex;
    .onebox{
      display: flex;
      flex-direction: column;
      margin-right: 50px;
      span{
        &:nth-child(1){
          font-weight: bold;
          color: #CED3D9;
          line-height: 29px;
        }
        &:nth-child(2){
          font-weight: 500;
          color: #CED3D9;
          line-height: 19px;
        }
      }
    }
  }
  .page{
    width: 90vw;
    margin: 0 auto;
    display: flex;
    .left_nav{
      width: 177px;
      display: flex;
      flex-direction: column;
      li{
        width: 100%;
        border-bottom: 1px solid #373636;
        padding-bottom: 25px;
        margin-bottom: 25px;
        &:nth-child(1){
          border: none;
          padding-bottom: 0;
        }
        .filter_box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
          .filter_img{
            width: 30px;
          }
          span{
            font-weight: 600;
            color: #CED3D9;
            line-height: 33px;
          }
        }
        .game{
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .title_left{
            display: flex;
            align-items: center;
            .game_img{
              width: 20px;
              margin-right: 10px;
            }
            span{
              font-weight: bold;
              color: #CED3D9;
              line-height: 19px;
            }
          }
          .select_img{
            width: 12px;
          }
          &:hover{
            .title_left{
              span{
                color: #EDD083;
              }
            }
          }
        }
        .out_content{
          width: 100%;
          display: flex;
          flex-direction:column;
          cursor: pointer;
          .id_box{
            width: 100%;
            display: flex;
            flex-direction:column;
            .content{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 25px;
              span{
                font-weight: bold;
                color: #CED3D9;
                line-height: 16px;
              }
              .checkbox{
                width: 25px;
                height: 25px;
                background: #171718;
                box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
                border-radius: 4px;
                border: 1px solid #373636;
                display: flex;
                justify-content: center;
                align-items: center;
                .correct:before {
                  content: "\2714";
                  color: #EDD083;
                }
              }
              p{
                display: flex;
                align-items: center;
                .start_img{
                  width: 17px;
                  margin-left: 4px;
                }
              }
            }
            .price_box{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 25px;
              .select_coin{
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 55px;
                height: 25px;
                background: #171718;
                box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
                border-radius: 4px;
                border: 1px solid #373636;
                .select_coin_img{
                  width: 12px;
                }
              }
              span{
                font-weight: bold;
                color: #CED3D9;
                line-height: 16px;
              }
              .minbox{
                width: 42px;
                height: 25px;
                background: #171718;
                box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
                border-radius: 4px;
                border: 1px solid #373636;
                padding: 0 3px;
              }
            }
          }
        }
      }
    }
    .right_content{
      width: calc(100% - 177px);
      display: flex;
      flex-direction: column;
      padding-left: 50px;
      .top_search{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .seach{
          width: 35%;
          height: 40px;
          background: #2C2B2B;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
          border-radius: 20px;
          border: 1px solid #373636;
          padding-left:13px;
          font-weight: 500;
          color: #8F8E8E;
          display: flex;
          align-items: center;
          .seach_img{
            width: 20px;
            margin-right: 5px;
          }
        }
        .sort_box{
          width: 30%;
          height: 40px;
          background: #171718;
          box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 4px;
          border: 1px solid #373636;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
          .select_img_xai{
            width: 12px;
          }
          span{
            font-weight: 500;
            color: #8F8E8E;
          }
        }
        .sell_btn{
          min-width: 130px;
          width: 15%;
          height: 48px;
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 4px;
          backdrop-filter: blur(14px);
          text-align: center;
          line-height: 48px;
          font-weight: bold;
        }
      }
      .search_items{
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 500;
        color: #CED3D9;
        margin: 34px 0 31px;
        .refresh_img{
          width: 22px;
          margin-right: 5px;
        }
      }
      .select_item{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .oneitem{
          cursor: pointer;
          min-width: 130px;
          height: 40px;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 4px;
          border: 1px solid #373636;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          margin-right: 30px;
          margin-bottom: 15px;
        }
        .clear_btn{
          cursor: pointer;
          font-weight: bold;
          color: #CED3D9;
          line-height: 40px;
        }
      }
    }
  }
}
</style>