<template>
  <div id="app">
    <NavigationBar />
    <div class="view_center">
      <router-view />
    </div>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  components: {
    NavigationBar,
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
  height: 100vh;
  background: #000;
  .view_center {
    width: 100vw;
    height: calc(100vh - 80px);
    overflow: auto;
  }
}
</style>
