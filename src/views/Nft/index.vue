<template>
  <div class="nft_page">
    <div class="content_box">
      <!-- <img :src="route.src" class="nav_img" /> -->
      <!-- <div class="display_flex menu_box">
        <router-link class="a_link font18" v-for="(route, index) in navArr" :key="index" :to="route.link">
          <span class="nav_txt">{{ $t(route.label) }}</span>
        </router-link>
      </div> -->
      <ul class="display_flex">
        <li class="font24" :class="{ active_li: li_index == index }" v-for="(item,index) in navArr" :key="index" @click="liClick(item,index)">{{$t(item.label)}}</li>
      </ul>
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
        { label: "message.nft.txt2", link: "/nft/buy-blind-box/0",src:`${this.$store.state.imgUrl}nft_nav1.png`,status:true},
        { label: "message.nft.txt3", link: "/nft/blind-box",src:`${this.$store.state.imgUrl}nft_nav2.png`,status:false },
        { label: "message.nft.txt4", link: "/nft/my-nft",src:`${this.$store.state.imgUrl}nft_nav3.png`,status:false },
        { label: "message.nft.txt5", link: "/nft/giving",src:`${this.$store.state.imgUrl}nft_nav4.png`,status:false },
        { label: "message.nft.txt6", link: "/nft/lease",src:`${this.$store.state.imgUrl}nft_nav5.png`,status:false },
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang","getNoticeNum"]) },
  methods:{
    liClick(item,index){
      if(process.env.NODE_ENV === 'production'){
        if(item.status){
          this.li_index = index
          this.$router.push(item.link)
        }else{
          if(!this.getNoticeNum){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.txt5'}));
            this.$store.commit("setNoticeNum",true)
          }
        }
      }else{
        this.li_index = index
        this.$router.push(item.link)
      }
      
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
        cursor: pointer;
        text-decoration: none;
        // .nav_img{
        //   width: 32px;
        // }
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
        }
      }
    }
    ul{
      margin-top: 36px;
      flex-direction: column;
      li{
        // margin-top: 80px;
        font-weight: normal;
        color: #FFFFFF;
        line-height: 48px;
        min-width: 120px;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        color: #fff;
        cursor: pointer;
      }
      .active_li{
        color: #EDD083;
      }
    }
    .main{
      min-width: calc(100% - 120px);
      max-width: 1200px;
      margin-top: 50px;
    }
  }
}
</style>
