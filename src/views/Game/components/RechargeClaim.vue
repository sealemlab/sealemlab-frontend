<template>
  <div class="gamebox">
    <div class="game_title">{{ $t("message.gamepage.text38") }}</div>
    <div class="box1">
      <div>
        <div class="label">{{ $t("message.gamepage.text16") }}</div>
        <div class="content">{{ getLogin.mailAccount | mailEllipsis }}</div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text17") }}</div>
        <div class="content">{{ getLogin.addr | ellipsis }}</div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text18") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="0" disabled />
            <!-- <div class="btn disable" @click="openRecharge">{{ $t("message.gamepage.text19") }}</div> -->
            <div class="btn disable">Coming</div>
          </div>
        </div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text20") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="0" disabled />
            <!-- <div class="btn disable">{{ $t("message.gamepage.text21") }}</div> -->
            <div class="btn disable">Coming</div>
          </div>
          <!-- {{ $t("message.gamepage.text22") }} -->
          <!-- {{ $t("message.gamepage.text13") }} -->
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="box2_title">{{ $t("message.gamepage.text24") }}</div>
      <div class="btns">
        <div @click="isShowRechargeList = false" :class="{ active: !isShowRechargeList }">{{ $t("message.gamepage.text23") }}</div>
        <div @click="isShowRechargeList = true" :class="{ active: isShowRechargeList }">{{ $t("message.gamepage.text19") }}</div>
      </div>
    </div>
    <div class="box3">
      <table v-if="isShowRechargeList">
        <thead>
          <tr>
            <th>{{ $t("message.gamepage.text25") }}</th>
            <th>{{ $t("message.gamepage.text26") }}</th>
            <th>{{ $t("message.gamepage.text27") }}</th>
            <th>{{ $t("message.gamepage.text28") }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" /><span>34</span></div>
            </td>
            <td>{{ $t("message.gamepage.text29") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr> -->
        </tbody>
      </table>
      <table v-else>
        <thead>
          <tr>
            <th>{{ $t("message.gamepage.text25") }}</th>
            <th>{{ $t("message.gamepage.text26") }}</th>
            <th>{{ $t("message.gamepage.text27") }}</th>
            <th>{{ $t("message.gamepage.text28") }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" /><span>34</span></div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <PopupRecharge v-if="isShowRechargePopup"></PopupRecharge>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PopupRecharge from "./PopupRecharge.vue";
export default {
  name: "RechargeClaim",
  components: { PopupRecharge },
  computed: { ...mapGetters(["getLogin"]) },
  data() {
    return {
      isShowRechargePopup: false,
      isShowRechargeList: false,
    };
  },
  created() {
    if (!this.getLogin.loginStatus) this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: this.$t("message.gamepage.text39") }));
  },
  methods: {
    openRecharge() {
      this.isShowRechargePopup = true;
    },
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      const index = value.length;
      return value.slice(0, 6) + "..." + value.slice(index - 4, index);
    },
    mailEllipsis(value) {
      if (!value) return "";
      const index = value.length;
      const index2 = value.indexOf("@");
      return value.slice(0, 2) + "***" + value.slice(index2, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.gamebox {
  width: 100%;
  height: auto;
}
.game_title {
  font-size: 32px;
  font-family: SFCompactDisplay-Heavy, SFCompactDisplay;
  margin-bottom: 30px;
}
.box1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    padding-right: 3rem;
    padding-bottom: 2rem;
    font-size: 24px;
    display: flex;
    align-items: center;
    &:nth-child(even) {
      padding-right: 0;
    }
  }
  .label {
    width: 180px;
  }
  .content {
    font-size: 18px;
    // font-family: SFCompactDisplay-Medium, SFCompactDisplay;
    font-weight: 500;
    display: flex;
    align-items: center;
    .inputbox {
      width: 16rem;
      height: 2rem;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
      border-radius: 8px;
      border: 1px solid #373636;
      position: relative;
      .left {
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        img {
          width: 23px;
          height: 23px;
          margin: 0 5px;
        }
      }
      input {
        width: 100%;
        height: 100%;
        background: none;
        padding: 0 6.5rem 0 3.5rem;
        font-size: 18px;
        color: #ced3d9;
        text-align: right;
      }
      .btn {
        cursor: pointer;
        width: 6rem;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        &.disable {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
          cursor: not-allowed;
        }
        &.comingsoon {
          background: linear-gradient(180deg, #6d6d6d 0%, #464645 100%);
          color: #e0d9d9;
        }
      }
    }
  }
}
.box2 {
  margin-top: 0.3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #242222;
  .box2_title {
    font-size: 26px;
    margin-bottom: 1rem;
  }
  .btns {
    display: flex;
    align-items: center;
    div {
      width: 10rem;
      height: 2.5rem;
      font-size: 22px;
      margin-right: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8f8e8e;
      cursor: pointer;
      &.active {
        color: #edd07e;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
        border-radius: 4px;
        border: 1px solid #373636;
      }
    }
  }
}
.box3 {
  margin: 2rem 0;
  width: 100%;
  height: auto;
  table {
    width: 100%;
    position: relative;
    background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 8px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    overflow: hidden;
    thead {
      width: 100%;
      padding-right: 10px;
      background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
      position: absolute;
      top: 0;
    }
    tbody {
      display: block;
      width: 100%;
      height: 20rem;
      padding-right: 5px;
      margin-top: 3rem;
      overflow-y: auto;
    }
    tr {
      width: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      th {
        width: 25%;
        height: 3rem;
        line-height: 3rem;
        font-size: 24px;
        font-weight: 500;
      }
      td {
        width: 25%;
        padding: 0.5rem 0;
        font-size: 16px;
        // font-family: SFCompactDisplay-Medium, SFCompactDisplay;
        font-weight: 500;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin-left: 0.5rem;
          }
          img {
            width: 23px;
            height: 23px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .game_title {
    font-size: 0.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
  }
  .box1 {
    margin-top: 0.3rem;
    > div {
      width: 100%;
      padding-right: 0;
      padding-bottom: 0.2rem;
      font-size: 0.14rem;
    }
    .label {
      width: 1.5rem;
    }
    .content {
      font-size: 0.12rem;
      .inputbox {
        width: 2rem;
        height: 0.3rem;
        .left {
          img {
            width: 0.2rem;
            height: 0.2rem;
            margin: 0.05rem;
          }
        }
        input {
          font-size: 0.12rem;
          padding: 0 0.65rem 0 0.5rem;
        }
        .btn {
          width: 0.6rem;
          height: 100%;
          font-size: 0.12rem;
        }
      }
    }
  }
  .box2 {
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
    .box2_title {
      font-size: 0.18rem;
      margin-bottom: 0.2rem;
    }
    .btns {
      div {
        width: 1rem;
        height: 0.3rem;
        font-size: 0.14rem;
        margin-right: 0.2rem;
      }
    }
  }
  .box3 {
    margin: 0.2rem 0;
    table {
      thead {
        padding-right: 0.1rem;
      }
      tbody {
        height: 3rem;
        padding-right: 0.05rem;
        margin-top: 0.4rem;
      }
      tr {
        th {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.14rem;
        }
        td {
          padding: 0.1rem 0;
          font-size: 0.12rem;
          div {
            img {
              width: 0.2rem;
              height: 0.2rem;
            }
            span {
              margin-left: 0.05rem;
            }
          }
        }
      }
    }
  }
}
</style>
