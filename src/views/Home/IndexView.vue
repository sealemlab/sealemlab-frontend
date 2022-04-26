<template>
  <div class="home">
    <div class="home_bgbox">
      <img src="../../assets/images/homebg.png" class="homebg" />
      <div class="content">
        <!-- <span class="home_font font45 demo_font_color">{{ $t("message.home.txt1") }}</span> -->
        <div class="content_center">
          <div class="leftbox">
            <p class="font_1 font26 mobile_font14">{{$t("message.home.txt2")}}</p>
            <p class="font_2 font45 demo_font_color mobile_font14">1000% APY</p>
            <div class="btnbox font20">
              <span @click="bondClick">{{$t("message.home.txt3")}}</span>
              <span>{{$t("message.home.txt4")}}</span>
            </div>
          </div>
          <div class="rightbox">
            <img src="../../assets/images/tel_1.png" class="tel_img" />
            <img src="../../assets/images/tel_2.png" class="tel_img" />
            <img src="../../assets/images/tel_3.png" class="tel_img" />
            <img src="../../assets/images/tel_4.png" class="tel_img" />
          </div>
        </div>
        <div class="content_footer">
          <div class="left">
            <span class="font30">{{$t("message.home.txt5")}}</span>
            <span class="font30 margin_top" :class="isEnLang?'en_Regular':'cn_lang'">{{$t("message.home.txt6")}}</span>
          </div>
          <div class="btnbox font16 mobile_font14">
            <span>{{$t("message.home.txt7")}}</span>
            <span>{{$t("message.home.txt8")}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 什么是圣域 -->
    <div class="character_introduction">
      <div class="right_box display_flex">
        <div class="fontbox">
          <span class="font30 span_title mobile_font18">{{$t("message.home.txt9")}}</span>
          <span class="txt_content font16" :class="isEnLang?'en_Regular':'cn_lang'">{{ $t("message.home.txt9_1")}}</span>
        </div>
      </div>
      <div class="people_box"><img src="../../assets/images/people.png" class="people" /></div>
    </div>
    <!-- 灰色区域---特点-在圣域怎么赚钱 -->
    <div class="content_">
      <!-- 特点 -->
      <div class="box_ display_flex">
        <div class="title_txt font30 mobile_font16">{{$t("message.home.txt_characteristic")}}</div>
        <div class="imgbox display_flex">
          <div class="add_outbox" v-for="(item, index) in spArr" :key="index">
            <div class="onebox display_flex">
              <div class="add_content">
                <img :src="item.src" class="img_sp" />
                <span class="txt font20 mobile_font14">{{$t(item.txt)}}</span>
              </div>
              <span class="txt1 font14" :class="isEnLang?'en_Regular':'cn_lang'">{{$t(item.txt1)}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 在圣域怎么赚钱 -->
      <div class="box_ make_money_people display_flex">
        <div class="title_txt font30">{{$t("message.home.txt_makemoney")}}</div>
        <div class="make_money">
          <div class="make_box" v-for="(item, index) in makeMoneyArr" :key="index">
            <div class="make_one">
              <span class="_span font16" :class="isEnLang?'en_Regular':'cn_lang'">{{$t(item.txt)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 团队 -->
    <div class="teamboxs">
      <div class="team_container display_flex">
        <div class="title_txt font30">{{$t("message.home.txt47")}}</div>
        <div class="team_box display_flex">
          <div class="top_team display_flex">
            <div class="out_box display_flex" :class="{margin_right0:index == 1}" v-for="(item, index) in teamArr" :key="index">
              <div class="oneteam display_flex" >
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
              <div class="oneteam display_flex" >
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
        <img src="../../assets/images/team_ag1.png" class="team_ag1" />
        <img src="../../assets/images/team_ag2.png" class="team_ag2" />
      </div>
    </div>
    <!-- 时间轴 -->
    <div class="time_axis_box">
      <div class="time_axis display_flex">
        <div class="title_txt font30">{{$t("message.home.txt54")}}</div>
        <swiper :options="swiperOption" ref="mySwiper" class="self_swiper">
          <swiper-slide v-for="(item, index) in swiperArr" :key="index">
            <p class="time_class font20" >{{item.time}}</p>
            <p class="content_class font16" >{{$t(item.content)}}</p>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- 合作者 -->
    <div class="characteristic_box display_flex">
      <div class="title_txt font30">{{$t("message.home.txt59")}}</div>
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
          txt1:'message.home.txt12_1',
        },
        {
          src:require('../../assets/images/characteristic3.png'),
          txt:'message.home.txt13',
          txt1:'message.home.txt13_1',
        },
        {
          src:require('../../assets/images/characteristic4.png'),
          txt:'message.home.txt14',
          txt1:'message.home.txt14_1',
        },
        {
          src:require('../../assets/images/characteristic5.png'),
          txt:'message.home.txt15',
          txt1:'message.home.txt15_1',
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
          src:require('../../assets/images/founder.png'),
          txt:'Co-Founder',
          name:'message.home.txt52'
        },
        {
          src:require('../../assets/images/founder1.png'),
          txt:'Co-Founder',
          name:'message.home.txt53'
        },
        {
          src:require('../../assets/images/svp.png'),
          txt:'SVP',
          name:'message.home.txt51'
        }
      ],

      makeMoneyArr:[
        {txt:"message.home.txt16"},
        {txt:"message.home.txt17"},
        {txt:"message.home.txt18"},
        {txt:"message.home.txt19"},
        {txt:"message.home.txt20"},
        {txt:"message.home.txt21"}
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
          time:'2020 Q4',
          content:'message.home.txt55'
        },
        {
          time:'2021 Q1',
          content:'message.home.txt56'
        },
        {
          time:'2021 Q2',
          content:'message.home.txt57'
        },
        {
          time:'2021 Q3',
          content:'message.home.txt58'
        },
        {
          time:'2021 Q4',
          content:'message.home.txt60'
        },
        {
          time:'2022 Q1',
          content:'message.home.txt61'
        },
        {
          time:'2022 Q2',
          content:'message.home.txt62'
        },
        {
          time:'2022 Q3',
          content:'message.home.txt63'
        },
        {
          time:'2022 Q4',
          content:'message.home.txt64'
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
        slidesPerView: 3,//一行显示的slider
        // centeredSlides : true,
        freeMode: true,//	free模式，slide会根据惯性滑动且不会贴合
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
      }
    }
  },
  watch: {
    gameIndex(newVal) {
      this.$refs.gameSwiper.swiper.slideTo(newVal);
      this.$refs.gameMaxSwiper.swiper.slideTo(newVal);
    },
  },
  methods:{
    bondClick(){
      this.$router.push('/bond');
    },
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
  width: 10px;
  height: 10px;
  background: #000000;
  opacity: 0.28;
  display: inline-block;
  margin: 0 10px;
  border-radius: 50%;
}
.my-bullet-active{
  opacity: 1;
  background: #ECCF83;
}
</style>
<style lang="scss" soped>
.home{
  width: 100%;
  .home_bgbox{
    width: 100%;
    position: relative;
    .homebg{
      width: 100%;
    }
    .content{
      position: absolute;
      top: 305px;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 5vw;
      // .home_font{
      //   font-weight: bold;
      //   color: #FFFFFF;
      //   line-height: 63px;
      //   letter-spacing: 4px;
      //   width: fit-content;
      //   background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      //   -webkit-background-clip: text;
      //   -webkit-text-fill-color: transparent;
      // }
      .content_center{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 173px;
        .leftbox{
          display: flex;
          flex-direction: column;
          .font_1{
            font-weight: bold;
            color: #FFFFFF;
            line-height: 22px;
          }
          .font_2{
            font-weight: bolder;
            color: #FFFFFF;
            line-height: 54px;
            margin: 13px 0 28px 0;
          }
        }
        .rightbox{
          display: flex;
          align-items: center;
          .tel_img{
            width: 42px;
            margin-right: 26px;
          }
        }
      }
      .content_footer{
        width: 100%;
        height: 146px;
        margin-top: 100px;
        display: flex;;
        justify-content: space-between;
        align-items: center;
        .left{
          display: flex;
          flex-direction: column;
          .margin_top{
            margin-top: 10px;
          }
        }
      }
    }
  }
  .character_introduction{
    width: 90vw;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    .people_box{
      width: 50%;
      .people{
        width: 100%;
        max-width: 480px;
      }
    }
    .right_box{
      width: 50%;
      flex-direction: column;
      position: relative;
      padding-top: 150px;
      .fontbox{
        display: flex;
        flex-direction: column;
        .span_title{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 34px;
          margin-bottom: 30px;
        }
        .txt_content{
          max-width: 500px;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }
  }
  .margintop{
    margin-top: 200px;
  }
  .content_{
    width: 100%;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1F1F1F;
    margin-top: 30px;
    .box_{
      width: 90vw;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .imgbox{
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 100px;
        .add_outbox{
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right:1px solid #D4BA76;
          &:nth-child(1){
            justify-content: flex-start;
          }
          .onebox{
            flex-direction: column;
            align-items: center;
            &:nth-child(1){
              padding-left: 0;
            }
            .add_content{
              width: 100%;
              display: flex;
              align-items: center;
              .img_sp{
                width: 49px;
              }
              .txt{
                font-weight: 600;
                color: #FFFFFF;
                line-height: 22px;
                margin-left: 8px;
              }
            }
            .txt1{
              font-weight: 400;
              margin-top: 10px;
            }
          }
        }
      }
      .make_money{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .make_box{
          padding: 1px;
          margin-bottom: 44px;
          width: 30%;
          min-height: 92px;
          cursor: pointer;
          transition: all 0.3s;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          .make_one{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 0 10px;
            background: #000;
            ._span{
              font-weight: 400;
              color: #FFFFFF;
              line-height: 22px;
            }
          }        
        }
      }
    }
  }
  .teamboxs{
    width: 100%;
    background: url("../../assets/images/teambg.png") no-repeat #000;
    background-size: 100% 100%;
    .team_container{
      position: relative;
      width: 90vw;
      margin: 0 auto;
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      padding-bottom: 100px;
      .team_ag1{
        width: 191px;
        position: absolute;
        right: 50px;
        bottom: -100px;
      }
      .team_ag2{
        width: 75px;
        position: absolute;
        left: 160px;
        bottom: -40px;
      }
    }
  }
  .time_axis_box{
    width: 100%;
    background: #1F1F1F;
    .time_axis{
      width: 90vw;
      margin: 0 auto;
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .self_swiper{
        width:100%;
        .swiper-slide{
          display: flex;
          // height: 260px;
          padding-bottom: 40px;
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
  }
  .title_txt{
    width: 100%;
    font-weight: bold;
    line-height: 36px;
    margin-bottom: 68px;
  }
  .characteristic_box{
    width: 90vw;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    .partener_box{
      width: 100%;
      justify-content: space-around;
      align-items: center;
      .one_partener{
        .par1{
          width: 196px;
          
        }
        .par2{
          width: 245px;
          
        }
        .par3{
          width: 194px;
          
        }
        .par4{
          width: 247px;
          
        }
      }
    }
  }
  .team_box{
    width: 100%;
    flex-direction: column;
    align-items: center;
    .top_team{
      justify-content: center;
      align-items: center;
    }
  }
  .out_box{
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 1px;
    margin-right: 50px;
    margin-bottom: 70px;
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
          
        }
        .twitter{
          width: 23px;
          
          margin-left: 15px;
        }
      }
    }
  }
  .out_box:hover{
    transform: scale(1.2);
  }
  .make_box:hover{
    transform: scale(1.2);
  }
}
.btnbox{
  display: flex;
  span{
    width: 170px;
    height: 45px;
    border-radius: 4px;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    backdrop-filter: blur(14px);
    text-align: center;
    line-height: 43px;
    margin-right: 43px;
    cursor: pointer;
    color: #000000;
    &:nth-child(2){
      border: 1px solid #ECCF83;
      background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
      margin-right: 0;
      color: #FFFFFF;
    }
  }
}
@media screen and (max-width: 980px) {
  .home{
    padding-top: 0.8rem;
    .home_bgbox{
      .content{
        position: absolute;
        top: 1rem;
        left: 0%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.2rem;
        // .home_font{
        //   font-weight: bold;
        //   color: #FFFFFF;
        //   line-height: 0.2rem;
        //   letter-spacing: 4px;
        //   width: fit-content;
        // }
        .content_center{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.33rem;
          .leftbox{
            display: flex;
            flex-direction: column;
            .font_1{
              font-weight: bold;
              color: #FFFFFF;
              line-height: 0.22rem;
            }
            .font_2{
              font-weight: bolder;
              color: #FFFFFF;
              line-height: 0.16rem;
              margin: 0.05rem 0 0.2rem 0;
            }
          }
          .rightbox{
            display: flex;
            align-items: center;
            .tel_img{
              width: 0.1rem;
              margin-right: 0.13rem;
            }
          }
        }
        .content_footer{
          width: 100%;
          height: 1.2rem;
          padding: 0.2rem 0.1rem;
          margin-top: 0.48rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .left{
            display: flex;
            flex-direction: column;
            .margin_top{
              margin-top: 10px;
            }
          }
        }
      }
    }
    .character_introduction{
      width: 100%;
      padding: 0 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .people_box{
        width: 100%;
        .people{
          width: 100%;
          max-width:100%;
        }
      }
      .right_box{
        width: 100%;
        flex-direction: column;
        align-items: center;
        position: relative;
        .fontbox{
          display: flex;
          flex-direction: column;
          align-items: center;
          .title_txt{
            text-align: left;
            font-weight: bold;
            line-height: 0.21rem;
            margin: 0.82rem 0 0.17rem 0;
          }
          .txt_content{
            width:100%;
            font-weight: 400;
            line-height: 0.14rem;
          }
        }
      }
    }
    .margintop{
      margin-top: 2rem;
    }
    .title_txt{
      width: 100%;
      font-weight: bold;
      line-height: 0.19rem;
      margin-bottom: 0.3rem;
    }
    .content_{
      width: 100%;
      padding-top: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #1F1F1F;
      margin-top: 0.3rem;
      .box_{
        .imgbox{
          width: 100%;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
          .onebox{
            flex-direction: column;
            border-right:none;
            padding:0 10px;
            margin-bottom: 0.25rem;
            &:nth-child(1){
              padding-left: 0;
            }
            .img_sp{
              width: .38rem;
            }
            .txt{
              font-weight: bold;
              color: #FFFFFF;
              line-height: 12px;
              margin: 10px 0;
            }
            .txt1{
              font-weight: 400;
              max-width: 100%;
            }
          }
        }
        .make_money{
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .make_box{
            padding: 1px;
            margin-bottom: 44px;
            width: 30%;
            min-height: 92px;
            cursor: pointer;
            transition: all 0.3s;
            background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
            .make_one{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              padding: 0 10px;
              background: #000;
              ._span{
                font-weight: 400;
                color: #FFFFFF;
                line-height: 22px;
              }
            }        
          }
        }
      }
    }
    .teamboxs{
      display: none;
      width: 100%;
      background: url("../../assets/images/teambg.png") no-repeat #000;
      background-size: 100% 100%;
      .team_container{
        position: relative;
        width: 90vw;
        margin: 0 auto;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        padding-bottom: 100px;
        .team_ag1{
          width: 191px;
          position: absolute;
          right: 50px;
          bottom: -100px;
        }
        .team_ag2{
          width: 75px;
          position: absolute;
          left: 160px;
          bottom: -40px;
        }
      }
    }
    .time_axis_box{
      display: none;
      width: 100%;
      background: #1F1F1F;
      .time_axis{
        width: 90vw;
        margin: 0 auto;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .self_swiper{
          width:100%;
          .swiper-slide{
            display: flex;
            // height: 260px;
            padding-bottom: 40px;
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
    }
    .characteristic_box{
      width: 90vw;
      margin: 0 auto;
      flex-direction: column;
      align-items: center;
      margin-top: 0.4rem;
      .partener_box{
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .one_partener{
          .par1{
            width: 0.55rem;
          }
          .par2{
            width: 0.55rem;
          }
          .par3{
            width: 0.55rem;
          }
          .par4{
            width: 0.55rem;
          }
        }
      }
    }
    .team_box{
      width: 100%;
      flex-direction: column;
      align-items: center;
      .top_team{
        justify-content: center;
        align-items: center;
      }
    }
    .out_box{
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 1px;
      margin-right: 50px;
      margin-bottom: 70px;
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
            
          }
          .twitter{
            width: 23px;
            
            margin-left: 15px;
          }
        }
      }
    }
  }
  .btnbox{
    span{
      width: 0.97rem;
      height: 0.29rem;
      background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
      border-radius: 0.04rem;
      border: 1px solid #ECCF83;
      text-align: center;
      line-height: 0.29rem;
      margin-right: 0.13rem;
      cursor: pointer;
      &.active{
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      }
      &:nth-child(2){
        margin-right: 0;
      }
    }
  }
}
// @media screen and (min-width: 1440px) {
//   .home{
//     .character_introduction{
//       .people_box{
//         width: 30%;
//       }
//     }
//     .characteristic_box{
//       .imgbox {
//         width: 49vw;
//         max-width: 60vw;
//       }
//     }
//   }
// }

</style>
