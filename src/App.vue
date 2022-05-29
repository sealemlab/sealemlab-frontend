<template>
  <div id="app" :class="isEnLang ? 'en_Regular' : 'cn_lang'">
    <NavigationBar />
    <router-view />
    <FooterComponents />
    <div class="mobile_nav">
      <div class="mobile_onebox" v-for="(item, index) in navArr" :key="index" @click="toRoute(item, index)">
        <div class="box" :class="item.status ? 'box_color' : ''" v-if="index == 0">
          <font-awesome-icon :icon="['fas', 'house']"></font-awesome-icon>
        </div>
        <div class="box" :class="item.status ? 'box_color' : ''" v-if="index == 1">
          <font-awesome-icon :icon="['fas', 'globe']"></font-awesome-icon>
        </div>
        <div class="box" v-if="index == 2">
          <svg t="1653723717313" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5662" width="32" height="32"><path d="M561.92 28.7744a99.84 99.84 0 0 0-99.84 0l-343.552 198.3488a99.84 99.84 0 0 0-49.9712 86.528v396.6976c0 35.6864 19.0464 68.608 49.92 86.4768l343.6032 198.3488a99.84 99.84 0 0 0 99.84 0l343.552-198.3488a99.84 99.84 0 0 0 49.9712-86.4768V313.6a99.84 99.84 0 0 0-49.92-86.4768L561.92 28.7744z m-66.56 57.6512a33.28 33.28 0 0 1 33.28 0l343.552 198.3488a33.28 33.28 0 0 1 16.6912 28.8256v396.8a33.28 33.28 0 0 1-16.64 28.7744l-343.6032 198.3488a33.28 33.28 0 0 1-33.28 0l-343.552-198.3488a33.28 33.28 0 0 1-16.6912-28.8256V313.6a33.28 33.28 0 0 1 16.64-28.8256l343.6032-198.3488z m-137.6768 562.176a34.1504 34.1504 0 0 0 63.1296-17.9712v-238.08a34.1504 34.1504 0 1 0-68.2496 0v118.3232L267.9296 374.528A34.1504 34.1504 0 0 0 204.8 392.5504v238.08a34.1504 34.1504 0 1 0 68.2496 0v-118.3744l84.6336 136.3456z m144.0768 16.128a34.1504 34.1504 0 0 1-34.0992-34.1504V392.5504c0-18.8928 15.2576-34.1504 34.0992-34.1504h94.72a34.1504 34.1504 0 1 1 0 68.2496h-60.5696v50.7904h60.5184a34.1504 34.1504 0 1 1 0 68.2496h-60.5184v84.9408a34.1504 34.1504 0 0 1-34.1504 34.0992z m223.9488-238.08h-33.4848a34.1504 34.1504 0 1 1 0-68.2496H827.4944a34.1504 34.1504 0 1 1 0 68.2496h-33.4848v203.9296a34.0992 34.0992 0 1 1-68.3008 0V426.6496z" p-id="5663" :fill="item.status ? '#ECCF83' : '#ffffff'"></path></svg>
        </div>
        <div class="box" v-if="index == 3">
          <svg
            t="1653452552652"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4246"
            width="32"
            height="32"
          >
            <path
              d="M85.333333 625.92a85.333333 85.333333 0 1 0 170.666667 0v-85.333333H170.666667a85.333333 85.333333 0 0 0-85.333334 85.333333z m539.306667-142.506667a85.333333 85.333333 0 0 0 85.333333-85.333333V170.666667a85.333333 85.333333 0 1 0-170.666666 0v227.413333a85.333333 85.333333 0 0 0 86.186666 85.333333z m312.32-85.333333a85.333333 85.333333 0 1 0-170.666667 0v85.333333h85.333334a85.333333 85.333333 0 0 0 87.04-85.333333zM398.506667 540.586667a85.333333 85.333333 0 0 0-85.333334 85.333333V853.333333a85.333333 85.333333 0 1 0 170.666667 0v-227.413333a85.333333 85.333333 0 0 0-85.333333-85.333333zM625.493333 768h-85.333333v85.333333a85.333333 85.333333 0 1 0 85.333333-85.333333zM853.333333 540.586667h-227.84a85.333333 85.333333 0 0 0 0 170.666666H853.333333a85.333333 85.333333 0 0 0 0-170.666666zM398.506667 312.746667H170.666667a85.333333 85.333333 0 1 0 0 170.666666h227.84a85.333333 85.333333 0 0 0 0-170.666666z m0-227.413334a85.333333 85.333333 0 0 0 0 170.666667h85.333333V170.666667a85.333333 85.333333 0 0 0-85.333333-85.333334z"
              p-id="4247"
              :fill="item.status ? '#ECCF83' : '#ffffff'"
            ></path>
          </svg>
        </div>
        <div class="box" v-if="index == 4">
          <svg
            t="1653452811702"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6215"
            width="32"
            height="32"
          >
            <path
              d="M227.14123 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C321.728492 456.087573 279.288914 413.647995 227.14123 413.647995z"
              p-id="6216"
              :fill="item.status ? '#ECCF83' : '#ffffff'"
            ></path>
            <path
              d="M510.903016 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C605.490278 456.087573 563.051723 413.647995 510.903016 413.647995z"
              p-id="6217"
              :fill="item.status ? '#ECCF83' : '#ffffff'"
            ></path>
            <path
              d="M794.665825 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C889.253086 456.087573 846.813508 413.647995 794.665825 413.647995z"
              p-id="6218"
              :fill="item.status ? '#ECCF83' : '#ffffff'"
            ></path>
          </svg>
        </div>
        <span class="mobile_nav_txt" :class="item.status ? 'box_color' : ''">{{ $t(item.label) }}</span>
      </div>
    </div>
    <div class="mobile_proup" v-if="isShowMore" @click="isShowMore = false">
      <div class="content">
        <span @click="routeFun('Market')">{{$t("message.nav.txt4")}}</span>
        <span @click="routeFun('Game')">{{$t("message.nav.txt5")}}</span>
        <span @click="routeFun('User')">{{$t("message.nav.txt6")}}</span>
        <p>
          <span>EN</span>
        </p>
      </div>
    </div>
    <!-- 链接钱包弹窗 -->
    <WalletComponents @closewalletpage="walletClose" @walletClick="walletClick"></WalletComponents>
    <!-- 普通弹窗 -->
    <Proup
      :isProgress="getProupInfo.isProgress"
      :proupStatus="getProupInfo.status"
      :content="getProupInfo.content"
      @closeProup="proupClose"
      @closetimer="proupClose"
    ></Proup>
    <!-- 轻提示 -->
    <Notice :noticeStatus="getNoticeInfo.status" :word="getNoticeInfo.word"></Notice>
    <!-- 开盲盒弹窗 -->
    <OpenProup :resultStatus="getPrizeInfo.status" :boxarr="getPrizeInfo.boxarr" @closepage="closepageFun"> </OpenProup>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import OpenProup from "@/components/OpenProup.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPrizeInfo", "getIstrue", "getAccount", "isEnLang", "getProupInfo", "getNoticeInfo", "getProgressInfo"]),
  },
  data() {
    return {
      navArr: [
        { label: "message.nav.txt10", link: "/home", status: true },
        { label: "message.nav.txt1", link: "/bond", status: false },
        { label: "message.nav.txt3", link: "/nft", status: false },
        { label: "message.nav.txt2", link: "", status: false },
        { label: "message.nav.txt13", link: "", status: false },
      ],
      isShowMore: false,
      // startX:0,
      startY: 0,
      startTime: null,
      oldScrollTop:0
    };
  },
  watch: {
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          this.$utils.newgetUserBoxInfoFun(this.getAccount).then((res) => {
            sessionStorage.setItem("sb_count", res);
          });
        }
      },
      deep: true,
      immediate: true,
    },
    getNoticeInfo: {
      handler: function (newValue) {
        if (newValue.status) {
          setTimeout(() => {
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: false, word: "" }));
            this.$store.commit("setNoticeNum", false);
          }, 2500);
        }
      },
      deep: true,
      immediate: true,
    },
    getProgressInfo: {
      handler: function (newValue) {
        if (newValue.value == 100) {
          setTimeout(() => {
            this.$store.dispatch("setProgressInfo", JSON.stringify({ value: 1, title: "" }));
          }, 1500);
        }
      },
      deep: true,
      immediate: true,
    },
    isShowMore(newvala) {
      if (newvala) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    },
    $route(to) {
      this.navArr.forEach((item) => {
        item.status = false;
      });
      if (to.path == "/home") {
        this.navArr[0].status = true
      } else if (to.path == "/bond") {
        this.navArr[1].status = true
      } else if (to.path.indexOf("/nft/") !== -1) {
        this.navArr[2].status = true
      }else{
        this.navArr[4].status = true
      }
    },
  },
  components: {
    NavigationBar,
    FooterComponents,
    OpenProup,
  },
  methods: {
    proupClose() {
      if (this.getProupInfo.ortherDoing) {
        this.$store.commit("setProupStatus", JSON.stringify({ status: false, content: "" }));
        setTimeout(() => {
          this.$router.push("/signin/login");
        }, 500);
        return;
      }
      // this.$store.dispatch("setProgressInfo", JSON.stringify({'value':1,'title':''}))
      this.$store.commit(
        "setProupStatus",
        JSON.stringify({ status: false, content: "", isProgress: true, title: "message.tip.txt3", ortherDoing: false, link: "" }),
      );
    },
    setRem() {
      // if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      //   console.log("移动端")
      // }else{
      //   console.log("pc端")
      // }
      const bodyWidth = document.body.clientWidth;
      const rem375 = (bodyWidth * 100) / 375;
      if (bodyWidth <= 980) {
        document.getElementsByTagName("html")[0].style.fontSize = rem375 + "px";
      }
    },
    toRoute(item, index) {
      console.log("item,index: ", item, index);
      if (item.link) {
        // this.navArr.forEach((item) => {
        //   item.status = false;
        // });
        // item.status = true;
        this.$router.push(item.link);
      } else {
        if (index == this.navArr.length - 1) {
          // this.navArr.forEach((item) => {
          //   item.status = false;
          // });
          // item.status = true;
          this.isShowMore = true;
        } else {
          this.isShowMore = false;
          if (!this.getNoticeNum) {
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
            this.$store.commit("setNoticeNum", true);
          }
        }
      }
    },
    routeFun(data) {
      this.isShowMore = false;
      switch (data) {
        // case 'Market':
        //   // this.$router.push('')
        //   break;
        case "Game":
          this.$router.push("/game/game");
          break;
        case "User":
          this.$router.push("/user/assets/0");
          break;
        default:
          if (!this.getNoticeNum) {
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
            this.$store.commit("setNoticeNum", true);
          }
          break;
      }
    },
    // 钱包关闭弹窗方法
    walletClose() {
      this.$store.commit("setwalletstatus", false);
    },
    // 链接钱包弹窗方法
    walletClick(item) {
      this.$utils.connectWallet("metamask").then((res) => {
        // console.log('方法返回res: ', res);
        this.$store.commit("setwalletstatus", false);
      });
    },
    // 关闭开盲盒弹窗
    closepageFun() {
      this.$store.commit("setPrizeInfo", JSON.stringify({ status: false, boxarr: [] }));
    },
    //屏幕滑动 //手指按下屏幕
    handleTouchstart(event) {
      this.startTime = Date.now();
      // this.startX = event.changedTouches[0].clientX
      this.startY = event.changedTouches[0].clientY;
    },
    //手指离开屏幕
    handleTouchend(event) {
      const endTime = Date.now();
      // const endX = event.changedTouches[0].clientX
      const endY = event.changedTouches[0].clientY;
      //判断按下的时长
      if (endTime - this.startTime > 2000) {
        console.log("时间大于2秒");
        return;
      }
      //滑动的方向
      let direction = endY - this.startY > 10 ? "top" : "bottom";
      console.log("endY -this.startY: ", endY, this.startY);
      //用户做了合法的滑动操作
      // console.log('方向'+direction)
      if (direction === "bottom") {
        console.log("下滑");
        this.$store.commit("setMoblieTouch", JSON.stringify({ direction: "bottom" }));
      }
      if (direction === "top") {
        console.log("上滑");
        this.$store.commit("setMoblieTouch", JSON.stringify({ direction: "top" }));
      }
    },
    scrollingFun() {
      const bodyWidth = document.body.clientWidth;
      if (bodyWidth <= 980) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let scrollStep = scrollTop - this.oldScrollTop > 0;
        this.oldScrollTop = scrollTop;
        this.$store.commit("setMoblieTouch", JSON.stringify({ direction: scrollStep?"bottom":"top" }));
      }
    },
  },
  mounted() {
    if (localStorage.getItem("walletType")) {
      this.$utils.connectWallet(localStorage.getItem("walletType"));
    }
    window.addEventListener("scroll", this.scrollingFun);
    window.addEventListener("load", this.setRem);
    window.addEventListener("resize", this.setRem);
  },
};
</script>

<style lang="scss">
#app {
  width:calc(100vw - 5px);
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(132deg, #0E0E0E 0%, #0B0A0A 100%);
}
@media screen and (min-width: 981px) {
  .mobile_nav,
  .mobile_proup {
    display: none;
  }
}
@media screen and (max-width: 980px) {
  #app {
    width: 100%;
    padding-bottom: 1.1rem;
  }
  .mobile_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.7rem;
    background: linear-gradient(180deg, #1b1919 0%, #000000 100%);
    padding: 0 0.2rem;
    .mobile_onebox {
      max-width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .box {
        height: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.25rem;
      }
      .mobile_nav_txt {
        font-weight: 600;
        color: #ffffff;
        line-height: 0.14rem;
      }
      .box_color {
        color: #eccf83;
      }
    }
  }
  .mobile_proup {
    position: fixed;
    bottom: 0.6rem;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    .content {
      width: 1.48rem;
      height: 2.05rem;
      background: linear-gradient(180deg, #1b1919 0%, #000000 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-end;
      padding-right: 0.26rem;
      span {
        font-weight: 600;
        color: #eccf83;
        line-height: 14px;
      }
    }
  }
}
</style>
