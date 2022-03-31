<template>
  <div class="blind_page display_flex">
    盲盒页面(暂不开发)
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang"])
  },
  data(){
    return{

    }
  }
}
</script>
<style lang="scss" scoped>
.blind_page{
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>