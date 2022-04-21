<template>
  <div id="app" :class="isEnLang?'en_Bold':'cn_lang'">
    <NavigationBar />
    <router-view />
    <FooterComponents />
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang"])
  },
  components: {
    NavigationBar,
    FooterComponents,
  },
  methods: {
    setRem() {
      const bodyWidth = document.body.clientWidth;
      console.log('bodyWidth: ', bodyWidth);
      const rem375 = (bodyWidth * 100) / 375;
      if (bodyWidth <= 980) {
        document.getElementsByTagName("html")[0].style.fontSize = rem375 + "px";
      }
    },
  },
  mounted() {
    this.setRem();
  },
};
</script>

<style lang="scss">
.video_ {
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  z-index: -999;
}
#app {
  width: 100vw;
  min-height: 100vh;
  background: #000000;
}
</style>
