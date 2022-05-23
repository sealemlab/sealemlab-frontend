<template>
  <div class="home">
    <div class="home_bgbox">
      <LoadingAnmation v-if="videoStatus" ></LoadingAnmation> <!--:isshowtxt="true"-->
      <video class="video_" ref="video" loop autoplay muted v-show="!videoStatus">
        <source :src="`${$store.state.videoUrl}home_sacredrealm.mp4`" type="video/mp4" />
      </video>
      <div class="content">
        <div class="content_center">
          <div class="leftbox">
            <p class="font_1 font26 mobile_font18">{{$t("message.home.txt2")}}</p>
            <p class="font_2 font45 demo_font_color mobile_font34">{{$t("message.home.add_txt1")}}</p>
            <div class="btnbox font20 mobile_font16">
              <span @click="bondClick">{{$t("message.home.txt3")}}</span>
              <span>{{$t("message.home.txt4")}}</span>
              <img :src="haveVoice?`${$store.state.imgUrl}voice.webp`:`${$store.state.imgUrl}no_voice.webp`" class="voice_img" @click="videoPlay"/>
            </div>
          </div>
          <div class="rightbox">
            <a :href="isEnLang?(item.link_en?item.link_en:item.link):item.link" target="_blank" rel="noopener noreferrer" v-for="(item,index) in comminicateArr" :key="index"><img :src="item.src" class="tel_img" /></a>
          </div>
        </div>
      </div>
    </div>
    <div class="content_footer">
      <div class="left">
        <span class="font30 mobile_font16">{{$t("message.home.txt5")}}</span>
        <span class="font30 mobile_font16 margin_top" :class="isEnLang?'en_Regular':'cn_lang'">{{$t("message.home.txt6")}}</span>
      </div>
      <div class="btnbox font16 mobile_font16">
        <span>{{$t("message.home.txt7")}}</span>
        <span>{{$t("message.home.txt8")}}</span>
      </div>
    </div>
    <!-- Protocol Stats -->
    <div class="characteristic_box">
      <div class="title_txt font30 mobile_font18">{{$t("message.home.txt77")}}</div>
      <div class="border_">
        <div class="add_one_box" v-for="(item,index) in addArr" :key="index">
          <div class="add_top_content">
            <img :src="item.src" class="add_img" />
            <span class="span font20">{{$t(item.title)}}</span>
          </div>
          <p class="font26">$&nbsp;{{item.num}}</p>
        </div>
      </div>
    </div>
    <!-- 希莱姆简介 -->
    <div class="character_introduction">
      <div class="right_box display_flex">
        <div class="fontbox">
          <span class="font30 span_title mobile_font18">{{$t("message.home.txt9")}}</span>
          <div class="mobile_addimg"><img :src="`${$store.state.imgUrl}people.webp`" class="people" /></div>
          <span class="txt_content font16" :class="isEnLang?'en_Regular':'cn_lang'">{{ $t("message.home.txt9_1")}}</span>
        </div>
      </div>
      <div class="people_box"><img :src="`${$store.state.imgUrl}people.webp`" class="people" /></div>
    </div>
    <!-- 游戏场景轮播 -->
    <div class="characteristic_box">
      <div class="title_txt font30 mobile_font18">{{$t("message.home.txt65")}}</div>
      <div class="add_game_txt">
        <span class="span1 font20 mobile_font14">{{$t("message.home.txt66")}}</span>
        <span class="span2 font16">{{$t("message.home.txt67")}}</span>
      </div>
      <span class="span3 font12">{{$t("message.home.txt68")}}</span>
      <div class="add_box">
        <div class="left">
          <div class="bottom_swiper">
            <swiper :options="gameMaxSwiperOption" ref="gameMaxSwiper" class="gameMax_swiper">
              <swiper-slide v-for="(item,index) in gameArr" :key="index">
                <img :src="item.maxSrc" />
              </swiper-slide>
            </swiper>
          </div>
          <span class="span4 font20">{{$t("message.home.txt69")}}</span>
          <div class="gameswiperbox">
            <swiper ref="gameswiper" :options="gameswiperOption" class="game_swiper">
              <swiper-slide v-for="(item, index) in gameArr" :key="index">
                <div class="oneimgbox" @click="gameClick(item)"><img :src="item.src" class="gameswiper_img" /></div>
              </swiper-slide>
            </swiper>
            <!-- <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->
          </div>
        </div>
        <div class="left right">
          <img :src="`${$store.state.imgUrl}game2.webp`" class="game2" />
          <img :src="`${$store.state.imgUrl}game3.webp`" class="game2" />
          <img :src="`${$store.state.imgUrl}game4.webp`" class="game2" />
        </div>
      </div>
    </div>
    <!-- 灰色区域---特点-在圣域怎么赚钱 -->
    <div class="content_">
      <!-- 特点 -->
      <div class="box_ display_flex">
        <div class="title_txt font30 mobile_font18">{{$t("message.home.txt_characteristic")}}</div>
        <div class="imgbox display_flex">
          <div class="add_outbox" :class="isEnLang?'en_class':''" v-for="(item, index) in spArr" :key="index">
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
      <div class="box_ display_flex">
        <div class="title_txt font30 mobile_font18">{{$t("message.home.txt_makemoney")}}</div>
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
    <!-- <div class="teamboxs">
      <div class="team_container display_flex">
        <div class="title_txt font30">{{$t("message.home.txt47")}}</div>
        <div class="teamswiper">
          <swiper ref="teamswiper" :options="teamswiperOption" class="team_swiper">
            <swiper-slide v-for="(item, index) in teamArr" :key="index">
              <div class="out_box display_flex">
                <div class="oneteam display_flex" @click="showtxtFun(item)">
                  <img :src="item.src" class="teaming" />
                  <span class="span1 font20">{{$t(item.name)}}</span>
                  <span class="span2 font16">{{item.txt}}</span>
                  <div class="address_peopllle display_flex">
                    <a :href="item.LinY" target="_blank" rel="noopener noreferrer" v-if="item.LinY">
                      <img :src="`${$store.state.imgUrl}in.webp`" class="ling_ying" />
                    </a>
                    <a v-if="item.twitter == ''" href="javascript:;"><img :src="`${$store.state.imgUrl}twitter.webp`" class="twitter"/></a>
                    <a v-else :href="item.twitter" target="_blank" rel="noopener noreferrer">
                      <img :src="`${$store.state.imgUrl}twitter.webp`" class="twitter"/>
                    </a>
                  </div>
                  <span class="triangle_calss" :class="item.status?'triangle_top':'triangle_bottom'"></span>
                  <div class="txtbox font12" v-if="item.status">
                    <span>{{$t(item.introduce1)}}</span>
                    <span>{{$t(item.introduce2)}}</span>
                    <span>{{$t(item.introduce3)}}</span>
                    <span v-if="item.introduce4">{{$t(item.introduce4)}}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev-add"></div>
          <div class="swiper-button-next-add"></div>
        </div>
      </div>
    </div> -->
    <!-- 时间轴 -->
    <div class="time_axis_box">
      <div class="time_axis display_flex">
        <div class="title_txt font30">{{$t("message.home.txt54")}}</div>
        <swiper :options="swiperOption" ref="mySwiper" class="self_swiper" v-if='swiperVisible'>
          <swiper-slide v-for="(item, index) in swiperArr" :key="index">
            <div class="timebox">
              <p class="time_class font20">{{item.time}}</p>
              <div class="imgs">
                <img :src="item.id == activeIndex ?`${$store.state.imgUrl}partenerbg.webp`:`${$store.state.imgUrl}time.webp`" class="partenerbg_img" />
                <span></span>
              </div>
              <p class="titletxt font18">{{$t(item.title)}}</p>
              <p class="content_class font16" >{{$t(item.content)}}</p>
            </div>
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
      haveVoice:false,//声音
      swiperVisible:true,
      addArr:[
        {src:`${this.$store.state.imgUrl}home1.webp`,num:0,title:'message.home.txt71'},
        {src:`${this.$store.state.imgUrl}home2.webp`,num:0,title:'message.home.txt72'},
        {src:`${this.$store.state.imgUrl}home3.webp`,num:0,title:'message.home.txt73'},
        {src:`${this.$store.state.imgUrl}home4.webp`,num:0,title:'message.home.txt74'},
        {src:`${this.$store.state.imgUrl}home5.webp`,num:0,title:'message.home.txt75'},
        {src:`${this.$store.state.imgUrl}home6.webp`,num:0,title:'message.home.txt76'},
      ],
      activeIndex:0,//swiper索引
      videoStatus:true,//视频加载
      gameIndex:0,//游戏场景展示对应大图的索引
      peopleIndex:0,// 人物展示对应大图的索引
      comminicateArr:[
        {
          src:`${this.$store.state.imgUrl}tel_1.webp`,
          link:'https://t.me/sealemglobal'
        },
        {
          src:`${this.$store.state.imgUrl}tel_2.webp`,
          link:'https://twitter.com/SealemLab'
        },
        {
          src:`${this.$store.state.imgUrl}tel_3.webp`,
          link:'https://discord.gg/s747pMMBzq'
        },
        {
          src:`${this.$store.state.imgUrl}tel_5.webp`,
          link:'https://sacred-realm.gitbook.io/zhong-wen/',
          link_en:'https://lab-sealem.gitbook.io/sealem-lab/'
        },
        {
          src:`${this.$store.state.imgUrl}tel_4.webp`,
          link:'https://medium.com/@sealemlab'
        }
      ],
      spArr:[
        {
          src:`${this.$store.state.imgUrl}characteristic1.webp`,
          txt:"message.home.txt10",
          txt1:"message.home.txt11",
        },
        {
          src:`${this.$store.state.imgUrl}characteristic2.webp`,
          txt:'message.home.txt12',
          txt1:'message.home.txt12_1',
        },
        {
          src:`${this.$store.state.imgUrl}characteristic3.webp`,
          txt:'message.home.txt13',
          txt1:'message.home.txt13_1',
        },
        {
          src:`${this.$store.state.imgUrl}characteristic4.webp`,
          txt:'message.home.txt14',
          txt1:'message.home.txt14_1',
        },
        {
          src:`${this.$store.state.imgUrl}characteristic5.webp`,
          txt:'message.home.txt15',
          txt1:'message.home.txt15_1',
        }
      ],
      teamArr:[
        {
          src:`${this.$store.state.imgUrl}ceo.webp`,
          txt:'CEO',
          name:'message.home.txt48', // Domlane
          status:true,
          twitter:'https://twitter.com/CryptoDomLane',
          // LinY:'',
          introduce1:'message.home.introduce1',
          introduce2:'message.home.introduce2',
          introduce3:'message.home.introduce3',
        },
        {
          src:`${this.$store.state.imgUrl}cto.webp`,
          txt:'CMO',
          name:'message.home.txt50', //Greer Phantomhive
          status:false,
          twitter:'https://twitter.com/PhantomhiveGem',
          // LinY:'',
          introduce1:'message.home.introduce4',
          introduce2:'message.home.introduce5',
          introduce3:'message.home.introduce6',
        },
        {
          src:`${this.$store.state.imgUrl}cmo.webp`,
          txt:'CTO',
          name:'message.home.txt49', //Kim Talon
          status:false,
          twitter:'https://twitter.com/TalonKim',
          // LinY:'',
          introduce1:'message.home.introduce7',
          introduce2:'message.home.introduce8',
          introduce3:'message.home.introduce9',
        },
        {
          src:`${this.$store.state.imgUrl}svp.webp`,
          txt:'SVP',
          name:'message.home.txt51',//Amelia Emma
          status:false,
          twitter:'https://twitter.com/EmmaAmelialove',
          LinY:'https://www.linkedin.com/in/amelia-emma-a11914234/',
          introduce1:'message.home.introduce10',
          introduce2:'message.home.introduce11',
          introduce3:'message.home.introduce12',
        },
        {
          src:`${this.$store.state.imgUrl}founder.webp`,
          txt:'Co-Founder',
          name:'message.home.txt52',// Tinsley-Hafen
          status:false,
          twitter:'https://twitter.com/HenryEvans0',
          LinY:'https://www.linkedin.cn/injobs/in/henry-evans-4b3566233',
          introduce1:'message.home.introduce13',
          introduce2:'message.home.introduce14',
          introduce3:'message.home.introduce15',
        },
        {
          src:`${this.$store.state.imgUrl}founder1.webp`,
          txt:'Co-Founder',
          name:'message.home.txt53',//Henry Evans
          status:false,
          twitter:'https://twitter.com/HenryEvans0',
          LinY:'https://www.linkedin.cn/injobs/in/henry-evans-4b3566233',
          introduce1:'message.home.introduce16',
          introduce2:'message.home.introduce17',
          introduce3:'message.home.introduce18',
          introduce4:'message.home.introduce19',
        }
      ],
      makeMoneyArr:[
        {txt:"message.home.txt16",src:`${this.$store.state.imgUrl}money1.webp`},
        {txt:"message.home.txt17",src:`${this.$store.state.imgUrl}money2.webp`},
        {txt:"message.home.txt18",src:`${this.$store.state.imgUrl}money3.webp`},
        {txt:"message.home.txt19",src:`${this.$store.state.imgUrl}money4.webp`},
        {txt:"message.home.txt20",src:`${this.$store.state.imgUrl}money5.webp`},
        {txt:"message.home.txt21",src:`${this.$store.state.imgUrl}money6.webp`}
      ],

      partenerArr:[{
        src:`${this.$store.state.imgUrl}partener1.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener2.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener3.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener4.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener5.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener6.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener7.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener8.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener9.webp`,
      },
      {
        src:`${this.$store.state.imgUrl}partener10.webp`,
      }
      ],
      swiperArr:[
        {
          id:4,
          title:'message.home.txt55_1',
          time:'2021 Q3',
          content:'message.home.txt55'
        },
        {
          id:5,
          title:'message.home.txt56_1',
          time:'2021 Q4',
          content:'message.home.txt56'
        },
        {
          id:6,
          title:'message.home.txt57_1',
          time:'2022 Q1',
          content:'message.home.txt57'
        },
        {
          id:7,
          title:'message.home.txt58_1',
          time:'2022 Q2',
          content:'message.home.txt58'
        },
        {
          id:8,
          title:'message.home.txt60_1',
          time:'2022 Q3',
          content:'message.home.txt60'
        },
        {
          id:9,
          title:'message.home.txt61_1',
          time:'2022 Q4',
          content:'message.home.txt61'
        },
        {
          id:10,
          title:'message.home.txt62_1',
          time:'2023 Q1',
          content:'message.home.txt62'
        },
        {
          id:11,
          title:'message.home.txt63_1',
          time:'2023 Q2',
          content:'message.home.txt63'
        },
        {
          id:12,
          title:'message.home.txt64_1',
          time:'2023 Q3',
          content:'message.home.txt64'
        },
        {
          id:13,
          title:'message.home.add_txt65_1',
          time:'2023 Q4',
          content:'message.home.add_txt65'
        }
      ],
      // 路线图swiper配置
      swiperOption:{
        loop: true,//循环播放
        centeredSlides: true, // 多个slider时居中
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        slidesPerView: 4,//一行显示的slider
        // freeMode: true,//	free模式，slide会根据惯性滑动且不会贴合
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        on: {
          slideChange: () => {
            this.activeIndex = this.$refs.mySwiper.swiper.activeIndex;
            // console.log('this.activeIndex: ', this.activeIndex);
          }
        }
      },
      // 团队swiper配置
      teamswiperOption: {
        slidesPerView: 4,
        navigation: {
          nextEl: ".swiper-button-next-add",
          prevEl: ".swiper-button-prev-add",
        }
      },
      gameArr:[
        {
          id:1,
          src:`${this.$store.state.imgUrl}smallgame1.webp`,
          maxSrc:`${this.$store.state.imgUrl}maxgame1.webp`
        },
        {
          id:2,
          src:`${this.$store.state.imgUrl}smallgame2.webp`,
          maxSrc:`${this.$store.state.imgUrl}maxgame2.webp`
        },
        {
          id:3,
          src:`${this.$store.state.imgUrl}smallgame3.webp`,
          maxSrc:`${this.$store.state.imgUrl}maxgame3.webp`
        },
        {
          id:4,
          src:`${this.$store.state.imgUrl}smallgame4.webp`,
          maxSrc:`${this.$store.state.imgUrl}maxgame4.webp`
        },
      ],
      // 游戏场景swiper配置
      gameswiperOption: {
        slidesPerView:4,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        on: {
          tap: () => {
            this.gameIndex = this.$refs.gameswiper.swiper.clickedIndex;
          },
        },
      },
      // 跟着联动的swiper
      gameMaxSwiperOption:{
        loop:true,
        autoplay: {
          delay: 1900,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        on: {
          slideChange: () => {
            this.gameIndex = this.$refs.gameMaxSwiper.swiper.activeIndex;
          },
        },
      },
    }
  },
  watch: {
    gameIndex(newVal) {
      this.$refs.gameswiper.swiper.slideTo(newVal);
      this.$refs.gameMaxSwiper.swiper.slideTo(newVal);
    },
    'isEnLang': {
      handler: function (newValue,oldValue) {
        if (newValue != oldValue) {
          this.swiperVisible = false;//通过v-if切换，重新渲染swiper
          this.$nextTick(()=>{
            this.swiperVisible = true;
          });
        }
      },
      deep: true,
      immediate: true,
    },
    
  },
  methods:{
    videoPlay() {
      this.haveVoice = !this.haveVoice
      if(this.haveVoice){
        this.$refs.video.muted = false;
        this.$refs.video.play();
      }else{
        this.$refs.video.muted = true;
      }
    },
    bondClick(){
      this.$router.push('/bond');
    },
    showtxtFun(item){
      this.teamArr.forEach(item => {
        item.status = false
      })
      item.status = true
    },
    gameClick(item){
      this.gameIndex = item.id
    }
  },
  mounted(){
    let that = this
    this.$refs.video.addEventListener('canplaythrough',function(){
      that.videoStatus = false
    });
  },
}
</script>
<style lang="scss">
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
.swiper-button-prev-add {
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url($bg_url + "btn_left.webp");
  background-size: 100% auto;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.swiper-button-next-add {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  background-image: url($bg_url + "btn_right.webp");
  background-size: 100% auto;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
<style lang="scss" soped>
.home{
  width: 100%;
  .border_{
    width: 100%;
    height: 380px;
    padding: 10px 0 10px 70px;
    border-radius: 31px;
    border: 1px solid #D3B96D;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .add_one_box{
      width: 26%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      .add_top_content{
        width: 100%;
        display: flex;
        align-items: center;
        .add_img{
          width: 32px;
        }
        .span{
          font-weight: normal;
          color: #9E9E9E;
          line-height: 22px;
          margin-left: 16px;
        }
      }
      p{
        font-weight: 800;
        color: #FFFFFF;
        line-height: 22px;
        margin-top: 40px;
      }
    }
  }
  .home_bgbox{
    position: relative;
    width: 100vw;
    height: 100vh;
    .video_{
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
    .content{
      position: absolute;
      bottom: 5vh;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 5vw;
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
    }
  }
  .content_footer{
    width: 90vw;
    margin: 0 auto;
    height: 146px;
    margin-top: 50px;
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
  .character_introduction{
    width: 90vw;
    margin: 0 auto;
    // margin-top: 70px;
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
        .mobile_addimg{
          display: none;
        }
      }
    }
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
        .en_class{
          width: 18%;
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
    background: url($bg_url + "teambg.webp") no-repeat #000;
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
        position: relative;
        width: 100%;
        .swiper-slide{
          display: flex;
          justify-content: center;
        }
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
          padding-bottom: 40px;
          flex-direction: column;
          align-items: flex-start;
          .timebox{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .imgs{
              position: relative;
              width: 100%;
              display: flex;
              align-items: center;
              margin: 60px 0;
              .partenerbg_img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 70px;
              }
              span{
                display: inline-block;
                width: 100%;
                border-top: 1px dashed #F7E7B2;
              }
            }
            .titletxt{
              font-weight: 800;
              color: #FFFFFF;
              line-height: 21px;
            }
            .time_class{
              font-weight: normal;
              color: #ffffff;
            }
            .content_class{
              margin-top: 25px;
              font-weight: normal;
              color: #FFFFFF;
              line-height: 32px;
              padding: 0 10px;
              text-align: center;
            }
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
      max-width: 1200px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      .one_partener{
        img{
          margin-bottom: 49px;
          cursor: pointer;
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
    .add_game_txt{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 68px;
      .span1{
        font-weight: normal;
        color: #FFFFFF;
        line-height: 23px;
        margin-right: 16px;
      }
      .span2{
        font-weight: normal;
        color: #ECCF83;
        line-height: 18px;
      }
    }
    .span3{
      font-weight: normal;
      color: #9E9E9E;
      line-height: 14px;
    }
    .add_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 26px;
      .left{
        width: 60%;
        display: flex;
        flex-direction: column;
        .span4{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 23px;
          margin-top: 54px;
        }
        .bottom_swiper{
          width: 100%;
          .gameMax_swiper{
            width: 100%;
            img{
              width: 100%;
            }
          }
        }
        .gameswiperbox{
          position: relative;
          width: 100%;
          margin-top: 26px;
          // padding: 0 58px;
          .game_swiper{
            width: 100%;
            .swiper-slide{
              display: flex;
              justify-content: center;
              .oneimgbox{
                max-width: 147px;
                padding:10px;
                cursor: pointer;
                .gameswiper_img{
                  width: 100%;
                }
              }
            }
          }
        }
      }
      .right{
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .game2{
          max-width: 404px;
          width: 100%;
          margin-bottom: 37px;
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
      padding: 20px 10px;
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
          margin-right: 15px;
        }
        .twitter{
          width: 23px;
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
  // .swiper-button-prev {
  //   background-image: url($bg_url + "btn_left.webp");
  //   background-size: 100% auto;
  //   width: 40px;
  // }
  // .swiper-button-next {
  //   background-image: url($bg_url + "btn_right.webp");
  //   background-size: 100% auto;
  //   width: 40px;
  // }
}
.btnbox{
  display: flex;
  align-items: center;
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
  .voice_img{
    cursor: pointer;
    width: 63px;
    margin-left: 180px;
  }
}
@media screen and (max-width: 980px) {
  .home{
    padding-top: 0.8rem;
    .border_{
      width: 100%;
      height: auto;
      padding: 0.25rem 0.2rem;
      padding-bottom: 0;
      border-radius: 0.08rem;
      border: 1px solid #D3B96D;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .add_one_box{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.25rem;
        .add_top_content{
          width: auto;
          display: flex;
          align-items: center;
          .add_img{
            width: 0.15rem;
          }
          .span{
            font-weight: normal;
            color: #9E9E9E;
            line-height: 0.22rem;
            margin-left: 0.15rem;
          }
        }
        p{
          font-weight: 800;
          color: #FFFFFF;
          line-height: 0.22rem;
          margin-top: 0;
        }
      }
    }
    .home_bgbox{
      height: 50vh;
      min-height:50vh;
      .video_{
        height: 50vh;
        object-fit: cover;
      }
      .content{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
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
              line-height: 0.49rem;
              margin: 0.05rem 0 0.2rem 0;
            }
          }
          .rightbox{
            position: absolute;
            right: 0;
            top: 44%;
            display: flex;
            align-items: center;
            .tel_img{
              width: 0.2rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
    .content_footer{
      width: 100%;
      height: auto;
      padding:0;
      margin-top: 0.48rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .left{
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        span{
          width: 100%;
          padding: 0 0.2rem;
          &:nth-child(1){
            margin-bottom: 20px;
          }
        }
      }
    }
    .character_introduction{
      width: 100%;
      padding: 0 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .people_box{
        display: none;
      }
      .right_box{
        width: 100%;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding-top: 0.5rem;
        .fontbox{
          display: flex;
          flex-direction: column;
          .title_txt{
            text-align: left;
            font-weight: bold;
            line-height: 0.21rem;
            margin: 0.82rem 0 0.17rem 0;
          }
          .txt_content{
            max-width: 100%;
            width:100%;
            font-weight: 400;
            line-height: 0.18rem;
            color: #DBDADA;
          }
          .mobile_addimg{
            display: block;
            width: 100%;
            margin-bottom: 0.2rem;
            .people{
              width: 100%;
              max-width:100%;
            }
          }
        }
      }
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
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 0.3rem;
          .add_outbox{
            width: 50%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-right:none;
            margin-bottom: 0.4rem;
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
                  width: 0.16rem;
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
                margin-top: 0.1rem;
                max-width: 1.37rem;
              }
            }
          }
        }
        .make_money{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-wrap: nowrap;
          .make_box{
            padding: 1px;
            margin-bottom: 0.15rem;
            width: 100%;
            cursor: pointer;
            transition: all 0.3s;
            background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
            .make_one{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              min-height: 0.4rem;
              padding: 0 10px;
              background: #000;
              ._span{
                font-weight: 400;
                color: #FFFFFF;
                line-height: 22px;
              }
              .money_1{
                width: 0.16rem;
              }
            }        
          }
        }
      }
    }
    .teamboxs{
      display: none;
      width: 100%;
      background: url($bg_url + "teambg.webp") no-repeat #000;
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
      width: 100%;
      background: #1F1F1F;
      .time_axis{
        width: 90vw;
        margin: 0 auto;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
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
            width: 0.73rem;
          }
          .par2{
            width: 0.89rem;
          }
          .par3{
            width: 0.94rem;
          }
          .par4{
            width: 0.86rem;
          }
          .par5{
            width: 0.88rem;
          }
          .par6{
            width: 0.72rem;
          }
          .par7{
            width: 0.67rem;
          }
          .par8{
            width: 0.73rem;
          }
          .par9{
            width: 0.93rem;
          }
          .par10{
            width: 0.93rem;
          }
        }
      }
      .add_game_txt{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.2rem 0 0.1rem;
        .span1{
          font-weight: 500;
          color: #DBDADA;
          line-height: 0.16rem;
          margin-right: 0;
          white-space:nowrap;
        }
        .span2{
          font-weight: 400;
          color: #ECCF83;
          line-height: 0.12rem;
          white-space:nowrap;
          transform: scale(0.75);
          zoom:0.8;
        }
      }
      .add_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.35rem;
        flex-direction: column;
        .left{
          width: 100%;
          display: flex;
          flex-direction: column;
          .span4{
            font-weight: 600;
            color: #DBDADA;
            line-height: 0.17rem;
            margin-top: 0.1rem;
          }
          .bottom_swiper{
            width: 100%;
            .gameMax_swiper{
              width: 100%;
              img{
                width: 100%;
              }
            }
          }
          .gameswiperbox{
            position: relative;
            width: 100%;
            margin-top: 0.1rem;
            // padding: 0 58px;
            .game_swiper{
              width: 100%;
              .swiper-slide{
                display: flex;
                justify-content: center;
                .oneimgbox{
                  max-width: 2rem;
                  width: 1.5rem;
                  padding:0.1rem;
                  cursor: pointer;
                  .gameswiper_img{
                    width: 100%;
                  }
                }
              }
            }
          }
        }
        .right{
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items:center;
          justify-content: space-between;
          .game2{
            max-width: 33%;
            width: 30%;
            margin-bottom: 0;
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
      width: 1.55rem;
      height: 0.4rem;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      border-radius: 0.04rem;
      border: 1px solid #ECCF83;
      text-align: center;
      line-height: 0.4rem;
      margin-right: 0.13rem;
      font-weight: bold;
      cursor: pointer;
      color: #000000;
      &:nth-child(2){
        border: 1px solid #ECCF83;
        background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
        margin-right: 0;
        color: #FFFFFF;
      }
    }
    .voice_img{
      display: none;
      cursor: pointer;
      width: 63px;
      margin-left: 180px;
    }
  }
}
</style>
