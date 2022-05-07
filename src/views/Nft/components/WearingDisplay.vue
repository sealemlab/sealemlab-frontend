<template>
  <!-- 穿戴展示 -->
  <div class="show_box">
    <p class="wear_show font30">
      {{$t("message.nft.txt31")}}
    </p>
    <div class="content">
      <ul class="tab_box">
        <li :class="{ li_class1: index == 0,li_class2: index == 1,li_class3: index == 2,li_class4: index == 3,li_active_calss:index == currentClass}" :style="{background:(index == currentClass?`url(${item.image})`:'')}" v-for="(item, index) in tabClassArr" :key="index" @click="clickTabClass(index)">
          <div class="font16 border_type">{{ $t(item.label) }}</div>
        </li>
      </ul>
      <div class="left_content">
        <div class="swiperbox_1">
          <swiper ref="swiper1" :options="swiperOption1">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFigureArr" :key="index">
              <div class="video_bg_box">
                <img :src="`${$store.state.imgUrl}mp4bg.png`" class="video_bgimg" />
                <video :src="`${item}`" class="video_" ref="video" loop autoplay muted></video>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiperbox_2">
          <swiper ref="swiper2" :options="swiperOption2">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFashionArr" :key="index">
              <div class="img_box" :class="{ active: currentSwiperIndex == index }">
                <img :src="item" alt="" />
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right_content">
        <ul>
          <li class="font20">
            {{ $t(tabClassArr[currentClass].label) }}
          </li>
          <li class="font16">
            {{ $t(tabClassArr[currentClass].classIntroduce) }}
          </li>
          <li class="font20">
            {{ $t(tabClassArr[currentClass].arms) }}:<span class="font16">{{ $t(tabClassArr[currentClass].skill_content) }}</span> 
          </li>
          <li class="font20">
            {{ $t(tabClassArr[currentClass].skill) }}
          </li>
          <li>
            <img v-for="(item, index) in tabClassArr[currentClass].skills" :key="index" :src="item" alt="" />
          </li>
        </ul>
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
      currentClass: 0,
      tabClassArr: [
        {
          image: `${this.$store.state.imgUrl}nav_nft_zs_active.png`,
          label: "message.nft.txt9",//角斗士
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15_1",
          classIntroduce: "message.nft.txt14_1",
          skills: [
            `${this.$store.state.imgUrl}nft_class1_skills1.png`,
            `${this.$store.state.imgUrl}nft_class1_skills2.png`,
            `${this.$store.state.imgUrl}nft_class1_skills3.png`,
            `${this.$store.state.imgUrl}nft_class1_skills4.png`,
          ],
          classFigureArr: [
            `${this.$store.state.imgUrl}nft_zs_1.mp4`,
            `${this.$store.state.imgUrl}nft_zs_2.mp4`,
            `${this.$store.state.imgUrl}nft_zs_3.mp4`,
            `${this.$store.state.imgUrl}nft_zs_4.mp4`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_zs_suit_1.png`,
            `${this.$store.state.imgUrl}nft_zs_suit_2.png`,
            `${this.$store.state.imgUrl}nft_zs_suit_3.png`,
            `${this.$store.state.imgUrl}nft_zs_suit_4.png`,
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nav_nft_jds_active.png`,
          label: "message.nft.txt8",//战士
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15",
          classIntroduce: "message.nft.txt14",
          skills: [
            `${this.$store.state.imgUrl}nft_class1_skills1.png`,
            `${this.$store.state.imgUrl}nft_class1_skills2.png`,
            `${this.$store.state.imgUrl}nft_class1_skills3.png`,
            `${this.$store.state.imgUrl}nft_class1_skills4.png`,
          ],
          classFigureArr: [
            `${this.$store.state.imgUrl}nft_jds_1.mp4`,
            `${this.$store.state.imgUrl}nft_jds_2.mp4`,
            `${this.$store.state.imgUrl}nft_jds_3.mp4`,
            `${this.$store.state.imgUrl}nft_jds_4.mp4`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_jds_suit_1.png`,
            `${this.$store.state.imgUrl}nft_jds_suit_2.png`,
            `${this.$store.state.imgUrl}nft_jds_suit_3.png`,
            `${this.$store.state.imgUrl}nft_jds_suit_4.png`,
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nav_nft_wushi_active.png`,
          label: "message.nft.txt10",//巫师
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15_3",
          classIntroduce: "message.nft.txt14_3",
          skills: [
            `${this.$store.state.imgUrl}nft_class1_skills1.png`,
            `${this.$store.state.imgUrl}nft_class1_skills2.png`,
            `${this.$store.state.imgUrl}nft_class1_skills3.png`,
            `${this.$store.state.imgUrl}nft_class1_skills4.png`,
          ],
          classFigureArr: [
            `${this.$store.state.imgUrl}nft_ws_1.mp4`,
            `${this.$store.state.imgUrl}nft_ws_2.mp4`,
            `${this.$store.state.imgUrl}nft_ws_3.mp4`,
            `${this.$store.state.imgUrl}nft_ws_4.mp4`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_ws_suit_1.png`,
            `${this.$store.state.imgUrl}nft_ws_suit_2.png`,
            `${this.$store.state.imgUrl}nft_ws_suit_3.png`,
            `${this.$store.state.imgUrl}nft_ws_suit_4.png`,
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nav_nft_cike_active.png`,
          label: "message.nft.txt11",//刺客
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15_2",
          classIntroduce: "message.nft.txt14_2",
          skills: [
            `${this.$store.state.imgUrl}nft_class1_skills1.png`,
            `${this.$store.state.imgUrl}nft_class1_skills2.png`,
            `${this.$store.state.imgUrl}nft_class1_skills3.png`,
            `${this.$store.state.imgUrl}nft_class1_skills4.png`,
          ],
          classFigureArr: [
            `${this.$store.state.imgUrl}nft_cike_1.mp4`,
            `${this.$store.state.imgUrl}nft_cike_2.mp4`,
            `${this.$store.state.imgUrl}nft_cike_3.mp4`,
            `${this.$store.state.imgUrl}nft_cike_4.mp4`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_cike_suit_1.png`,
            `${this.$store.state.imgUrl}nft_cike_suit_2.png`,
            `${this.$store.state.imgUrl}nft_cike_suit_3.png`,
            `${this.$store.state.imgUrl}nft_cike_suit_4.png`,
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
    }
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
    display: flex;
    flex-direction: column;
    li {
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
      background: url($bg_url + 'nav_nft_zs.png') no-repeat #000;
    }
    .li_class2{
      background: url($bg_url + 'nav_nft_jds.png') no-repeat #000;
    }
    .li_class3{
      background: url($bg_url + 'nav_nft_wushi.png') no-repeat #000;
    }
    .li_class4{
      background: url($bg_url + 'nav_nft_cike.png') no-repeat #000;
    }
  }
  .content{
    width: 100%;
    display: flex;
    margin-top: 50px;
    background:url($bg_url + "swiper_bg1.png") no-repeat #000;
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
          background-image: url($bg_url + "nft_class1_fashion_normal.png");
          background-size: 100% 100%;
          padding: 10px;
          &.active {
            background-image: url($bg_url + "nft_class1_fashion_active.png");
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
          background-image: url($bg_url + "btn_left.png");
          background-size: 100% auto;
          width: 40px;
          left: -40px;
        }
        .swiper-button-next {
          background-image: url($bg_url + "btn_right.png");
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
          font-weight: 600;
          line-height: 28px;
          &:nth-child(1){
            color: #ECCF83;
          }
          &:nth-child(2){
            color: #FFFFFF;
            margin-top: 14px;
          }
          &:nth-child(3){
            color: #ECCF83;
            margin-top: 40px;
            span{
              font-weight: 400;
              color: #FFFFFF;
              line-height: 22px;
              margin-left: 10px;
            }
          }
          &:nth-child(4){
            color: #ECCF83;
            margin-top: 40px;
          }
          &:nth-child(5){
            margin-top: 17px;
            width: 100%;
            display: flex;
            align-items: center;
            img{
              width: 42px;
              margin-right: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
