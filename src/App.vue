<template>
  <div id="app">
    <NavigationBar />
    <!-- <div class="view_center"> -->
      <router-view />
    <!-- </div> -->
    <FooterComponents />
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import FooterComponents from "@/components/FooterComponents.vue";
export default {
  components: {
    NavigationBar,
    FooterComponents
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
#app {
  width: 100vw;
  min-height: 100vh;
  padding-top: 80px;
  background: #000;
  // .view_center {
  //   width: 100vw;
  //   height: calc(100vh - 80px);
  //   overflow: auto;
  // }
}
</style>
