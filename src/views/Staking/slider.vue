<template>
  <div>
    <input
      type="range"
      name=""
      v-model="value"
      :min="min"
      :max="max"
      @input="inputFun"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 0,
      min: 0,
      max: 100
    }
  },
  props:{
    passValue:{
      type:Number,
      default:0
    }
  },
  watch:{
    passValue(newvalue,old){
      console.log('newvalue,old: ', newvalue,old);
      if(newvalue >= 0){
        this.value = newvalue
      }
    }
  },
  methods: {
    inputFun(){
      this.$emit('inputFun',this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  position: relative;
}
input {
  width: 100%;
  height: 15px;
  -webkit-appearance: none;
  background: #373535;
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5), inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
  outline: none;
  overflow: hidden;
  border-radius: 13px;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(180deg, #F2D47B 0%, #F7E9B9 52%, #F0CE75 100%);
  cursor: pointer;
  border: 4px solid #222121;
  box-shadow: -407px 0 0 400px #F7E9B9;
}
</style>