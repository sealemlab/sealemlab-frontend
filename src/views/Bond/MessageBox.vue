<template>
  <div
    class="out_title_box font14"
    ref="outbox"
    v-if="isShowTitle"
    @click="closeTitle"
  >
    <div class="postion_box" ref="titContent">
      <div class="tip_box" :class="isright ? 'mar_right' : 'mar_left'">
        <div class="con"></div>
      </div>
      <div class="showTitle">
        {{ $t(titleContent) }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    clientY: {
      type: Number,
      default:0
    },
    clientX: {
      type: Number,
      default:0
    },
    content:{
      type: String,
      default: ''
    },
  },
  watch:{
    'isShowTitle'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
  },
  data () {
    return {
      isShowTitle: false,
      titleContent: '',
      isright: false
    }
  },
  methods: {
    closeTitle () {
      this.isShowTitle = this.isright = false
    },
    titleFun () {
      const bodyWidth = document.body.clientWidth;
      this.isShowTitle = true
      this.titleContent = this.content
      this.$nextTick(() => {
        this.$refs.titContent.style.top = this.clientY + 'px'
        if (bodyWidth - this.clientX < 200) {
          this.$refs.titContent.style.right = '10px'
          this.isright = true
        } else {
          this.$refs.titContent.style.left = this.clientX + 'px'
        }
      })

    },
  }
}
</script>
<style lang="scss" scoped>
.out_title_box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999999999;
  .postion_box {
    position: absolute;
    .showTitle {
      padding: 10px;
      max-width: 200px;
      background: #252526;
      border: 1px solid #373636;
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.07), inset 0px 4px 9px 0px rgba(22, 24, 25, 0.82), inset 0px -1px 9px 0px #161819;
    }
    .mar_left {
      margin-left: 20px;
    }
    .mar_right {
      margin-left: 160px;
    }
    .tip_box {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px;
      border-color: transparent transparent rgba(68, 67, 67, 0.47) transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      margin-top: -3px;
      .con {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px;
        border-color: transparent transparent #252526 transparent;
        position: absolute;
        top: -2%;
      }
    }
  }
}
.out_title_box::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>