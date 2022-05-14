<template>
  <div
    class="radial-indicator-container"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <div class="percentloop">
      <div class="circle-left" :style="{ backgroundColor: color }">
        <div
          :style="{ backgroundColor: backgroundColor }"
          ref="leftcontent"
        ></div>
      </div>
      <div class="circle-right" :style="{ backgroundColor: color }">
        <div
          :style="{ backgroundColor: backgroundColor }"
          ref="rightcontent"
        ></div>
      </div>
      <div class="content-wrap" :style="{ backgroundColor: centerbg ,top:circleSize,bottom:circleSize,left:circleSize,right:circleSize}">
        <span class="content-number font18" :style="{ color: fontcolor }" :title="ranking">{{ ranking }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RadialIndicator',
  props: {
    ranking: {// 进度条文字
      type: [String, Number],
      default: 0
    },
    size: { //整个进度条的大小
      type: [String, Number],
      default: 20
    },
    color: {// 活动的进度条背景色
      type: String,
      default: '#000'
    },
    centerbg:{ // 进度条中心内容的背景色
      type: String,
      default: '#000'
    },
    backgroundColor: { // 进度条背景色
      type: String,
      default: '#fff'
    },
    percentNum: { // 进度条现在在哪个位置的标记
      type: [String, Number],
      default: 0
    },
    fontcolor:{ // 文字颜色
      type: String,
      default: '#fff'
    },
    circleSize:{ //控制环形进度条的粗细(运动的那一圈)
      type: [String, Number],
      default: '9%'
    },
    speed: {
      // suggest 1~3
      type: [String, Number],
      default: 1
    }
  },

  data () {
    return {
      percent: 0,
      initDeg: 0,
      timeId: null,
      animationing: false
    }
  },

  created () {
    this.goRotate(this.transformToDeg(this.percentNum))
  },

  watch: {
    'percentNum': function (val) {
      if (this.animationing) return
      this.goRotate(this.transformToDeg(val))
    }
  },

  methods: {
    transformToDeg (percent) {
      let deg = 0
      if (percent >= 100) {
        deg = 360
      } else {
        deg = parseInt(360 * percent / 100)
      }
      return deg
    },

    transformToPercent (deg) {
      let percent = 0
      if (deg >= 360) {
        percent = 100
      } else {
        percent = parseInt(100 * deg / 360)
      }
      return percent
    },

    //  > 180
    rotateLeft (deg) {
      this.$refs.leftcontent.style.transform = 'rotate(' + (deg - 180) + 'deg)'
    },

    //  < 180
    rotateRight (deg) {
      this.$refs.rightcontent.style.transform = 'rotate(' + deg + 'deg)'
    },

    goRotate (deg) {
      this.animationing = true
      this.timeId = setInterval(() => {
        if (deg > this.initDeg) {
          this.initDeg += Number(this.speed)
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg)
            this.rotateRight(180)
          } else {
            this.rotateRight(this.initDeg)
          }
        } else {
          this.initDeg -= Number(this.speed)
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg)
          } else {
            this.rotateLeft(180)
            this.rotateRight(this.initDeg)
          }
        }
        this.percent = this.transformToPercent(this.initDeg)
        const remainer = Number(deg) - this.initDeg
        if (Math.abs(remainer) < this.speed) {
          this.initDeg += remainer
          if (this.initDeg > 180) {
            this.rotateLeft(deg)
          } else {
            this.rotateRight(deg)
          }
          this.animationFinished()
        }
      }, 10)
    },

    animationFinished () {
      this.percent = this.percentNum
      this.animationing = false
      clearInterval(this.timeId)
      this.$emit('animationFinished')
    }
  }
}
</script>

<style scoped>
/* .radial-indicator-container{
  width: 100%;
  height: 100%;
  border-radius: 50%;
} */
.radial-indicator-container .percentloop {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.radial-indicator-container .circle-left,
.radial-indicator-container .circle-right {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.radial-indicator-container .circle-left > div,
.radial-indicator-container .circle-right > div {
  width: 100%;
  height: 100%;
  transform-origin: right center;
  /* transition: all .5s linear; */
}

.radial-indicator-container .circle-right {
  left: 50%;
}

.radial-indicator-container .circle-right > div {
  transform-origin: left center;
}

.radial-indicator-container .content-wrap {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.radial-indicator-container .content-wrap .content-number {
  cursor: pointer;
  text-align: center
}

.radial-indicator-container .content-wrap .content-text {
  display: inline-block;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
