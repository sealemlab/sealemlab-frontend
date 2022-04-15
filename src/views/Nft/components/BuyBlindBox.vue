<template>
  <div class="buy_blind_box">
    <div class="box">
      <ul class="title_box">
        <li class="font45">购买盲盒</li>
        <li><img src="../../../assets/images/nftimage/nft_line_title.png" alt="" /></li>
        <li class="font16" :class="isEnLang?'en_Regular':'cn_lang'">购买盲盒参与游戏，自由交易</li>
      </ul>
      <div class="treasure_chest_box">
        <img src="../../../assets/images/nftimage/treasure_chest.png" alt="" />
      </div>
      <div class="buy_box">
        <div>
          <div class="title font20">The remaining /The total ：{{ proportion }}</div>
          <ul class="font16">
            <li>
              <div>价格</div>
              <div>{{ price }} ST</div>
            </li>
            <li>
              <div>数量</div>
              <div class="btns">
                <span class="btn" @click="deleteAmount">-</span>
                <input type="number" v-model="amount" />
                <span class="btn" @click="addAmount">+</span>
              </div>
            </li>
            <li>
              <div>总金额</div>
              <div>{{ totalAmount }} ST</div>
            </li>
          </ul>
          <div class="buy_btn font14" @click="clickBuy">购 买</div>
        </div>
      </div>
    </div>
    <div class="describe_box">
      <p class="font30 title_">Description</p>
      <div class="package_">
        <span class="font20 small_title">NFT Description:</span>
        <span class="font16 txt_" :class="isEnLang ? 'en_Regular' : 'cn_lang'">3D blind box assets, high star NFT dynamic effect display, ordinary treasure chest, legend treasure chest</span>
        <span class="font20 small_title">Contents of the blind box:</span>
        <span class="font16 txt_">clothing, weapons, rings, boots</span>
        <span class="font20 small_title">NFT action:</span>
        <span class="font16 txt_">3D blind box assets, high star NFT dynamic effect display, ordinary treasure chest, legend treasure chest</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["isEnLang"]) },
  data() {
    return {
      proportion: "0/1500",
      price: 10,
      amount: 100,
      totalAmount: 10,
    };
  },
  watch: {
    amount(newVal, oldVal) {
      if (newVal && newVal <= 99999) {
        this.amount = newVal;
      } else {
        this.amount = oldVal;
        // console.log("");
      }
    },
  },
  methods: {
    clickBuy() {
      console.log("clickBuy", this.amount, typeof this.amount);
    },
    deleteAmount() {
      this.amount--;
    },
    addAmount() {
      this.amount++;
    },
  },
};
</script>

<style lang="scss" scoped>
.buy_blind_box{
  width: 100%;
}
.box {
  width: 100%;
  height: auto;
  background-image: url("../../../assets/images/nftimage/nft_bg4.png");
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
  .title_box {
    margin: 0 auto;
    text-align: center;
    li {
      &:nth-child(1) {
        color: #00c1ff;
        line-height: 45px;
        background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &:nth-child(2) {
        img {
          width: 400px;
          height: auto;
          margin: 30px 0;
        }
      }
      &:nth-child(3) {
        color: #ffffff;
        line-height: 16px;
      }
    }
  }
  .buy_box {
    display: flex;
    justify-content: flex-end;
    > div {
      margin: 50px 0;
      padding: 34px 20px;
      background-image: url("../../../assets/images/nftimage/nft_bg5.png");
      background-size: 100% 100%;
      background-position: center center;
      .title {
        margin-bottom: 30px;
        color: #ffffff;
        line-height: 28px;
        background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      ul {
        li {
          margin: 30px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            &:nth-child(1) {
              font-size: 16px;
              color: #ffffff;
            }
            &:nth-child(2),
            input {
              font-size: 28px;
              color: #f1b713;
              background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            &.btns {
              display: flex;
              align-items: center;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 1px solid #939393;
                font-size: 20px;
              }
              input {
                max-width: 50px;
                height: 100%;
                margin: 0 10px;
                text-align: right;
                border: none;
              }
            }
          }
        }
      }
      .buy_btn {
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
        padding: 10px 80px;
        cursor: pointer;
        background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
        box-shadow: inset 0px 2px 3px 0px #f2d383, inset 0px -2px 11px 0px #f2d57d;
        border-radius: 5px;
        font-size: 20px;
        color: #381a02;
        line-height: 20px;
      }
    }
  }
  .treasure_chest_box {
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    img {
      width: 600px;
      height: auto;
    }
    animation: treasure_chest 2s ease-in-out infinite;
  }
}
.describe_box{
  width: 100%;
  display: flex;
  flex-direction: column;
  .title_{
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 36px;
    margin-bottom: 18px;
  }
  .package_{
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .small_title{
      font-weight: bold;
      color: #FFFFFF;
      line-height: 24px;
      margin-bottom: 18px;
    }
    .txt_{
      font-weight: 400;
      color: #FFFFFF;
      line-height: 19px;
      margin-bottom: 67px;
    }
  }
}
@keyframes treasure_chest {
  0% {
    opacity: 1;
    transform: scale(1.1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>
