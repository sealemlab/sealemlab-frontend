<template>
  <div class="login_register">
    <Login v-if="name == 'login'"/>
    <Register v-if="name == 'register'" />
  </div>
</template>
<script>
import Login from './login.vue'
import Register from './register.vue'
export default {
  components:{
    Login,
    Register
  },
  data(){
    return {
      name:''
    }
  },
  watch: {
    $route(to, from) {
      this.name = to.params.name
      window.scrollTo(0, 0);
    }
  },
  mounted(){
    this.name = this.$route.params.name
  }
}
</script>
<style lang="scss" scoped>
.login_register{
  width: 100%;
  margin-top: 80px;
}
</style>