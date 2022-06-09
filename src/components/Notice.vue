<template>
  <div class="notice_page" v-if="noticeStatus">
    <div class="content">{{ word.indexOf("message.") !== -1 ? $t(word) : word }}</div>
  </div>
</template>
<script>
export default {
  props: {
    word: {
      type: String,
      default: "message.tip.txt4",
    },
    noticeStatus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.notice_page {
  position: fixed;
  top: 0;
  z-index: 99999;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: top 1s linear forwards;
  backface-visibility: hidden; // 动画抖动
  perspective: 1000; // 动画抖动
  .content {
    min-width: 150px;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #232229;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
  }
}
@keyframes top {
  0% {
    top: 0;
    opacity: 0;
  }
  100% {
    top: 20%;
    opacity: 1;
  }
}
</style>
