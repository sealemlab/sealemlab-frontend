<template>
  <div class="nav" :class="isEnLang ? 'en_Bold' : 'cn_lang'">
    <div class="nav_left">
      <img class="logo" :src="`${$store.state.imgUrl}new_logo.webp`" alt="" @click="goHome" />
      <ul class="mobile_none">
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item)">
          <span class="font18">{{ $t(item.label) }}</span>
        </li>
      </ul>
    </div>
    <div class="buy_box" :class="{activepage:navActive == 6}" @click="buybox">
      <span>{{ $t("message.nav.txt14") }}</span>
    </div>
    <div class="nav_right">
      <div class="st_price">
        <img :src="`${$store.state.imgUrl}new_stlogo.webp`" class="st_price_img" />
        <span class="font_price font16">$ {{getUserCoin.stPrice | PriceConversion(2)}}</span>
      </div>
      <div class="login_box" v-if="!getProduction">
        <div class="font_login font16" :class="{ active: navActive == 7 }" @click="loginClick('myaccout')" v-if="getLogin.loginStatus">
          {{ $t("message.nav.txt8") }}
        </div>
        <div class="font_login font16" :class="{ active: navActive == 7 }" v-else>
          <span @click="loginClick('register')">{{ $t("message.nav.txt8_1") }}</span> /
          <span @click="loginClick('login')">{{ $t("message.nav.txt8_2") }}</span>
        </div>
      </div>
      <div class="login_box" v-else></div>
      <!-- 链接钱包 -->
      <div class="walletBox font16" v-if="getIstrue">
        <div class="connect_triangle">
          <span class="span2">{{ getSubtringAccount }}</span>
          <span class="connect_icon"></span>
        </div>
        <div class="wallet_hover">
          <div class="lastbox_hover">
            <div class="hover_span1" @click.stop="signOutFun">
              <span class="span_exit">Disconnect</span>
              <img :src="`${$store.state.imgUrl}exit.webp`" class="exit_class" />
            </div>
          </div>
        </div>
      </div>
      <div class="walletBox font16" v-else @click="commonLink">{{ $t("message.nav.txt9") }}</div>
      <!-- <div class="connect font16" v-if="getIstrue">{{getSubtringAccount}}</div>
      <div class="connect font16" v-else @click="commonLink">{{ $t("message.nav.txt9") }}</div> -->
      <div class="lang_box mobile_lang">
        <!--  @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false" -->
        <span>{{ language }}</span>
        <!-- <img :src="`${$store.state.imgUrl}accrow.webp`" alt="" />
        <transition name="select-lang" appear>
          <ul v-show="s howLangSelect">
            <li v-for="(item, index) in langArr" :key="index" @click="selectLang(index)">{{ item }}</li>
          </ul>
        </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { wallet } from "sealemlab-sdk";
