<template>
  <div class="assets_page">
    <div class="box display_flex">
      <div class="title_box display_flex">
        <div class="address_box display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
          <span class="font26">10 NFT</span>
          <span class="font16 margin_top">合约:0x77749fc693……053</span>
        </div>
        <div class="menu display_flex">
          <div class="onebox" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{item.title}}</div>
        </div>
      </div>
      <div class="content display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
        <p class="font26 buybox_txt">{{title}}</p>
        <p class="font16">购买盲盒参与游戏，自由交易</p>
        <div class="imgbox">
          <swiper ref="swiper" :options="swiperOption" class="self_swiper">
            <swiper-slide v-for="(item, index) in imgArr" :key="index">
              <img :src="item.src" class="img_" />
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
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
      title:'购买盲盒',
      menuIndex:0,
      menuArr:[
        {title:'全部'},
        {title:'出售'},
        {title:'租赁'},
        {title:'普通'},
      ],
      imgArr:[
        {
          src:require('../../assets/images/buyboximg1.png')
        },
        {
          src:require('../../assets/images/buyboximg1.png')
        },
        {
          src:require('../../assets/images/buyboximg1.png')
        },
        {
          src:require('../../assets/images/buyboximg1.png')
        },
        {
          src:require('../../assets/images/buyboximg1.png')
        },
        {
          src:require('../../assets/images/buyboximg1.png')
        },
        {
          src:require('../../assets/images/buyboximg1.png')
        }
      ],
      swiperOption: {
        slidesPerView: 4,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      },
    }
  },
  methods:{
    menuClick(item,index){
      this.title = item.title
      this.menuIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.assets_page{
  width: 100%;
  .box{
    width: 100%;
    flex-direction: column;
    .title_box{
      align-items: center;
      justify-content: space-between;
      .address_box{
        flex-direction: column;
        align-items: center;
        .margin_top{
          margin-top: 12px;
        }
      }
      .menu{
        align-items: center;
        .onebox{
          cursor: pointer;
          width: 146px;
          height: 49px;
          text-align: center;
          line-height: 47px;
          border: 1px solid;
          border-image: linear-gradient(180deg, rgba(150, 116, 66, 1), rgba(246, 217, 127, 1), rgba(145, 109, 58, 1)) 1 1;
        }
        .activeMenu{
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        }
      }
    }
    .content{
      width: 100%;
      flex-direction: column;
      margin-top: 70px;
      .buybox_txt{
        font-weight: normal;
        color: #00C1FF;
        line-height: 56px;
        background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 14px;
      }
      .imgbox{
        position: relative;
        max-width:900px;
        margin-top: 44px;
        .self_swiper{
          width: 100%;
          .swiper-slide{
            display: flex;
            justify-content: center;
            width: fit-content;
            .img_{
              width: 189px;
            }
          }
        }
        .swiper-button-prev {
          background-image: url("../../assets/images/nftimage/btn_left.png");
          background-size: 100% auto;
          width: 40px;
          left: -36px;
        }
        .swiper-button-next {
          background-image: url("../../assets/images/nftimage/btn_right.png");
          background-size: 100% auto;
          width: 40px;
          right: -36px;
        }
      }
    }
  }
}
</style>