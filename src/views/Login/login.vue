<template>
  <div class="register_page">
    <span class="font30 establish_txt">登录账户</span>
    <span class="font26 subtitle_txt">游戏账户在希莱姆平台通用</span>
    <div class="content">
      <div class="left_content">
        <div class="onebox" v-for="(item, index) in list" :key="index">
          <div class="imgbox_"><img :src="item.src" class="img_" /></div>
          <div class="right_txt">
            <span class="font22 txt_1">{{item.title}}</span>
            <span class="font16 txt_2">{{item.explain}}</span>
          </div>
        </div>
      </div>
      <div class="left_content right_content">
        <div class="user_inputbox" v-for="(item, index) in user" :key="index">
          <p class="font16 email_txt">{{item.title}}</p>
          <input v-model.trim="item.inputvalue"
            class="input font16"
            :type="index == 1 ?'password':'text'"
            :placeholder="item.placeholder"
            @blur="blurEvent(index)"
            @focus="focusEvent(index)"
          />
          <div class="input_prompt font12">
            <span :class="{ani_shake:item.tip_status}" v-if="item.tip_status">* {{ item.tip }}</span>
          </div>
        </div>
        <div class="remember_box">
          <div class="_check" @click="rememberStatus = !rememberStatus">
            <div class="checkbox"><span class="correct font22" v-if="rememberStatus"></span></div>
            <span class="font16 account">记住账号</span>
          </div>
          <span class="font16 forget" @click="forgetNumberClick">忘记密码</span>
        </div>
        <p class="explain font16">
          We recommend that you use the "Remember Me" feature only on your own computer for your account security.
        </p>
        <div class="btn_box font18" @click="loginClick">
          登录
        </div>
        <p class="font12 tip_txt" @click="registerClick">如果没有账号，请点击<span class="tip_login">注册</span></p>
      </div>
    </div>
    <Proup :proupStatus="proupStatus" :content="content" @closeProup="proupClose"></Proup>
  </div>
</template>
<script>
const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
export default {
  data(){
    return {
      content:'',
      proupStatus:false,//弹窗状态
      rememberStatus:false,//记住我状态
      email:'',
      list:[
        {
          src:require('../../assets/images/register1.png'),
          title:'注册',
          explain:'冒险等着你,成为 Sacred Realm 世界的传奇！'
        },
        {
          src:require('../../assets/images/register1.png'),
          title:'安全',
          explain:'It secures the players with high security and instant solutions.'
        },
        {
          src:require('../../assets/images/register1.png'),
          title:'EVENTS',
          explain:'High gaming pleasure with multiple and fun in-game activities.'
        },
        {
          src:require('../../assets/images/register1.png'),
          title:'注册',
          explain:'冒险等着你,成为 Sacred Realm 世界的传奇！'
        },
        {
          src:require('../../assets/images/register1.png'),
          title:'注册',
          explain:'冒险等着你,成为 Sacred Realm 世界的传奇！'
        },
        {
          src:require('../../assets/images/register1.png'),
          title:'注册',
          explain:'冒险等着你,成为 Sacred Realm 世界的传奇！'
        },
      ],
      user:[
        {
          title:'邮箱',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'邮箱不能为空',
          tip_status:false,
          status:false
        },
        {
          title:'输入密码',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'密码不能为空',
          tip_status:false,
          status:false
        }
      ]
    }
  },
  methods:{
    proupClose(){
      this.proupStatus = false
    },
    registerClick(){
      this.$router.push('/signin/register');
    },
    focusEvent(index){
      this.user[index].tip_status = false
    },
    blurEvent(index){
      if(this.user[index].inputvalue == ''){
        this.user[index].tip_status = true
        return
      }
      switch(index){
        case 0:
          if (!emailReg.test(this.user[index].inputvalue)){
            this.user[index].tip = '请输入正确的邮箱'
            this.user[index].tip_status = true
          }else{
            this.user[index].status = true
          }
          break;
        case 1:
          if (!this.user[index].inputvalue){
            this.user[index].tip = '请输入密码'
            this.user[index].tip_status = true
          }else{
            this.user[index].status = true
          }
          break;
        default:
          break;
      }
    },
    loginClick(){
      let istrue = this.user.every(item => {
        return item.status == true
      })
      if(!istrue){
        this.user.forEach(item => {
          if(item.status && !item.tip_status){
            console.log("当前通过校验")
          }else{
            item.tip_status = true
            item.status = false
          }
        })
      }else{
        console.log("所有校验都通过")
        this.content = '登录成功'
        this.proupStatus = true
      }
    },
    forgetNumberClick(){
      this.content = '页面铺设中'
      this.proupStatus = true
    }
  }
}
</script>
<style lang="scss" scoped>
.register_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 67px;
  .establish_txt{
    font-weight: 600;
    line-height: 42px;
    margin-bottom: 26PX;
  }
  .subtitle_txt{
    font-weight: 400;
    color: #FFFFFF;
    line-height: 28px;
  }
  .content{
    width: 90vw;
    background: #101010;
    border: 2px solid #242222;
    border-bottom: none;
    border-right: none;
    margin: 0 auto;
    margin-top: 73px;
    display: flex;
    .left_content{
      flex: 1;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #242222;
      .onebox{
        width: 100%;
        padding: 18px 12px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #242222;
        .imgbox_{
          width: 60px;
          margin-right: 20px;
          .img_{
            width: 100%;
          }
        }
        .right_txt{
          display: flex;
          flex-direction: column;
          .txt_1{
            font-weight: 600;
            color: #ECCF83;
            line-height: 30px;
          }
          .txt_2{
            font-weight: 400;
            color: #ECCF83;
            line-height: 22px;
            margin-top: 8px;
          }
        }
      }
    }
    .right_content{
      padding: 23px 42px;
      align-items: center;
      border-bottom: 2px solid #242222;
      .user_inputbox{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .email_txt{
          font-weight: 600;
          color: #FFFFFF;
          line-height: 22px;
        }
        .input{
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 8px;
          border: 1px solid #373636;
          height: 46px;
          color: #ffffff;
          margin-top: 15px;
          padding: 0 15px;
        }
        .input_prompt {
          width: 100%;
          min-height: 20px;
          color: #fb3e3e;
          margin-top: 10px;
        }
      }
      .remember_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        ._check{
          display: flex;
          justify-content: center;
          align-items: center;
          .account{
            margin-left: 13px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 22px;
          }
          .checkbox{
            width: 24px;
            height: 24px;
            background: #D8D8D8;
            border-radius: 2px;
            border: 1px solid #979797;
            display: flex;
            justify-content: center;
            align-items: center;
            .correct:before {
              content: '\2714';
              color: #000;
            }
          }
        }
        .forget{
          font-weight: 400;
          color: #ECCF83;
          line-height: 22px;
        }
      }
      .explain{
        width: fit-content;
        padding: 0 25px;
        margin-top: 57px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
      }
      .btn_box{
        cursor: pointer;
        width: 232px;
        height: 54px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 46px;
        font-weight: 600;
        color: #000000;
      }
      .tip_txt{
        cursor: pointer;
        font-weight: 400;
        color: #969090;
        line-height: 17px;
        margin-top: 16px;
        .tip_login{
          font-weight: 400;
          color: #ECCF83;
          line-height: 17px;
          margin: 0 5px;
        }
      }
    }
  }
}
</style>