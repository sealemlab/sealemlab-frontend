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
    <Proup :proupStatus="getProupInfo.status" :content="getProupInfo.content" @closeProup="proupClose"></Proup>
    <!-- 轻提示 -->
    <Notice :noticeStatus="getNoticeInfo.status" :word="getNoticeInfo.word"></Notice>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getIstrue","getAccount","isEnLang","getIsMobile","getProupInfo","getNoticeInfo"])
  },
  data(){
    return {
      navArr: [
        { label: "message.nav.txt10", link: "/home" },
        { label: "message.nav.txt1", link: "/bond" },
        { label: "message.nav.txt3", link: "/nft" },
        { label: "message.nav.txt4", link: "" },
        { label: "message.nav.txt5", link: "" }
      ],
    }
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        console.log('app.vue页面的监听钱包状态newValue: ', newValue);
        if (newValue) {
          this.$utils.newgetUserBoxInfoFun(this.getAccount).then(res => {
            sessionStorage.setItem("sb_count", res)
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    NavigationBar,
    FooterComponents,
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
      this.$store.commit("setProupStatus", JSON.stringify({'status':false,'content':''}));
    },
    setRem() {
      const bodyWidth = document.body.clientWidth;
      console.log('当前屏幕宽度: ', bodyWidth);
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 96px;
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
