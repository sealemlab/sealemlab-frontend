<template>
  <div class="box">
    <ul class="tab_box">
      <li v-for="(item, index) in tabClassArr" :key="index" @click="clickTabClass(index)">
        <img :src="item.image" alt="" />
        <div class="font16 border_type" :class="{ active: currentClass == index }">{{ $t(item.label) }}</div>
      </li>
    </ul>
    <div class="content">
      <div class="left_content">
        <div class="swiperbox_1">
          <swiper ref="swiper1" :options="swiperOption1">
            <swiper-slide v-for="(item, index) in tabClassArr[currentClass].classFigureArr" :key="index">
              <img :src="item" class="people_img" />
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
  data() {
    return {
      currentClass: 0,
      tabClassArr: [
        {
          image: require("../../../assets/images/nftimage/nft_class1.png"),
          label: "message.nft.txt8",
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15",
          classIntroduce: "message.nft.txt14",
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
          label: "message.nft.txt9",
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15",
          classIntroduce: "message.nft.txt14",
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
          label: "message.nft.txt10",
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15",
          classIntroduce: "message.nft.txt14",
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
          label: "message.nft.txt11",
          arms: "message.nft.txt12",
          skill: "message.nft.txt13",
          skill_content: "message.nft.txt15",
          classIntroduce: "message.nft.txt14",
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
  methods: {
    clickTabClass(index) {
      this.currentClass = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .tab_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    li {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 72px;
      }
      .border_type{
        margin-top: 8px;
        width: 133px;
        height: 35px;
        background: rgba(16, 16, 16, 0.49);
        box-shadow: 0px 6px 11px 0px rgba(0, 0, 0, 0.59);
        border-radius: 4px;
        border: 1px solid rgba(236, 207, 131, 0.5);
        backdrop-filter: blur(14px);
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        line-height: 33px;
        &.active {
          background: #101010;
          box-shadow: 0px 6px 11px 0px rgba(0, 0, 0, 0.59);
          border-radius: 4px;
          border: 1px solid #ECCF83;
          backdrop-filter: blur(14px);
          color: #ffffff;
        }
      }
    }
  }
  .content{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 50px;
    .left_content{
      width: 60%;
      display: flex;
      flex-direction: column;
      .swiperbox_1{
        width: 100%;
        .people_img{
          max-width: 469px;
          width: 100%;
        }
      }
      .swiperbox_2{
        width: 100%;
        position: relative;
        margin-top: 25px;
        .img_box {
          width: 75px;
          height: 75px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url("../../../assets/images/nftimage/nft_class1_fashion_normal.png");
          background-size: 100% 100%;
          padding: 10px;
          &.active {
            background-image: url("../../../assets/images/nftimage/nft_class1_fashion_active.png");
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
    .right_content{
      width: 40%;
      ul {
        width: 100%;
        height: auto;
        padding: 39px 30px;
        background-image: url("../../../assets/images/nftimage/nft_bg3.png");
        background-size: 100% 100%;
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
