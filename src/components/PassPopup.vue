<template>
  <div class="pass_Popup_page">
    <div class="Popup_boxs">
      <template v-if="isShowVerifyCode">
        <p class="propu_title_txt font24">{{ $t("message.signin.txt35") }}</p>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt22") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="registerForm.mailAccount" />
            <div class="input_prompt font12" v-if="registerForm.prompt1">
              <span>* {{ registerForm.prompt1 }}</span>
            </div>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt23") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="registerForm.verifyCode" />
            <div class="verification font14" @click="registerGetCode">
              <span v-if="showCountdown">{{ minutes + " : " + seconds }}</span>
              <span v-else>{{ $t("message.signin.txt39") }}</span>
              <BtnLoading :isloading="codebtnloading"></BtnLoading>
            </div>
            <div class="input_prompt font12" v-if="registerForm.prompt2">
              <span>* {{ registerForm.prompt2 }}</span>
            </div>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt24") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="registerForm.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
            <div class="input_prompt font12" v-if="registerForm.prompt3">
              <span>* {{ registerForm.prompt3 }}</span>
            </div>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt25") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="registerForm.password2" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
            <div class="input_prompt font12" v-if="registerForm.prompt4">
              <span>* {{ registerForm.prompt4 }}</span>
            </div>
          </div>
        </div>
        <div class="btn font18" @click="handleSubmit">{{ $t("message.signin.btn_txt2") }}</div>
      </template>
      <template v-else>
        <p class="propu_title_txt font24">{{ $t("message.signin.txt34") }}</p>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt26") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="registerForm.mailAccount" />
            <div class="input_prompt font12" v-if="registerForm.prompt1">
              <span>* {{ registerForm.prompt1 }}</span>
            </div>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt24") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="registerForm.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
            <div class="input_prompt font12" v-if="registerForm.prompt3">
              <span>* {{ registerForm.prompt3 }}</span>
            </div>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt25") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="registerForm.password2" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
            <div class="input_prompt font12" v-if="registerForm.prompt4">
              <span>* {{ registerForm.prompt4 }}</span>
            </div>
          </div>
        </div>
        <div class="btn font18" @click="handleSubmit">{{ $t("message.signin.btn_txt1") }}</div>
      </template>

      <img :src="`${$store.state.imgUrl}passclose.webp`" class="close_img" @click.stop="closePassPopup" />
    </div>
  </div>
</template>
<script>
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
export default {
  props: {
    isShowVerifyCode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      registerForm: {
        mailAccount: "641160771@qq.com",
        prompt1: "",
        verifyCode: "123456",
        prompt2: "",
        password: "123456",
        prompt3: "",
        password2: "123456",
        prompt4: "",
      },
      isShowPassword: false,
      codebtnloading: false,
      showCountdown: false,
      minutes: 0,
      seconds: 0,
    };
  },

  methods: {
    /**注册获取验证码 */
    registerGetCode() {
      if (this.codebtnloading || this.showCountdown) return;
      if (!this.registerForm.mailAccount) return (this.registerForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.registerForm.mailAccount)) return (this.registerForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.registerForm.prompt1 = "";
      if (localStorage.getItem("SealemLabRegisterGetCode")) {
        const end = JSON.parse(localStorage.getItem("SealemLabRegisterGetCode"));
        const msec = end - Date.parse(new Date());
        if (msec <= 0) {
          localStorage.removeItem("SealemLabRegisterGetCode");
          this.registerGetCode();
        } else {
          this.showCountdown = true;
          this.countdownFun("register", end);
        }
      } else {
        this.codebtnloading = true;
        // const url = `codeType=register&mailAccount=${this.registerForm.mailAccount}`;
        // this.$api
        //   .gameMailCode(url)
        //   .then((res) => {
        //     this.codebtnloading = false;
        //     if (res.data.result === "SUCCESS") {
        //       this.showCountdown = true;
        //       const end = Date.parse(new Date()) + 10 * 60 * 1000;
        //       localStorage.setItem("SealemLabRegisterGetCode", JSON.stringify(end));
        //       this.countdownFun("register", end);
        //     }
        //     this.$common.selectLang(res.data.msg, res.data.msg, this);
        //   })
        //   .catch(() => {
        //     this.codebtnloading = false;
        //   });
      }
    },
    handleSubmit() {
      this.$parent.isShowPassPopup = false;
    },
    // 弹窗关闭
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
      color: #ffffff;
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
        .input_prompt {
          width: 100%;
          color: #fb3e3e;
          position: absolute;
          left: 0;
          bottom: 0;
        }
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
