<template>
  <input
    :type="type"
    v-model="msg"
    class="input font16 mobile_font12"
    :style="{ color: fontColor,background:background}"
    :placeholder='placeholder'
    @blur="blurEvent"
    @focus="focusEvent"
  />
</template>
<script>
export default {
  data(){
    return {
      msg:''
    }
  },
  watch:{
    msg(nval,oval){
      if(nval != oval){
        this.$emit('input',nval)
      }
    }
  },
  props: {
    type:{
      type: String,
      default: 'text'
    },
    placeholder:{
      type: String,
      default: ''
    },
    fontColor:{
      type: String,
      default: '#CED3D9'
    },
    background:{
      type: String,
      default: 'transparent'
    },
  },
  methods:{
    focusEvent(){
      this.$emit('focusEvent')
    },
    blurEvent(){
      this.$emit('blurEvent')
    }
  }
}
</script>
<style lang="scss" scoped>
.input {
  height: 100%;
  padding: 0 15px;
  width:100%;
}
</style>