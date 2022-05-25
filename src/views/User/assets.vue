<template>
  <div class="assets_page">
    <div class="box display_flex">
      <div class="mobile_menu">
        <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{$t(item.title)}}</div>
      </div>
      <div class="title_box display_flex">
        <div class="address_box display_flex">
          <span class="font26 mobile_font16">0 NFT</span>
          <span class="font16 margin_top">{{$t("message.user.txt7")}}:0x*********</span>
        </div>
        <div class="add_buybtn font14">{{$t("message.user.txt17")}}</div>
        <div class="menu display_flex">
          <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{$t(item.title)}}</div>
        </div>
      </div>
      <div class="content display_flex">
        <div class="imgbox">
          <swiper ref="swiper" :options="swiperOption" class="self_swiper">
            <swiper-slide v-for="(item, index) in imgArr" :key="index">
              <img :src="item.src" class="img_" />
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="mobile_nftboxs">
          <div class="mobile_box" v-for="(item, index) in imgArr" :key="index">
            <img :src="item.src" class="img_" />
          </div>
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
        {title:'message.user.txt18'},
        {title:'message.user.txt19'},
        {title:'message.user.txt20'},
        {title:'message.user.txt21'},
      ],
      imgArr:[
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
        },
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
        },
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
        },
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
        },
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
        },
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
        },
        {
          src:`${this.$store.state.imgUrl}mynft.webp`
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
    .mobile_menu{
      display: none;
    }
    .title_box{
      align-items: center;
      justify-content: space-between;
      .address_box{
        flex-direction: column;
        align-items: center;
        .margin_top{
          margin-top: 10px;
        }
      }
      .add_buybtn{
        width: 163px;
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
      .imgbox{
        position: relative;
        max-width:900px;
        .self_swiper{
          width: 100%;
          .swiper-slide{
            display: flex;
            justify-content: center;
            width: fit-content;
            .img_{
              max-width: 204px;
            }
          }
        }
        .swiper-button-prev {
          background-image: url($bg_url + "btn_left.webp");
          background-size: 100% auto;
          width: 40px;
          left: -36px;
        }
        .swiper-button-next {
          background-image: url($bg_url + "btn_right.webp");
          background-size: 100% auto;
          width: 40px;
          right: -36px;
        }
      }
      .mobile_nftboxs{
        display: none;
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .assets_page{
    .box{
      .mobile_menu{
        display: flex;
        align-items: center;
        margin-bottom: 0.15rem;
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
      .title_box{
        .menu{
          display: none;
        }
        .address_box{
          align-items: flex-start;
          .margin_top{
            margin-top: 0.1rem;
            font-weight: 400;
            color: #DBDADA;
            line-height: 0.18rem;
          }
        }
        .add_buybtn{
          width: 0.66rem;
          height: 0.24rem;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.04rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          color: #000000;
        }
      }
      .content{
        width: 100%;
        flex-direction: column;
        margin-top: 0.4rem;
        .imgbox{
          display: none;
        }
        .mobile_nftboxs{
          display: flex;
          flex-wrap: wrap;
          max-height: 6rem;
          overflow: auto;
          .mobile_box{
            width: 50%;
            padding: 0.1rem;
            img{
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>