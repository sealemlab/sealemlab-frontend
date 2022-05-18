<template>
  <div class="btn_page">
    <BtnLoading :isloading="true" v-if="allLoading"></BtnLoading>
    <div v-else>
      <div class="connect_box" v-if="!getIstrue" @click="commonLink">Connect</div>
      <div class="connect_box" v-else-if="!isapprove" @click="sonapprove">
        {{$t("message.approve")}}
        <BtnLoading :isloading="approveloading"></BtnLoading>
      </div>
      <div class="connect_box" v-else @click="dosomething">
        {{$t(word)}}
        <BtnLoading :isloading="isloading"></BtnLoading>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { erc20, getSigner } from 'sacredrealm-sdk';
export default {
  props: {
    word: {
      type: String,
      default: ''
    },
    isloading:{
      type: Boolean,
      default: false // 授权成功以后的操作按钮loading
    },
    allLoading:{
      type: Boolean,
      default: true // 按钮内容未进行判断前  先loading
    },
    approveloading:{
      type: Boolean,
      default: false // 授权操作按钮loading
    },
    isapprove:{
      type: Boolean,
      default: false //是否授权
    },
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods:{
    // 链接钱包方法
    commonLink() {
      this.$store.commit("setwalletstatus", true);
    },
    /**
     * 判断是否授权 type(代币地址):可以传token.st或者也可以直接传合约地址
     * contractAdrdess(池子地址)
    **/
    isApproveFun(type, contractAdrdess) {
      return new Promise(resolve => {
        erc20(type).allowance(this.getAccount,contractAdrdess).then(res => {
          if (res.toString() > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(() => {
          resolve(false)
        })
      })
    },
    // 去授权 type:可以传token.st或者也可以直接传合约地址
    goApproveFun(type, contractAdrdess) {
      const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
        return new Promise(resolve => {
          erc20(type).connect(getSigner()).approve(contractAdrdess,TOKEN_amount).then(async res => {
            const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              resolve(true)
            }else{
              resolve(false)
            }
          }).catch(() => {
            resolve(false)
          })
        })
    },
    // 授权完按钮的操作
    dosomething(){
      this.$emit('dosomething')
    },
    // 授权按钮的操作
    sonapprove(){
      this.$emit('sonapprove')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn_page{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .connect_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (max-width: 980px){
  .btn_page{
    width: 100%;
    height: 100%;
    .connect_box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
