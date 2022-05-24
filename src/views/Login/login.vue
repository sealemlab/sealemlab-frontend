<template>
  <div class="register_page">
    <span class="font30 establish_txt mobile_font16">{{ $t("message.signin.txt24") }}</span>
    <span class="font26 subtitle_txt">{{ $t("message.signin.txt25") }}</span>
    <div class="content">
      <div class="left_content">
        <div class="onebox" v-for="(item, index) in list" :key="index">
          <div class="imgbox_"><img :src="item.src" /></div>
          <div class="right_txt">
            <span class="font22 mobile_font14">{{ $t(item.title) }}</span>
            <span class="font16">{{ $t(item.explain) }}</span>
          </div>
        </div>
      </div>
      <div class="right_content">
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.signin.txt16") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="loginForm.mailAccount" />
          </div>
          <div class="input_prompt font12" v-if="loginForm.prompt1">
            <span>* {{ $t(loginForm.prompt1) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.signin.txt17") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="loginForm.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="loginForm.prompt2">
            <span>* {{ $t(loginForm.prompt2) }}</span>
          </div>
        </div>
        <div class="remember_box">
          <div class="_check" @click="rememberStatus = !rememberStatus">
            <div class="checkbox"><span class="correct font22" v-show="rememberStatus"></span></div>
            <span class="font16 account">{{ $t("message.signin.txt28") }}</span>
          </div>
          <span class="font16 forget" @click="toForgetPassword">{{ $t("message.signin.txt29") }}</span>
        </div>
        <div class="explain">
          <div>
            <img :src="`${$store.state.imgUrl}ques.webp`" class="ques_img" />
            <span class="txt_ font16">{{ $t("message.signin.txt26") }}</span>
          </div>
        </div>
        <div class="btn_box font18" @click="loginFun">
          {{ $t("message.signin.txt23") }}
          <BtnLoading :isloading="loginbtnloading"></BtnLoading>
        </div>
        <p class="font16 tip_txt" @click="toRegister">
          {{ $t("message.signin.txt27") }}<span class="tip_login">{{ $t("message.signin.txt3") }}</span>
        </p>
      </div>
    </div>
    <PassPopup v-if="isShowPassPopup" :isShowVerifyCode="isShowVerifyCode"></PassPopup>
  </div>
</template>
<script>
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
import { mapGetters } from "vuex";
import PassPopup from "../../components/PassPopup.vue";
export default {
  components: { PassPopup },
  computed: { ...mapGetters(["getLogin", "setLogin"]) },
  data() {
    return {
      list: [
        {
          src: `${this.$store.state.imgUrl}register1.webp`,
          title: "message.signin.txt3",
          explain: "message.signin.txt4",
        },
        {
          src: `${this.$store.state.imgUrl}register2.webp`,
          title: "message.signin.txt5",
          explain: "message.signin.txt6",
        },
        {
          src: `${this.$store.state.imgUrl}register3.webp`,
          title: "message.signin.txt7",
          explain: "message.signin.txt8",
        },
        {
          src: `${this.$store.state.imgUrl}register4.webp`,
          title: "message.signin.txt9",
          explain: "message.signin.txt10",
        },
        {
          src: `${this.$store.state.imgUrl}register5.webp`,
          title: "message.signin.txt11",
          explain: "message.signin.txt12",
        },
        {
          src: `${this.$store.state.imgUrl}register6.webp`,
          title: "message.signin.txt13",
          explain: "message.signin.txt14",
        },
      ],
      loginForm: {
        mailAccount: "",
        password: "",
        prompt1: "",
        prompt2: "",
      },
      rememberStatus: false,
      loginbtnloading: false,
      isShowPassword: false,
      isShowPassPopup: false,
      isShowVerifyCode: false,
    };
  },
  created() {
    this.loginForm.mailAccount = this.getLogin.mailAccount;
    this.loginForm.password = this.getLogin.password;
    this.rememberStatus = this.getLogin.rememberStatus;
  },
  methods: {
    loginFun() {
      if (this.loginbtnloading) return;
      if (!this.loginForm.mailAccount) return (this.loginForm.prompt1 = "message.signin.txt30"); // 填写邮箱
      if (!mailReg.test(this.loginForm.mailAccount)) return (this.loginForm.prompt1 = "message.signin.txt31"); // 邮箱不合法
      this.loginForm.prompt1 = "";
      if (!this.loginForm.password) return (this.loginForm.prompt2 = "message.signin.txt33"); // 填写密码
      if (!pwReg.test(this.loginForm.password)) return (this.loginForm.prompt2 = "message.signin.txt37"); // 6-16位数字英文组合
      this.loginForm.prompt2 = "";
      this.loginbtnloading = true;
      this.$api
        .accountLogin({ email: this.loginForm.mailAccount, password: this.loginForm.password })
        .then((res) => {
          if (res.code === 200) {
            this.$store.commit("setLogin", {
              loginStatus: true,
              rememberStatus: this.rememberStatus,
              mailAccount: this.loginForm.mailAccount,
              password: this.loginForm.password,
              token: res.data.token,
              activationTime: res.data.activationTime,
              lastLogin: res.data.lastLogin,
              addr: res.data.addr,
            });
            this.$router.push("/myaccount/information");
          }
          this.loginbtnloading = false;
          this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
        })
        .catch(() => {
          this.loginbtnloading = false;
        });
    },
    toRegister() {
      this.$router.push("/signin/register");
    },
    toForgetPassword() {
      this.isShowPassPopup = this.isShowVerifyCode = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.register_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .establish_txt {
    font-weight: 600;
    line-height: 42px;
    margin-bottom: 26px;
  }
  .subtitle_txt {
    font-weight: 400;
    color: #ffffff;
    line-height: 28px;
  }
  .content {
    width: 90vw;
    background: #101010;
    border: 2px solid #242222;
    margin: 0 auto;
    margin-top: 73px;
    display: flex;
    .left_content {
      flex: 1;
      border-right: 2px solid #242222;
      .onebox {
        width: 100%;
        height: 100px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #242222;
        &:last-child {
          border-bottom: none;
        }
        .imgbox_ {
          width: 70px;
          min-width: 70px;
          margin-right: 20px;
          img {
            width: 100%;
          }
        }
        .right_txt {
          display: flex;
          flex-direction: column;
          span {
            &:nth-child(1) {
              font-weight: 600;
              color: #eccf83;
              line-height: 30px;
            }
            &:nth-child(2) {
              font-weight: 400;
              color: #eccf83;
              line-height: 22px;
              margin-top: 8px;
            }
          }
        }
      }
    }
    .right_content {
      flex: 1;
      padding: 0 40px;
      .user_inputbox {
        width: 100%;
        height: 100px;
        position: relative;
        padding: 10px 0 10px 0;
        .email_txt {
          font-weight: 600;
          color: #ffffff;
          line-height: 22px;
          margin-bottom: 10px;
        }
        .inputbox {
          width: 100%;
          height: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .eye {
            position: absolute;
            right: 0;
          }
          input {
            width: 100%;
            height: 100%;
            background: #171718;
            box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
            border-radius: 8px;
            border: 1px solid #373636;
            color: #ffffff;
            padding: 0 15px;
          }
        }
        .input_prompt {
          width: 100%;
          color: #fb3e3e;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      .remember_box {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ._check {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .account {
            margin-left: 12px;
            font-weight: 400;
            color: #ffffff;
            line-height: 22px;
          }
          .checkbox {
            width: 24px;
            height: 24px;
            background: #d8d8d8;
            border-radius: 2px;
            border: 1px solid #979797;
            display: flex;
            justify-content: center;
            align-items: center;
            .correct:before {
              content: "\2714";
              color: #000;
            }
          }
        }
        .forget {
          cursor: pointer;
          font-weight: 400;
          color: #eccf83;
          line-height: 22px;
        }
      }
      .explain {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        > div {
          display: flex;
          align-items: flex-start;
        }
        img {
          width: 15px;
          height: auto;
          margin-right: 10px;
        }
        .txt_ {
          font-weight: 400;
          color: #ffffff;
        }
      }
      .btn_box {
        cursor: pointer;
        width: 100%;
        height: 50px;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #000000;
      }
      .tip_txt {
        text-align: center;
        cursor: pointer;
        font-weight: 400;
        color: #969090;
        line-height: 17px;
        margin-top: 20px;
        .tip_login {
          color: #eccf83;
          margin: 0 5px;
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .register_page {
    .establish_txt {
      font-weight: 600;
      line-height: 0.2rem;
      margin-bottom: 0.15rem;
    }
    .subtitle_txt {
      font-weight: 400;
      color: #ffffff;
      line-height: 0.14rem;
    }
    .content {
      width: 90vw;
      background: #101010;

      margin: 0 auto;
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      .left_content {
        border-right: none;
        flex: 1;
        display: flex;
        flex-direction: column;
        .onebox {
          width: 100%;
          padding: 0.18rem 0.1rem;
          display: flex;
          align-items: center;
          &:last-child {
            border-bottom: 2px solid #242222;
          }
          .imgbox_ {
            width: 0.2rem;
            margin-right: 0.15rem;
            .img_ {
              width: 100%;
            }
          }
          .right_txt {
            display: flex;
            flex-direction: column;
            .txt_1 {
              font-weight: 600;
              color: #eccf83;
              line-height: 0.14rem;
            }
            .txt_2 {
              font-weight: 400;
              color: #eccf83;
              line-height: 0.14rem;
              margin-top: 0.08rem;
            }
          }
        }
      }
      .right_content {
        padding: 0.23rem 0.1rem;
        align-items: center;
        .user_inputbox {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
          .email_txt {
            font-weight: 600;
            color: #ffffff;
            line-height: 22px;
          }
          .input {
            background: #171718;
            box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
            border-radius: 8px;
            border: 1px solid #373636;
            height: 46px;
            color: #ffffff;
            margin-top: 15px;
            padding: 0 15px;
          }
        }
        .remember_box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          ._check {
            display: flex;
            justify-content: center;
            align-items: center;
            .account {
              margin-left: 13px;
              font-weight: 400;
              color: #ffffff;
              line-height: 22px;
            }
            .checkbox {
              width: 24px;
              height: 24px;
              background: #d8d8d8;
              border-radius: 2px;
              border: 1px solid #979797;
              display: flex;
              justify-content: center;
              align-items: center;
              .correct:before {
                content: "\2714";
                color: #000;
              }
            }
          }
          .forget {
            font-weight: 400;
            color: #eccf83;
            line-height: 22px;
          }
        }
        .explain {
          width: fit-content;
          padding: 0 25px;
          margin-top: 57px;
          display: flex;
          .radious {
            margin-top: 3px;
            margin-right: 9px;
            .ques_img {
              width: 13px;
            }
          }
          .txt_ {
            font-weight: 400;
            color: #ffffff;
            line-height: 22px;
          }
        }
        .btn_box {
          cursor: pointer;
          width: 100%;
          height: 54px;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
          border-radius: 4px;
          backdrop-filter: blur(14px);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 46px;
          font-weight: 600;
          color: #000000;
        }
        .tip_txt {
          cursor: pointer;
          font-weight: 400;
          color: #969090;
          line-height: 17px;
          margin-top: 16px;
          .tip_login {
            font-weight: 400;
            color: #eccf83;
            line-height: 17px;
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>
