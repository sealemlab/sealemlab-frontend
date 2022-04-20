<template>
  <div class="register_page">
    <span class="font30 establish_txt">{{$t("message.signin.txt1")}}</span>
    <span class="font26 subtitle_txt">{{$t("message.signin.txt2")}}</span>
    <div class="content">
      <div class="left_content">
        <div class="onebox" v-for="(item, index) in list" :key="index">
          <div class="imgbox_"><img :src="item.src" class="img_" /></div>
          <div class="right_txt">
            <span class="font22 txt_1">{{$t(item.title)}}</span>
            <span class="font16 txt_2">{{$t(item.explain)}}</span>
          </div>
        </div>
      </div>
      <div class="left_content right_content">
        <div class="user_inputbox" v-for="(item, index) in user" :key="index">
          <p class="font16 email_txt">{{$t(item.title)}}</p>
          <div class="inputbox">
            <input :type="index == 2 || index == 3 ?'password':'text'" v-model.trim="item.inputvalue"
              class="input font16"
              :placeholder="item.placeholder"
              @blur="blurEvent(index)"
              @focus="focusEvent(index)"
            />
            <div class="code font16" v-if="index == 2" @click="sendCode">
              {{code_txt}}
            </div>
          </div>
          <div class="input_prompt font12">
            <span class="ani_shake" v-show="item.tip_status">* {{ item.tip }}</span>
          </div>
        </div>
        <div class="agree_box">
          <div class="circular_"></div>
          <div class="agree_txt">{{$t("message.signin.txt20")}}<span class="span">{{$t("message.signin.txt21")}}</span></div>
        </div>
        <div class="btn_box font18" @click="registerClick">
          {{$t("message.signin.txt1")}}
        </div>
        <p class="font12 tip_txt" @click="loginClick" v-if="$i18n.locale == 'cn'">
          {{$t("message.signin.txt22")}}
          <span class="tip_login">{{$t("message.signin.txt23")}}</span>
        </p>
        <p class="font12 tip_txt" @click="loginClick" v-if="$i18n.locale == 'en'">
          {{$t("message.signin.txt30")}}
          <span class="tip_login">{{$t("message.signin.txt31")}}</span>
          {{$t("message.signin.txt32")}}
        </p>
      </div>
    </div>
    <Proup :proupStatus="proupStatus" :content="content" @closeProup="proupClose"></Proup>
  </div>
</template>
<script>
const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
// const emailReg = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$"; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
export default {
  data(){
    return {
      timeer:null,
      code_txt:'发送验证码',
      content:'',
      proupStatus:false,//弹窗状态
      list:[
        {
          src:require('../../assets/images/register1.png'),
          title:'message.signin.txt3',
          explain:'message.signin.txt4'
        },
        {
          src:require('../../assets/images/register2.png'),
          title:'message.signin.txt5',
          explain:'message.signin.txt6'
        },
        {
          src:require('../../assets/images/register3.png'),
          title:'message.signin.txt7',
          explain:'message.signin.txt8'
        },
        {
          src:require('../../assets/images/register4.png'),
          title:'message.signin.txt9',
          explain:'message.signin.txt10'
        },
        {
          src:require('../../assets/images/register5.png'),
          title:'message.signin.txt11',
          explain:'message.signin.txt12'
        },
        {
          src:require('../../assets/images/register6.png'),
          title:'message.signin.txt13',
          explain:'message.signin.txt14'
        },
      ],
      user:[
        {
          title:'message.signin.txt15',
          inputvalue:'',
          placeholder:'Please enter the name',
          tip:'用户名不能为空',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt16',
          inputvalue:'',
          placeholder:'Please enter the email',
          tip:'邮箱不能为空',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt19',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'请输入验证码',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt17',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'密码不能为空',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt18',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'请先输入密码',
          tip_status:false,
          status:false
        },
      ]
    }
  },
  methods:{
    proupClose(){
      this.proupStatus = false
    },
    loginClick(){
      this.$router.push('/signin/login')
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
            this.checkFun(index,'邮箱不合法')
          }else{
            this.user[index].status = true
          }
          //emailReg.test(this.user[1].inputvalue)
          //this.user[1].inputvalue.matches(emailReg)
          break;
        case 1:
          if(this.user[index].inputvalue.length > 10 ||  this.user[index].inputvalue.length < 3){
            this.checkFun(index,'用户名长度不符合规则')
          }else{
            this.user[index].status = true
          }
          break;
        case 2:
          if (this.user[index].inputvalue.length != 6){
            this.checkFun(index,'请输入6位验证码')
          }else{
            this.user[index].status = true
          }
          break;
        case 3:
          if (!pwReg.test(this.user[index].inputvalue)){
            this.checkFun(index,'密码不合法')
          }else{
            this.user[index].status = true
          }
          break;
        case 4:
          if (this.user[3].inputvalue !== this.user[4].inputvalue){
            this.checkFun(index,'密码俩次输入不一样')
          }else{
            this.user[index].status = true
          }
          break;
        default:
          break;
      }
    },
    checkFun(index,content){
      this.user[index].tip = content
      this.user[index].tip_status = true
      this.user[index].status = false
    },
    registerClick(){
      // 如果status状态都为true  那么证明所有的校验都通过
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
        this.content = '账号申请成功'
        this.proupStatus = true
      }
    },
    sendCode(){
      if(this.user[0].inputvalue == ''){
        this.content = '请先输入邮箱账号'
        this.proupStatus = true
        return
      }
      if(this.timeer)return
      let owtime = 60
      clearInterval(this.timeer)
      this.timeer = setInterval(() => {
        if (owtime <= 0) {
          clearInterval(this.timeer);
          this.timeer = null
          this.code_txt = '重新发送';
          return;
        }
        this.code_txt = owtime + 's'
        owtime -= 1;
      }, 1000);
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
    border-right: none;
    margin: 0 auto;
    margin-top: 73px;
    display: flex;
    .left_content{
      flex: 1;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #242222;;
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
        .inputbox{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          .input{
            background: #171718;
            box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
            border-radius: 8px;
            border: 1px solid #373636;
            height: 46px;
            color: #ffffff;
            width: 100%;
            padding: 0 15px;
          }
          .code{
            cursor: pointer;
            border-radius: 8px;
            min-width: 100px;
            width: fit-content;
            border: 1px solid #373636;
            height: 46px;
            text-align: center;
            line-height: 46px;
            margin-left: 8px;
          }
        }
        .input_prompt {
          width: 100%;
          min-height: 20px;
          color: #fb3e3e;
          margin-top: 10px;
        }
      }
      .agree_box{
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        .circular_{
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #D8D8D8;
          border: 1px solid #979797;
        }
        .agree_txt{
          margin-left: 10px;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 22px;
          .span{
            color: #ECCF83;
            margin-left: 5px;
          }
        }
      }
      .btn_box{
        cursor: pointer;
        width: 100%;
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
        margin: 16px 0 50px;
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