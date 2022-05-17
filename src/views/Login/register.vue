<template>
  <div class="register_page">
    <span class="font30 establish_txt mobile_font16">{{ $t("message.signin.txt1") }}</span>
    <span class="font26 subtitle_txt">{{ $t("message.signin.txt2") }}</span>
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
            <input type="text" class="font16" v-model.trim="registerForm.mailAccount" />
          </div>
          <div class="input_prompt font12" v-if="registerForm.prompt1">
            <span>* {{ $t(registerForm.prompt1) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.signin.txt19") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="registerForm.verifyCode" />
            <div class="verification font14" @click="sendEmail()">
              <span v-if="showCountdown">{{ minutes + " : " + seconds }}</span>
              <span v-else>{{ $t("message.signin.txt39") }}</span>
              <BtnLoading :isloading="codebtnloading"></BtnLoading>
            </div>
          </div>
          <div class="input_prompt font12" v-if="registerForm.prompt2">
            <span>* {{ $t(registerForm.prompt2) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.signin.txt17") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="registerForm.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="registerForm.prompt3">
            <span>* {{ $t(registerForm.prompt3) }}</span>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.signin.txt18") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="registerForm.password2" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt font12" v-if="registerForm.prompt4">
            <span>* {{ $t(registerForm.prompt4) }}</span>
          </div>
        </div>
        <div class="agree_box" ref="circular" @click="igraeeFlag = !igraeeFlag">
          <div class="circular_">
            <span class="sure_box" v-if="igraeeFlag"></span>
          </div>
          <div class="agree_txt">
            {{ $t("message.signin.txt20") }}<span class="span" @click.stop="igraeeTheTreaty">{{ $t("message.signin.txt21") }}</span>
          </div>
        </div>
        <div class="btn_box font18" @click="registerFun">
          {{ $t("message.signin.txt1") }}
          <BtnLoading :isloading="registerbtnloading"></BtnLoading>
        </div>
        <p class="font16 tip_txt" @click="toLogin">
          {{ $t("message.signin.txt22") }}
          <span class="tip_login">{{ $t("message.signin.txt23") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["getNoticeNum"]) },
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
      registerForm: {
        mailAccount: "",
        prompt1: "",
        verifyCode: "",
        prompt2: "",
        password: "",
        prompt3: "",
        password2: "",
        prompt4: "",
      },
      isShowPassword: true,
      registerbtnloading: false,
      igraeeFlag: false,
      codebtnloading: false,
      showCountdown: false,
      minutes: 0,
      seconds: 0,
    };
  },
  methods: {
    /**注册获取验证码 rvc  registerVerifyCode */
    sendEmail() {
      if (this.codebtnloading || this.showCountdown) return;
      if (!this.registerForm.mailAccount) return (this.registerForm.prompt1 = "message.signin.txt30"); // 填写邮箱
      if (!mailReg.test(this.registerForm.mailAccount)) return (this.registerForm.prompt1 = "message.signin.txt31"); // 邮箱不合法
      this.registerForm.prompt1 = "";
      if (localStorage.getItem(`rvc${this.registerForm.mailAccount}`)) {
        const end = JSON.parse(localStorage.getItem(`rvc${this.registerForm.mailAccount}`));
        const msec = end - Date.parse(new Date());
        if (msec <= 0) {
          localStorage.removeItem(`rvc${this.registerForm.mailAccount}`);
          this.sendEmail();
        } else {
          this.showCountdown = true;
          this.countdownFun(end);
        }
      } else {
        this.codebtnloading = true;
        this.$api
          .accountSendEmail({ email: this.registerForm.mailAccount, method: "1" })
          .then((res) => {
            this.codebtnloading = false;
            if (res.code === 200) {
              // console.log(res.msg);
              this.showCountdown = true;
              const end = Date.parse(new Date()) + 3 * 60 * 1000;
              localStorage.setItem(`rvc${this.registerForm.mailAccount}`, JSON.stringify(end));
              this.countdownFun(end);
            } else if (res.code === 4000) {
              // console.log(res.msg);
            }
            this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
          })
          .catch(() => {
            this.codebtnloading = false;
          });
      }
    },
    /**注册 */
    registerFun() {
      if (this.registerbtnloading) return;
      if (!this.registerForm.mailAccount) return (this.registerForm.prompt1 = "message.signin.txt30"); // 填写邮箱
      if (!mailReg.test(this.registerForm.mailAccount)) return (this.registerForm.prompt1 = "message.signin.txt31"); // 邮箱不合法
      this.registerForm.prompt1 = "";
      if (!this.registerForm.verifyCode) return (this.registerForm.prompt2 = "message.signin.txt32"); // 填写验证码
      this.registerForm.prompt2 = "";
      if (!this.registerForm.password) return (this.registerForm.prompt3 = "message.signin.txt33"); // 填写密码
      if (!pwReg.test(this.registerForm.password)) return (this.registerForm.prompt3 = "message.signin.txt37"); // 6-16位数字英文组合
      this.registerForm.prompt3 = "";
      if (!this.registerForm.password2) return (this.registerForm.prompt4 = "message.signin.txt36"); // 再次填写密码
      if (!pwReg.test(this.registerForm.password2)) return (this.registerForm.prompt4 = "message.signin.txt37"); // 6-16位数字英文组合
      if (this.registerForm.password2 !== this.registerForm.password)
        return (this.registerForm.prompt3 = this.registerForm.prompt4 = "message.signin.txt38"); // 密码校验不通过
      this.registerForm.prompt3 = "";
      this.registerForm.prompt4 = "";
      if (!this.igraeeFlag) {
        this.$refs.circular.classList.add("animation_move");
        setTimeout(() => {
          this.$refs.circular.classList.remove("animation_move");
        }, 300);
        return;
      }
      this.registerbtnloading = true;
      this.$api
        .accountRegister({ email: this.registerForm.mailAccount, password: this.registerForm.password, code: this.registerForm.verifyCode })
        .then((res) => {
          this.registerbtnloading = false;
          this.showCountdown = false; // 倒计时结束
          localStorage.removeItem(`rvc${this.registerForm.mailAccount}`);
          if (res.code === 200) {
            // console.log(res.msg);
            this.toLogin();
          } else if (res.code === 4000) {
            // console.log(res.msg);
          }
          this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
        })
        .catch(() => {
          this.registerbtnloading = false;
        });
    },
    /**倒计时 */
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
              this.countdownFun(JSON.parse(localStorage.getItem(`rvc${this.registerForm.mailAccount}`)));
            }, 1000);
          }
        }
      }
    },
    /**倒计时结束移除 */
    removeItemGetCode() {
      localStorage.removeItem(`rvc${this.registerForm.mailAccount}`);
      this.showCountdown = false;
    },
    /**协议 */
    igraeeTheTreaty() {
      window.location.href = `${this.$store.state.htmlUrl}SealemLab_protocol.html`;
      // https://cdn.sealemlab.com/sealemlab_assets_test/htmls/SealemLab_protocol.html?lang=zh
    },
    toLogin() {
      this.$router.push("/signin/login");
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
          width: 60px;
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
      .agree_box {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .circular_ {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #d8d8d8;
          border: 1px solid #979797;
          display: flex;
          justify-content: center;
          align-items: center;
          .sure_box {
            width: 60%;
            height: 60%;
            border-radius: 50%;
            background: #101010;
          }
        }
        .agree_txt {
          margin-left: 10px;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
          .span {
            color: #eccf83;
            margin-left: 5px;
          }
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
    .content {
      flex-direction: column;
      margin-top: 0.3rem;
      .left_content {
        border-right: none;
        .onebox {
          padding: 0.18rem 0.1rem;
          &:last-child {
            border-bottom: 2px solid #242222;
          }
          .imgbox_ {
            width: 0.2rem;
            margin-right: 0.15rem;
          }
        }
      }
      .right_content {
        padding: 0.23rem 0.1rem;
      }
    }
  }
}
</style>
