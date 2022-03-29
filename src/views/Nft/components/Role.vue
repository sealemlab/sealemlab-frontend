<template>
  <div>
    <div class="box">
      <div class="left">
        <div class="main_img">
          <swiper ref="swiper1" :options="swiperOption1">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFigureArr" :key="index">
              <img :src="item" alt="" />
            </swiper-slide>
          </swiper>
        </div>
        <ul class="vice_img">
          <swiper ref="swiper2" :options="swiperOption2">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFashionArr" :key="index">
              <div class="img" :class="{ active: currentSwiperIndex == index }"><img :src="item" alt="" /></div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" @click="prevBtn"></div>
          <div class="swiper-button-next" @click="nextBtn"></div>
        </ul>
      </div>
      <div class="right">
        <ul class="tab_box">
          <li v-for="(item, index) in tabClassArr" :key="index" :class="{ active: currentClass == index }" @click="clickTabClass(index)">
            <img :src="item.image" alt="" />
            <div>{{ item.label }}</div>
          </li>
        </ul>
        <div class="tab_content">
          <ul>
            <li>
              <div>{{ tabClassArr[currentClass].label }}</div>
              <div>{{ tabClassArr[currentClass].classIntroduce }}</div>
            </li>
            <li>
              <div>技能</div>
              <div>
                <img v-for="(item, index) in tabClassArr[currentClass].skills" :key="index" :src="item" alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentClass: 0,
      tabClassArr: [
        {
          image: require("../../../assets/images/nftimage/nft_class1.png"),
          label: "格斗家",
          classIntroduce: "《圣域》是一款基于区块链技术的大型多人在线MORPG游戏，游戏采用虚幻4引擎打造，有着超精致的画面表现、动作性以及打击感。",
          skills: [
            require("../../../assets/images/nftimage/nft_class1_skills1.png"),
            require("../../../assets/images/nftimage/nft_class1_skills2.png"),
            require("../../../assets/images/nftimage/nft_class1_skills3.png"),
            require("../../../assets/images/nftimage/nft_class1_skills4.png"),
          ],
          classFigureArr: [
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
          ],
          classFashionArr: [
            require("../../../assets/images/nftimage/nft_class1_fashion1.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion2.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion3.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion4.png"),
          ],
        },
        {
          image: require("../../../assets/images/nftimage/nft_class2.png"),
          label: "格斗家2",
          classIntroduce: "《圣域》是一款基于区块链技术的大型多人在线MORPG游戏，游戏采用虚幻4引擎打造，有着超精致的画面表现、动作性以及打击感。",
          skills: [
            require("../../../assets/images/nftimage/nft_class1_skills1.png"),
            require("../../../assets/images/nftimage/nft_class1_skills2.png"),
            require("../../../assets/images/nftimage/nft_class1_skills3.png"),
            require("../../../assets/images/nftimage/nft_class1_skills4.png"),
          ],
          classFigureArr: [
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
          ],
          classFashionArr: [
            require("../../../assets/images/nftimage/nft_class1_fashion1.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion2.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion3.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion4.png"),
          ],
        },
        {
          image: require("../../../assets/images/nftimage/nft_class3.png"),
          label: "格斗家3",
          classIntroduce: "《圣域》是一款基于区块链技术的大型多人在线MORPG游戏，游戏采用虚幻4引擎打造，有着超精致的画面表现、动作性以及打击感。",
          skills: [
            require("../../../assets/images/nftimage/nft_class1_skills1.png"),
            require("../../../assets/images/nftimage/nft_class1_skills2.png"),
            require("../../../assets/images/nftimage/nft_class1_skills3.png"),
            require("../../../assets/images/nftimage/nft_class1_skills4.png"),
          ],
          classFigureArr: [
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
          ],
          classFashionArr: [
            require("../../../assets/images/nftimage/nft_class1_fashion1.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion2.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion3.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion4.png"),
          ],
        },
        {
          image: require("../../../assets/images/nftimage/nft_class4.png"),
          label: "格斗家4",
          classIntroduce: "《圣域》是一款基于区块链技术的大型多人在线MORPG游戏，游戏采用虚幻4引擎打造，有着超精致的画面表现、动作性以及打击感。",
          skills: [
            require("../../../assets/images/nftimage/nft_class1_skills1.png"),
            require("../../../assets/images/nftimage/nft_class1_skills2.png"),
            require("../../../assets/images/nftimage/nft_class1_skills3.png"),
            require("../../../assets/images/nftimage/nft_class1_skills4.png"),
          ],
          classFigureArr: [
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
            require("../../../assets/images/nftimage/nft_class1_figure1.png"),
          ],
          classFashionArr: [
            require("../../../assets/images/nftimage/nft_class1_fashion1.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion2.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion3.png"),
            require("../../../assets/images/nftimage/nft_class1_fashion4.png"),
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
        slidesPerView: 3,
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
    },
  },
  mounted() {
    // this.$nextTick(() => {});
  },
  methods: {
    clickTabClass(index) {
      this.currentClass = index;
    },
    prevBtn() {
      // this.currentSwiperIndex--;
    },
    nextBtn() {
      // this.currentSwiperIndex++;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  position: relative;
  background-image: url("../../../assets/images/nftimage/nft_bg2.png");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center center;
  .left {
    padding: 80px 0;
    width: 60%;
    height: auto;
    .main_img img {
      width: 585px;
      height: 640px;
    }
    .vice_img {
      max-width: 585px;
      position: relative;
      left: 80px;
      .img {
        width: 85px;
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("../../../assets/images/nftimage/nft_class1_fashion_normal.png");
        background-size: 100% auto;
        background-position: center center;
        transform: scale(0.8);
        &.active {
          background-image: url("../../../assets/images/nftimage/nft_class1_fashion_active.png");
          background-size: 100% auto;
          background-position: center center;
          transform: scale(1);
        }
        img {
          width: auto;
          height: 80%;
        }
      }
      .swiper-slide {
        display: flex;
        justify-content: center;
        width: fit-content;
      }
      .swiper-button-prev {
        background-image: url("../../../assets/images/nftimage/btn_left.png");
        background-size: 100% auto;
        width: 40px;
        left: -40px;
      }
      .swiper-button-next {
        background-image: url("../../../assets/images/nftimage/btn_right.png");
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
  .right {
    width: 40%;
    height: auto;
    .tab_box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: center;
      li {
        cursor: pointer;
        margin-left: 30px;
        &.active {
          div {
            font-size: 16px;
            color: #381a02;
            background-image: url("../../../assets/images/nftimage/btn_active.png");
            background-size: 100% auto;
            background-position: center center;
          }
        }
        img {
          width: auto;
          height: 100px;
        }
        div {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #ffffff;
          background-image: url("../../../assets/images/nftimage/btn_normal.png");
          background-size: 100% auto;
          background-position: center center;
        }
      }
    }
    .tab_content {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-end;
      ul {
        width: 470px;
        height: auto;
        margin: 50px 0;
        padding: 50px 30px;
        background-image: url("../../../assets/images/nftimage/nft_bg3.png");
        background-size: 100% 100%;
        background-position: center center;
        color: #ffffff;
        li {
          &:nth-child(1) div:nth-child(1),
          &:nth-child(2) div:nth-child(1) {
            font-size: 28px;
            line-height: 28px;
            background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          &:nth-child(1) div:nth-child(2) {
            font-size: 16px;
            line-height: 32px;
            margin: 30px 0;
          }
          &:nth-child(2) div:nth-child(2) {
            margin-top: 30px;
            img {
              width: 55px;
              height: 55px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
