<template>
  <!-- 穿戴展示 -->
  <div class="show_box">
    <p class="wear_show font30">
      {{$t("message.nft.txt31")}}
    </p>
    <div class="content">
      <div class="tab_box">
        <div :class="{ li_class1: index == 0,li_class2: index == 1,li_class3: index == 2,li_class4: index == 3,li_active_calss:index == currentClass}" :style="{background:(index == currentClass?`url(${item.image})`:'')}" class="li" v-for="(item, index) in tabClassArr" :key="index" @click="clickTabClass(index)">
          <div class="font16 border_type">{{ $t(item.label) }}</div>
        </div>
        <div class="add_introduce font16">{{$t(tabClassArr[currentClass].classIntroduce)}}</div>
      </div>
      <div class="left_content">
        <div class="swiperbox_1">
          <swiper ref="swiper1" :options="swiperOption1">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFigureArr" :key="index">
              <div class="video_bg_box">
                <img :src="`${$store.state.imgUrl}mp4bg.webp`" class="video_bgimg" />
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
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right_content">
        <ul>
          <!-- <li class="font20">
            {{ $t(tabClassArr[currentClass].label) }}
          </li>
          <li class="font16">
            {{ $t(tabClassArr[currentClass].classIntroduce) }}
          </li> -->
          <li class="font20">
            {{ $t(tabClassArr[currentClass].arms) }}:<span class="font16">{{ $t(tabClassArr[currentClass].skill_content) }}</span> 
          </li>
          <li class="font20">
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
            <span class="font26">{{tabClassArr[currentClass].classFashionArr[currentSwiperIndex].level}}</span>
            <img :src="`${$store.state.imgUrl}start.webp`" /></p>
          <p v-html="$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title1)"></p>
          <p v-html="$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title2)"></p>
          <p v-html="$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title3)"></p>
          <p v-html="$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title4)"></p>
          <p v-html="$t(tabClassArr[currentClass].classFashionArr[currentSwiperIndex].title5)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    per: {
      get() {
        return 0;
      },
      set(val) {
        this.sliderValue = val
        this.stTotal = val * this.stPrice
      }
    }
  },
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
            `${this.$store.state.videoUrl}nft_zs_1.mp4`,
            `${this.$store.state.videoUrl}nft_zs_2.mp4`,
            `${this.$store.state.videoUrl}nft_zs_3.mp4`,
            `${this.$store.state.videoUrl}nft_zs_4.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}nft_zs_suit_1.webp`,
              level:8,
              title1:"message.nft.txt98",
              title2:"message.nft.txt99",
              title3:"message.nft.txt100",
              title4:"message.nft.txt101",
              title5:"message.nft.txt102"
            },
            {
              src:`${this.$store.state.imgUrl}nft_zs_suit_2.webp`,
              level:9,
              title1:"message.nft.txt103",
              title2:"message.nft.txt104",
              title3:"message.nft.txt105",
              title4:"message.nft.txt106",
              title5:"message.nft.txt107"
            },
            {
              src:`${this.$store.state.imgUrl}nft_zs_suit_3.webp`,
              level:10,
              title1:"message.nft.txt108",
              title2:"message.nft.txt109",
              title3:"message.nft.txt110",
              title4:"message.nft.txt111",
              title5:"message.nft.txt112"
            },
            {
              src:`${this.$store.state.imgUrl}nft_zs_suit_4.webp`,
              level:11,
              title1:"message.nft.txt113",
              title2:"message.nft.txt114",
              title3:"message.nft.txt115",
              title4:"message.nft.txt116",
              title5:"message.nft.txt117"
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
            `${this.$store.state.videoUrl}nft_jds_1.mp4`,
            `${this.$store.state.videoUrl}nft_jds_2.mp4`,
            `${this.$store.state.videoUrl}nft_jds_3.mp4`,
            `${this.$store.state.videoUrl}nft_jds_4.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}nft_jds_suit_1.webp`,
              level:8,
              title1:"message.nft.txt98",
              title2:"message.nft.txt99",
              title3:"message.nft.txt100",
              title4:"message.nft.txt101",
              title5:"message.nft.txt102"
            },
            {
              src:`${this.$store.state.imgUrl}nft_jds_suit_2.webp`,
              level:9,
              title1:"message.nft.txt103",
              title2:"message.nft.txt104",
              title3:"message.nft.txt105",
              title4:"message.nft.txt106",
              title5:"message.nft.txt107"
            },
            {
              src:`${this.$store.state.imgUrl}nft_jds_suit_3.webp`,
              level:10,
              title1:"message.nft.txt108",
              title2:"message.nft.txt109",
              title3:"message.nft.txt110",
              title4:"message.nft.txt111",
              title5:"message.nft.txt112"
            },
            {
              src:`${this.$store.state.imgUrl}nft_jds_suit_4.webp`,
              level:11,
              title1:"message.nft.txt113",
              title2:"message.nft.txt114",
              title3:"message.nft.txt115",
              title4:"message.nft.txt116",
              title5:"message.nft.txt117"
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
            `${this.$store.state.videoUrl}nft_ws_1.mp4`,
            `${this.$store.state.videoUrl}nft_ws_2.mp4`,
            `${this.$store.state.videoUrl}nft_ws_3.mp4`,
            `${this.$store.state.videoUrl}nft_ws_4.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}nft_ws_suit_1.webp`,
              level:8,
              title1:"message.nft.txt98",
              title2:"message.nft.txt99",
              title3:"message.nft.txt100",
              title4:"message.nft.txt101",
              title5:"message.nft.txt102"
            },
            {
              src:`${this.$store.state.imgUrl}nft_ws_suit_2.webp`,
              level:9,
              title1:"message.nft.txt103",
              title2:"message.nft.txt104",
              title3:"message.nft.txt105",
              title4:"message.nft.txt106",
              title5:"message.nft.txt107"
            },
            {
              src:`${this.$store.state.imgUrl}nft_ws_suit_3.webp`,
              level:10,
              title1:"message.nft.txt108",
              title2:"message.nft.txt109",
              title3:"message.nft.txt110",
              title4:"message.nft.txt111",
              title5:"message.nft.txt112"
            },
            {
              src:`${this.$store.state.imgUrl}nft_ws_suit_4.webp`,
              level:11,
              title1:"message.nft.txt113",
              title2:"message.nft.txt114",
              title3:"message.nft.txt115",
              title4:"message.nft.txt116",
              title5:"message.nft.txt117"
            }
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nav_nft_cike_active.webp`,
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
            `${this.$store.state.videoUrl}nft_cike_1.mp4`,
            `${this.$store.state.videoUrl}nft_cike_2.mp4`,
            `${this.$store.state.videoUrl}nft_cike_3.mp4`,
            `${this.$store.state.videoUrl}nft_cike_4.mp4`,
          ],
          classFashionArr: [
            {
              src:`${this.$store.state.imgUrl}nft_cike_suit_1.webp`,
              level:8,
              title1:"message.nft.txt98",
              title2:"message.nft.txt99",
              title3:"message.nft.txt100",
              title4:"message.nft.txt101",
              title5:"message.nft.txt102"
            },
            {
              src:`${this.$store.state.imgUrl}nft_cike_suit_2.webp`,
              level:9,
              title1:"message.nft.txt103",
              title2:"message.nft.txt104",
              title3:"message.nft.txt105",
              title4:"message.nft.txt106",
              title5:"message.nft.txt107"
            },
            {
              src:`${this.$store.state.imgUrl}nft_cike_suit_3.webp`,
              level:10,
              title1:"message.nft.txt108",
              title2:"message.nft.txt109",
              title3:"message.nft.txt110",
              title4:"message.nft.txt111",
              title5:"message.nft.txt112"
            },
            {
              src:`${this.$store.state.imgUrl}nft_cike_suit_4.webp`,
              level:11,
              title1:"message.nft.txt113",
              title2:"message.nft.txt114",
              title3:"message.nft.txt115",
              title4:"message.nft.txt116",
              title5:"message.nft.txt117"
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
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        },
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
    margin-bottom: 42px;
    padding: 0 20%;
    text-align: center;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 42px;
  }
  .tab_box {
    max-width: 200px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    .add_introduce{
      font-weight: 400;
      color: #FFFFFF;
      line-height: 22px;
      margin-top: 20px;
    }
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
        color:#fff;
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
  .content{
    width: 100%;
    display: flex;
    margin-top: 50px;
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
      // width: 20%;
      ul {
        width: 100%;
        height: auto;
        color: #ffffff;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          line-height: 28px;
          &:nth-child(1){
            color: #ECCF83;
            margin-top: 40px;
            span{
              font-weight: 400;
              color: #FFFFFF;
              line-height: 22px;
              margin-left: 10px;
            }
          }
          &:nth-child(2){
            color: #ECCF83;
            margin-top: 40px;
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
                  color: #FFFFFF;
                  line-height: 26px;
                  margin-top: 30px;
                }
                &:nth-child(2){
                  margin-top: 30px;
                  font-weight: 400;
                  color: #FFFFFF;
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
        margin-top: 42px;
        p{
          font-weight: 400;
          color: #FFFFFF;
          line-height: 24px;
          span{
            color: #ECCF83;
          }
          &:nth-child(1){
            margin-bottom: 10px;
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
        }
      }
    }
  }
}
</style>
