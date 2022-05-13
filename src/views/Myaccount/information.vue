<template>
  <div class="information_page">
    <div class="box">
      <div class="left_content">
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt5") }}</p>
          <div class="inputbox">
            <input type="text" class="font16" v-model.trim="loginForm.mailAccount" />
            <div class="input_prompt font12" v-if="loginForm.prompt1">
              <span>* {{ loginForm.prompt1 }}</span>
            </div>
          </div>
        </div>
        <div class="user_inputbox">
          <p class="font16 email_txt">{{ $t("message.account.txt6") }}</p>
          <div class="inputbox">
            <input :type="isShowPassword ? 'text' : 'password'" class="font16" v-model.trim="loginForm.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
            <div class="inputbtn font14" @click="changePassword">
              <span>{{ $t("message.account.txt8") }}</span>
            </div>
            <div class="input_prompt font12" v-if="loginForm.prompt2">
              <span>* {{ loginForm.prompt2 }}</span>
            </div>
          </div>
        </div>
        <div class="lin_content font12">
          {{ $t("message.account.txt9") }}
        </div>
        <div class="btn font18">
          {{ $t("message.account.txt10") }}
        </div>
      </div>
      <div class="right_content">
        <div class="right_line font16">
          <span class="account_status">{{ $t("message.account.txt11") }}</span>
          <span class="_status">{{ $t("message.account.txt12") }}</span>
        </div>
        <div class="right_line font16">
          <span class="account_status">{{ $t("message.account.txt13") }}</span>
          <span class="_status">{{ $t("message.account.txt14") }}</span>
        </div>
        <div class="right_line font16">
          <span class="account_status">{{ $t("message.account.txt15") }}</span>
          <span class="_status">2017-08-08</span>
        </div>
        <div class="right_line font16">
          <span class="account_status">{{ $t("message.account.txt16") }}</span>
          <span class="_status">2017-08-08 20:24:10 记录..</span>
        </div>
      </div>
    </div>
    <PassPopup v-if="isShowPassPopup" :isShowVerifyCode="isShowVerifyCode"></PassPopup>
  </div>
</template>
<script>
import PassPopup from "../../components/PassPopup.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PassPopup,
  },
  computed: {
    ...mapGetters(["getLogin"]),
  },
  data() {
    return {
      isShowPassPopup: false,
      isShowVerifyCode: false,
      isShowPassword: false,
      loginForm: {
        mailAccount: "",
        password: "",
        prompt1: "",
        prompt2: "",
      },
    };
  },

  methods: {
    changePassword() {
      this.isShowPassPopup = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.information_page {
  width: 95%;
  margin: 0 auto;
  margin-top: 67px;
  .box {
    width: 100%;
    display: flex;
    background: #101010;
    // border: 2px solid #242222;
    .left_content {
      width: 55%;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #242222;
      padding: 30px 30px;
      .user_inputbox {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        position: relative;
        padding: 10px 0 10px 0;
        .email_txt {
          width: 100px;
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
            right: 165px;
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
          .inputbtn {
            cursor: pointer;
            min-width: 150px;
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
      .lin_content {
        width: 100%;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
        padding-left: 76px;
      }
      .btn {
        width: 330px;
        height: 54px;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        cursor: pointer;
        // margin-left: 76px;
        font-weight: 600;
        color: #000000;
        margin: 0 auto;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right_content {
      width: 45%;
      display: flex;
      flex-direction: column;
      padding: 30px 30px;
      .right_line {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 79px;
        .account_status {
          font-weight: 600;
          color: #eccf83;
          line-height: 22px;
          min-width: 100px;
        }
        ._status {
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
