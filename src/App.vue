<template>
  <div id="app" :class="isEnLang?'en_Bold':'cn_lang'">
    <NavigationBar />
    <router-view />
    <FooterComponents />
    <div class="mobile_nav">
      <div class="mobile_onebox" v-for="(item, index) in navArr" :key="index" @click="toRoute(item.link)">
        <div class="box"></div>
        <span class="mobile_nav_txt">{{ $t(item.label) }}</span>
      </div>
    </div>
    <!-- 链接钱包弹窗 -->
    <WalletComponents
      @closewalletpage="walletClose"
      @walletClick="walletClick"
    ></WalletComponents>
    <!-- 普通弹窗 -->
    <Proup :isProgress="getProupInfo.isProgress" :proupStatus="getProupInfo.status" :content="getProupInfo.content" @closeProup="proupClose" @closetimer="proupClose"></Proup>
    <!-- 轻提示 -->
    <Notice :noticeStatus="getNoticeInfo.status" :word="getNoticeInfo.word"></Notice>
    <!-- 开盲盒弹窗 -->
    <OpenProup
      :resultStatus="getPrizeInfo.status"
      :boxarr="getPrizeInfo.boxarr"
      @closepage="closepageFun">
    </OpenProup>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import OpenProup from "@/components/OpenProup.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPrizeInfo","getIstrue","getAccount","isEnLang","getIsMobile","getProupInfo","getNoticeInfo","getProgressInfo"])
  },
  data(){
    return {
      navArr: [
        { label: "message.nav.txt10", link: "/home" },
        { label: "message.nav.txt1", link: "/bond" },
        { label: "message.nav.txt3", link: "/nft" },
        { label: "message.nav.txt4", link: "" },
        { label: "message.nav.txt13", link: "" }
      ],
    }
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        // console.log('app.vue页面的监听钱包状态newValue: ', newValue);
        if (newValue) {
          // console.log("app的就爱你听账号")
          this.$utils.newgetUserBoxInfoFun(this.getAccount).then(res => {
            sessionStorage.setItem("sb_count", res)
          })
        }
      },
      deep: true,
      immediate: true,
    },
    'getNoticeInfo':{
      handler: function (newValue) {
        if (newValue.status) {
          setTimeout(() => {
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':false,'word':''}));
            this.$store.commit("setNoticeNum",false)
          }, 2500);
        }
      },
      deep: true,
      immediate: true,
    },
    'getProgressInfo':{
      handler: function (newValue) {
        if (newValue.value == 100) {
          setTimeout(() => {
            this.$store.dispatch("setProgressInfo", JSON.stringify({'value':1,'title':''}));
          },1500)
        }
      },
      deep: true,
      immediate: true,
    }
  },
  components: {
    NavigationBar,
    FooterComponents,
    OpenProup
  },
  methods: {
    proupClose(){
      if(this.getProupInfo.ortherDoing){
        this.$store.commit("setProupStatus", JSON.stringify({'status':false,'content':''}));
        setTimeout(() => {
          this.$router.push('/signin/login')
        },500)
        return
      }
      // this.$store.dispatch("setProgressInfo", JSON.stringify({'value':1,'title':''}))
      this.$store.commit("setProupStatus", JSON.stringify({'status':false,'content':'','isProgress':true,'title':'message.tip.txt3','ortherDoing':false,'link':''}));
    },
    setRem() {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        console.log("移动端")
      }else{
        console.log("pc端")
      }
      const bodyWidth = document.body.clientWidth;
      const rem375 = (bodyWidth * 100) / 375;
      if (bodyWidth <= 980) {
        document.getElementsByTagName("html")[0].style.fontSize = rem375 + "px";
      }
    },
    toRoute(link) {
      if (link) this.$router.push(link);
    },
    // 钱包关闭弹窗方法
    walletClose() {
      this.$store.commit("setwalletstatus", false);
    },
    // 链接钱包弹窗方法
    walletClick(item) {
      this.$utils.connectWallet("metamask").then(res => {
        // console.log('方法返回res: ', res);
        this.$store.commit("setwalletstatus", false);
      })
    },
    // 关闭开盲盒弹窗
    closepageFun(){
      this.$store.commit("setPrizeInfo", JSON.stringify({'status':false,'boxarr':[]}));
    }
  },
  mounted() {
    if(localStorage.getItem('walletType')){
      this.$utils.connectWallet(localStorage.getItem('walletType'))
    }
    window.addEventListener("load", this.setRem);
    window.addEventListener("resize", this.setRem);
  },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  min-height: 100vh;
  background: #000000;
}
@media screen and (min-width: 981px) {
  .mobile_nav{
    display: none;
  }
}
@media screen and (max-width: 980px) {
  #app{
    padding-bottom: 1.1rem;
  }
  .mobile_nav{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
    padding: 0 0.2rem;
    .mobile_onebox{
      max-width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .box{
        width: 20px;
        height: 20px;
        background: blue;
      }
      .mobile_nav_txt{
        font-weight: 600;
        color: #ECCF83;
        line-height: 0.14rem;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>
