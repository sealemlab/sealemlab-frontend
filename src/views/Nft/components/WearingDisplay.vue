<template>
  <!-- 穿戴展示 -->
  <div class="show_box">
    <p class="wear_show font30 mobile_font18" :class="isEnLang?'en_Bold':''">
      {{$t("message.nft.txt31")}}
    </p>
    <div class="content">
      <div class="tab_box">
        <div class="add_out_">
          <div :class="{ li_class1: index == 0,li_class2: index == 1,li_class3: index == 2,li_class4: index == 3,li_active_calss:index == currentClass}" :style="{backgroundImage:(index == currentClass?`url(${item.image})`:'')}" class="li" v-for="(item, index) in tabClassArr" :key="index" @click="clickTabClass(index)">
            <div class="font16 border_type">{{ $t(item.label) }}</div>
          </div>
        </div>
        <div class="add_introduce font16">{{$t(tabClassArr[currentClass].classIntroduce)}}</div>
      </div>
      <div class="left_content">
        <div class="swiperbox_1">
          <swiper ref="swiper1" :options="swiperOption1">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFigureArr" :key="index">
              <div class="video_bg_box">
                <img :src="`${$store.state.imgUrl}mp4bg5.webp`" class="video_bgimg" />
                <video :src="`${item}`" class="video_" ref="video" loop autoplay muted></video>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiperbox_2">
          <swiper ref="swiper2" :options="swiperOption2">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFashionArr" :key="index">
              <div class="img_box" :class="{ active: currentSwiperIndex == index }">
                <img :src="item.src" alt="" />
              </div>
            </swiper-slide>
          </swiper>
          <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> -->
        </div>
      </div>
      <div class="right_content">
        <ul>
          <li class="font20 mobile_font16" :class="isEnLang?'en_Bold':''">
            {{ $t(tabClassArr[currentClass].arms) }}:<span class="font16">{{ $t(tabClassArr[currentClass].skill_content) }}</span> 
          </li>
          <li class="font20 mobile_font16" :class="isEnLang?'en_Bold':''">
            {{ $t(tabClassArr[currentClass].skill) }}
          </li>
          <li>
            <div class="skill_img_box">
              <img :src="item.src" :class="skillIndex == index?'addborder':''" v-for="(item, index) in tabClassArr[currentClass].skills" :key="index" @click="skillClick(index)"/>
            </div>
            <div class="skill_box" v-if="skillIndex != -1">
              <p>{{$t(tabClassArr[currentClass].skills[skillIndex].title)}}</p>
              <p>{{$t(tabClassArr[currentClass].skills[skillIndex].content)}}</p>
            </div>
          </li>
        </ul>
        <div class="start_box font12">
          <p>
            <span class="font26 mobile_font18">11</span>
            <img :src="`${$store.state.imgUrl}start.webp`" /></p>
          <p class="font26 mobile_font18" :class="isEnLang?'en_Bold':''">{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title6)}}</p>
          <p class="font16 mobile_font14" :class="isEnLang?'en_Bold':''">{{$t("message.nft.txt127")}}</p>
          <p>{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title8)}}</p>
          <p>{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title9)}}</p>
          <p>{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title10)}}</p>
          <p class="font16 mobile_font14" :class="isEnLang?'en_Bold':''">{{$t("message.nft.txt131")}}</p>
          <p>{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title12)}}</p>
          <p>{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title13)}}</p>
          <p class="font16 mobile_font14" :class="isEnLang?'en_Bold':''">{{$t("message.nft.txt225")}}</p>
          <p>{{$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title14)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      skillIndex:-1,//技能的索引
      currentClass: 0,
      tabClassArr: [
        {
          image: `${this.$store.state.imgUrl}nav_nft_zs_active.webp`,
          label: "message.nft.txt9",//角斗士
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15_1",
          classIntroduce: "message.nft.txt14_1",
          skills: [
            {
              src:`${this.$store.state.imgUrl}skill_jds_1.webp`,
              title:'message.nft.txt58',
              content:'message.nft.txt59'
            },
            {
              src:`${this.$store.state.imgUrl}skill_jds_2.webp`,
              title:'message.nft.txt60',
              content:'message.nft.txt61'
            },
            {
              src:`${this.$store.state.imgUrl}skill_jds_3.webp`,
              title:'message.nft.txt62',
              content:'message.nft.txt63'
            },
            {
              src:`${this.$store.state.imgUrl}skill_jds_4.webp`,
              title:'message.nft.txt64',
              content:'message.nft.txt65'
            },
            {
              src:`${this.$store.state.imgUrl}skill_jds_5.webp`,
              title:'message.nft.txt66',
              content:'message.nft.txt67'
            },
          ],
          classFigureArr: [
            `${this.$store.state.videoUrl}PC_Gl_Set11_Total_Icon_01.mp4`,
            `${this.$store.state.videoUrl}PC_Gl_Set11_Total_Icon_02.mp4`,
            `${this.$store.state.videoUrl}PC_Gl_Set11_Total_Icon_03.mp4`,
            `${this.$store.state.videoUrl}PC_Gl_Set11_Total_Icon_04.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}PC_Gl_Set11_Total_Icon_01.webp`,
              title6:"message.nft.txt126",
              title8:"message.nft.txt128", 
              title9:"message.nft.txt129",
              title10:"message.nft.txt130",
              title12:"message.nft.txt132",
              title13:"message.nft.txt133",
              title14:"message.nft.txt134"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Gl_Set11_Total_Icon_02.webp`,
              title6:"message.nft.txt98",
              title8:"message.nft.txt101", 
              title9:"message.nft.txt102",
              title10:"message.nft.txt103",
              title12:"message.nft.txt105",
              title13:"message.nft.txt106",
              title14:"message.nft.txt107"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Gl_Set11_Total_Icon_03.webp`,
              title6:"message.nft.txt108",
              title8:"message.nft.txt110", 
              title9:"message.nft.txt111",
              title10:"message.nft.txt112",
              title12:"message.nft.txt114",
              title13:"message.nft.txt115",
              title14:"message.nft.txt116"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Gl_Set11_Total_Icon_04.webp`,
              title6:"message.nft.txt117",
              title8:"message.nft.txt119", 
              title9:"message.nft.txt120",
              title10:"message.nft.txt121",
              title12:"message.nft.txt123",
              title13:"message.nft.txt124",
              title14:"message.nft.txt125"
            }
          ]
        },
        {
          image: `${this.$store.state.imgUrl}nav_nft_jds_active.webp`,
          label: "message.nft.txt8",//战士
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15",
          classIntroduce: "message.nft.txt14",
          skills: [
            {
              src:`${this.$store.state.imgUrl}skill_zs_1.webp`,
              title:'message.nft.txt88',
              content:'message.nft.txt89'
            },
            {
              src:`${this.$store.state.imgUrl}skill_zs_2.webp`,
              title:'message.nft.txt90',
              content:'message.nft.txt91'
            },
            {
              src:`${this.$store.state.imgUrl}skill_zs_3.webp`,
              title:'message.nft.txt92',
              content:'message.nft.txt93'
            },
            {
              src:`${this.$store.state.imgUrl}skill_zs_4.webp`,
              title:'message.nft.txt94',
              content:'message.nft.txt95'
            },
            {
              src:`${this.$store.state.imgUrl}skill_zs_5.webp`,
              title:'message.nft.txt96',
              content:'message.nft.txt97'
            },
          ],
          classFigureArr: [
            `${this.$store.state.videoUrl}PC_Fi_Set11_Total_Icon_01.mp4`,
            `${this.$store.state.videoUrl}PC_Fi_Set11_Total_Icon_02.mp4`,
            `${this.$store.state.videoUrl}PC_Fi_Set11_Total_Icon_03.mp4`,
            `${this.$store.state.videoUrl}PC_Fi_Set11_Total_Icon_04.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}PC_Fi_Set11_Total_Icon_01.webp`,
              title6:"message.nft.txt126",
              title8:"message.nft.txt128", 
              title9:"message.nft.txt129",
              title10:"message.nft.txt130",
              title12:"message.nft.txt132",
              title13:"message.nft.txt133",
              title14:"message.nft.txt134"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Fi_Set11_Total_Icon_02.webp`,
              title6:"message.nft.txt189",
              title8:"message.nft.txt191", 
              title9:"message.nft.txt192",
              title10:"message.nft.txt193",
              title12:"message.nft.txt195",
              title13:"message.nft.txt196",
              title14:"message.nft.txt197"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Fi_Set11_Total_Icon_03.webp`,
              title6:"message.nft.txt198",
              title8:"message.nft.txt200", 
              title9:"message.nft.txt201",
              title10:"message.nft.txt202",
              title12:"message.nft.txt204",
              title13:"message.nft.txt205",
              title14:"message.nft.txt206"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Fi_Set11_Total_Icon_04.webp`,
              title6:"message.nft.txt207",
              title8:"message.nft.txt209", 
              title9:"message.nft.txt210",
              title10:"message.nft.txt211",
              title12:"message.nft.txt213",
              title13:"message.nft.txt214",
              title14:"message.nft.txt215"
            }
          ]
        },
        {
          image: `${this.$store.state.imgUrl}nav_nft_wushi_active.webp`,
          label: "message.nft.txt10",//巫师
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15_3",
          classIntroduce: "message.nft.txt14_3",
          skills: [
            {
              src:`${this.$store.state.imgUrl}skill_ws_1.webp`,
              title:'message.nft.txt78',
              content:'message.nft.txt79'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ws_2.webp`,
              title:'message.nft.txt80',
              content:'message.nft.txt81'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ws_3.webp`,
              title:'message.nft.txt82',
              content:'message.nft.txt83'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ws_4.webp`,
              title:'message.nft.txt84',
              content:'message.nft.txt85'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ws_5.webp`,
              title:'message.nft.txt86',
              content:'message.nft.txt87'
            },
          ],
          classFigureArr: [
            `${this.$store.state.videoUrl}PC_Wi_Set11_Total_Icon_01.mp4`,
            `${this.$store.state.videoUrl}PC_Wi_Set11_Total_Icon_02.mp4`,
            `${this.$store.state.videoUrl}PC_Wi_Set11_Total_Icon_03.mp4`,
            `${this.$store.state.videoUrl}PC_Wi_Set11_Total_Icon_04.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}PC_Wi_Set11_Total_Icon_01.webp`,
              title6:"message.nft.txt126",
              title8:"message.nft.txt128", 
              title9:"message.nft.txt129",
              title10:"message.nft.txt130",
              title12:"message.nft.txt132",
              title13:"message.nft.txt133",
              title14:"message.nft.txt134"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Wi_Set11_Total_Icon_02.webp`,
              title6:"message.nft.txt135",
              title8:"message.nft.txt137", 
              title9:"message.nft.txt138",
              title10:"message.nft.txt139",
              title12:"message.nft.txt141",
              title13:"message.nft.txt142",
              title14:"message.nft.txt143"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Wi_Set11_Total_Icon_03.webp`,
              title6:"message.nft.txt144",
              title8:"message.nft.txt146", 
              title9:"message.nft.txt147",
              title10:"message.nft.txt148",
              title12:"message.nft.txt150",
              title13:"message.nft.txt151",
              title14:"message.nft.txt152"
            },
            {
              src:`${this.$store.state.imgUrl}PC_Wi_Set11_Total_Icon_04.webp`,
              title6:"message.nft.txt153",
              title8:"message.nft.txt155", 
              title9:"message.nft.txt156",
              title10:"message.nft.txt157",
              title12:"message.nft.txt159",
              title13:"message.nft.txt160",
              title14:"message.nft.txt161"
            }
          ],
        },
        {
          image: `${this.$store.state.imgUrl}new_nav_nft_cike_active.webp`,
          label: "message.nft.txt11",//刺客
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15_2",
          classIntroduce: "message.nft.txt14_2",
          skills: [
            {
              src:`${this.$store.state.imgUrl}skill_ck_1.webp`,
              title:'message.nft.txt68',
              content:'message.nft.txt69'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ck_2.webp`,
              title:'message.nft.txt70',
              content:'message.nft.txt71'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ck_3.webp`,
              title:'message.nft.txt72',
              content:'message.nft.txt73'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ck_4.webp`,
              title:'message.nft.txt74',
              content:'message.nft.txt75'
            },
            {
              src:`${this.$store.state.imgUrl}skill_ck_5.webp`,
              title:'message.nft.txt76',
              content:'message.nft.txt77'
            },
          ],
          classFigureArr: [
            `${this.$store.state.videoUrl}PC_As_Set11_Total_Icon_01.mp4`,
            `${this.$store.state.videoUrl}PC_As_Set11_Total_Icon_02.mp4`,
            `${this.$store.state.videoUrl}PC_As_Set11_Total_Icon_03.mp4`,
            `${this.$store.state.videoUrl}PC_As_Set11_Total_Icon_04.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}PC_As_Set11_Total_Icon_01.webp`,
              title6:"message.nft.txt126",
              title8:"message.nft.txt128", 
              title9:"message.nft.txt129",
              title10:"message.nft.txt130",
              title12:"message.nft.txt132",
              title13:"message.nft.txt133",
              title14:"message.nft.txt134"
            },
            {
              src:`${this.$store.state.imgUrl}PC_As_Set11_Total_Icon_02.webp`,
              title6:"message.nft.txt162",
              title8:"message.nft.txt164", 
              title9:"message.nft.txt165",
              title10:"message.nft.txt166",
              title12:"message.nft.txt168",
              title13:"message.nft.txt169",
              title14:"message.nft.txt170"
            },
            {
              src:`${this.$store.state.imgUrl}PC_As_Set11_Total_Icon_03.webp`,
              title6:"message.nft.txt171",
              title8:"message.nft.txt173", 
              title9:"message.nft.txt174",
              title10:"message.nft.txt175",
              title12:"message.nft.txt177",
              title13:"message.nft.txt178",
              title14:"message.nft.txt179"
            },
            {
              src:`${this.$store.state.imgUrl}PC_As_Set11_Total_Icon_04.webp`,
              title6:"message.nft.txt180",
              title8:"message.nft.txt182", 
              title9:"message.nft.txt183",
              title10:"message.nft.txt184",
              title12:"message.nft.txt186",
              title13:"message.nft.txt187",
              title14:"message.nft.txt188"
            }
          ],
        },
      ],
      currentSwiperIndex: 0,
      swiperOption1: {
        observer: true,
        observeParents: true,
        grabCursor: true,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        on: {
          slideChange: () => {
            this.currentSwiperIndex = this.$refs.swiper1.swiper.activeIndex;
          },
        },
      },
      swiperOption2: {
        slidesPerView: 4,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        //   disabledClass: "swiper-button-disabled",
        // },
        observer: true,
        observeParents: true,
        grabCursor: true,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        on: {
          tap: () => {
            this.currentSwiperIndex = this.$refs.swiper2.swiper.clickedIndex;
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["isEnLang"])
  },
  watch: {
    currentSwiperIndex(newVal) {
      this.$refs.swiper1.swiper.slideTo(newVal);
      this.$refs.swiper2.swiper.slideTo(newVal);
    }
  },
  methods: {
    clickTabClass(index) {
      this.currentClass = index;
      this.skillIndex = 0
    },
    skillClick(index) {
      this.skillIndex = index;
    },
  }
};
</script>

<style lang="scss" scoped>
.show_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  .wear_show{
    width: 100%;
    // margin-bottom: 42px;
    // padding: 0 20%;
    // text-align: center;
    font-weight: 600;
    color: #CED3D9;
    line-height: 42px;
  }
  .tab_box {
    max-width: 200px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    .add_introduce{
      font-weight: 400;
      color: #CED3D9;
      line-height: 22px;
      margin-top: 20px;
    }
    .add_out_{
      display: flex;
      flex-direction: column;
      .li {
        cursor: pointer;
        display: flex;
        width: 141px;
        padding: 10px;
        margin-bottom: 20px;
        .border_type{
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          line-height: 33px;
        }
      }
      .li_active_calss{
        width: 194px;
        height: 102px;
        padding: 20px;
        margin-bottom: 10px;
        .border_type{
          color:#CED3D9;
        }
      }
      .li_class1{
        background: url($bg_url + 'nav_nft_zs.webp') no-repeat #000;
      }
      .li_class2{
        background: url($bg_url + 'nav_nft_jds.webp') no-repeat #000;
      }
      .li_class3{
        background: url($bg_url + 'nav_nft_wushi.webp') no-repeat #000;
      }
      .li_class4{
        background: url($bg_url + 'nav_nft_cike.webp') no-repeat #000;
      }
    }
  }
  .content{
    width: 100%;
    display: flex;
    margin-top: 30px;
    background:url($bg_url + "swiper_bg1.webp") no-repeat #000;
    // background-size: 100% 100%;
    background-size: cover;
    .left_content{
      width: 55%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .swiperbox_1{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .swiper-slide{
          display: flex;
          justify-content: center;
          align-items: center;
          .video_bg_box{
            width: 318px;
            height: 446px;
            position: relative;
            .video_bgimg{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            .video_{
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 100px;
            }
          }
        }
        
      }
      .swiperbox_2{
        width: 100%;
        position: relative;
        margin-top: 130px;
        .img_box {
          width: 75px;
          height: 75px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url($bg_url + "nft_class1_fashion_normal.webp");
          background-size: 100% 100%;
          padding: 10px;
          &.active {
            background-image: url($bg_url + "nft_class1_fashion_active.webp");
            background-size: 100% 100%;
          }
          img {
            width: 80%;
          }
        }
        .swiper-slide {
          display: flex;
          justify-content: center;
          width: fit-content;
        }
        .swiper-button-prev {
          background-image: url($bg_url + "btn_left.webp");
          background-size: 100% auto;
          width: 40px;
          left: -40px;
        }
        .swiper-button-next {
          background-image: url($bg_url + "btn_right.webp");
          background-size: 100% auto;
          width: 40px;
          right: -40px;
        }
        .swiper-button-disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
    .right_content{
      background: rgba(248, 229, 186, 0.06);
      border-radius: 12px;
      backdrop-filter: blur(4px);
      padding: 10px;
      ul {
        width: 100%;
        height: auto;
        color: #CED3D9;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          line-height: 28px;
          &:nth-child(1){
            color: #ECCF83;
            margin-top: 20px;
            span{
              font-weight: 400;
              color: #CED3D9;
              line-height: 22px;
              margin-left: 10px;
            }
          }
          &:nth-child(2){
            color: #ECCF83;
            margin-top: 15px;
          }
          &:nth-child(3){
            margin-top: 17px;
            width: 100%;
            display: flex;
            flex-direction: column;
            .skill_img_box{
              width: 100%;
              display: flex;
              align-items: center;
              img{
                width: 42px;
                margin-right: 10px;
                cursor: pointer;
              }
              .addborder{
                width: 45px;
                border: 1px solid #ECCF83;
                border-radius: 50%;
              }
            }
            .skill_box{
              width: 100%;
              display: flex;
              flex-direction: column;
              p{
                &:nth-child(1){
                  font-weight: 400;
                  color: #CED3D9;
                  line-height: 26px;
                  margin-top: 15px;
                }
                &:nth-child(2){
                  margin-top: 5px;
                  font-weight: 400;
                  color: #CED3D9;
                  line-height: 20px;
                }
              }
            }
          }
        }
      }
      .start_box{
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        p{
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #8F8E8E;
          line-height: 15px;
          span{
            color: #ECCF83;
          }
          &:nth-child(1),&:nth-child(2){
            margin-bottom: 10px;
            font-weight: 800;
            color: #ECCF83;
            line-height: 31px;
            span{
              font-weight: 800;
              color: #ECCF83;
              line-height: 31px;
            }
            img{
              width: 25px;
              margin-left: 5px;
            }
          }
          &:nth-child(3),&:nth-child(7),&:nth-child(10){
            font-weight: bold;
            color: #CED3D9;
            line-height: 26px;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .show_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top:0.3rem;
    .wear_show{
      width: 100%;
      margin-bottom:0;
      padding: 0;
      text-align: left;
      font-weight: bold;
      color: #CED3D9;
      line-height: 0.21rem;
    }
    .tab_box {
      max-width: 100%;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      .add_introduce{
        font-weight: 400;
        color: #CED3D9;
        line-height: 22px;
        margin-top: 20px;
      }
      .add_out_{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .li {
          cursor: pointer;
          display: flex;
          width: 0.6rem;
          height: 0.29rem;
          padding: 0.05rem;
          margin-bottom: 0;
          .border_type{
            font-weight: 600;
            color: rgba(255, 255, 255, 0.5);
            line-height: 33px;
          }
        }
        .li_active_calss{
          width: 0.82rem;
          height: 0.44rem;
          padding: 0.1rem;
          margin-bottom: 0;
          .border_type{
            color:#CED3D9;
          }
        }
        .li_class1{
          background: url($bg_url + 'nav_nft_zs.webp') no-repeat #000;
          background-size: contain;
        }
        .li_class2{
          background: url($bg_url + 'nav_nft_jds.webp') no-repeat #000;
          background-size: contain;
        }
        .li_class3{
          background: url($bg_url + 'nav_nft_wushi.webp') no-repeat #000;
          background-size: contain;
        }
        .li_class4{
          background: url($bg_url + 'nav_nft_cike.webp') no-repeat #000;
          background-size: contain;
        }
      }
    }
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 0.25rem;
      background-image: none;
      .left_content{
        width:100%;
        min-height: 5.26rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background:url($bg_url + "mobile_swiper_bg1.webp") no-repeat #000;
        background-size: 100% 100%;
        .swiperbox_1{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.4rem;
          .swiper-slide{
            display: flex;
            justify-content: center;
            align-items: center;
            .video_bg_box{
              width: 100%;
              height: 3rem;
              position: relative;
              .video_bgimg{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
              .video_{
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 100px;
              }
            }
          }
        }
        .swiperbox_2{
          width: 100%;
          position: relative;
          margin-top: 1rem;
          .img_box {
            width: 0.6rem;
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url($bg_url + "nft_class1_fashion_normal.webp");
            background-size: 100% 100%;
            padding: 0.1rem;
            &.active {
              background-image: url($bg_url + "nft_class1_fashion_active.webp");
              background-size: 100% 100%;
            }
            img {
              width: 80%;
            }
          }
          .swiper-slide {
            display: flex;
            justify-content: center;
            width: fit-content;
          }
          // .swiper-button-prev {
          //   background-image: url($bg_url + "btn_left.webp");
          //   background-size: 100% auto;
          //   width: 40px;
          //   left: -40px;
          // }
          // .swiper-button-next {
          //   background-image: url($bg_url + "btn_right.webp");
          //   background-size: 100% auto;
          //   width: 40px;
          //   right: -40px;
          // }
          // .swiper-button-disabled {
          //   cursor: not-allowed;
          //   opacity: 0.5;
          // }
        }
      }
      .right_content{
        background: rgba(248, 229, 186, 0.15);
        padding: 0.1rem;
        margin-top: 0.15rem;
        ul {
          width: 100%;
          height: auto;
          // color: #CED3D9;
          li{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: 600;
            line-height: 0.28rem;
            &:nth-child(1){
              color: #ECCF83;
              margin-top: 0;
              span{
                font-weight: 400;
                // color: #CED3D9;
                line-height: 0.22rem;
                margin-left: 0.1rem;
              }
            }
            &:nth-child(2){
              color: #ECCF83;
              margin-top: 0.15rem;
            }
            &:nth-child(3){
              margin-top: 0.17rem;
              width: 100%;
              display: flex;
              flex-direction: column;
              .skill_img_box{
                width: 100%;
                display: flex;
                align-items: center;
                img{
                  width: 0.42rem;
                  margin-right: 0.1rem;
                  cursor: pointer;
                }
                .addborder{
                  width: 0.45rem;
                  border: 1px solid #ECCF83;
                  border-radius: 50%;
                }
              }
              .skill_box{
                width: 100%;
                display: flex;
                flex-direction: column;
                p{
                  &:nth-child(1){
                    font-weight: 400;
                    // color: #CED3D9;
                    line-height: 0.26rem;
                    margin-top: 0.15rem;
                  }
                  &:nth-child(2){
                    margin-top: 0.05rem;
                    font-weight: 400;
                    // color: #CED3D9;
                    line-height: 0.2rem;
                  }
                }
              }
            }
          }
        }
        .start_box{
          display: flex;
          flex-direction: column;
          margin-top: 0.15rem;
          p{
            display: flex;
            align-items: center;
            font-weight: 500;
            color: #8F8E8E;
            line-height: 0.15rem;
            span{
              color: #ECCF83;
            }
            &:nth-child(1),&:nth-child(2){
              margin-bottom: 0.1rem;
              font-weight: 800;
              color: #ECCF83;
              line-height: 0.3rem;
              span{
                font-weight: 800;
                color: #ECCF83;
                line-height: 0.3rem;
              }
              img{
                width: 0.25rem;
                margin-left: 5px;
              }
            }
            &:nth-child(3),&:nth-child(7),&:nth-child(10){
              font-weight: bold;
              color: #CED3D9;
              line-height: 0.26rem;
              margin-top: 0.08rem;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
