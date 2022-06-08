<template>
  <input
    :type="type"
    :value="modelValue"
    class="input font16 mobile_font12"
    :style="{ color: fontColor,background:background}"
    :placeholder='placeholder'
    :readonly="readonly"
    @blur="blurEvent"
    @focus="focusEvent"
    @input="inpChange"
  />
</template>
<script>
export default {
  props: {
    modelValue:{
      type: [String, Number],
      default:''
    },
    type:{
      type: [String, Number],
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
    readonly:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    focusEvent(){
      this.$emit('focusEvent')
    },
    blurEvent(){
      this.$emit('blurEvent')
    },
    inpChange(e) {
      this.$emit("input", e.target.value);
    },
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