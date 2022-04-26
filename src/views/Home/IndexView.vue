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
              <img :src="item.src" class="money_1" />
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
        <div class="teamswiper">
          <swiper ref="teamswiper" :options="teamswiperOption" class="team_swiper">
            <swiper-slide v-for="(item, index) in teamArr" :key="index">
              <div class="out_box display_flex">
                <div class="oneteam display_flex" >
                  <img :src="item.src" class="teaming" />
                  <span class="span1 font20">{{$t(item.name)}}</span>
                  <span class="span2 font16">{{item.txt}}</span>
                  <div class="address_peopllle display_flex">
                    <img src="../../assets/images/in.png" class="ling_ying" />
                    <img src="../../assets/images/twitter.png" class="twitter" />
                  </div>
                  <span class="triangle_calss" :class="item.status?'triangle_top':'triangle_bottom'" @click="showtxtFun(item)"></span>
                  <div class="txtbox font12" v-if="item.status">
                    <span>哈利法科学技术大学</span>
                    <span>曾在IT-Serve任职</span>
                    <span>2017年担任Crypto Bulls CEO</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
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
        <div class="one_partener display_flex" v-for="(item, index) in partenerArr" :key="index">
          <img :src="item.src" 
          :class="{par1:index == 0,
          par2:index == 1,
          par3:index == 2,
          par4:index == 3,
          par5:index == 4,
          par6:index == 5,
          par7:index == 6,
          par8:index == 7,
          par9:index == 8,
          par10:index == 9
          }"
          />
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
          name:'message.home.txt48',
          status:true
        },
        {
          src:require('../../assets/images/cto.png'),
          txt:'CTO',
          name:'message.home.txt49',
          status:false
        },
        {
          src:require('../../assets/images/cmo.png'),
          txt:'CMO',
          name:'message.home.txt50',
          status:false
        },
        {
          src:require('../../assets/images/founder.png'),
          txt:'Co-Founder',
          name:'message.home.txt52',
          status:false
        },
        {
          src:require('../../assets/images/founder1.png'),
          txt:'Co-Founder',
          name:'message.home.txt53',
          status:false
        },
        {
          src:require('../../assets/images/svp.png'),
          txt:'SVP',
          name:'message.home.txt51',
          status:false
        }
      ],
      makeMoneyArr:[
        {txt:"message.home.txt16",src:require("../../assets/images/money1.png")},
        {txt:"message.home.txt17",src:require("../../assets/images/money2.png")},
        {txt:"message.home.txt18",src:require("../../assets/images/money3.png")},
        {txt:"message.home.txt19",src:require("../../assets/images/money4.png")},
        {txt:"message.home.txt20",src:require("../../assets/images/money2.png")},
        {txt:"message.home.txt21",src:require("../../assets/images/money2.png")}
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
      },
      {
        src:require('../../assets/images/partener5.png'),
      },
      {
        src:require('../../assets/images/partener6.png'),
      },
      {
        src:require('../../assets/images/partener7.png'),
      },
      {
        src:require('../../assets/images/partener8.png'),
      },
      {
        src:require('../../assets/images/partener9.png'),
      },
      {
        src:require('../../assets/images/partener10.png'),
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
        // loop: true,//循环播放
        // mousewheel: true,//鼠标滚动
        // autoplay: {
        //   delay: 1000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false,
        // },
        slidesPerView: 3,//一行显示的slider
        // centeredSlides : true,
        freeMode: true,//	free模式，slide会根据惯性滑动且不会贴合
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
      },
      teamswiperOption: {
        slidesPerView: 4,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      },
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
    showtxtFun(item){
      item.status = !item.status
    }
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
          cursor: pointer;
          transition: all 0.3s;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          border-radius: 8px;
          .make_one{
            display: flex;
            align-items: center;
            border-radius: 8px;
            width: 100%;
            padding:10px;
            background: #000;
            padding-left: 26px;
            .money_1{
              width: 61px;
              margin-right: 21px;
            }
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
    }
    .teamswiper{
      width: 100%;
      padding: 0 45px;
      .team_swiper{
        width: 100%;
        .swiper-slide{
          display: flex;
          justify-content: center;
        }
      }
      .swiper-button-prev {
        background-image: url("../../assets/images/nftimage/btn_left.png");
        background-size: 100% auto;
        width: 40px;
      }
      .swiper-button-next {
        background-image: url("../../assets/images/nftimage/btn_right.png");
        background-size: 100% auto;
        width: 40px;
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
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      .one_partener{
        img{
          margin-bottom: 49px;
        }
        .par1{
          width: 169px;
        }
        .par2{
          width: 208px;
        }
        .par3{
          width: 222px;
        }
        .par4{
          width: 235px;
        }
        .par5{
          width: 207px;
        }
        .par6{
          width: 169px;
        }
        .par7{
          width: 159px;
        }
        .par8{
          width: 173px;
        }
        .par9{
          width: 220px;
        }
        .par10{
          width: 220px;
        }
      }
    }
  }
  .out_box{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1px;
    border-radius: 29px;
    cursor: pointer;
    transition: all 0.3s;
    background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
    .oneteam{
      min-width: 190px;
      border-radius: 29px;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      background: #1F1F1F;
      .teaming{
        width: 124px;
      }
      .span1{
        margin:28px 0 6px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 32px;
      }
      .span2{
        font-weight: bold;
        color: #9E9E9E;
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
      .triangle_calss{
        width: 0px;
        height: 0px;
        border: 8px solid transparent;
        margin: 15px 0;
      }
      .triangle_bottom{
        border-top-color: #ccc;
      }
      .triangle_top{
        border-bottom-color: #ccc;
      }
      .txtbox{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          font-weight: normal;
          color: #9E9E9E;
          line-height: 18px;
        }
      }
    }
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
    .out_box{
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 1px;
      margin-right: 50px;
      margin-bottom: 70px;
      border-radius: 29px;
      cursor: pointer;
      transition: all 0.3s;
      background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
      .oneteam{
        border-radius: 29px;
        flex-direction: column;
        align-items: center;
        padding: 20px 40px;
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
