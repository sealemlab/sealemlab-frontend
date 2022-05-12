<template>
  <div class="register_page">
    <span class="font30 establish_txt mobile_font16">{{$t("message.signin.txt24")}}</span>
    <span class="font26 subtitle_txt">{{$t("message.signin.txt25")}}</span>
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
          <p class="font16 email_txt mobile_font14">{{$t(item.title)}}</p>
          <input v-model.trim="item.inputvalue"
            class="input font16"
            :type="index == 1 ?'password':'text'"
            :placeholder="item.placeholder"
            @blur="blurEvent(index)"
            @focus="focusEvent(index)"
            autocomplete="new-password"
          />
          <div class="input_prompt font12">
            <span :class="{ani_shake:item.tip_status}" v-if="item.tip_status">* {{ $t(item.tip) }}</span>
          </div>
        </div>
        <div class="remember_box">
          <div class="_check" @click="rememberStatus = !rememberStatus">
            <div class="checkbox"><span class="correct font22" v-if="rememberStatus"></span></div>
            <span class="font16 account">{{$t("message.signin.txt28")}}</span>
          </div>
          <span class="font16 forget" @click="forgetNumberClick">{{$t("message.signin.txt29")}}</span>
        </div>
        <div class="explain">
          <div class="radious">
            <img :src="`${$store.state.imgUrl}ques.webp`" class="ques_img" />
          </div>
          <span class="txt_ font16">{{$t("message.signin.txt26")}}</span>
        </div>
        <div class="btn_box font18" @click="loginClick">
          {{$t("message.signin.txt23")}}
          <BtnLoading :isloading="btnloding"></BtnLoading>
        </div>
        <p class="font16 tip_txt" @click="registerClick">{{$t("message.signin.txt27")}}<span class="tip_login">{{$t("message.signin.txt3")}}</span></p>
      </div>
    </div>
    <PassProup :btntxt="'message.btn_txt2'" :codestatus='codestatus' :passStatus="passStatus" :title="title" @closePassProup="closePassProup" @sureClick="sureClick"></PassProup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PassProup from '../../components/Password.vue'
export default {
  components:{
    PassProup
  },
  computed: { ...mapGetters(["getLogin","getNoticeNum"]) },
  data(){
    return {
      btnloding:false,
      codestatus:false,//修改密码组件的验证码是否显示
      title:"message.signin.txt34",//修改密码弹窗标题
      passStatus:false,//修改密码弹窗
      rememberStatus:false,//记住我状态
      email:'',
      list:[
        {
          src:`${this.$store.state.imgUrl}register1.webp`,
          title:'message.signin.txt3',
          explain:'message.signin.txt4'
        },
        {
          src:`${this.$store.state.imgUrl}register2.webp`,
          title:'message.signin.txt5',
          explain:'message.signin.txt6'
        },
        {
          src:`${this.$store.state.imgUrl}register3.webp`,
          title:'message.signin.txt7',
          explain:'message.signin.txt8'
        },
        {
          src:`${this.$store.state.imgUrl}register4.webp`,
          title:'message.signin.txt9',
          explain:'message.signin.txt10'
        },
        {
          src:`${this.$store.state.imgUrl}register5.webp`,
          title:'message.signin.txt11',
          explain:'message.signin.txt12'
        },
        {
          src:`${this.$store.state.imgUrl}register6.webp`,
          title:'message.signin.txt13',
          explain:'message.signin.txt14'
        },
      ],
      user:[
        {
          title:'message.signin.txt16',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'message.signin.txt30',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt17',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'message.signin.txt31',
          tip_status:false,
          status:false
        }
      ]
    }
  },
  watch:{
    getLogin: {
      handler: function (newValue) {
        if (newValue.rememberStatus) {
          this.user.forEach(item => {
            item.tip_status = false
            item.status = true
          })
          this.user[0].inputvalue = this.getLogin.username
          this.user[1].inputvalue = this.getLogin.password
        }
      },
      deep: true,
      immediate: true,
    }
  },
  methods:{
    closePassProup(){
      this.passStatus = this.codestatus = false
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
          if (!this.$store.state.emailReg.test(this.user[index].inputvalue)){
            this.user[index].tip = 'message.signin.txt32'
            this.user[index].tip_status = true
            this.user[index].status = false
          }else{
            this.user[index].status = true
          }
          break;
        case 1:
          if (!this.user[index].inputvalue){
            this.user[index].tip = 'message.signin.txt33'
            this.user[index].tip_status = true
            this.user[index].status = false
          }else{
            this.user[index].status = true
          }
          break;
        default:
          break;
      }
    },
    loginClick(){
      if(this.btnloding)return
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
        this.btnloding = true
        let data ={
          email:this.user[0].inputvalue,
          password:this.user[1].inputvalue
        }
        this.$api.loginFun(data).then((res) => {
          console.log('res: ', res);
          this.btnloding = false
          if(res.code == 200){
            this.$store.dispatch("setLogin", {
              loginStatus:true, // 登录状态
              username:this.user[0].inputvalue,
              password:this.user[1].inputvalue,
              rememberStatus:this.rememberStatus
            })
            this.$router.push('/myaccount/information');
          }else{
            if(!this.getNoticeNum){
              this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.txt2'}));
              this.$store.commit("setNoticeNum",true)
            }
          }
        }).catch(() => {
          this.btnloding = false
        });
      }
    },
    forgetNumberClick(){
      this.title = 'message.signin.txt35'
      this.passStatus = this.codestatus = true
    },
    sureClick(data){
      let istrue = data.every(item => {
        return item.status == true
      })
      if(!istrue){
        data.forEach(item => {
          if(item.status && !item.tip_status){
            console.log("当前通过校验")
          }else{
            item.tip_status = true
            item.status = false
          }
        })
      }else{
        console.log("所有校验都通过")
        
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.register_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
        display: flex;
        .radious{
          margin-top: 3px;
          margin-right: 9px;
          .ques_img{
            width: 13px;
          }
        }
        .txt_{
          font-weight: 400;
          color: #FFFFFF;
          line-height: 22px;
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
@media screen and (max-width: 980px) {
  .register_page{
    .establish_txt{
      font-weight: 600;
      line-height: 0.2rem;
      margin-bottom: 0.15rem;
    }
    .subtitle_txt{
      font-weight: 400;
      color: #FFFFFF;
      line-height: 0.14rem;
    }
    .content{
      width: 90vw;
      background: #101010;
      border: 2px solid #242222;
      border-bottom: none;
      border-right: none;
      margin: 0 auto;
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      .left_content{
        flex: 1;
        display: flex;
        flex-direction: column;
        border-right: 2px solid #242222;
        .onebox{
          width: 100%;
          padding: 0.18rem 0.1rem;
          display: flex;
          align-items: center;
          border-bottom: 2px solid #242222;
          .imgbox_{
            width: 0.2rem;
            margin-right: 0.15rem;
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
              line-height: 0.14rem;
            }
            .txt_2{
              font-weight: 400;
              color: #ECCF83;
              line-height: 0.14rem;
              margin-top: 0.08rem;
            }
          }
        }
      }
      .right_content{
        padding: 0.23rem 0.1rem;
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
          display: flex;
          .radious{
            margin-top: 3px;
            margin-right: 9px;
            .ques_img{
              width: 13px;
            }
          }
          .txt_{
            font-weight: 400;
            color: #FFFFFF;
            line-height: 22px;
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
}
</style>