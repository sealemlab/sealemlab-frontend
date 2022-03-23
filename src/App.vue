<template>
  <div id="app">
    <NavigationBar />
    <router-view/>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  components: {
    NavigationBar
  },
  methods:{
    setRem() {
      const bodyWidth = document.body.clientWidth;
      console.log("🚀 ~ file: App.vue ~ line 16 ~ setRem ~ bodyWidth", bodyWidth)
      const rem375 = (bodyWidth * 100) / 375;
      if (bodyWidth <= 980) {
        document.getElementsByTagName("html")[0].style.fontSize = rem375 + "px";
      }
    },
  },
  mounted(){
    this.setRem()
  }
}
</script>

<style lang="scss">
#app{
  width: 100%;
  padding-top: 96px;
  background: #000;
  // background-image: url("@/assets/images/bg.png");
  // background-size: 100% 100%;
}
</style>