export default {
  data() {
    return {
      navActive: -1,
      navArr: [
        { label: "message.nav.txt1", link: "/bond",id:0},
        { label: "message.nav.txt2", link: "/staking",id:1},
        { label: "message.nav.txt3", link: "/nft",id:2},
        { label: "message.nav.txt4", link: "/market",id:3},
        { label: "message.nav.txt5", link: "/game/game",id:4},
        { label: "message.nav.txt6", link: "/user/assets/0",id:5},
        // { label: "message.nav.txt7", link: "" }
      ],
      showLangSelect: false,
      language: "",
      langArr: ["EN", "ZH"],
      routeArr:[]
    };
  },
  computed: { ...mapGetters(["getProduction","getNoticeNum", "isEnLang", "getLogin","getUserCoin","getSubtringAccount", "getIstrue"]) },
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      // 不是正式环境的话,展示
      if(this.getProduction){
        if (to.path == "/market" || to.path == "/staking") {
          this.navActive = -1
          if (!this.getNoticeNum) {
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
            this.$store.commit("setNoticeNum", true);
          }
          return
        }
      }
      this.navActive = this.callArray(to.path)
    },
  },
  created() {
    this.language = this.$i18n.locale == "EN" ? this.langArr[0] : this.langArr[1];
    wallet.onDisconnect(this.signOutFun);
  },
  methods: {
    // 调用数组,返回对应id
    callArray(data){
      if(data == '/home'){
        return -1
      }
      let localeArr = JSON.parse(localStorage.getItem('routeArr'))
      let arr = localeArr.filter(item => {
        return data.indexOf(item.link) != -1
      })
      return arr[0].id
    },
    // 退出钱包
    async signOutFun() {
      sessionStorage.removeItem("setnewinfo");
      if (localStorage.getItem("walletType") == "walletconnect") {
        wallet.disconnect();
      }
      localStorage.removeItem("walletType");
      this.$store.commit("setnewinfo", JSON.stringify({}));
    },
    toRoute(item) {
      if(this.getProduction){
        if(item.link == '/market' || item.link == "/staking"){
          if (!this.getNoticeNum) {
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
            this.$store.commit("setNoticeNum", true);
          }
          return
        }
        this.$router.push(item.link)
        this.routeArr.push(item)
        localStorage.setItem('routeArr',JSON.stringify(this.routeArr))
      }else{
        this.$router.push(item.link)
        this.routeArr.push(item)
        localStorage.setItem('routeArr',JSON.stringify(this.routeArr))
      }
    },
    goHome(){
      this.$router.push('/home');
    },
    loginClick(data) {
      this.routeArr.push({link: "/myaccount",id:7},{link: "/signin",id:7})
      localStorage.setItem('routeArr',JSON.stringify(this.routeArr))
      switch (data) {
        case "myaccout":
          this.$router.push("/myaccount/information");
          break;
        case "register":
          this.$router.push("/signin/register");
          break;
        case "login":
          this.$router.push("/signin/login");
          break;
        default:
          break;
      }
    },
    selectLang(index) {
      if (this.language == this.langArr[index]) return (this.showLangSelect = false);
      this.language = this.langArr[index];
      this.$i18n.locale = this.language == "EN" ? "EN" : "ZH";
      // this.$utils.setCookie("LANG", this.$i18n.locale);
      // location.reload();
    },
    // 链接钱包弹窗
    commonLink() {
      this.$store.commit("setwalletstatus", true);
    },
    buybox(){
      this.routeArr.push({link: "/activepage",id:6})
      localStorage.setItem('routeArr',JSON.stringify(this.routeArr))
      this.$router.push('/activepage/0');
    }
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 80px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
}
.nav_left {
  display: flex;
  align-items: center;
  .logo {
    width: auto;
    height: 63px;
    margin-right: 14px;
    cursor: pointer;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      cursor: pointer;
      padding: 10px 14px;
      font-weight: bold;
      color: #CED3D9;
      &:hover{
        color: #EDD083;
      }
    }
  }
}
.buy_box{
  cursor: pointer;
  width: 114px;
  height: 34px;
  background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
  border-radius: 4px;
  border: 1px solid #CED3D9;
  backdrop-filter: blur(14px);
  text-align: center;
  line-height: 34px;
  font-weight: bold;
  color: #CED3D9;
  &:hover{
    span {
      color: #EDD083;
    }
  }
}
.activepage{
  border: 1px solid #ECCF83;
  span {
    color: #EDD083;
  }
}
.active {
  span {
    color: #EDD083;
  }
}
.nav_right {
  display: flex;
  align-items: center;
  .st_price {
    display: flex;
    align-items: center;
    .st_price_img {
      width: 32px;
    }
    .font_price {
      font-weight: bold;
      color: #f0c682;
      line-height: 19px;
      margin-left: 10px;
    }
  }
  .login_box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 8px 0 22px;
    .font_login {
      font-weight: bold;
      line-height: 19px;
    }
  }
  .walletBox {
    position: relative;
    cursor: pointer;
    background: #232229;
    border: 1px solid #4f4e53;
    border-radius: 8px;
    margin-right: 17px;
    padding: 5px 10px;
    .connect_triangle {
      width: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .span2 {
        color: #CED3D9;
        font-weight: bold;
      }
      .connect_icon {
        border-width: 5px;
        margin-left: 5px;
        margin-top: 5px;
        border-color: #CED3D9;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }
    .wallet_hover {
      display: none;
    }
  }
  .walletBox:hover {
    .connect_triangle {
      .connect_icon {
        margin-top: -5px;
        border-top-color: transparent;
        border-bottom-color: #CED3D9;
        border-bottom-style: solid;
      }
    }
    .wallet_hover {
      position: absolute;
      left: 0;
      display: flex;
      .lastbox_hover {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 5px 10px;
        background: #232229;
        border-radius: 8px;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
        .hover_span1 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          .span_exit {
            color: #CED3D9;
          }
          .span_exit:hover {
            color: #EDD083;
          }
          .exit_class {
            width: 18px;
            object-fit: contain;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .lang_box {
    cursor: pointer;
    position: relative;
    padding: 0 10px;
    span {
      margin-right: 5px;
      color: #939393;
    }
    img {
      width: 15px;
      height: auto;
    }
    ul {
      width: 100%;
      height: auto;
      background: #000;
      text-align: center;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 99;
      transition: transform 0.3s;
      transform-origin: top center;
      padding: 10px 0;
      li {
        padding: 5px 0;
        color: #939393;
        // 语言切换单独设置，不能改
        &:nth-child(1) {
          font-family: TrajanPro-Bold;
        }
        &:nth-child(2) {
          font-family: WenYue-GuDianMingChaoTi-JRFC;
        }
        &:hover {
          color: #CED3D9;
        }
      }
    }
  }
}
.select-lang-enter,
.select-lang-leave-to {
  transform: scaleY(0);
}
.select-lang-enter-to,
.select-lang-leave {
  transform: scaleY(1);
}
@media screen and (max-width: 980px) {
  .nav {
    padding: 0 0.15rem;
    background: linear-gradient(180deg, #1b1919 0%, #000000 100%);
    border-radius: 0px 0px 17px 17px;
    border: 1px solid #eccf83;
  }
  .nav_left {
    .logo {
      width: auto;
      height: 0.3rem;
      margin-right: 0;
    }
    .mobile_none {
      display: none;
    }
  }
  .buy_box{
    width: auto;
    padding: 0 0.16rem;
    height: 0.26rem;
    line-height: 0.26rem;
  }
  .nav_right {
    justify-content: space-between;
    .st_price {
      .st_price_img {
        width: 0.19rem;
      }
      .font_price {
        line-height: 0.14rem;
        margin-left: 0.1rem;
      }
    }
    .login_box {
      margin: 0 0.05rem;
      .font_login {
        font-weight: bold;
        line-height: 0.14rem;
      }
    }
    .connect {
      cursor: pointer;
      padding: 0.05rem 0.15rem;
      border-radius: 0.08rem;
      margin-right: 0;
      line-height: 0.12rem;
    }
    .walletBox {
      position: relative;
      cursor: pointer;
      background: #232229;
      border: 1px solid #4f4e53;
      border-radius: 0.08rem;
      margin-right: 0;
      padding: 0.05rem 0.05rem;
      .connect_triangle {
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .span2 {
          color: #CED3D9;
          font-weight: bold;
        }
        .connect_icon {
          border-width: 5px;
          margin-left: 5px;
          margin-top: 5px;
          border-color: #CED3D9;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
    }
    .mobile_lang {
      display: none;
    }
  }
}
</style>
