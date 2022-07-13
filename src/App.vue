<template>
  <div id="app" :class="isEnLang ? 'en_Regular' : 'cn_lang'">
    <NavigationBar />
    <router-view />
    <FooterComponents />
    <div class="mobile_nav">
      <div
        class="mobile_onebox"
        v-for="(item, index) in navArr"
        :key="index"
        @click="toRoute(item, index)"
      >
        <div
          class="box"
          :class="item.status ? 'box_color' : ''"
          v-if="index == 0"
        >
          <font-awesome-icon :icon="['fas', 'house']"></font-awesome-icon>
        </div>
        <div
          class="box"
          :class="item.status ? 'box_color' : ''"
          v-if="index == 1"
        >
          <font-awesome-icon
            :icon="['fas', 'circle-dollar-to-slot']"
          ></font-awesome-icon>
        </div>
        <div class="box" v-if="index == 2">
          <svg
            t="1653882839805"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="14255"
            width="32"
            height="32"
          >
            <path
              d="M708.608 864.0512a93.7984 93.7984 0 0 1-22.0672 2.6112H337.4592c-7.5776 0-14.9504-0.9216-22.016-2.56a275.0976 275.0976 0 0 1-151.3984-70.9632A174.3872 174.3872 0 0 0 337.4592 947.2h349.0816a174.3872 174.3872 0 0 0 173.3632-154.0608 275.0976 275.0976 0 0 1-151.3472 70.912z"
              p-id="14256"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
            ></path>
            <path
              d="M670.5664 76.8H353.4336A225.1264 225.1264 0 0 0 128 301.6192v291.328a225.1264 225.1264 0 0 0 225.4336 224.768h317.1328a225.1264 225.1264 0 0 0 225.4336-224.768V301.568A225.1264 225.1264 0 0 0 670.5664 76.8z m-1.9456 527.1552a39.7824 39.7824 0 0 1-72.4992 22.8352L434.9952 397.5168v206.4896a39.7312 39.7312 0 0 1-79.616 0V280.7808a39.7824 39.7824 0 0 1 72.4992-22.8352l161.1264 228.7104V280.7296a39.7312 39.7312 0 0 1 79.616 0v323.2768z"
              p-id="14257"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
            ></path>
          </svg>
        </div>
        <div class="box" v-if="index == 3">
          <svg
            t="1653722205715"
            class="icon"
            viewBox="0 0 1281 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2643"
            width="32"
            height="32"
          >
            <path
              d="M1278.7257 634l-56-364c-16-102-92-184-190-206C774.7257 6 506.7257 6 248.7257 64 148.7257 86 74.7257 168 58.7257 270L2.7257 634c-22 148 92 282 240 282 94 0 178-52 218-136l28-56h304l28 56c40 84 124 136 216 136h2c148 0 262-134 240-282z m-130 136c-28 32-68 50-112 50-54 0-104-30-130-82l-36-74c-12-22-34-36-58-36H468.7257c-24 0-48 14-58 36l-36 74c-26 52-76 82-132 82-42 0-82-18-110-50-28-34-42-78-34-122l54-362c10-64 56-114 118-128 244-56 496-56 740 0 62 14 108 64 118 128l54 362c6 44-6 88-34 122zM800.7257 436c-36 0-64 30-64 64s28 64 64 64 64-28 64-64-28-64-64-64z m-304-80h-64v-64c0-26-22-48-48-48s-48 22-48 48v64h-64c-26 0-48 22-48 48s22 48 48 48h64v64c0 26 22 48 48 48s48-22 48-48v-64h64c26 0 48-22 48-48s-22-48-48-48z m432-112c-36 0-64 30-64 64s28 64 64 64 64-28 64-64-28-64-64-64z"
              p-id="2644"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
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
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
            ></path>
            <path
              d="M510.903016 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C605.490278 456.087573 563.051723 413.647995 510.903016 413.647995z"
              p-id="6217"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
            ></path>
            <path
              d="M794.665825 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C889.253086 456.087573 846.813508 413.647995 794.665825 413.647995z"
              p-id="6218"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
            ></path>
          </svg>
        </div>
        <span class="mobile_nav_txt" :class="item.status ? 'box_color' : ''">{{
          $t(item.label)
        }}</span>
      </div>
    </div>
    <div class="mobile_proup" v-if="isShowMore" @click="isShowMore = false">
      <div class="content">
        <div
          class="add_icon"
          v-for="(item, index) in ortherNavArr"
          :key="index"
          @click="routeFun(index)"
        >
          <font-awesome-icon
            :icon="['fas', 'store']"
            v-if="index == 0"
          ></font-awesome-icon>
          <svg
            t="1653452552652"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4246"
            width="16"
            height="16"
            v-if="index == 1"
          >
            <path
              d="M85.333333 625.92a85.333333 85.333333 0 1 0 170.666667 0v-85.333333H170.666667a85.333333 85.333333 0 0 0-85.333334 85.333333z m539.306667-142.506667a85.333333 85.333333 0 0 0 85.333333-85.333333V170.666667a85.333333 85.333333 0 1 0-170.666666 0v227.413333a85.333333 85.333333 0 0 0 86.186666 85.333333z m312.32-85.333333a85.333333 85.333333 0 1 0-170.666667 0v85.333333h85.333334a85.333333 85.333333 0 0 0 87.04-85.333333zM398.506667 540.586667a85.333333 85.333333 0 0 0-85.333334 85.333333V853.333333a85.333333 85.333333 0 1 0 170.666667 0v-227.413333a85.333333 85.333333 0 0 0-85.333333-85.333333zM625.493333 768h-85.333333v85.333333a85.333333 85.333333 0 1 0 85.333333-85.333333zM853.333333 540.586667h-227.84a85.333333 85.333333 0 0 0 0 170.666666H853.333333a85.333333 85.333333 0 0 0 0-170.666666zM398.506667 312.746667H170.666667a85.333333 85.333333 0 1 0 0 170.666666h227.84a85.333333 85.333333 0 0 0 0-170.666666z m0-227.413334a85.333333 85.333333 0 0 0 0 170.666667h85.333333V170.666667a85.333333 85.333333 0 0 0-85.333333-85.333334z"
              p-id="4247"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
            ></path>
          </svg>
          <svg
            t="1653724466948"
            v-if="index == 2"
            class="icon"
            viewBox="0 0 1107 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="36756"
            width="16"
            height="16"
          >
            <path
              d="M563.323289 661.336738a330.663562 330.663562 0 1 0-330.531877-330.663562 331.190306 331.190306 0 0 0 330.531877 330.663562z"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
              p-id="36757"
            ></path>
            <path
              d="M1106.528066 975.53955c-16.724123-134.319727-137.611877-293.001365-273.38015-373.066457a381.889419 381.889419 0 0 1-539.912627-0.65843C157.335331 679.246035 18.274908 834.635523 0.365611 975.53955a42.797952 42.797952 0 0 0 37.26714 48.065392h1031.628175A43.061324 43.061324 0 0 0 1106.528066 975.53955z"
              :fill="item.status ? '#ECCF83' : '#CED3D9'"
              p-id="36758"
            ></path>
          </svg>
          <span :class="item.status ? 'box_color' : ''">{{
            $t(item.label)
          }}</span>
        </div>
        <p>
          <svg
            t="1653901824487"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="20967"
            width="16"
            height="16"
          >
            <path
              d="M988.968421 512c0-264.084211-212.884211-476.968421-476.968421-476.968421C247.915789 35.031579 35.031579 247.915789 35.031579 512c0 261.389474 212.884211 476.968421 474.273684 476.968421h5.389474c261.389474 0 474.273684-215.578947 474.273684-476.968421zM167.073684 781.473684c-53.894737-70.063158-88.926316-156.294737-94.315789-250.610526h212.88421c0 43.115789 5.389474 115.873684 24.252632 188.631579-56.589474 13.473684-110.484211 32.336842-142.821053 61.978947zM164.378947 242.526316c32.336842 29.642105 86.231579 51.2 145.51579 64.673684-16.168421 72.757895-21.557895 142.821053-21.557895 185.936842H75.452632c2.694737-94.315789 35.031579-180.547368 88.926315-250.610526z m695.242106 0c53.894737 70.063158 86.231579 156.294737 91.621052 250.610526h-212.88421c0-43.115789-5.389474-113.178947-24.252632-185.936842 59.284211-13.473684 113.178947-35.031579 145.51579-64.673684zM700.631579 493.136842h-169.768421v-167.073684c43.115789 0 94.315789-5.389474 145.515789-13.473684 18.863158 72.757895 21.557895 142.821053 24.252632 180.547368z m-169.768421-204.8V83.536842c70.063158 37.726316 110.484211 115.873684 134.736842 194.021053-45.810526 8.084211-94.315789 10.778947-134.736842 10.778947z m-37.726316-204.8v204.8c-40.421053 0-88.926316-5.389474-134.736842-10.778947 21.557895-78.147368 64.673684-153.6 134.736842-194.021053z m0 242.526316v167.073684H323.368421c0-37.726316 5.389474-107.789474 24.252632-177.852631 53.894737 8.084211 107.789474 10.778947 145.515789 10.778947zM323.368421 530.863158h169.768421V700.631579c-37.726316 0-88.926316 2.694737-145.515789 13.473684-18.863158-75.452632-21.557895-145.515789-24.252632-183.242105z m169.768421 207.494737v202.105263c-70.063158-37.726316-110.484211-113.178947-134.736842-191.326316 45.810526-8.084211 94.315789-10.778947 134.736842-10.778947z m37.726316 202.105263v-202.105263c40.421053 0 88.926316 5.389474 134.736842 13.473684-24.252632 75.452632-64.673684 150.905263-134.736842 188.631579z m0-239.831579v-169.768421H700.631579c0 37.726316-5.389474 107.789474-24.252632 183.242105-51.2-8.084211-105.094737-13.473684-145.515789-13.473684z m207.494737-169.768421h212.88421c-5.389474 94.315789-37.726316 180.547368-94.315789 250.610526-32.336842-29.642105-86.231579-48.505263-142.821053-61.978947 16.168421-72.757895 21.557895-145.515789 24.252632-188.631579zM835.368421 215.578947c-26.947368 24.252632-75.452632 43.115789-129.347368 53.894737-21.557895-70.063158-56.589474-140.126316-113.178948-188.631579 94.315789 16.168421 177.852632 64.673684 242.526316 134.736842zM431.157895 80.842105c-56.589474 48.505263-91.621053 118.568421-113.178948 191.326316C264.084211 258.694737 215.578947 239.831579 188.631579 215.578947c64.673684-70.063158 148.210526-118.568421 242.526316-134.736842zM191.326316 811.115789c26.947368-24.252632 75.452632-43.115789 129.347368-53.894736 21.557895 70.063158 56.589474 140.126316 110.484211 185.936842-94.315789-16.168421-177.852632-64.673684-239.831579-132.042106zM592.842105 943.157895c56.589474-48.505263 88.926316-115.873684 110.484211-185.936842 53.894737 10.778947 102.4 29.642105 129.347368 53.894736-61.978947 67.368421-145.515789 115.873684-239.831579 132.042106z"
              fill="#CED3D9"
              p-id="20968"
            ></path>
          </svg>
          <span>EN</span>
        </p>
      </div>
    </div>
    <!-- 链接钱包弹窗 -->
    <WalletComponents
      @closewalletpage="walletClose"
      @walletClick="walletClick"
    ></WalletComponents>
    <!-- 普通弹窗 -->
    <Proup
      :isProgress="getProupInfo.isProgress"
      :proupStatus="getProupInfo.status"
      :content="getProupInfo.content"
      @closeProup="proupClose"
      @closetimer="proupClose"
    ></Proup>
    <!-- 轻提示 -->
    <Notice
      :noticeStatus="getNoticeInfo.status"
      :word="getNoticeInfo.word"
    ></Notice>
    <!-- 开盲盒弹窗 -->
    <OpenProup
      :resultStatus="getPrizeInfo.status"
      :boxarr="getPrizeInfo.boxarr"
      @closepage="closepageFun"
    >
    </OpenProup>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import OpenProup from "@/components/OpenProup.vue";
