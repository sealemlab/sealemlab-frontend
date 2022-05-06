<template>
  <div class="nft_page">
    <div class="content_box">
      <div class="display_flex menu_box">
        <router-link class="a_link font18" v-for="(route, index) in navArr" :key="index" :to="route.link">
          <img :src="route.src" class="nav_img" />
          <span class="nav_txt">{{ $t(route.label) }}</span>
        </router-link>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      li_index:0,
      navArr: [
        { label: "message.nft.txt2", link: "/nft/buy-blind-box/0",src:`${this.$store.state.imgUrl}nft_nav1.png` },
        { label: "message.nft.txt3", link: "/nft/blind-box",src:`${this.$store.state.imgUrl}nft_nav2.png` },
        { label: "message.nft.txt4", link: "/nft/my-nft",src:`${this.$store.state.imgUrl}nft_nav3.png` },
        { label: "message.nft.txt5", link: "/nft/giving",src:`${this.$store.state.imgUrl}nft_nav4.png` },
        { label: "message.nft.txt6", link: "/nft/lease",src:`${this.$store.state.imgUrl}nft_nav5.png` },
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
  methods:{
    liClick(item,index){
      this.li_index = index
      this.$router.push(item.link)
    }
  }
};
</script>

<style lang="scss" scoped>
.nft_page{
  width: 100%;
  min-height: calc(100vh - 400px);
  .content_box{
    width: 90vw;
    background: #000;
    padding-top: 80px;
    margin: 0 auto;
    display: flex;
    .menu_box{
      flex-direction: column;
      margin-top: 80px;
      .a_link{
        width: 171px;
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        color: #fff;
        // padding-left: 68px;
        cursor: pointer;
        text-decoration: none;
        .nav_img{
          width: 32px;
        }
        .nav_txt{
          font-weight: normal;
          color: #FFFFFF;
          line-height: 40px;
          margin-left: 5px;
        }
        &.router-link-active {
          .nav_txt{
            color: #EDD083;
          }
          // background: linear-gradient(90deg, #EDD083 0%, rgba(240, 206, 117, 0) 100%);
          // border-image: linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(184, 155, 91, 1)) 1 1;
        }
      }
    }
    .main{
      min-width: calc(100% - 171px);
      max-width: 1200px;
      margin-top: 50px;
    }
  }
}
</style>
