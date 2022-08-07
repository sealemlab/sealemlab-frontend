<template>
  <div class="gamebox">
    <div class="game_title">{{ $t("message.gamepage.text5") }}</div>
    <div class="boxin">
      <div class="title mobile">{{ $t("message.gamepage.text6") }}</div>
      <img :src="`${$store.state.imgUrl}showgame.webp`" alt="" />
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
          <div class="btn" @click="download('android')">
            <div class="insideBtn">
              <svg
                t="1656924409783"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2294"
                width="24"
                height="24"
              >
                <path
                  d="M141.1 331.2c-35 0-63.3 28.3-63.3 63.2v264.7c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2V394.4c0-34.9-28.3-63.2-63.3-63.2zM228.9 753.3c0 37.3 30.3 67.5 67.6 67.5h46.1v140c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2v-140h85.5v140c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2v-140h46.1c37.3 0 67.6-30.2 67.6-67.5V343.1H228.9v410.2zM651.8 93.4L696 13c2.4-4.2 0.8-9.6-3.5-11.9-4.2-2.3-9.6-0.8-11.9 3.5l-44.7 81.2C598.4 69.2 556.4 59.9 512 59.9c-44.4 0-86.4 9.3-123.9 25.8L343.4 4.6c-2.3-4.3-7.7-5.8-11.9-3.5-4.3 2.3-5.9 7.7-3.5 11.9l44.2 80.4c-86.8 44.8-145.5 130-145.5 227.7h570.5c0.1-97.8-58.6-182.9-145.4-227.7zM382.2 218c-13.2 0-23.9-10.7-23.9-23.9s10.7-23.9 23.9-23.9 23.9 10.7 23.9 23.9c-0.1 13.2-10.8 23.9-23.9 23.9z m259.7 0c-13.2 0-23.9-10.7-23.9-23.9s10.7-23.9 23.9-23.9 23.9 10.7 23.9 23.9c-0.1 13.2-10.8 23.9-23.9 23.9zM882.9 331.2c-35 0-63.3 28.3-63.3 63.2v264.7c0 34.9 28.4 63.2 63.3 63.2 35 0 63.3-28.3 63.3-63.2V394.4c0-34.9-28.3-63.2-63.3-63.2z"
                  p-id="2295"
                  fill="#EAD28E"
                ></path>
              </svg>
              <div class="btn_txt font16" :class="isEnLang?'en_medium':''">{{ $t("message.gamepage.text13") }}</div>
            </div>
          </div>
          <div class="btn" @click="download('pc')">
            <div class="insideBtn">
            <svg
              t="1656924494872"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4272"
              width="24"
              height="24"
            >
              <path
                d="M0.24 483.776h412.944V88.656L0.24 148.48v335.296zM469.648 80.464v403.312h554.096V0.24L469.648 80.464zM0.24 875.536l412.944 59.808V540.256H0.24v335.28z m469.408 68l554.096 80.224V540.256H469.648v403.28z"
                p-id="4273"
                fill="#EAD28E"
              ></path>
            </svg>
            <div class="btn_txt font16" :class="isEnLang?'en_medium':''"> {{ $t("message.gamepage.text14") }}</div>
            </div>
          </div>
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
            <p>{{ $t("message.gamepage.txt8_1") }}</p>
          </div>
          <div>
            <p>{{ $t("message.gamepage.text9") }}</p>
            <p>{{ $t("message.gamepage.text10") }}</p>
          </div>
          <div>
            <p>{{ $t("message.gamepage.text11") }}</p>
            <p>{{ $t("message.gamepage.txt12_1") }}</p>
          </div>
        </div>
        <div class="btnbox">
          <div class="comingsoon">
            <div class="insideBtn font16" :class="isEnLang?'en_medium':''">{{ $t("message.tip.txt5") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getNoticeNum","isEnLang"])
  },
  name: "Game",
  methods: {
    download (data) {
      if(data == 'pc'){
        window.open('https://cdn.sealemlab.com/sacredrealm_app_release/SacredRealm_Main_1.0.8_PC.rar')
      }else{
        window.open('https://cdn.sealemlab.com/sacredrealm_app_release/SacredRealm_Main_1.0.8.apk')
      }
    },
  }
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
        width: 50%;
        height: 40px;
        .insideBtn{
          width: 80%;
          height: 100%;
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 4px;
          border: 1px solid #EAD28E;
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          .btn_txt{
            margin-left: 5px;
          }
        }
      }
      .comingsoon {
        cursor: pointer;
        width: 50%;
        height: 40px;
        .insideBtn{
          width: 80%;
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          .btn_txt{
            margin-left: 5px;
          }
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
          height: 0.4rem;
        }
        .comingsoon {
          height: 0.4rem;
        }
      }
    }
  }
}
</style>
