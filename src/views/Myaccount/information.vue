<template>
  <div class="information_page" :class="isEnLang?'en_Bold':''">
    <div class="box">
      <div class="left_content">
        <div class="user_inputbox" :class="isEnLang?'en_Bold':''">
          <p class="font24 email_txt mobile_font14">{{ $t("message.account.txt5") }}</p>
          <div class="inputbox">
            <input disabled type="text" class="font18" v-model.trim="getLogin.mailAccount" />
          </div>
        </div>
        <div class="user_inputbox" :class="isEnLang?'en_Bold':''">
          <p class="font24 email_txt mobile_font14">{{ $t("message.account.txt6") }}</p>
          <div class="inputbox out_inputbox">
            <input disabled :type="isShowPassword ? 'text' : 'password'" class="font18" v-model.trim="getLogin.password" />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
            <div class="inputbtn font14" @click="changePassword">
              <span>{{ $t("message.account.txt8") }}</span>
            </div>
          </div>
        </div>
        <div class="lin_content font16" :class="isEnLang?'en_medium':''">
          {{ $t("message.account.txt9") }}
        </div>
        <div class="btn font18 mobile_font16" :class="isEnLang?'en_Bold':''" @click="updateInformation">
          {{ $t("message.account.txt10") }}
          <BtnLoading :isloading="loginbtnloading"></BtnLoading>
        </div>
      </div>
      <div class="right_content">
        <div class="right_line">
          <span class="account_status font24" :class="isEnLang?'en_Bold':''">{{ $t("message.account.txt11") }}</span>
          <span class="_status font14" :class="isEnLang?'en_medium':''">{{ $t("message.account.txt12") }}</span>
        </div>
        <div class="right_line">
          <span class="account_status font24" :class="isEnLang?'en_Bold':''">{{ $t("message.account.txt13") }}</span>
          <span class="_status font14" :class="isEnLang?'en_medium':''">{{ $t("message.account.txt14") }}</span>
        </div>
        <div class="right_line">
          <span class="account_status font24" :class="isEnLang?'en_Bold':''">{{ $t("message.account.txt15") }}</span>
          <span class="_status font14" :class="isEnLang?'en_medium':''">{{ getLogin.activationTime }}</span>
        </div>
        <div class="right_line">
          <span class="account_status font24" :class="isEnLang?'en_Bold':''">{{ $t("message.account.txt16") }}</span>
          <div class="_status font14" :class="isEnLang?'en_medium':''">
            {{ getLogin.lastLogin.indexOf("T") !== -1 ? getLogin.lastLogin.replace("T", "\n") : "" }}
          </div>
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
  components: { PassPopup },
  computed: { ...mapGetters(["getLogin","isEnLang"]) },
  data() {
    return {
      isShowPassPopup: false,
      isShowVerifyCode: false,
      isShowPassword: false,
      loginbtnloading: false,
    };
  },
  methods: {
    updateInformation() {
      if (this.loginbtnloading) return;
      this.loginbtnloading = true;
      this.$api
        .accountUpdateInfo({ email: this.getLogin.mailAccount, password: this.getLogin.password })
        .then((res) => {
          this.loginbtnloading = false;
          if (res.code === 200) {
            this.$store.state.userInfo.activationTime = res.data.activationTime;
            this.$store.state.userInfo.addr = res.data.addr;
            this.$store.state.userInfo.token = res.data.token;
            this.$store.state.userInfo.lastLogin = res.data.lastLogin;
          }
          this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
        })
        .catch(() => {
          this.loginbtnloading = false;
        });
    },
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
  padding: 80px 0;
  .box {
    width: 100%;
    display: flex;
    background: #101010;
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
        justify-content: space-between;
        position: relative;
        padding: 10px 0 10px 0;
        .email_txt {
          width: 100px;
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
            right: 172px;
          }
          input {
            position: relative;
            width: 100%;
            height: 100%;
            background: #171718;
            box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
            border-radius: 8px;
            border: 1px solid #373636;
            color: #CED3D9;
            padding: 0 15px;
          }
          .inputbtn {
            cursor: pointer;
            // min-width: 150px;
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
        .out_inputbox{
          padding-left: 30px;
          input{
            width: 50%;
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
      .lin_content {
        width: 100%;
        font-weight: 500;
        color: #8F8E8E;
        line-height: 27px;
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
        margin-bottom: 79px;
        // justify-content: space-between;
        .account_status {
          font-weight: 600;
          line-height: 22px;
          min-width: 230px;
        }
        ._status {
          font-weight: 400;
          line-height: 22px;
          margin-left: 10px;
          color: #8F8E8E;
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .information_page {
    width: 100%;
    padding: 0.2rem;
    .box {
      width: 100%;
      display: flex;
      flex-direction:column;
      border: 0.02rem solid #242222;
      .left_content {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding:0.2rem;
        border: none;
        .user_inputbox {
          width: 100%;
          height: 0.8rem;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0.1rem 0;
          .email_txt {
            width: 1rem;
            font-weight: 600;
            
            line-height: 0.22rem;
            margin-bottom: 0.1rem;
          }
          .inputbox {
            position: relative;
            width: 100%;
            height: 0.35rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .eye {
              position: absolute;
              right: 0.65rem;
            }
            input {
              width: 100%;
              height: 100%;
              background: #171718;
              box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
              border-radius: 0.08rem;
              border: 1px solid #373636;
              
              padding: 0 0.1rem;
            }
            .inputbtn {
              cursor: pointer;
              min-width: 0.1rem;
              padding: 0 0.05rem;
              height: 100%;
              color: #000000;
              font-weight: 600;
              background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
              border-radius: 0.08rem;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 0.1rem;
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
        .lin_content {
          width: 100%;
          font-weight: 400;
          
          line-height: 0.18rem;
          padding-left: 0;
        }
        .btn {
          width: 100%;
          height: 0.54rem;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
          border-radius: 0.04rem;
          backdrop-filter: blur(14px);
          cursor: pointer;
          font-weight: 600;
          color: #000000;
          margin: 0 auto;
          margin-top: 0.3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .right_content {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding:0.2rem;
        .right_line {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.2rem;
          .account_status {
            font-weight: 600;
            line-height: 0.22rem;
            min-width: 1rem;
          }
          ._status {
            font-weight: 400;
            line-height: 0.22rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
