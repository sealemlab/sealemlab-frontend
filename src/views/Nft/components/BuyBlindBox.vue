<template>
  <div class="buy_blind_box">
    <ul class="title_box">
      <li class="font45 box_txt">{{$t("message.nft.txt20")}}</li>
      <li class="font16">
        {{$t("message.nft.txt21")}}
      </li>
      <li class="font16">
        {{$t("message.nft.txt22")}}
      </li>
    </ul>
    <div class="conten_box">
      <div class="treasure_chest_box">
        <img :src="`${$store.state.imgUrl}bindbox.png`" alt="" />
      </div>
      <div class="right_content">
        <p class="font20 title_txt">
          <span class="lefttxt">{{$t("message.nft.txt23")}}</span>
          <span class="righttxt">0</span>
        </p>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt24")}}</span>
          <span class="righttxt no_border">{{stPrice}}</span>
          <span class="unit_class">ST</span>
        </div>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt25")}}</span>
          <div class="btns">
            <slider :min="0" :max="10000" v-model="per"></slider>
          </div>
          <span class="unit_class">{{sliderValue}}</span>
        </div>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt26")}}</span>
          <span class="righttxt">{{stTotal}}</span>
          <span class="unit_class">ST</span>
        </div>
        <div class="balance_txt">
          {{$t("message.nft.txt27")}} 30 ST
          <img :src="`${$store.state.imgUrl}link.png`" class="link_img" />
        </div>
        <div class="btnbox font12">{{$t("message.nft.txt28")}}</div>
      </div>
    </div>
    <div class="describe_box">
      <p class="font30 title_">{{$t("message.nft.txt29")}}</p>
      <div class="package_ font16">
        {{$t("message.nft.txt30")}}
      </div>
    </div>
    <div class="box">
      <p class="wear_show font30">{{$t("message.nft.txt31")}}</p>
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
                <!-- <img :src="item" class="people_img" /> -->
                <video class="video_" ref="video" loop autoplay muted>
                  <source :src="`${item}`" type="video/mp4" />
                </video>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import slider from "./ProgressBar.vue";
export default {
  components: { slider },
  computed: {
    ...mapGetters(["isEnLang"]),
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
      stPrice:2,//st价格
      stTotal:0,//st的总价格
      sliderValue:0,// 拖动条value
      currentClass: 0,
      tabClassArr: [
        {
          image: `${this.$store.state.imgUrl}nft_class1.png`,
          label: "message.nft.txt8",
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
            `${this.$store.state.imgUrl}suit1.mp4`,
            `${this.$store.state.imgUrl}suit2.mp4`,
            `${this.$store.state.imgUrl}suit3.mp4`,
            `${this.$store.state.imgUrl}suit4.mp4`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_class1_fashion1.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion2.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion3.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion4.png`,
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nft_class2.png`,
          label: "message.nft.txt9",
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
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_class1_fashion1.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion2.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion3.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion4.png`,
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nft_class3.png`,
          label: "message.nft.txt10",
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
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_class1_fashion1.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion2.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion3.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion4.png`,
          ],
        },
        {
          image: `${this.$store.state.imgUrl}nft_class4.png`,
          label: "message.nft.txt11",
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
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
            `${this.$store.state.imgUrl}nft_class1_figure1.png`,
          ],
          classFashionArr: [
            `${this.$store.state.imgUrl}nft_class1_fashion1.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion2.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion3.png`,
            `${this.$store.state.imgUrl}nft_class1_fashion4.png`,
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
    deleteAmount() {
      this.amount--;
    },
    addAmount() {
      this.amount++;
    },
  },
};
</script>

<style lang="scss" scoped>
.buy_blind_box{
  width: 100%;
  margin-top: 50px;
}
.title_box {
  width: 100%;
  text-align: center;
  li {
    &:nth-child(1) {
      font-weight: 600;
      color: #FFFFFF;
      line-height: 63px;
    }
    &:nth-child(2) {
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
      margin-top: 20px;
    }
    &:nth-child(3) {
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
    }
  }
}
.conten_box {
  width: 100%;
  display: flex;
  margin: 87px 0;
  .treasure_chest_box {
    width: 50%;
    img {
      width: 100%;
      max-width: 616px;
      // height: 504px;
    }
  }
  .right_content{
    width: 405px;
    padding:20px;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
    background: rgba(16, 16, 16, 0.49);
    box-shadow: 0px 6px 11px 0px rgba(0, 0, 0, 0.59);
    border-radius: 25px;
    border: 1px solid rgba(236, 207, 131, 0.5);
    .title_txt{
      font-weight: 600;
      color: #ECCF83;
      line-height: 28px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .unit_class{
      min-width: 20px;
      font-weight: bold;
      color: #ECCF83;
      line-height: 19px;
      text-align: right;
    }
    .line_onebox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .lefttxt{
        width: 80px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
      }
      .righttxt{
        width: calc(100% - 140px);
        text-align: center;
        font-weight: bold;
        color: #ECCF83;
        line-height: 19px;
      }
      .btns {
        width: calc(100% - 140px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .balance_txt{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 400;
      color: #9B9995;
      line-height: 14px;
      .link_img{
        width:15px;
        margin-left: 15px;
      }
    }
    .btnbox{
      margin-top: 34px;
      width: 163px;
      height: 48px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
      margin-left: 35%;
      cursor: pointer;
    }
  }
}
.describe_box{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title_{
    font-weight: bold;
    color: #FFFFFF;
    line-height: 36px;
    margin-bottom: 30px;
  }
  .package_{
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32px;
  }
}
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  .wear_show{
    width: 100%;
    text-align: center;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 42px;
    margin-bottom: 42px;
  }
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
        .video_{
          max-width: 469px;
          width: 100%;
          height: auto;
          object-fit: cover;
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
      width: 40%;
      ul {
        width: 100%;
        height: auto;
        padding: 39px 30px;
        background-image: url($bg_url + "nft_bg3.png");
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
