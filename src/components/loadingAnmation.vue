<template>
  <div class="loading_page">
    <div class="loader"></div>
    <span class="font20 loading_margin" v-if="isshowtxt">Loading...</span>
  </div>
</template>
<script>
export default {
  props: {
    isshowtxt: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style lang="scss" scoped>
.loading_page {
  width:100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loader {
    font-size: 12px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    animation: loadingA 1s infinite linear;
  }
  .loading_margin {
    margin-top: 60px;
    font-weight: normal;
    color: #ffffff;
    line-height: 34px;
  }
}
@keyframes loadingA {
  0% {
    box-shadow: -3em 2em 0 0.5em #fff, 0 2em 0 0 #fff, 3em 2em 0 -0.5em #fff;
  }
  25% {
    box-shadow: -3em 2em 0 0 #fff, 0 2em 0 -0.5em #fff, 3em 2em 0 0 #fff;
  }
  50% {
    box-shadow: -3em 2em 0 -0.5em #fff, 0 2em 0 0 #fff, 3em 2em 0 0.5em #fff;
  }
  75% {
    box-shadow: -3em 2em 0 0 #fff, 0 2em 0 0.5em #fff, 3em 2em 0 0 #fff;
  }
  100% {
    box-shadow: -3em 2em 0 0.5em #fff, 0 2em 0 0 #fff, 3em 2em 0 -0.5em #fff;
  }
}
</style>
