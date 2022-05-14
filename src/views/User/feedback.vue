<template>
  <div class="blind_page display_flex">
    <div class="content font30">
      意见发送到邮箱:123456@gmail.com
    </div>
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
  flex-direction: column;
  .content{
    width: 100%;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 42px;
  }
}
</style>