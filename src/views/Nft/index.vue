<template>
  <div class="nft_page" >
    <div class="content_box">
      <div class="display_flex menu_box" :class="getmobileInfo.direction == 'top'?'menShow':'menDis'">
        <router-link class="a_link font18" v-for="(route, index) in navArr" :key="index" :to="route.link">
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
        { label: "message.nft.txt2", link: "/nft/buy-blind-box/0",src:`${this.$store.state.imgUrl}nft_nav1.webp`,status:true},
        { label: "message.nft.txt3", link: "/nft/blind-box",src:`${this.$store.state.imgUrl}nft_nav2.webp`,status:false },
        { label: "message.nft.txt4", link: "/nft/my-nft",src:`${this.$store.state.imgUrl}nft_nav3.webp`,status:false },
        // { label: "message.nft.txt5", link: "/nft/giving",src:`${this.$store.state.imgUrl}nft_nav4.webp`,status:false },
        // { label: "message.nft.txt6", link: "/nft/lease",src:`${this.$store.state.imgUrl}nft_nav5.webp`,status:false },
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang","getNoticeNum","getmobileInfo"]) },
  methods:{
    liClick(item,index){
      console.log('sdsdsddf-------item: ', item);
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
      
    },
  }
};
</script>

<style lang="scss" scoped>
.nft_page{
  width: 100%;
  .content_box{
    width: 90vw;
    padding-top: 80px;
    margin: 0 auto;
    display: flex;
    .menu_box{
      position: fixed;
      top: 116px;
      left: 5vw;
      flex-direction: column;
      .a_link{
        min-width: 120px;
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        cursor: pointer;
        text-decoration: none;
        .nav_txt{
          font-weight: 600;
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
    .main{
      width: 100vw;
      // max-width: 1200px;
      margin: 0 auto;
      margin-top: 32px;
      padding-left: 120px;
      min-height: calc(100vh - 80px);
      padding-bottom: 30px;
      padding-left: 150px;
      // padding-right: 10vw;
    }
  }
}
@media screen and (max-width: 980px) {
  .nft_page{
    width: 100%;
    .content_box{
      padding-top: 0.6rem;
      .menu_box{
        position: fixed;
        top: 0.6rem;
        left: 0;
        width: 100%;
        z-index: 15;
        padding: 0 0.2rem;
        flex-direction: row;
        justify-content: space-between;
        background: rgba(0,0,0,0.5);
        .a_link{
          min-width: 0.2rem;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          cursor: pointer;
          text-decoration: none;
          .nav_txt{
            font-weight: normal;
            line-height: 40px;
            margin-left: 0;
          }
          &.router-link-active {
            .nav_txt{
              color: #EDD083;
            }
          }
        }
      }
      .main{
        width: 100vw;
        max-width: 100%;
        margin: 0 auto;
        margin-top: 0.5rem;
        min-height: calc(100vh - 1.5rem);
        padding-left: 0;
      }
    }
  }
}
</style>
