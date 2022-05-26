<template>
  <div class="gamebox">
    <div class="game_title">Play for Fun and toEarn</div>
    <div class="boxin">
      <div class="title mobile">Sacred Realm</div>
      <img :src="`${$store.state.imgUrl}maxgame1.webp`" alt="" />
      <div class="content">
        <div class="title pc">Sacred Realm</div>
        <div class="textbox">
          <div>
            <p>Type</p>
            <p>MORPG</p>
          </div>
          <div>
            <p>Developer</p>
            <p>Sealemlab</p>
          </div>
          <div>
            <p>Status</p>
            <p>Developing</p>
          </div>
        </div>
        <div class="btnbox">
          <div class="btn">Enter</div>
          <div class="btn">Download</div>
        </div>
      </div>
    </div>
    <div class="boxin">
      <div class="title mobile">PSYCHE</div>
      <img :src="`${$store.state.imgUrl}game4.webp`" alt="" />
      <div class="content">
        <div class="title mobile">PSYCHE</div>
        <div class="textbox">
          <div>
            <p>Type</p>
            <p>MORPG</p>
          </div>
          <div>
            <p>Developer</p>
            <p>Sealemlab</p>
          </div>
          <div>
            <p>Status</p>
            <p>Developing</p>
          </div>
        </div>
        <div class="btnbox">
          <div class="btn comingsoon">Coming soon</div>
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
  font-size: 45px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
}
.boxin {
  width: 100%;
  background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
  border-radius: 8px;
  border: 1px solid rgba(68, 67, 67, 0.47);
  display: flex;
  padding: 2rem 1rem;
  margin-bottom: 4rem;
  > img {
    width: 50%;
    height: auto;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
    color: #f1d17d;
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
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          &:nth-child(2) {
            font-size: 20px;
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
        width: 10rem;
        height: 2.5rem;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        font-size: 14px;
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
  .gamebox {
    width: 100%;
    height: auto;
    margin-left: 0;
  }
  .game_title {
    margin-bottom: 0.4rem;
    margin-top: 0.6rem;
    font-size: 26px;
    font-weight: bold;
    text-align: left;
  }
  .boxin {
    display: block;
    padding: 2vw;
    margin-bottom: 0.5rem;
    > img {
      width: 100%;
      height: auto;
    }
    .title {
      font-size: 24px;
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
              font-size: 20px;
              margin-bottom: 0.1rem;
            }
            &:nth-child(2) {
              font-size: 14px;
            }
          }
        }
      }
      .btnbox {
        .btn {
          width: 1.2rem;
          height: 0.35rem;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
