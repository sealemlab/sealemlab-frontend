<template>
  <div class="record_page" v-if="getwalletstatus">
    <div class="title font26">{{ $t("message.nav.txt9") }}</div>
    <img :src="`${$store.state.imgUrl}passclose.webp`" class="close_img" @click="closepage" />
    <div class="boxarr">
      <div class="onebox" v-for="(item, index) in walletarr" :key="index" @click="walletClick(item)">
        <span class="wallet_txt fontsize16">{{ item.name }}</span>
        <img :src="item.src" class="imgcard" />
      </div>
      <div class="new_cry font16">
        {{ $t("message.nav.txt11") }}
        <a href="https://en.wikipedia.org/wiki/Cryptocurrency_wallet" target="_blank" rel="noopener noreferrer">
          <span class="color4">{{ $t("message.nav.txt12") }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getwalletstatus"]),
  },
  data() {
    return {
      walletarr: [
        { name: "Metamask", src: `${this.$store.state.imgUrl}wallet1.webp` },
        { name: "WalletConnect", src: `${this.$store.state.imgUrl}wallet2.webp` },
        // {name:'Bitkeep',src:`${this.$store.state.imgUrl}wallet7.webp`},
        // {name:'Coin98',src:`${this.$store.state.imgUrl}wallet11.webp`},
        // {name:'ONTO',src:`${this.$store.state.imgUrl}wallet5.webp`},
        // { name: "TokenPocket", src: `${this.$store.state.imgUrl}wallet6.webp` },
        // {name:'TrustWallet',src:`${this.$store.state.imgUrl}wallet3.webp`},
        // {name:'SafePal Wallet',src:`${this.$store.state.imgUrl}wallet4.webp`},
        // {name:'Bitkeep',src:`${this.$store.state.imgUrl}wallet7.webp`},
        // {name:'MathWallet',src:`${this.$store.state.imgUrl}wallet8.webp`},
        // {name:'Onekey',src:`${this.$store.state.imgUrl}wallet9.webp`},
        // {name:'Bitpie',src:`${this.$store.state.imgUrl}wallet10.webp`},
        // {name:'Binance Chain Wallet',src:`${this.$store.state.imgUrl}wallet12.webp`},
      ],
    };
  },
  methods: {
    // 弹窗关闭
    closepage() {
      this.$emit("closewalletpage");
    },
    // 各类钱包点击
    walletClick(item) {
      this.$emit("walletClick", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.record_page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    text-align: center;
    color: #ffffff;
    margin: 50px 0;
  }
  .close_img {
    position: absolute;
    top: 10px;
    right: 100px;
    width: 44px;
    object-fit: contain;
    cursor: pointer;
  }
  .boxarr {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    max-height: 600px;
    overflow-y: auto;
    background: #171717;
    padding-bottom: 40px;
    .onebox {
      cursor: pointer;
      width: 432px;
      height: 67px;
      padding: 10px 22px 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(63, 65, 71, 0.5);
      border-radius: 15px;
      margin-top: 32px;
      .imgcard {
        width: 41px;
      }
      .wallet_txt {
        color: #ffffff;
      }
    }
    .onebox:hover {
      background: rgba(63, 65, 71, 1);
    }
    .new_cry {
      width: 100%;
      text-align: center;
      margin-top: 30px;
      span {
        cursor: pointer;
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .record_page {
    .boxarr {
      max-width: 1162px;
      margin: 40px auto;
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    .title {
      margin-top: 1rem;
      width: 100%;
      text-align: center;
      color: #ffffff;
    }
    .close_img {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      width: 0.36rem;
      object-fit: contain;
    }
    .boxarr {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 0.2rem;
      padding-bottom: 0.2rem;
      max-height: 6rem;
      overflow-y: auto;
      margin-top: 0.27rem;
      .onebox {
        cursor: pointer;
        width: 100%;
        height: 0.52rem;
        padding: 0 0.2rem 0 0.09rem;
        border-radius: 0.15rem;
        margin-top: 0.1rem;
        .imgcard {
          width: 0.24rem;
          object-fit: contain;
        }
        .wallet_txt {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
