<template>
  <div class="bind_wallet_page">
    <div class="box">
      <template v-if="getLogin.addr">
        <p class="font24 name_">{{ $t("message.account.txt20") }}</p>
        <div class="content">
          <span class="span1 font16">{{ getLogin.addr }}</span>
          <!-- <span class="btn_small font14">{{ $t("message.account.txt21") }}</span> -->
        </div>
      </template>
      <template v-else>
        <div class="btn fotn18" @click="bindWalletBefore()">
          {{ $t("message.account.txt17") }}
          <BtnLoading :isloading="bindStatus"></BtnLoading>
        </div>
        <p class="txt_ font16">
          {{ $t("message.account.txt18") }} <br />
          {{ $t("message.account.txt19") }}
        </p>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSigner } from "sealemlab-sdk";
export default {
  computed: { ...mapGetters(["getNoticeNum", "getLogin", "getIstrue", "getAccount"]) },
  data() {
    return {
      bindStatus: false,
    };
  },
  methods: {
    bindWalletBefore() {
      if (this.bindStatus) return;
      this.bindStatus = true;
      this.$api
        .getUserNonce({}, { headers: { Authorization: "Bearer " + this.getLogin.token } })
        .then((res) => {
          if (res.code == 200) {
            if (this.getIstrue) {
              this.bindWallet(res.data);
            } else {
              if (!this.getNoticeNum) {
                this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.account.txt33" }));
                this.$store.commit("setNoticeNum", true);
              }
              this.bindStatus = false;
              setTimeout(() => {
                this.$store.commit("setwalletstatus", true);
              }, 2000);
            }
          } else {
            this.bindStatus = false;
          }
        })
        .catch(() => {
          this.bindStatus = false;
        });
    },
    bindWallet(nonce) {
      getSigner()
        .signMessage(nonce)
        .then((signature) => {
          this.$api
            .bindWallet(
              { addr: this.getAccount.toLowerCase(), sign: signature, nonce: nonce },
              { headers: { Authorization: "Bearer " + this.getLogin.token } },
            )
            .then((res) => {
              if (res.code === 200) {
                this.$store.state.userInfo.addr = res.data;
              }
              this.bindStatus = false;
              this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: res.msg }));
            })
            .catch(() => {
              this.bindStatus = false;
            });
        })
        .catch(() => {
          this.bindStatus = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.bind_wallet_page {
  width: 95%;
  margin: 0 auto;
  padding: 80px 0;
  .box {
    width: 100%;
    min-height: 400px;
    padding: 50px;
    background: #101010;
    border: 2px solid #242222;
    display: flex;
    flex-direction: column;
    .btn {
      width: 100%;
      height: 50px;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      border-radius: 4px;
      font-weight: 600;
      color: #000000;
      line-height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .txt_ {
      font-weight: 400;
      color: #706e6e;
      line-height: 32px;
    }
    .name_ {
      color: #ffffff;
      font-weight: 600;
      line-height: 22px;
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .span1 {
        color: #ffffff;
        font-weight: 400;
        line-height: 32px;
      }
      // .btn_small {
      //   width: 93px;
      //   height: 34px;
      //   background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      //   border-radius: 4px;
      //   backdrop-filter: blur(14px);
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   font-weight: 600;
      //   color: #000000;
      //   line-height: 20px;
      //   cursor: pointer;
      // }
    }
  }
}
</style>
