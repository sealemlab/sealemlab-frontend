<template>
  <div class="account_page">
    <div class="content_box">
      <div class="display_flex menu_box" :class="getmobileInfo.direction == 'top'?'menShow':'menDis'">
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
      li_index: 0,
      navArr: [
        { label: "message.account.txt1", link: "/myaccount/information" },
        { label: "message.account.txt2", link: "/myaccount/bindwallet" },
        { label: "message.account.txt3", link: "/signin/login" },
      ],
    };
  },
  computed: { ...mapGetters(["isEnLang","getmobileInfo"]) },
  methods: {
    liClick(index) {
      if (index == 2) {
        // this.$store.dispatch("setLogin", {
        //   loginStatus: false, // 登录状态
        //   rememberStatus: this.$store.state.userInfo.rememberStatus,
        //   mailAccount: this.$store.state.userInfo.rememberStatus ? this.$store.state.userInfo.mailAccount : "",
        //   password: this.$store.state.userInfo.rememberStatus ? this.$store.state.userInfo.password : "",
        //   activationTime: this.$store.state.userInfo.rememberStatus ? this.$store.state.userInfo.activationTime : "",
        //   addr: this.$store.state.userInfo.rememberStatus ? this.$store.state.userInfo.addr : "",
        //   token: this.$store.state.userInfo.rememberStatus ? this.$store.state.userInfo.token : "",
        // });
        this.$store.commit("setLogin", {
          loginStatus: false,
          rememberStatus: false,
          mailAccount: "",
          password: "",
          token: "",
          activationTime: "",
          lastLogin: "",
          addr: "",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.account_page {
  width: 100%;
  min-height: calc(100vh - 400px);
  .content_box {
    width: 90vw;
    background: #000;
    padding-top: 80px;
    margin: 0 auto;
    display: flex;
    .menu_box {
      flex-direction: column;
      margin-top: 80px;
      .a_link {
        font-weight: normal;
        color: #ffffff;
        line-height: 40px;
        width: 171px;
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        padding-left: 68px;
        cursor: pointer;
        text-decoration: none;
        &.router-link-active {
          color: #EDD083;
          // background: linear-gradient(90deg, #edd083 0%, rgba(240, 206, 117, 0) 100%);
          // border-image: linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(184, 155, 91, 1)) 1 1;
        }
      }
    }
    .main {
      min-width: calc(100% - 171px);
    }
  }
}
@media screen and (max-width: 980px) {
  .account_page{
    width: 100%;
    min-height: calc(100vh - 1rem);
    .content_box{
      padding-top: 0.8rem;
      .menu_box{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 15;
        padding: 0 0.2rem;
        flex-direction: row;
        justify-content: space-between;
        background: rgba(0,0,0,0.5);
        .a_link{
          width: auto;
          min-width: 0.2rem;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          padding-left: 0;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          font-weight: normal;
          line-height: 0.4rem;
        }
      }
      .main{
        width: 100vw;
        max-width: 100%;
        margin: 0 auto;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
