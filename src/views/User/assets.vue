<template>
  <div class="assets_page">
    <div class="box display_flex">
      <div class="title_box display_flex">
        <div class="address_box display_flex" :class="isEnLang?'en_Bold':'cn_lang'">
          <span class="font26">10 NFT</span>
          <span class="font16 margin_top">合约:0x77749fc693……053</span>
        </div>
        <div class="add_buybtn font14">购买/出售</div>
        <div class="menu display_flex">
          <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{item.title}}</div>
        </div>
      </div>
      <!-- <div class="content display_flex">
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
      </div> -->
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
          src:`${this.$store.state.imgUrl}buyboximg1.png`
        },
        {
          src:`${this.$store.state.imgUrl}buyboximg1.png`
        },
        {
          src:`${this.$store.state.imgUrl}buyboximg1.png`
        },
        {
          src:`${this.$store.state.imgUrl}buyboximg1.png`
        },
        {
          src:`${this.$store.state.imgUrl}buyboximg1.png`
        },
        {
          src:`${this.$store.state.imgUrl}buyboximg1.png`
        },
        {
          src:`${this.$store.state.imgUrl}buyboximg1.png`
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
      .add_buybtn{
        width: 163px;
        // padding: 0 25px;
        height: 48px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #000000;
      }
      .menu{
        align-items: center;
        .onebox{
          cursor: pointer;
          padding: 0 15px;
          height: 31px;
          background: #000000;
          border: 1px solid rgba(236, 207, 131, 0.5);
          text-align: center;
          line-height: 31px;
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
          background-image: url($bg_url + "btn_left.png");
          background-size: 100% auto;
          width: 40px;
          left: -36px;
        }
        .swiper-button-next {
          background-image: url($bg_url + "btn_right.png");
          background-size: 100% auto;
          width: 40px;
          right: -36px;
        }
      }
    }
  }
}
</style>