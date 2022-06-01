<template>
  <div class="gamebox">
    <div class="game_title">{{ $t("message.gamepage.text5") }}</div>
    <div class="boxin">
      <div class="title mobile">{{ $t("message.gamepage.text6") }}</div>
      <img :src="`${$store.state.imgUrl}game_SacredRealm.webp`" alt="" />
      <div class="content">
        <div class="title pc">{{ $t("message.gamepage.text6") }}</div>
        <div class="textbox">
          <div>
            <p>{{ $t("message.gamepage.text7") }}</p>
            <p>{{ $t("message.gamepage.text8") }}</p>
          </div>
          <div>
            <p>{{ $t("message.gamepage.text9") }}</p>
            <p>{{ $t("message.gamepage.text10") }}</p>
          </div>
          <div>
            <p>{{ $t("message.gamepage.text11") }}</p>
            <p>{{ $t("message.gamepage.text12") }}</p>
          </div>
        </div>
        <div class="btnbox">
          <div class="btn">{{ $t("message.gamepage.text13") }}</div>
          <div class="btn">{{ $t("message.gamepage.text14") }}</div>
        </div>
      </div>
    </div>
    <div class="boxin">
      <div class="title mobile">{{ $t("message.gamepage.text15") }}</div>
      <img :src="`${$store.state.imgUrl}game4.webp`" alt="" />
      <div class="content">
        <div class="title pc">{{ $t("message.gamepage.text15") }}</div>
        <div class="textbox">
          <div>
            <p>{{ $t("message.gamepage.text7") }}</p>
            <p>{{ $t("message.gamepage.text8") }}</p>
          </div>
          <div>
            <p>{{ $t("message.gamepage.text9") }}</p>
            <p>{{ $t("message.gamepage.text10") }}</p>
          </div>
          <div>
            <p>{{ $t("message.gamepage.text11") }}</p>
            <p>{{ $t("message.gamepage.text12") }}</p>
          </div>
        </div>
        <div class="btnbox">
          <div class="btn comingsoon">{{ $t("message.tip.txt5") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
};
</script>

<style lang="scss" scoped>
.mobile {
  display: none;
}
.pc {
  display: block;
}
.gamebox {
  width: 100%;
  height: auto;
}
.game_title {
  font-size: 32px;
  font-family: SFCompactDisplay-Heavy, SFCompactDisplay;
  margin-bottom: 30px;
}
.boxin {
  width: 100%;
  background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
  border-radius: 8px;
  border: 1px solid rgba(68, 67, 67, 0.47);
  display: flex;
  padding: 2rem 1rem;
  margin-bottom: 20px;
  > img {
    width: 29rem;
    height: 15rem;
    object-fit: fill;
  }
  .title {
    font-size: 24px;
    color: #f1d17d;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .content {
    width: 50%;
    padding-left: 2rem;
    .textbox {
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 50%;
        margin-bottom: 1.5rem;
        P {
          &:nth-child(1) {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          &:nth-child(2) {
            font-size: 16px;
            color: #8f8e8e;
            font-weight: 500;
          }
        }
      }
    }
    .btnbox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        cursor: pointer;
        width: 11rem;
        height: 2.5rem;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        &.comingsoon {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .mobile {
    display: block;
  }
  .pc {
    display: none;
  }
  .game_title {
    font-size: 0.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
  }
  .boxin {
    display: block;
    padding: 5vw;
    margin-bottom: 0.2rem;
    > img {
      width: 100%;
      height: auto;
    }
    .title {
      font-size: 0.16rem;
      margin-bottom: 0.2rem;
    }
    .content {
      width: 100%;
      padding-left: 0;
      .textbox {
        margin-top: 0.2rem;
        > div {
          width: 50%;
          margin-bottom: 0.2rem;
          P {
            &:nth-child(1) {
              font-size: 0.14rem;
              margin-bottom: 0.1rem;
            }
            &:nth-child(2) {
              font-size: 0.12rem;
            }
          }
        }
      }
      .btnbox {
        .btn {
          width: 1.2rem;
          height: 0.3rem;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>
