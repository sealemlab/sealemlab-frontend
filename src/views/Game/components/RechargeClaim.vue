<template>
  <div class="gamebox">
    <div class="game_title">Recharge and Claim</div>
    <div class="box1">
      <div>
        <div class="label">{{ $t("message.gamepage.text16") }}</div>
        <div class="content">muyihf@163.com</div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text17") }}</div>
        <div class="content">0x45...6789</div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text18") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="1234567890" disabled />
            <div class="btn" @click="openRecharge">{{ $t("message.gamepage.text19") }}</div>
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
            <input type="number" value="123456789000" disabled />
            <div class="btn">{{ $t("message.gamepage.text21") }}</div>
          </div>

          <!-- {{ $t("message.gamepage.text22") }} -->
          <!-- {{ $t("message.gamepage.text13") }} -->
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="box2_title">{{ $t("message.gamepage.text24") }}</div>
      <div class="btns">
        <div @click="isShowRechargeList = false" :class="{ active: !isShowRechargeList }">Claim</div>
        <div @click="isShowRechargeList = true" :class="{ active: isShowRechargeList }">Recharge</div>
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
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text29") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text29") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text29") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text29") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
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
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>{{ $t("message.gamepage.text30") }}</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PopupRecharge v-if="isShowRechargePopup"></PopupRecharge>
  </div>
</template>

<script>
import PopupRecharge from "./PopupRecharge.vue";
export default {
  name: "RechargeClaim",
  components: { PopupRecharge },
  data() {
    return {
      isShowRechargePopup: false,
      isShowRechargeList: false,
    };
  },
  methods: {
    openRecharge() {
      this.isShowRechargePopup = true;
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
  font-weight: 800;
  color: #ced3d9;
  margin-bottom: 2rem;
}
.box1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    padding-right: 3rem;
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-family: SFCompactDisplay-Bold, SFCompactDisplay;
    font-weight: bold;
    &:nth-child(even) {
      padding-right: 0;
    }
  }
  .content {
    font-size: 18px;
    font-family: SFCompactDisplay-Medium, SFCompactDisplay;
    font-weight: 500;
    color: #ced3d9;
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
        padding: 0 5.5rem 0 3.5rem;
        font-size: 18px;
        font-family: SFCompactDisplay-Bold, SFCompactDisplay;
        font-weight: bold;
        color: #ced3d9;
        text-align: right;
      }
      .btn {
        cursor: pointer;
        width: 5rem;
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
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #000000;
      }
    }
  }
}
.box2 {
  margin-top: 0.3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #242222;
  .box2_title {
    font-size: 32px;
    font-family: SFCompactDisplay-Heavy, SFCompactDisplay;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .btns {
    display: flex;
    align-items: center;
    div {
      width: 10rem;
      height: 2.5rem;
      font-size: 24px;
      font-family: SFCompactDisplay-Bold, SFCompactDisplay;
      font-weight: bold;
      margin-right: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #8f8e8e;
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
      background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
      position: absolute;
      top: 0;
    }
    tbody {
      display: block;
      width: 100%;
      height: 20rem;
      padding-top: 3rem;
      overflow-y: scroll;
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
        font-family: SFCompactDisplay-Bold, SFCompactDisplay;
        font-weight: bold;
      }
      td {
        width: 25%;
        padding: 0.5rem 0;
        font-size: 16px;
        font-family: SFCompactDisplay-Medium, SFCompactDisplay;
        font-weight: 500;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 23px;
            height: 23px;
            margin-right: 0.5rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .gamebox {
    width: 100%;
    height: auto;
    padding-top: 0.3rem;
  }
  .game_title {
    font-size: 26px;
    font-family: SFCompactDisplay-Bold, SFCompactDisplay;
    font-weight: bold;
    text-align: left;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .box1 {
    margin-top: 0.3rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      padding-right: 0;
      padding-bottom: 0.2rem;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content {
      font-size: 12px;
      display: flex;
      align-items: center;
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
          font-size: 12px;
          padding: 0 0.65rem 0 0.5rem;
        }
        .btn {
          width: 0.6rem;
          height: 100%;
          font-size: 12px;
        }
      }
    }
  }
  .box2 {
    margin-top: 0.3rem;
    padding-bottom: 0.2rem;
    border-bottom: 2px solid #242222;
    .box2_title {
      font-size: 20px;
      margin-bottom: 0.2rem;
    }
    .btns {
      div {
        width: 1rem;
        height: 0.3rem;
        font-size: 16px;
        margin-right: 0.2rem;
      }
    }
  }
  .box3 {
    margin: 0.2rem 0;
    table {
      tbody {
        height: 3rem;
        padding-top: 0.4rem;
      }
      tr {
        th {
          height: 0.4rem;
          line-height: 0.4rem;
          padding: 0.1rem 0;
          font-size: 14px;
        }
        td {
          padding: 0.1rem 0;
          font-size: 12px;
          div {
            img {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0.05rem;
            }
          }
        }
      }
    }
  }
}
</style>
