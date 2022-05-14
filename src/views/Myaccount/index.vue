<template>
  <div class="nft_page">
    <div class="content_box">
      <div class="display_flex menu_box">
        <router-link class="a_link font18" @click.native="liClick(index)" v-for="(route, index) in navArr" :key="index" :to="route.link">
          {{ $t(route.label) }}
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
        { label: "message.account.txt1", link: "/myaccount/information" },
        { label: "message.account.txt2", link: "/myaccount/bindwallet" },
        { label: "message.account.txt3", link: "/signin/login" }
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
  methods:{
    liClick(index){
      if(index == 2){
        this.$store.dispatch("setLogin", {
          loginStatus:false, // 登录状态
          rememberStatus:this.$store.state.userInfo.rememberStatus,
          username:this.$store.state.userInfo.rememberStatus?this.$store.state.userInfo.username:'',
          password:this.$store.state.userInfo.rememberStatus?this.$store.state.userInfo.password:''
        })
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
        font-weight: normal;
        color: #FFFFFF;
        line-height: 40px;
        width: 171px;
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        color: #fff;
        padding-left: 68px;
        cursor: pointer;
        text-decoration: none;
        &.router-link-active {
          background: linear-gradient(90deg, #EDD083 0%, rgba(240, 206, 117, 0) 100%);
          border-image: linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(184, 155, 91, 1)) 1 1;
        }
      }
    }
    .main{
      min-width: calc(100% - 171px);
    }
  }
}
</style>
