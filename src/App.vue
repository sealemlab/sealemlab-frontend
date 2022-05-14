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
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang","getIsMobile"])
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
  components: {
    NavigationBar,
    FooterComponents,
  },
  methods: {
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
  },
  mounted() {
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
