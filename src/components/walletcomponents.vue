<template>
  <div class="record_page" v-if="getwalletstatus">
    <div class="boxarr">
      <div class="title font26 mobile_font18">{{ $t("message.nav.txt9") }}</div>
      <img
        :src="`${$store.state.imgUrl}close.webp`"
        class="close_img"
        @click="closepage"
      />
      <div class="out_box_hidden">
        <div
          class="onebox"
          v-for="(item, index) in walletarr"
          :key="index"
          @click="walletClick(item)"
        >
          <span class="wallet_txt fontsize16">{{ item.name }}</span>
          <img :src="item.src" class="imgcard" />
        </div>
      </div>
      <div class="new_cry font16">
        {{ $t("message.nav.txt11") }}
        <a
          href="https://en.wikipedia.org/wiki/Cryptocurrency_wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
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
  data () {
    return {
      walletarr: [
        { name: "Metamask", src: `${this.$store.state.imgUrl}wallet1.webp`, content: 'metamask' },
        { name: "WalletConnect", src: `${this.$store.state.imgUrl}wallet2.webp`, content: 'walletconnect' },
        { name: 'Bitkeep', src: `${this.$store.state.imgUrl}wallet3.webp`, content: 'metamask' },
        { name: 'TokenPocket', src: `${this.$store.state.imgUrl}wallet4.webp`, content: 'metamask' },
        { name: 'Nabox', src: `${this.$store.state.imgUrl}wallet5.webp`, content: 'metamask' },
        { name: "COIN98", src: `${this.$store.state.imgUrl}wallet6.webp`, content: 'metamask' },
        { name: 'Math Wallet', src: `${this.$store.state.imgUrl}wallet7.webp`, content: 'metamask' },
        { name: 'SafePal', src: `${this.$store.state.imgUrl}wallet8.webp`, content: 'metamask' },
        { name: 'ONTO', src: `${this.$store.state.imgUrl}wallet9.webp`, content: 'metamask' },
        { name: 'Coinhub', src: `${this.$store.state.imgUrl}wallet10.webp`, content: 'metamask' },
        { name: 'Formless', src: `${this.$store.state.imgUrl}wallet11.webp`, content: 'formless' }
      ],
    };
  },
  methods: {
    // 弹窗关闭
    closepage () {
      this.$emit("closewalletpage");
    },
    // 各类钱包点击
    walletClick (item) {
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
  justify-content: center;
  .boxarr {
    position: relative;
    margin: 0 auto;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 10px;
    border-radius: 5px;
    background: #171717;
    padding-bottom: 40px;
    .out_box_hidden {
      width: 100%;
      max-height: 560px;
      overflow-y: auto;
      padding: 0 0 10px;
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
          color: #ced3d9;
        }
      }
      .onebox:hover {
        background: rgba(63, 65, 71, 1);
      }
    }
    .new_cry {
      width: 100%;
      text-align: center;
      margin-top: 30px;
      span {
        cursor: pointer;
      }
    }
    .title {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #ced3d9;
    }
    .close_img {
      position: absolute;
      top: 10px;
      right: 20px;
      width: 44px;
      cursor: pointer;
    }
  }
}
.out_box_hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@media screen and (max-width: 980px) {
  .record_page {
    .boxarr {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem;
      max-height: 6rem;
      // overflow-y: auto;
      margin-top: 0.27rem;
      .out_box_hidden {
        width: 100%;
        max-height: 5rem;
        overflow-y: auto;
        padding: 0.1rem 0 0.1rem;
        .onebox {
          cursor: pointer;
          width: 100%;
          height: 0.52rem;
          padding: 0 0.2rem 0 0.09rem;
          border-radius: 0.15rem;
          margin-top: 0.2rem;
          .imgcard {
            width: 0.24rem;
            object-fit: contain;
          }
          .wallet_txt {
            color: #ced3d9;
          }
        }
      }
      .new_cry {
        width: 100%;
        text-align: center;
        margin-top: 0.2rem;
        span {
          cursor: pointer;
        }
      }
      .title {
        position: absolute;
        top: 0.1rem;
        color: #ced3d9;
        width: 100%;
        background: #171717;
        text-align: center;
        padding-bottom: 0.1rem;
      }
      .close_img {
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
        width: 0.36rem;
        object-fit: contain;
      }
    }
  }
}
</style>
