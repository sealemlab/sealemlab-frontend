<template>
  <div class="register_page">
    <span class="font30 establish_txt mobile_font16">{{$t("message.signin.txt1")}}</span>
    <span class="font26 subtitle_txt">{{$t("message.signin.txt2")}}</span>
    <div class="content">
      <div class="left_content">
        <div class="onebox" v-for="(item, index) in list" :key="index">
          <div class="imgbox_"><img :src="item.src" class="img_" /></div>
          <div class="right_txt">
            <span class="font22 txt_1 mobile_font14">{{$t(item.title)}}</span>
            <span class="font16 txt_2">{{$t(item.explain)}}</span>
          </div>
        </div>
      </div>
      <div class="left_content right_content">
        <div class="user_inputbox" v-for="(item, index) in user" :key="index">
          <p class="font16 email_txt">{{$t(item.title)}}</p>
          <div class="inputbox">
            <input :type="index == 1 || index == 2 ?'password':'text'" v-model.trim="item.inputvalue"
              class="input font16"
              :placeholder="item.placeholder"
              autocomplete="new-password"
              @blur="blurEvent(index)"
              @focus="focusEvent(index)"
            />
            <!-- <div class="code font16" v-if="index == 2" @click="sendCode">
              {{code_txt}}
            </div> -->
          </div>
          <div class="input_prompt font12">
            <span class="ani_shake" v-show="item.tip_status">* {{ $t(item.tip) }}</span>
          </div>
        </div>
        <div class="agree_box" ref="circular" @click="igraeeClick">
          <div class="circular_" >
            <span class="sure_box" v-if="IAgree"></span>
          </div>
          <div class="agree_txt">{{$t("message.signin.txt20")}}<span class="span" @click.stop="agreementFun">{{$t("message.signin.txt21")}}</span></div>
        </div>
        <div class="btn_box font18" @click="registerClick">
          {{$t("message.signin.txt1")}}
          <BtnLoading :isloading="btnloding"></BtnLoading>
        </div>
        <p class="font16 tip_txt" @click="loginClick">
          {{$t("message.signin.txt22")}}
          <span class="tip_login">{{$t("message.signin.txt23")}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      btnloding:false,
      IAgree:false,
      timeer:null,
      code_txt:'发送验证码',
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
          placeholder:'Please enter the email',
          tip:'message.signin.txt30',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt17',
          inputvalue:'',
          placeholder:'Please enter the password',
          tip:'message.signin.txt31',
          tip_status:false,
          status:false
        },
        {
          title:'message.signin.txt18',
          inputvalue:'',
          placeholder:'Enter again password',
          tip:'message.signin.txt33',
          tip_status:false,
          status:false
        },
      ]
    }
  },
  methods:{
    agreementFun(){
      console.log("协议点击,跳转链接")
    },
    igraeeClick(){
      this.IAgree = !this.IAgree
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
          if (!this.$store.state.emailReg.test(this.user[index].inputvalue)){
            this.checkFun(index,'message.signin.txt36')
          }else{
            this.user[index].status = true
          }
          break;
        case 1:
          if (!this.$store.state.pwReg.test(this.user[index].inputvalue)){
            this.checkFun(index,'message.signin.txt37')
          }else{
            this.user[index].status = true
          }
          break;
        case 2:
          if (this.user[1].inputvalue !== this.user[2].inputvalue){
            this.checkFun(index,'message.signin.txt38')
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
      if(this.btnloding)return
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
        if(!this.IAgree){
          this.$refs.circular.classList.add('animation_move')
          setTimeout(() => {
            this.$refs.circular.classList.remove('animation_move')
          },1000)
          return
        }
        this.btnloding = true
        console.log("所有校验都通过")
        
        let data ={
          email:this.user[0].inputvalue,
          password:this.user[1].inputvalue
        }
        this.$api.registerFun(data).then((res) => {
          console.log('res: ', res);
          this.btnloding = false
          if(res.code == 200){
            this.proupStatus = true
            this.content = 'message.tip.txt1'
          }
        }).catch(() => {
          this.btnloding = false
        });
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
          display: flex;
          justify-content: center;
          align-items: center;
          .sure_box{
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #101010;
          }
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
@media screen and (max-width: 980px) {
  .register_page{
    .establish_txt{
      font-weight: 600;
      line-height: 0.2rem;
      margin-bottom: 0.15rem;
    }
    .content{
      flex-direction: column;
      margin-top: 0.3rem;
      .left_content{
        .onebox{
          padding: 0.18rem 0.1rem;
          .imgbox_{
            width: 0.2rem;
            margin-right: 0.15rem;
          }
        }
      }
      .right_content{
        padding: 0.23rem 0.1rem;
      }
    }
  }
}
</style>