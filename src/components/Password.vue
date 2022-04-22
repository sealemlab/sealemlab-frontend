<template>
  <div class="pass_proup_page" v-if="passStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">{{title}}</p>
      <div class="proup_content">
        <p class="p1 font16">输入您当前的密码</p>
        <input type="text" class="input" />
      </div>
      <div class="proup_content">
        <p class="p1 font16">验证码</p>
        <div class="inputbox">
          <input type="text" class="box_input" />
          <div class="code font14">
            {{code_txt}}
          </div>
        </div>
      </div>
      <div class="proup_content">
        <p class="p1 font16">输入新密码</p>
        <input type="text" class="input" />
      </div>
      <div class="proup_content">
        <p class="p1 font16">重新输入新密码</p>
        <input type="text" class="input" />
      </div>
      <div class="btn font18">
        确认修改
      </div>
      <img src="../assets/images/passclose.png" class="close_img" @click.stop="closePassProup"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    passStatus: {
      type: Boolean,
      default: false
    },
    content:{
      type: String,
      default: ''
    },
    title:{
      type: String,
      default: ''
    },
  },
  data(){
    return{
      code_txt:'发送验证码'
    }
  },
  watch:{
    passStatus(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    }
  },
  methods: {
    // 弹窗关闭
    closePassProup () {
      this.$emit('closePassProup')
    }
  }
}
</script>
<style lang="scss" scoped>
.pass_proup_page {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999999;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  .proup_boxs{
    position: relative;
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 34px 122px;
    background: #101010;
    border: 2px solid #242222;
    .propu_title_txt{
      font-weight: 600;
      color: #FFFFFF;
      line-height: 33px;
      margin-bottom: 20px;
    }
    .proup_content{
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
      .p1{
        font-weight: 600;
        color: #FFFFFF;
        line-height: 22px;
        margin-bottom: 10px;
      }
      .input{
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 8px;
        border: 1px solid #373636;
        height: 46px;
        color: #ffffff;
        margin-top: 15px;
        margin-bottom: 40px;
        padding: 0 15px;
      }
      .inputbox{
        width: 100%;
        margin-top: 15px;
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .box_input{
          width: calc(100% - 140px);
          padding: 0 10px;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 8px;
          border: 1px solid #373636;
          height: 46px;
          color: #ffffff;
          padding: 0 15px;
        }
        .code{
          cursor: pointer;
          border-radius: 8px;
          // max-width: 100px;
          width: 93px;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          border-radius: 4px;
          text-align: center;
          font-weight: 600;
          color: #000000;
          line-height: 34px;
        }
      }
    }
    .btn{
      width: 330px;
      height: 54px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
      line-height: 25px;
    }
    .close_img{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 44px;
      cursor: pointer;
    }
  }
  .layout_box{
    position: relative;
    width: fit-content;
    .text_{
      font-weight: bold;
      color: #FFFFFF;
      line-height: 36px;
    }
    .radious{
      position: absolute;
      right: -20px;
      top: 2px;
      width: 14px;
      height: 14px;
      border: 1px solid #A9A7A7;
      filter: blur(0px);
      font-weight: 400;
      color: #A9A7A7;
      line-height: 15px;
      border-radius: 50%;
      text-align: center;
    }
    .wallet_{
      font-weight: 400;
      color: #969090;
      line-height: 16px;
    }
  }
}
</style>