<template>
  <input
    :type="type"
    :value="modelValue"
    class="input"
    :class="isright?'text_right':''"
    :style="{ color: fontColor,background:background,fontSize:fontSize}"
    :placeholder='placeholder'
    :readonly="readonly"
    step="0.00000001"
    @blur="blurEvent"
    @focus="focusEvent"
    @input="inpChange"
    @keyup.enter="enterClick"
  />
  <!-- 
    oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3').replace(/^\./g, '')" -->
</template>
<script>
export default {
  props: {
    fontSize:{
      type: String,
      default:'16px'
    },
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
    },
    isright:{
      type:Boolean,
      default:false
    },
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
    enterClick(){
      this.$emit("enterClick");
    }
  }
}
</script>
<style lang="scss" scoped>
.input {
  height: 100%;
  // padding-right:15px;
  width:100%;
}
.text_right{
  text-align: right;
}
</style>