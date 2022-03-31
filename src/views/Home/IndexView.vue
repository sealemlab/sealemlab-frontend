<template>
  <div class="home">
    <div class="home_bgbox">
      <img src="../../assets/images/homebg.png" class="homebg" />
      <div class="content_box display_flex">
        <div class="top_box display_flex">
          <div class="left_box display_flex">
            <div class="token_box display_flex">
              <span class="token_txt font28" :class="isEnLang?'en_special':'cn_lang'">{{ $t("message.home.txt1")}}</span>
              <img src="../../assets/images/tokenimg.png" class="tokenimg" />
            </div>
            <div class="coin_box display_flex">
              <div class="sr_box display_flex">
                <div class="line_sr display_flex">
                  <img src="../../assets/images/srlogo.png" class="srlogo" />
                  <span class="sr_price font22" :class="isEnLang?'en_Bold':'cn_lang'">$12.25</span>
                </div>
                <div class="sr_address display_flex">
                  <span class="sr_address_txt font18">SR: 0x73CA0db...4Ce2850894</span>
                  <img src="../../assets/images/copy.png" class="copy" />
                </div>
              </div>
              <div class="sr_box display_flex">
                <div class="line_sr margin_30 display_flex">
                  <img src="../../assets/images/stlogo.png" class="srlogo" />
                  <span class="sr_price font22" :class="isEnLang?'en_Bold':'cn_lang'">$12.25</span>
                </div>
                <div class="sr_address margin_30 display_flex">
                  <span class="sr_address_txt font18">ST: 0x73CA0db...4Ce2850894</span>
                  <img src="../../assets/images/copy.png" class="copy" />
                </div>
              </div>
            </div>
          </div>
          <div class="left_box display_flex">
            <div class="token_box display_flex">
              <span class="token_txt font28" :class="isEnLang?'en_special':'cn_lang'">{{ $t("message.home.txt2")}}</span>
              <img src="../../assets/images/tobuyimg.png" class="tobuyimg" />
            </div>
            <div class="link_ display_flex">
              <img src="../../assets/images/tel.png" class="link_img" />
              <img src="../../assets/images/git.png" class="link_img" />
              <img src="../../assets/images/game.png" class="link_img" />
              <img src="../../assets/images/m.png" class="link_img last_img" />
            </div>
          </div>
        </div>
        <div class="bottom_box display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
          <div class="btn font28">
            {{ $t("message.home.txt3")}}
          </div>
          <div class="btn font28 btn2" >
            {{ $t("message.home.txt4")}}
          </div>
        </div>
      </div>
    </div>
    <!-- 什么是圣域 -->
    <div class="character_introduction display_flex">
      <div class="people_box"><img src="../../assets/images/people.png" class="people" /></div>
      <div class="right_box display_flex">
        <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt5")}}</span>
        <img src="../../assets/images/people_line.png" class="people_line" />
        <span class="txt_content font16" :class="isEnLang?'en_Regular':'cn_lang'">{{ $t("message.home.txt6")}}</span>
        <span class="txt_content font16" :class="isEnLang?'en_Regular':'cn_lang'">{{ $t("message.home.txt7")}}</span>
      </div>
    </div>
    <!-- 特点 -->
    <div class="characteristic_box display_flex tedianbg">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt8")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <div class="imgbox display_flex">
        <div class="onebox display_flex" :class="isEnLang?'en_Regular':'cn_lang'" v-for="(item, index) in spArr" :key="index">
          <img :src="item.src" class="img_sp" />
          <span class="txt font14">{{$t(item.txt)}}</span>
          <span class="txt font14" v-if="item.txt1">{{$t(item.txt1)}}</span>
        </div>
      </div>
    </div>
    <!-- 在圣域怎么赚钱 -->
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt9")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <div class="imgbox display_flex">
        <div class="txtbox display_flex font16" :class="isEnLang?'en_Regular':'cn_lang'" v-for="(item, index) in makeMoneyArr" :key="index">
          {{$t(item.txt)}}
        </div>
      </div>
    </div>
    <!-- 游戏人物展示 -->
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt21")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <div class="show_peoplebox display_flex">
        <div class="left_people display_flex">
          <img :src="item.src" class="people1" @click="peopleClick(index)" v-for="(item,index) in peopleArr" :key="index" />
        </div>
        <div class="right_maxpeople">
          <img :src="peopleArr[peopleIndex].maxSrc" class="peoplemax"/>
          <p class="add_title font45" :class="isEnLang?'en_Bold':'cn_lang'">{{$t(peopleArr[peopleIndex].title)}}</p>
          <p class="add_content font16" :class="isEnLang?'en_Regular':'cn_lang'">{{$t(peopleArr[peopleIndex].describe)}}</p>
          <p class="add_content font16" :class="isEnLang?'en_Regular':'cn_lang'" v-if="peopleArr[peopleIndex].supplementContent">{{$t(peopleArr[peopleIndex].supplementContent)}}</p>
        </div>
      </div>
    </div>
    <!-- 游戏场景展示 -->
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt46")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <div class="game_scene">
        <!-- 跟着联动的swiper -->
        <div class="bottom_swiper">
          <swiper :options="gameMaxSwiperOption" ref="gameMaxSwiper" class="gameMax_swiper">
            <swiper-slide v-for="(item,index) in gameArr" :key="index">
              <img :src="item.maxSrc" />
            </swiper-slide>
          </swiper>
        </div>
        <!-- 点击的swiper -->
        <div class="position_img display_flex" style="min-height: 240px;">
          <swiper :options="gameSwiperOption" ref="gameSwiper" class="game_swiper">
            <swiper-slide v-for="(item,index) in gameArr" :key="index">
              <img :src="item.src" @click="gameClick(item)" class="gameScene1" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!-- 团队 -->
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt47")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <div class="team_box display_flex">
        <div class="top_team display_flex">
          <div class="out_box display_flex" :class="{margin0:index == 1}" v-for="(item, index) in teamArr" :key="index">
            <div class="oneteam display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
              <img :src="item.src" class="teaming" />
              <span class="span1 font20">{{$t(item.name)}}</span>
              <span class="span2 font16">{{item.txt}}</span>
              <div class="address_peopllle display_flex">
                <img src="../../assets/images/in.png" class="ling_ying" />
                <img src="../../assets/images/twitter.png" class="twitter" />
              </div>
            </div>
          </div>
        </div>
        <div class="top_team display_flex">
          <div class="out_box display_flex" v-for="(item, index) in teamArr1" :key="index">
            <div class="oneteam display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
              <img :src="item.src" class="teaming" />
              <span class="span1 font20">{{$t(item.name)}}</span>
              <span class="span2 font16">{{item.txt}}</span>
              <div class="address_peopllle display_flex">
                <img src="../../assets/images/in.png" class="ling_ying" />
                <img src="../../assets/images/twitter.png" class="twitter" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 时间轴 -->
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt54")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <swiper :options="swiperOption" ref="mySwiper" class="self_swiper">
        <swiper-slide v-for="(item, index) in swiperArr" :key="index">
          <p class="time_class font20" :class="isEnLang?'en_Bold':'cn_lang'">{{item.time}}</p>
          <p class="content_class font16" :class="isEnLang?'en_Bold':'cn_lang'">{{$t(item.content)}}</p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 合作者 -->
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt font45" :class="isEnLang?'en_Bold':'cn_lang'">{{ $t("message.home.txt59")}}</span>
      <img src="../../assets/images/people_line.png" class="people_line" />
      <div class="partener_box display_flex">
        <div class="one_partener display_flex" :class="{ en_Regular: isEnLang }" v-for="(item, index) in partenerArr" :key="index">
          <img :src="item.src" :class="{par1:index == 0,par2:index == 1,par3:index == 2,par4:index == 3}" />
        </div>
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
    return{
      gameIndex:0,//游戏场景展示对应大图的索引
      peopleIndex:0,// 人物展示对应大图的索引
      inter:'',
      datatxt:'《圣域》是一款基于区块链技术的大型多人在线MORPG游戏,游戏采用虚幻4引擎打造,有着超精致的画面表现、动作性以及打击感。',
      spArr:[
        {
          src:require('../../assets/images/characteristic1.png'),
          txt:"message.home.txt10",
          txt1:"message.home.txt11",
        },
        {
          src:require('../../assets/images/characteristic2.png'),
          txt:'message.home.txt12',
        },
        {
          src:require('../../assets/images/characteristic3.png'),
          txt:'message.home.txt13',
        },
        {
          src:require('../../assets/images/characteristic4.png'),
          txt:'message.home.txt14',
        }
      ],
      teamArr:[
        {
          src:require('../../assets/images/ceo.png'),
          txt:'CEO',
          name:'message.home.txt48'
        },
        {
          src:require('../../assets/images/cto.png'),
          txt:'CTO',
          name:'message.home.txt49'
        },
      ],
      teamArr1:[
        {
          src:require('../../assets/images/cmo.png'),
          txt:'CMO',
          name:'message.home.txt50'
        },
        {
          src:require('../../assets/images/svp.png'),
          txt:'SVP',
          name:'message.home.txt51'
        },
        {
          src:require('../../assets/images/founder.png'),
          txt:'Co-Founder',
          name:'message.home.txt52'
        },
        {
          src:require('../../assets/images/founder1.png'),
          txt:'Co-Founder',
          name:'message.home.txt53'
        }
      ],
      makeMoneyArr:[
        {txt:"message.home.txt15"},
        {txt:"message.home.txt16"},
        {txt:"message.home.txt17"},
        {txt:"message.home.txt18"},
        {txt:"message.home.txt19"},
        {txt:"message.home.txt20"}
      ],
      partenerArr:[{
        src:require('../../assets/images/partener1.png'),
      },
      {
        src:require('../../assets/images/partener2.png'),
      },
      {
        src:require('../../assets/images/partener3.png'),
      },
      {
        src:require('../../assets/images/partener4.png'),
      }
      ],
      swiperArr:[
        {
          time:'2022 Q1',
          content:'message.home.txt55'
        },
        {
          time:'2022 Q2',
          content:'message.home.txt56'
        },
        {
          time:'2022 Q3',
          content:'message.home.txt57'
        },
        {
          time:'2022 Q4',
          content:'message.home.txt58'
        }
      ],
      swiperOption:{
        loop: true,//循环播放
        mousewheel: true,//鼠标滚动
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        slidesPerView: 4,//一行显示的slider
        // centeredSlides : true,
        freeMode: true,//	free模式，slide会根据惯性滑动且不会贴合
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
      },
      // 点击的swiper
      gameSwiperOption:{
        slidesPerView: 3, // 一行展示几个
        slidesPerColumn: 2, //设置多行布局里面每列的slide数量
        on: {
          tap: () => {
            this.gameIndex = this.$refs.gameSwiper.swiper.clickedIndex;
          },
        },
      },
      // 跟着联动的swiper
      gameMaxSwiperOption:{
        loop:true,
        on: {
          slideChange: () => {
            this.gameIndex = this.$refs.gameMaxSwiper.swiper.activeIndex;
          },
        },
      },
      peopleArr:[
        {
          src:require('../../assets/images/people1.png'),
          maxSrc:require('../../assets/images/peoplemax1.png'),
          title:"message.home.txt22",
          describe:"message.home.txt23",
          supplementContent:"message.home.txt24"
        },
        {
          src:require('../../assets/images/people2.png'),
          maxSrc:require('../../assets/images/peoplemax2.png'),
          title:"message.home.txt25",
          describe:"message.home.txt26",
          supplementContent:"message.home.txt27"
        },
        {
          src:require('../../assets/images/people3.png'),
          maxSrc:require('../../assets/images/peoplemax3.png'),
          title:"message.home.txt28",
          describe:"message.home.txt29",
          supplementContent:"message.home.txt30"
        },
        {
          src:require('../../assets/images/people4.png'),
          maxSrc:require('../../assets/images/peoplemax4.png'),
          title:"message.home.txt31",
          describe:"message.home.txt32",
          supplementContent:"message.home.txt33"
        },
        {
          src:require('../../assets/images/people5.png'),
          maxSrc:require('../../assets/images/peoplemax5.png'),
          title:"message.home.txt34",
          describe:"message.home.txt35",
          supplementContent:"message.home.txt36"
        },
        {
          src:require('../../assets/images/people6.png'),
          maxSrc:require('../../assets/images/peoplemax6.png'),
          title:"message.home.txt37",
          describe:"message.home.txt38",
          supplementContent:"message.home.txt39"
        },
        // {
        //   src:require('../../assets/images/people7.png'),
        //   maxSrc:require('../../assets/images/peoplemax7.png'),
        //   title:"message.home.txt40",
        //   describe:"message.home.txt41",
        //   supplementContent:"message.home.txt42"
        // }
      ],
      gameArr:[
        {
          id:1,
          src:require('../../assets/images/game1.png'),
          maxSrc:require('../../assets/images/gameSceneMax1.png')
        },
        {
          id:2,
          src:require('../../assets/images/game2.png'),
          maxSrc:require('../../assets/images/gameSceneMax2.png')
        },
        {
          id:3,
          src:require('../../assets/images/game3.png'),
          maxSrc:require('../../assets/images/gameSceneMax3.png')
        },
        {
          id:4,
          src:require('../../assets/images/game4.png'),
          maxSrc:require('../../assets/images/gameSceneMax4.png')
        },
        {
          id:5,
          src:require('../../assets/images/game5.png'),
          maxSrc:require('../../assets/images/gameSceneMax5.png')
        },
        {
          id:6,
          src:require('../../assets/images/game6.png'),
          maxSrc:require('../../assets/images/gameSceneMax6.png')
        }
      ]
    }
  },
  watch: {
    gameIndex(newVal) {
      this.$refs.gameSwiper.swiper.slideTo(newVal);
      this.$refs.gameMaxSwiper.swiper.slideTo(newVal);
    },
  },
  methods:{
    peopleClick(index){
      this.peopleIndex = index
    },
    gameClick(item){
      this.gameIndex = item.id
    },
    typewriting(){
      let index=0
      const that = this
      function type(){
        that.inter = that.datatxt.substring(0,index++);
      }
      let timenull = setInterval(() => {
        if(that.inter.length == that.datatxt.length){
          clearInterval(timenull)
          return
        }
        // console.log("定时器执行中")
        type()
      },100);
    }
  },
  mounted(){
    this.typewriting()
  }
}
</script>
<style>
.my-bullet{
  width: 93px;
  height: 3px;
  background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
  opacity: 0.28;
  display: inline-block;
  margin: 0 10px;
}
.my-bullet-active{
  opacity: 1;
  background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
}
</style>
<style lang="scss" soped>
.home{
  width: 100%;
  margin-top: -80px;
  .home_bgbox{
    width: 100%;
    position: relative;
    .homebg{
      width: 100%;
      object-fit: contain;
    }
    .content_box{
      position: absolute;
      bottom: 6px;
      left: 0;
      width: 100%;
      flex-direction: column;
      padding: 0 49.5px;
      .top_box{
        width: 100%;
        justify-content: space-between;
        .left_box{
          // flex: 1;
          flex-direction: column;
          .token_box{
            width: 100%;
            align-items: center;
            .token_txt{
              color: #FFFFFF;
              line-height: 29px;
              background:linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .tokenimg{
              margin-left: 5px;
              width: 371px;
              object-fit: contain;
            }
            .tobuyimg{
              margin-left: 5px;
              width: 206px;
              object-fit: contain;
            }
          }
          .coin_box{
            width: 100%;
            margin-top: 13px;
            .sr_box{
              flex: 1;
              flex-direction: column;
              .line_sr{
                width: 217px;
                height: 40px;
                align-items: center;
                background-image: url("../../assets/images/coinbg.png");
                background-size: 100% 100%;
                padding: 0 20px;
                .srlogo{
                  width: 29px;
                  object-fit: contain;
                }
                .sr_price{
                  margin-left: 20px;
                  font-weight: bold;
                  color: #FFFFFF;
                }
              }
              .margin_30{
                margin-left: 30px;
              }
              .sr_address{
                width: 100%;
                align-items: center;
                margin-top: 13px;
                .sr_address_txt{
                  margin-right: 5px;
                  font-weight: bold;
                  color: #FFFFFF;
                  line-height: 23px;
                }
                .copy{
                  width: 13px;
                  cursor: pointer;
                }
              }
            }
          }
          .link_{
            width: 100%;
            margin-top: 13px;
            align-items: center;
            .link_img{
              width: 52px;
              object-fit: contain;
              margin-right: 30px;
              cursor: pointer;
            }
            .last_img{
              margin-right: 0;
            }
          }
        }
      }
      .bottom_box{
        margin-top: 77px;
        width: 100%;
        align-items: center;
        justify-content: center;
        .btn{
          cursor: pointer;
          font-weight: bold;
          color: #381A02;
          width: 249px;
          height: 71px;
          text-align: center;
          line-height: 71px;
          background-size: 100% 100%;
          background-image: url("../../assets/images/buynft.png");
        }
        .btn2{
          margin-left: 82px;
        }
      }
    }
  }
  .character_introduction{
    width: 90vw;
    margin: 0 auto;
    justify-content: center;
    .people_box{
      width: 40%;
      .people{
        width: 100%;
        object-fit: contain;
      }
    }
    .right_box{
      width: 60%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title_txt{
        font-weight: 400;
        color: #00C1FF;
        line-height: 54px;
        background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .txt_content{
        width: 60%;
        font-weight: normal;
        color: #FFFFFF;
        line-height: 32px;
      }
    }
  }
  .tedianbg{
    background: url("../../assets/images/tedianbg.png") no-repeat;
    background-size: 100% 100%;
    height: auto;
  }
  .characteristic_box{
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 130px;
    .title_txt{
      font-weight: normal;
      color: #00C1FF;
      line-height: 45px;
      background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .imgbox{
      width: 90vw;
      justify-content: space-around;
      flex-wrap: wrap;
      .onebox{
        flex-direction: column;
        align-items: center;
        .img_sp{
          width: 79px;
          object-fit: contain;
        }
        .txt{
          font-weight: 400;
          color: #FFFFFF;
          line-height: 32px;
        }
      }
      .txtbox{
        width: 318px;
        height: 52px;
        justify-content: center;
        align-items: center;
        background-image: url("../../assets/images/makemoneybg.png");
        background-size: 100% 100%;
        // margin-right: 121px;
        margin-bottom: 83px;
        font-weight: normal;
        color: #FFFFFF;
        cursor: pointer;
        transition: all 0.3s;
      }
      .txtbox:hover{
        transform: scale(1.2);
      }
    }
    .show_peoplebox{
      width: 90vw;
      margin: 0 auto;
      // justify-content: center;
      align-items: flex-start;
      .left_people{
        width: 34%;
        max-height: 115vh;
        overflow-y: auto;
        overflow-x: hidden;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-around;
        .people1{
          width:46%;
          object-fit: contain;
          // margin-right: 14px;
          margin-bottom: 20px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .people1:hover{
          transform: scale(1.1);
        }
      }
      .right_maxpeople{
        width: 66%;
        .peoplemax{
          width: 100%;
          object-fit: contain;
        }
        .add_title{
          font-weight: normal;
          color: #00C1FF;
          line-height: 45px;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 30px 0;
        }
        .add_content{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 32px;
        }
      }
    }
    .game_scene{
      width: 100%;
      position: relative;
      .bottom_swiper{
        width: 100%;
        .gameMax_swiper{
          width: 100%;
          img{
            width: 100%;
          }
        }
      }
      .position_img{
        width: 714px;
        position: absolute;
        bottom: 31px;
        .game_swiper{
          width: 100%;
          .swiper-slide{
            height: 50%;
            .gameScene1{
              width: 95%;
              cursor: pointer;
            }
          }
        }
      }
    }
    .team_box{
      margin-top: 52px;
      width: 100%;
      flex-direction: column;
      align-items: center;
      .top_team{
        justify-content: center;
        align-items: center;
        .out_box{
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          padding: 1px;
          margin-right: 50px;
          margin-bottom: 90px;
          width: 229px;
          border-radius: 29px;
          cursor: pointer;
          transition: all 0.3s;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          .oneteam{
            border-radius: 29px;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 20px 0;
            background: #000;
            .teaming{
              width: 124px;
              object-fit: contain;
            }
            .span1{
              margin:28px 0 6px;
              font-weight: bold;
              color: #FFFFFF;
              line-height: 32px;
              background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .span2{
              font-weight: bold;
              color: #FFFFFF;
              line-height: 32px;
              margin-bottom: 10px;
            }
            .address_peopllle{
              justify-content: center;
              align-items: center;
              .ling_ying{
                width: 19px;
                object-fit: contain;
              }
              .twitter{
                width: 23px;
                object-fit: contain;
                margin-left: 15px;
              }
            }
          }
        }
        .out_box:hover{
          transform: scale(1.2);
        }
      }
    }
    .partener_box{
      width: 100%;
      justify-content: space-around;
      align-items: center;
      .one_partener{
        .par1{
          width: 196px;
          object-fit: contain;
        }
        .par2{
          width: 245px;
          object-fit: contain;
        }
        .par3{
          width: 194px;
          object-fit: contain;
        }
        .par4{
          width: 247px;
          object-fit: contain;
        }
      }
    }
    .self_swiper{
      width:90vw;
      margin: 0 auto;
      .swiper-slide{
        display: flex;
        height: 220px;
        flex-direction: column;
        align-items: flex-start;
        .time_class{
          font-weight: normal;
          color: #00C1FF;
          line-height: 26px;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .content_class{
          max-width: 80%;
          font-weight: normal;
          color: #FFFFFF;
          line-height: 32px;
          margin-top: 10px;
        }
      }
    }
  }
  .make_money_people{
    margin-top: 150px;
  }
  
}
.people_line{
  width: 646px;
  object-fit: contain;
  margin: 38px 0;
}
@media screen and (min-width: 1440px) {
  .home{
    .character_introduction{
      .people_box{
        width: 30%;
      }
    }
    .characteristic_box{
      .imgbox {
        width: 49vw;
        max-width: 60vw;
      }
      .show_peoplebox{
        .left_people{
          max-height: 79vh;
        }
      }
    }
  }
}
</style>
