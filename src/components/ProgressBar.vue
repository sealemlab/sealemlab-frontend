<template>
  <div class="slider" ref="slider" :style="{ height }">
    <div class="process" :style="{ width,height }" ref="progress"></div>
    <div class="thunk" ref="trunk" :style="{ left,top }">
      <div class="block" :style="blockobj"></div>
    </div>
  </div>
</template>
<script>
/*
 * min 进度条最小值
 * max 进度条最大值
 * v-model 对当前值进行双向绑定实时显示拖拽进度
 * 
*/
export default {
  props: ["min", "max", "value","resetdata","height","blockobj","top","incomingData"],
  data () {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: this.value, //当前值
    };
  },
  watch:{
    resetdata(newvalue){
      if(newvalue){
        this.$refs.progress.style.width = 0
        this.$refs.trunk.style.left = 0
      }
    }
  },
  //渲染到页面的时候
  mounted () {
    const bodyWidth = document.body.clientWidth;
    if(bodyWidth <= 980){
      this.mobileLoad()
    }else{
      this.load()
    }
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为 当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left = slider进度width + trunk宽度/2
    scale () {
      return (this.per - this.min) / (this.max - this.min);
    },
    width(){
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left () {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + "px"
        );
      } else {
        return 0 + "px";
      }
    }
  },
  methods:{
    load(){
      this.slider = this.$refs.slider;
      this.thunk = this.$refs.trunk;
      let _this = this;
      this.thunk.onmousedown = function (e) {
        let width = parseInt(_this.width);
        // console.log('(_this.width: ', _this.width);
        let disX = e.clientX;
        // console.log('disX: ', disX);
        document.onmousemove = function (e) {
          // value, left, width
          // 当value变化的时候，会通过计算属性修改left，width
          // 拖拽的时候获取的新width
          let newWidth = e.clientX - disX + width;
          // console.log('newWidth: ', newWidth);
          // 拖拽的时候得到新的百分比
          let scale = newWidth / _this.slider.offsetWidth;
          // console.log('scale: ', scale);
          _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
          _this.per = Math.max(_this.per, _this.min);
          _this.per = Math.min(_this.per, _this.max);
          _this.$emit("input", _this.per);
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
        return false;
      }
    },
    mobileLoad(){
      this.slider = this.$refs.slider;
      this.thunk = this.$refs.trunk;
      var _this = this;
      this.thunk.ontouchstart = function (e) {
        // console.log('手指按下e: ', e);
        var width = parseInt(_this.width);
        var disX = e.changedTouches[0].clientX;
        document.ontouchmove = function (e) {
          // console.log('手指移动e: ', e);
          // value, left, width
          // 当value变化的时候，会通过计算属性修改left，width
          // 拖拽的时候获取的新width
          var newWidth = e.changedTouches[0].clientX - disX + width;
          // 拖拽的时候得到新的百分比
          var scale = newWidth / _this.slider.offsetWidth;
          _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
          _this.per = Math.max(_this.per, _this.min);
          _this.per = Math.min(_this.per, _this.max);
          _this.$emit("input", _this.per);
        };
        document.ontouchend = function () {
          // console.log("手指抬起")
          document.ontouchmove = document.ontouchend = null;
        };
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  user-select: none;
  position: relative;
  width: 100%;
  height: 3px;
  background: linear-gradient(180deg, #4E4D4D 0%, #6B6A6A 43%, #222121 100%);
  border-radius: 13px;
  cursor: pointer;
  .process {
    position: absolute;
    left: 0;
    top: 0;
    // width: 112px;
    height: 3px;
    background: linear-gradient(180deg, #F2D47B 0%, #F7E9B9 52%, #F0CE75 100%);
    border-radius: 13px;
  }
  .thunk {
    position: absolute;
    left: 100px;
    top: -5px;
    width: 12px;
    height: 12px;
  }
  .block {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgb(240, 203, 106);
    transition: 0.2s all;
  }
}
.slider .block:hover {
  transform: scale(1.1);
  opacity: 0.8;
}
</style>