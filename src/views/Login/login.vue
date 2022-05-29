<template>
  <div class="register_page font24 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">
    <div class="user_inputbox">
      <p class="email_txt" :class="isEnLang ? 'en_Bold' : ''">
        {{ $t("message.signin.txt16") }}
      </p>
      <div class="inputbox">
        <input type="text" v-model.trim="loginForm.mailAccount" />
      </div>
      <div class="input_prompt font12" v-if="loginForm.prompt1">
        <span>* {{ $t(loginForm.prompt1) }}</span>
      </div>
    </div>
    <div class="user_inputbox">
      <p class="email_txt" :class="isEnLang ? 'en_Bold' : ''">
        {{ $t("message.signin.txt17") }}
      </p>
      <div class="inputbox">
        <input
          :type="isShowPassword ? 'text' : 'password'"
          v-model.trim="loginForm.password"
        />
        <div class="eye">
          <div
            @click="isShowPassword = !isShowPassword"
            :class="{ active: isShowPassword }"
          ></div>
        </div>
      </div>
      <div class="input_prompt font12" v-if="loginForm.prompt2">
        <span>* {{ $t(loginForm.prompt2) }}</span>
      </div>
    </div>
    <div class="remember_box">
      <div class="_check" @click="rememberStatus = !rememberStatus">
        <div class="checkbox">
          <span class="correct font22" v-show="rememberStatus"></span>
        </div>
        <span class="font16 account">{{ $t("message.signin.txt28") }}</span>
      </div>
      <span class="font16 forget" @click="toForgetPassword">{{
        $t("message.signin.txt29")
      }}</span>
    </div>
    <div class="explain">
      <div>
        <img :src="`${$store.state.imgUrl}ques.webp`" class="ques_img" />
        <span class="txt_ font16" :class="isEnLang ? 'en_medium' : ''">{{
          $t("message.signin.txt26")
        }}</span>
      </div>
    </div>
    <div class="btn_box font20" @click="loginFun">
      {{ $t("message.signin.txt23") }}
      <BtnLoading :isloading="loginbtnloading"></BtnLoading>
    </div>
    <p
      class="font16 tip_txt"
      :class="isEnLang ? 'en_medium' : ''"
      @click="toRegister"
    >
      {{ $t("message.signin.txt27")
      }}<span class="tip_login">{{ $t("message.signin.txt3") }}</span>
    </p>
    <PassPopup
      v-if="isShowPassPopup"
      :isShowVerifyCode="isShowVerifyCode"
    ></PassPopup>
  </div>
</template>
<script>
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
import { mapGetters } from "vuex";
import PassPopup from "../../components/PassPopup.vue";
export default {
  components: { PassPopup },
  computed: { ...mapGetters(["getLogin", "setLogin", "isEnLang"]) },
  data () {
    return {
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
  created () {
    this.loginForm.mailAccount = this.getLogin.mailAccount;
    this.loginForm.password = this.getLogin.password;
    this.rememberStatus = this.getLogin.rememberStatus;
  },
  methods: {
    loginFun () {
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
    toRegister () {
      this.$router.push("/signin/register");
    },
    toForgetPassword () {
      this.isShowPassPopup = this.isShowVerifyCode = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.register_page {
  width: 100%;
  .user_inputbox {
    width: 100%;
    height: 100px;
    position: relative;
    padding: 10px 0 10px 0;
    .email_txt {
      font-weight: 600;

      line-height: 22px;
      margin-bottom: 15px;
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
        box-shadow: inset 0px 4px 11px 0px #0d0e0e,
          inset 0px -1px 7px 0px #0d0e0e;
        border-radius: 8px;
        border: 1px solid #373636;
        color: #ced3d9;
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
@media screen and (max-width: 980px) {
  .register_page {
    .user_inputbox {
      width: 100%;
      height: 0.8rem;
      position: relative;
      padding: 0.1rem 0 0.1rem 0;
      .email_txt {
        font-weight: 600;

        line-height: 0.22rem;
        margin-bottom: 0.1rem;
      }
      .inputbox {
        width: 100%;
        height: 0.35rem;
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
          box-shadow: inset 0px 4px 11px 0px #0d0e0e,
            inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 0.08rem;
          border: 1px solid #373636;

          padding: 0 0.15rem;
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
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ._check {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .account {
          margin-left: 0.12rem;
          font-weight: 400;

          line-height: 0.22rem;
        }
        .checkbox {
          width: 0.24rem;
          height: 0.24rem;
          background: #d8d8d8;
          border-radius: 0.02rem;
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
        line-height: 0.22rem;
      }
    }
    .explain {
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      > div {
        display: flex;
        align-items: flex-start;
      }
      img {
        width: 0.15rem;
        height: auto;
        margin-right: 0.1rem;
      }
      .txt_ {
        font-weight: 400;
      }
    }
    .btn_box {
      cursor: pointer;
      width: 100%;
      height: 0.5rem;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      border-radius: 0.04rem;
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
      line-height: 0.17rem;
      margin-top: 0.2rem;
      .tip_login {
        color: #eccf83;
        margin: 0 0.05rem;
      }
    }
  }
}
</style>
