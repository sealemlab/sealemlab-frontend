<template>
  <div class="popup">
    <div class="inset">
      <div class="close_img" @click="closePopup"></div>
      <div class="content">
        <div class="title">{{ $t("message.gamepage.text19") }}</div>
        <div class="box">
          <div class="title">{{ $t("message.gamepage.text31") }}</div>
          <div class="inputbox">
            <input type="number" value="" :placeholder="$t('message.gamepage.text32')" />
            <div class="sr">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <div class="inputbtn">{{ $t("message.gamepage.text33") }}</div>
            <div class="tip">{{ $t("message.gamepage.text34") }}: 345678</div>
          </div>
        </div>
        <div class="box">
          <div class="title">{{ $t("message.gamepage.text35") }}</div>
          <div class="list">
            <span>30000</span>
            <span>60000</span>
            <span>120000</span>
            <span>240000</span>
            <span>480000</span>
          </div>
        </div>
        <div class="box">
          <div class="btn">{{ $t("message.gamepage.text36") }}</div>
          <!-- {{ $t("message.gamepage.text19") }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupRecharge",
  methods: {
    closePopup() {
      this.$parent.isShowRechargePopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100vw;
  height: 100vh;
  background: rgba(51, 51, 51, 0.25);
  backdrop-filter: blur(11px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inset {
  padding: 1rem 5rem;
  background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
  border-radius: 18px;
  border: 1px solid rgba(68, 67, 67, 0.47);
  position: relative;
  .close_img {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    background: url($bg_url + "close.webp") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 1rem;
    right: 3rem;
  }
  .content {
    .title {
      text-align: center;
      font-size: 24px;

      font-weight: 600;
      color: #eccf83;
      margin-bottom: 2rem;
    }
    .box {
      margin-bottom: 2rem;
      .title {
        text-align: left;
        margin-bottom: 2rem;
      }
      .inputbox {
        width: 25rem;
        height: 2.5rem;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
          border-radius: 8px;
          border: 1px solid #373636;
          padding: 0 5rem;
          font-size: 16px;
          color: #ced3d9;
          font-weight: 600;
        }
        .sr {
          width: fit-content;
          height: 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 1rem;
          top: 0;
          font-size: 16px;

          font-weight: 600;

          img {
            width: 23px;
            height: 23px;
            margin-right: 5px;
          }
        }
        .inputbtn {
          width: 5rem;
          height: 100%;
          background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 8px;
          backdrop-filter: blur(14px);
          font-size: 22px;

          font-weight: bold;
          color: #000000;
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .tip {
          font-size: 12px;
          font-family: SFCompactDisplay-Semibold, SFCompactDisplay;
          font-weight: 400;
          color: #8b8484;
          position: absolute;
          top: -1rem;
          right: 0;
        }
      }
      .list {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;

        font-weight: 600;

        span {
          &:hover {
            color: #eccf83;
          }
        }
      }
      .btn {
        margin: 0 auto;
        width: 18rem;
        height: 2.5rem;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        font-size: 18px;

        font-weight: 600;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .inset {
    padding: 0.2rem 0.3rem;
    .close_img {
      width: 0.2rem;
      height: 0.2rem;
      top: 0.2rem;
      right: 0.2rem;
    }
    .content {
      .title {
        font-size: 0.18rem;
        margin-bottom: 0.2rem;
      }
      .box {
        margin-bottom: 0.2rem;
        .title {
          font-size: 0.14rem;
          margin-bottom: 0.2rem;
        }
        .inputbox {
          width: 2.5rem;
          height: 0.3rem;
          input {
            padding: 0 0.6rem;
            font-size: 0.12rem;
          }
          .sr {
            left: 0.1rem;
            font-size: 0.12rem;
            img {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.05rem;
            }
          }
          .inputbtn {
            width: 0.6rem;
            height: 100%;
            font-size: 0.12rem;
          }
          .tip {
            font-size: 10px;
            top: -0.2rem;
          }
        }
        .list {
          font-size: 0.12rem;
        }
        .btn {
          width: 1.8rem;
          height: 0.35rem;
          font-size: 0.16rem;
        }
      }
    }
  }
}
</style>
