<template>
  <div class="buy_blind_box">
    <ul class="title_box">
      <li class="font45 box_txt">{{$t("message.nft.txt20")}}</li>
      <li class="font16">
        {{$t("message.nft.txt21")}}
      </li>
      <li class="font16">
        {{$t("message.nft.txt22")}}
      </li>
    </ul>
    <div class="conten_box">
      <div class="treasure_chest_box">
        <img src="../../../assets/images/nftimage/treasure_chest.png" alt="" />
      </div>
      <div class="right_content">
        <p class="font20 title_txt">
          {{$t("message.nft.txt23")}}0
        </p>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt24")}}</span>
          <span class="righttxt">10 ST</span>
        </div>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt25")}}</span>
          <div class="btns">
            <span class="btn" @click="deleteAmount">-</span>
            <input type="number" class="font26" v-model="amount" />
            <span class="btn" @click="addAmount">+</span>
          </div>
        </div>
        <div class="line_onebox font16">
          <span class="lefttxt">{{$t("message.nft.txt26")}}</span>
          <span class="righttxt">10 ST</span>
        </div>
        <div class="balance_txt">
          {{$t("message.nft.txt27")}} 1.02 ST
          <img src="../../../assets/images/link.png" class="link_img" />
        </div>
        <div class="btnbox font12">{{$t("message.nft.txt28")}}</div>
      </div>
    </div>
    <div class="describe_box">
      <p class="font30 title_">{{$t("message.nft.txt29")}}</p>
      <div class="package_ font16">
        {{$t("message.nft.txt30")}}
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
  margin-top: 50px;
}
.title_box {
  width: 100%;
  text-align: center;
  li {
    &:nth-child(1) {
      font-weight: 600;
      color: #FFFFFF;
      line-height: 63px;
    }
    &:nth-child(2) {
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
      margin-top: 20px;
    }
    &:nth-child(3) {
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32px;
    }
  }
}
.conten_box {
  width: 100%;
  display: flex;
  margin: 87px 0;
  .treasure_chest_box {
    width: 50%;
    img {
      width: 100%;
      height: 400px;
      animation: treasure_chest 4s ease-in-out infinite;
    }
  }
  .right_content{
    width: 410px;
    padding: 20px 70px 20px 20px;
    display: flex;
    flex-direction: column;
    background: rgba(16, 16, 16, 0.49);
    box-shadow: 0px 6px 11px 0px rgba(0, 0, 0, 0.59);
    border-radius: 25px;
    border: 1px solid rgba(236, 207, 131, 0.5);
    .title_txt{
      font-weight: 600;
      color: #ECCF83;
      line-height: 28px;
      margin-bottom: 30px;
    }
    .line_onebox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .lefttxt{
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
      }
      .righttxt{
        font-weight: bold;
        color: #ECCF83;
        line-height: 19px;
      }
      .btns {
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
          color: #825f35;
        }
        input {
          max-width: 50px;
          height: 100%;
          margin: 0 10px;
          text-align: center;
          color: #f1b713;
          background: linear-gradient(180deg, #825f35 0%, #fadd82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .balance_txt{
      border-top: 1px solid #979797;
      padding-top: 15px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 400;
      color: #9B9995;
      line-height: 14px;
      .link_img{
        width:15px;
        margin-left: 15px;
      }
    }
    .btnbox{
      margin-top: 34px;
      width: 163px;
      height: 48px;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #000000;
      margin-left: 35%;
      cursor: pointer;
    }
  }
}
.describe_box{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title_{
    font-weight: bold;
    color: #FFFFFF;
    line-height: 36px;
    margin-bottom: 30px;
  }
  .package_{
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32px;
  }
}
@keyframes treasure_chest {
  0% {
    opacity: 1;
    transform: scale(1.5);
  }
  50% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.5);
  }
}
</style>
