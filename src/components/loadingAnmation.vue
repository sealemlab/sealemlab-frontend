<template>
  <div class="loading_page">
    <div class="loader"></div>
    <span class="font20 loading_margin" v-if="isshowtxt">Loading...</span>
    <span class="cancle_loading" v-if="cancleStatus" @click="cancleloading">Cancel loading</span>
  </div>
</template>
<script>
export default {
  props: {
    isshowtxt: {
      type: Boolean,
      default: false
    },
    cancleStatus: {
      type: Boolean,
      default: false
    },
  },
  methods:{
    cancleloading(){
      this.$emit('cancleloading')
    }
  }
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
    color: #CED3D9;
    line-height: 34px;
  }
  .cancle_loading{
    cursor: pointer;
    padding:6px 5px;
    background: #000;
    margin-top: 60px;
    font-weight: normal;
    color: #CED3D9;
    border-radius: 4px;
  }
}
@keyframes loadingA {
  0% {
    box-shadow: -3em 2em 0 0.5em #CED3D9, 0 2em 0 0 #CED3D9, 3em 2em 0 -0.5em #CED3D9;
  }
  25% {
    box-shadow: -3em 2em 0 0 #CED3D9, 0 2em 0 -0.5em #CED3D9, 3em 2em 0 0 #CED3D9;
  }
  50% {
    box-shadow: -3em 2em 0 -0.5em #CED3D9, 0 2em 0 0 #CED3D9, 3em 2em 0 0.5em #CED3D9;
  }
  75% {
    box-shadow: -3em 2em 0 0 #CED3D9, 0 2em 0 0.5em #CED3D9, 3em 2em 0 0 #CED3D9;
  }
  100% {
    box-shadow: -3em 2em 0 0.5em #CED3D9, 0 2em 0 0 #CED3D9, 3em 2em 0 -0.5em #CED3D9;
  }
}
@media screen and (max-width: 980px) {
  .loading_page {
    min-height: 2rem;
  }
  .cancle_loading{
    margin-top: 0.2rem;
  }
}
</style>