import { mapGetters } from "vuex";
import { token,erc20,bondDepository,util } from  "sealemlab-sdk";
export default { 
  computed: {
    ...mapGetters(["getAccountStatus","getProduction","getUserCoin","getPrizeInfo", "getIstrue", "getAccount", "isEnLang", "getProupInfo", "getNoticeInfo", "getProgressInfo"]),
  },
  data () {
    return {
      navArr: [
        { label: "message.nav.txt10", link: "/home", status: true,id:-1 },
        { label: "message.nav.txt1", link: "/bond", status: false,id:0 },
        { label: "message.nav.txt3", link: "/nft", status: false,id:2 },
        { label: "message.nav.txt5", link: "/game/game", status: false,id:4 },
        { label: "message.nav.txt13", link: "", status: false,id:8 }, // more
      ],
      ortherNavArr: [
        { label: "message.nav.txt4", link: "/market", status: false,id:3 },
        { label: "message.nav.txt2", link: "/staking", status: false,id:1 },
        { label: "message.nav.txt6", link: "/user", status: false,id:5  }
      ],
      isShowMore: false,
      // startX:0,
      startY: 0,
      startTime: null,
      oldScrollTop: 0,
      timer:null
    };
  },
  watch: {
    getAccountStatus: {
      handler: function (newValue) {
        if(newValue > 0){
          this.$utils.antiShakeFun(() => {
            this.getUserCoinInfo()
          },2000)()
        }
      },
      deep: true,
      immediate: true,
    },
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          this.$utils.newgetUserBoxInfoFun(this.getAccount).then((res) => {
            sessionStorage.setItem("sb_count", res);
          })
          this.getUserCoinInfo()
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
    isShowMore (newvala) {
      if (newvala) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    },
    $route (to) {
      window.scrollTo(0, 0);
      this.navArr.forEach((item) => {
        item.status = false;
      });
      this.ortherNavArr.forEach((item) => {
        item.status = false;
      });

      if(this.getProduction){
        // || to.path == "/staking"
        if (to.path == "/market") {
          if (!this.getNoticeNum) {
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
            this.$store.commit("setNoticeNum", true);
          }
          return
        }
      }

      if (to.path == "/home") {
        this.navArr[0].status = true
      }else if (to.path == "/bond") {
        this.navArr[1].status = true
      }else if (to.path.indexOf("/nft/") !== -1) {
        this.navArr[2].status = true
      } else if (to.path.indexOf("/game/") !== -1) {
        this.navArr[3].status = true
      } else if (to.path.indexOf("/user/") !== -1) {
        this.ortherNavArr[2].status = true
        this.navArr[4].status = true
      }else if (to.path == "/market") {
        this.ortherNavArr[0].status = true
        this.navArr[4].status = true
      } else if (to.path == "/staking") {
        this.ortherNavArr[1].status = true
        this.navArr[4].status = true
      } else {
        this.navArr[4].status = true
      }
    }
  },
  components: {
    NavigationBar,
    FooterComponents,
    OpenProup,
  },
  methods: {
    proupClose () {
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
    setRem () {
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
    toRoute (item, index) {
      if (item.link) {
        this.$router.push(item.link);
        this.isShowMore = false;
      } else {
        if (index == this.navArr.length - 1) {
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
    // 更多方法
    routeFun (index) {
      this.isShowMore = false;
      switch (index) {
        case 0:
          if(!this.getProduction){
            this.$router.push("/market");
          }else{
            if (!this.getNoticeNum) {
              this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
              this.$store.commit("setNoticeNum", true);
            }
          }
          break;
        case 1:
          // if(!this.getProduction){
          //   this.$router.push("/staking");
          // }else{
          //   if (!this.getNoticeNum) {
          //     this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
          //     this.$store.commit("setNoticeNum", true);
          //   }
          // }
          this.$router.push("/staking");
          break;
        case 2:
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
    walletClose () {
      this.$store.commit("setwalletstatus", false);
    },
    // 链接钱包弹窗方法
    walletClick (item) {
      this.$utils.connectWallet(item.content).then(() => {
        this.$store.commit("setwalletstatus", false);
      });
    },
    // 关闭开盲盒弹窗
    closepageFun () {
      this.$store.commit("setPrizeInfo", JSON.stringify({ status: false, boxarr: [] }));
    },
    //屏幕滑动 //手指按下屏幕
    handleTouchstart (event) {
      this.startTime = Date.now();
      // this.startX = event.changedTouches[0].clientX
      this.startY = event.changedTouches[0].clientY;
    },
    //手指离开屏幕
    handleTouchend (event) {
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
    scrollingFun () {
      const bodyWidth = document.body.clientWidth;
      if (bodyWidth <= 980) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let scrollStep = scrollTop - this.oldScrollTop > 0;
        this.oldScrollTop = scrollTop;
        this.$store.commit("setMoblieTouch", JSON.stringify({ direction: scrollStep ? "bottom" : "top" }));
      }
    },
    getUserCoinInfo(){
      erc20(token().ST).balanceOf(this.getAccount).then(res => {
        let st = util.formatEther(res) //this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
        this.$store.commit("setUserCoin",Object.assign(this.getUserCoin,{st:st}));
      })
      erc20(token().SR).balanceOf(this.getAccount).then(res => {
        let sr = util.formatEther(res) //this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
        this.$store.commit("setUserCoin",Object.assign(this.getUserCoin,{sr:sr}));
      })
      erc20(token().BUSD).balanceOf(this.getAccount).then(res => {
        let busd = util.formatEther(res) //this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
        this.$store.commit("setUserCoin",Object.assign(this.getUserCoin,{busd:busd}))
      })
    }
  },
  mounted () {
    if (localStorage.getItem("walletType")) {
      this.$utils.connectWallet(localStorage.getItem("walletType"));
    }
    window.addEventListener("scroll", this.scrollingFun);
    window.addEventListener("load", this.setRem);
    window.addEventListener("resize", this.setRem);

    let beginTime = 0;//开始时间
    let differTime = 0;//时间差
    window.onunload = function (){
      differTime = new Date().getTime() - beginTime;
      if(differTime <= 5){
        console.log("页面关闭")
        localStorage.removeItem('routeArr')
      }
    };
    window.onbeforeunload = function (){
      beginTime = new Date().getTime();
    };
    bondDepository().getStPrice().then(res => {
      let stPrice = util.formatEther(res) //this.$utils.convertBigNumberToNormal(Number(res),0,18,true)
      this.$store.commit("setUserCoin",Object.assign(this.getUserCoin,{stPrice:stPrice}))
    })
  }
};
</script>

<style lang="scss">
#app {
  width: calc(100vw - 5px);
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
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
    padding-bottom: 0.8rem;
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
        color: #ced3d9;
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
      width: 1.3rem;
      height: 1.6rem;
      background: linear-gradient(180deg, #1b1919 0%, #000000 100%);
      display: flex;
      flex-direction: column;
      padding: 0.2rem;
      .add_icon {
        width: 100%;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        margin-bottom: 0.2rem;
        span {
          font-weight: 600;
          line-height: 14px;
          margin-left: 0.05rem;
          white-space:nowrap
        }
      }
      p{
        span{
          margin-left: 0.05rem;
        }
      }
    }
  }
}
</style>
