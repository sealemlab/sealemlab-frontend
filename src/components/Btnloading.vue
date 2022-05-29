<template>
  <div class="donut" v-if="isloading"></div>
</template>
<script>
export default {
  props: {
    isloading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.donut {
  display: inline-block;
  border: 2px dashed #CED3D9;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: donut-spin 1.2s linear infinite;
  margin-left:5px;
}
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 980px) {
  .donut {
    border: 0.02rem 2px dashed #CED3D9;
    width: 0.16rem;
    height: 0.16rem;
    margin-left: 0.05rem;
  }
}
</style>
