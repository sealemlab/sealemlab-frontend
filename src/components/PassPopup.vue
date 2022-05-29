<template>
  <div class="pass_Popup_page" :class="isEnLang?'en_Bold':''">
    <div class="Popup_boxs">
      <template v-if="isShowVerifyCode">
        <p class="propu_title_txt font30">{{ $t("message.signin.txt35") }}</p>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt22") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="forgetPassForm.mailAccount" />
          </div>
          <div class="input_prompt font12" v-if="forgetPassForm.prompt1">
            <span>* {{ $t(forgetPassForm.prompt1) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt23") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="forgetPassForm.verifyCode" />
            <div class="verification font14" @click="sendEmail()">
              <span v-if="showCountdown">{{ minutes + " : " + seconds }}</span>
              <span v-else>{{ $t("message.signin.txt39") }}</span>
              <BtnLoading :isloading="codebtnloading"></BtnLoading>
            </div>
          </div>
          <div class="input_prompt font12" v-if="forgetPassForm.prompt2">
            <span>* {{ $t(forgetPassForm.prompt2) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt24") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="forgetPassForm.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="forgetPassForm.prompt3">
            <span>* {{ $t(forgetPassForm.prompt3) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt25") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="forgetPassForm.password2" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="forgetPassForm.prompt4">
            <span>* {{ $t(forgetPassForm.prompt4) }}</span>
          </div>
        </div>
        <div class="btn font18" @click="handleSubmit1()">
          {{ $t("message.signin.btn_txt2") }}
          <BtnLoading :isloading="submitloading"></BtnLoading>
        </div>
      </template>
      <template v-else>
        <p class="propu_title_txt font30">{{ $t("message.signin.txt34") }}</p>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt26") }}</p>
          <div class="inputbox">
            <input disabled :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="changePassForm.oldPass" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="changePassForm.prompt1">
            <span>* {{ $t(changePassForm.prompt1) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt24") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="changePassForm.newPass" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="changePassForm.prompt2">
            <span>* {{ $t(changePassForm.prompt2) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt25") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="changePassForm.newPass2" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="changePassForm.prompt3">
            <span>* {{ $t(changePassForm.prompt3) }}</span>
          </div>
        </div>
        <div class="btn font18" @click="handleSubmit2()">
          {{ $t("message.signin.btn_txt1") }}
          <BtnLoading :isloading="submitloading"></BtnLoading>
        </div>
      </template>
      <img :src="`${$store.state.imgUrl}passclose.webp`" class="close_img" @click.stop="closePassPopup" />
    </div>
  </div>
</template>
<script>
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
import { mapGetters } from "vuex";
export default {
  props: {
    isShowVerifyCode: {
      type: Boolean,
      default: false,
    },
  },
  computed: { ...mapGetters(["getLogin"]) },
  data() {
    return {
      forgetPassForm: {
        mailAccount: "",
        prompt1: "",
        verifyCode: "",
        prompt2: "",
        password: "",
        prompt3: "",
        password2: "",
        prompt4: "",
      },
      changePassForm: {
        mailAccount: "",
        oldPass: "",
        prompt1: "",
        newPass: "",
        prompt2: "",
        newPass2: "",
        prompt3: "",
      },
      isShowPassword: false,
      codebtnloading: false,
      submitloading: false,
      showCountdown: false,
      minutes: 0,
      seconds: 0,
    };
  },

  created() {
    this.forgetPassForm.mailAccount = this.getLogin.mailAccount;

    this.changePassForm.mailAccount = this.getLogin.mailAccount;
    this.changePassForm.oldPass = this.getLogin.password;
  },

  methods: {
    sendEmail() {
      if (this.codebtnloading || this.showCountdown) return;
      if (!this.forgetPassForm.mailAccount) return (this.forgetPassForm.prompt1 = "message.signin.txt30"); // 填写邮箱
      if (!mailReg.test(this.forgetPassForm.mailAccount)) return (this.forgetPassForm.prompt1 = "message.signin.txt31"); // 邮箱不合法
      this.forgetPassForm.prompt1 = "";
      if (localStorage.getItem(`fpvc${this.forgetPassForm.mailAccount}`)) {
        const end = JSON.parse(localStorage.getItem(`fpvc${this.forgetPassForm.mailAccount}`));
        const msec = end - Date.parse(new Date());
        if (msec <= 0) {
          localStorage.removeItem(`fpvc${this.forgetPassForm.mailAccount}`);
          this.sendEmail();
        } else {
          this.showCountdown = true;
          this.countdownFun(end);
        }
      } else {
        this.codebtnloading = true;
        this.$api
          .accountSendEmail({ email: this.forgetPassForm.mailAccount, method: "2" })
          .then((res) => {
            if (res.code === 200) {
              this.showCountdown = true;
              const end = Date.parse(new Date()) + 10 * 60 * 1000; // 10分钟
              localStorage.setItem(`fpvc${this.forgetPassForm.mailAccount}`, JSON.stringify(end));
              this.countdownFun(end);
            }
            this.codebtnloading = false;
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
          })
          .catch(() => {
            this.codebtnloading = false;
          });
      }
    },
    handleSubmit1() {
      console.log("Retrieve passwords");
      if (this.submitloading) return;
      if (!this.forgetPassForm.mailAccount) return (this.forgetPassForm.prompt1 = "message.signin.txt30"); // 填写邮箱
      if (!mailReg.test(this.forgetPassForm.mailAccount)) return (this.forgetPassForm.prompt1 = "message.signin.txt31"); // 邮箱不合法
      this.forgetPassForm.prompt1 = "";
      if (!this.forgetPassForm.verifyCode) return (this.forgetPassForm.prompt2 = "message.signin.txt32"); // 填写验证码
      this.forgetPassForm.prompt2 = "";
      if (!this.forgetPassForm.password) return (this.forgetPassForm.prompt3 = "message.signin.txt33"); // 填写密码
      if (!pwReg.test(this.forgetPassForm.password)) return (this.forgetPassForm.prompt3 = "message.signin.txt37"); // 6-16位数字英文组合
      this.forgetPassForm.prompt3 = "";
      if (!this.forgetPassForm.password2) return (this.forgetPassForm.prompt4 = "message.signin.txt36"); // 再次填写密码
      if (!pwReg.test(this.forgetPassForm.password2)) return (this.forgetPassForm.prompt4 = "message.signin.txt37"); // 6-16位数字英文组合
      if (this.forgetPassForm.password2 !== this.forgetPassForm.password)
        return (this.forgetPassForm.prompt3 = this.forgetPassForm.prompt4 = "message.signin.txt38"); // 密码校验不通过
      this.forgetPassForm.prompt3 = "";
      this.forgetPassForm.prompt4 = "";
      this.$api
        .accountForget({ email: this.forgetPassForm.mailAccount, newPwd: this.forgetPassForm.password, code: this.forgetPassForm.verifyCode })
        .then((res) => {
          this.submitloading = false;
          this.showCountdown = false;
          localStorage.removeItem(`fpvc${this.forgetPassForm.mailAccount}`);
          this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
          if (res.code === 200) {
            this.resetUserInfo();
            this.closePassPopup();
          }
        })
        .catch(() => {
          this.submitloading = false;
        });
    },
    handleSubmit2() {
      console.log("Change passwords");
      if (this.submitloading) return;
      if (!this.changePassForm.oldPass) return (this.changePassForm.prompt1 = "message.signin.txt33"); // 填写密码
      if (!pwReg.test(this.changePassForm.oldPass)) return (this.changePassForm.prompt1 = "message.signin.txt37"); // 6-16位数字英文组合
      if (!this.changePassForm.newPass) return (this.changePassForm.prompt2 = "message.signin.txt33"); // 填写密码
      if (!pwReg.test(this.changePassForm.newPass)) return (this.changePassForm.prompt2 = "message.signin.txt37"); // 6-16位数字英文组合
      if (!this.changePassForm.newPass2) return (this.changePassForm.prompt3 = "message.signin.txt33"); // 填写密码
      if (!pwReg.test(this.changePassForm.newPass2)) return (this.changePassForm.prompt3 = "message.signin.txt37"); // 6-16位数字英文组合
      if (this.changePassForm.newPass !== this.changePassForm.newPass2)
        return (this.changePassForm.prompt2 = this.changePassForm.prompt3 = "message.signin.txt38"); // 密码校验不通过
      this.changePassForm.prompt2 = "";
      this.changePassForm.prompt3 = "";
      this.submitloading = true;
      this.$api
        .accountUpdate(
          { email: this.changePassForm.mailAccount, newPwd: this.changePassForm.newPass },
          { headers: { Authorization: "Bearer " + this.getLogin.token } },
        )
        .then((res) => {
          if (res.code === 200) {
            this.resetUserInfo();
            this.closePassPopup();
            this.$router.push("/signin/login");
          }
          this.submitloading = false;
          this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
        })
        .catch(() => {
          this.submitloading = false;
        });
    },
    countdownFun(end) {
      const msec = end - Date.parse(new Date());
      if (msec <= 0) {
        this.removeItemGetCode();
      } else {
        // let day = parseInt(msec / 1000 / 60 / 60 / 24);
        // let hr = parseInt((msec / 1000 / 60 / 60) % 24);
        let min = parseInt((msec / 1000 / 60) % 60);
        let sec = parseInt((msec / 1000) % 60);
        // this.day = day;
        // this.hr = hr > 9 ? hr : "0" + hr;
        this.minutes = min > 9 ? min : "0" + min;
        this.seconds = sec > 9 ? sec : "0" + sec;
        if (min >= 0 && sec >= 0) {
          if (min == 0 && sec == 0) {
            this.removeItemGetCode();
          } else {
            setTimeout(() => {
              this.countdownFun(JSON.parse(localStorage.getItem(`fpvc${this.forgetPassForm.mailAccount}`)));
            }, 1000);
          }
        }
      }
    },
    removeItemGetCode() {
      localStorage.removeItem(`fpvc${this.forgetPassForm.mailAccount}`);
      this.showCountdown = false;
    },
    resetUserInfo() {
      this.$store.commit("setLogin", {
        loginStatus: false,
        rememberStatus: false,
        mailAccount: "",
        password: "",
        token: "",
        activationTime: "",
        lastLogin: "",
        addr: "",
      });
    },
    closePassPopup() {
      this.$parent.isShowPassPopup = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pass_Popup_page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  .Popup_boxs {
    position: relative;
    width: 40vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px 50px;
    background: #101010;
    border: 2px solid #242222;
    .propu_title_txt {
      font-weight: 600;
      
      line-height: 33px;
      margin-bottom: 20px;
    }
    .user_inputbox {
      width: 100%;
      height: 100px;
      position: relative;
      padding: 10px 0 10px 0;
      .email_txt {
        font-weight: 600;
        
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
          
          padding: 0 15px;
        }
        .verification {
          cursor: pointer;
          min-width: fit-content;
          padding: 0 10px;
          height: 100%;
          color: #000000;
          font-weight: 600;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
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
    .btn {
      width: fit-content;
      height: 50px;
      padding: 0 80px;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
      cursor: pointer;
    }
    .close_img {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 44px;
      cursor: pointer;
    }
  }
}
</style>
