<template>
  <div id="app">
    <!-- <div class="video_"> -->
      <video class="video_" loop autoplay muted>
        <source src="./assets/video/1.mp4" type="video/mp4" />
      </video>
      <!-- <iframe style="display: none" allow="autoplay" src="./assets/video/1.mp4"></iframe> -->
    <!-- </div> -->
    <NavigationBar />
    <router-view />
    <FooterComponents />
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
export default {
  components: {
    NavigationBar,
    FooterComponents,
  },
  methods: {
    setRem() {
      const bodyWidth = document.body.clientWidth;
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
  width: calc(100vw - 5px);
  min-height: 100vh;
  padding-top: 80px;
}
</style>
