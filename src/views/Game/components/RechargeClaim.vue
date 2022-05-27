<template>
  <div class="gamebox">
    <div class="box1">
      <div>
        <div class="label">Account</div>
        <div class="content">muyihf@163.com</div>
      </div>
      <div>
        <div class="label">Binding Adress</div>
        <div class="content">0x45...6789</div>
      </div>
      <div>
        <div class="label">Wallet Balance</div>
        <div class="content">
          <div class="inputbox">
            <div>
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="123" disabled />
          </div>
          <div class="btn" @click="openRecharge">Recharge</div>
        </div>
      </div>
      <div>
        <div class="label">Claimable</div>
        <div class="content">
          <div class="inputbox">
            <div>
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="123" disabled />
          </div>
          <div class="btn">Apply</div>
          <!-- In Review -->
          <!-- Claim -->
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="box2_title">Recharge/Claim History</div>
      <div class="btns">
        <div @click="isShowRechargeList = true" :class="{ active: isShowRechargeList }">Recharge</div>
        <div @click="isShowRechargeList = false" :class="{ active: !isShowRechargeList }">Claim</div>
      </div>
    </div>
    <div class="box3">
      <table v-if="isShowRechargeList">
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Tx</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Succeeded</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Succeeded</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Succeeded</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Succeeded</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table v-else>
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Tx</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}link.webp`" alt="" /></div>
            </td>
          </tr>
          <tr>
            <td>2022-12-17 16:23:23</td>
            <td>
              <div><img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />34</div>
            </td>
            <td>Failed</td>
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
.box1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    padding-right: 2rem;
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    font-weight: bold;
  }
  .content {
    display: flex;
    align-items: center;
    .inputbox {
      width: 150px;
      height: 35px;
      position: relative;
      font-size: 18px;
      font-weight: bold;
      margin-right: 1rem;
      > div {
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0.5rem;
        top: 0;
        img {
          width: 23px;
          height: 23px;
          margin-right: 5px;
        }
      }
      input {
        width: 100%;
        height: 100%;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
        border-radius: 8px;
        border: 1px solid #373636;
        padding: 0 15px;
        padding-left: 4rem;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        text-align: right;
      }
    }
    .btn {
      cursor: pointer;
      width: 110px;
      height: 35px;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }
  }
}
.box2 {
  border-bottom: 2px solid #242222;
  padding: 2rem 0;
  .box2_title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .btns {
    display: flex;
    align-items: center;
    div {
      width: 236px;
      height: 54px;
      background: #373636;
      border-radius: 4px;
      backdrop-filter: blur(14px);
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin-right: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.active {
        color: #000000;
        background: #eccf83;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
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
        padding: 1rem 0;
        font-size: 24px;
        font-weight: bold;
      }
      td {
        width: 25%;
        padding: 0.5rem 0;
        font-size: 16px;
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
  }
  .box1 {
    margin-top: 0.6rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      padding-right: 0;
      padding-bottom: 0.2rem;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content {
      display: flex;
      align-items: center;
      .inputbox {
        width: 1.2rem;
        height: 0.35rem;
        font-size: 14px;
        margin-right: 0.1rem;
        > div {
          left: 0.1rem;
          img {
            width: 0.2rem;
            height: 0.2rem;
            margin-right: 0.05rem;
          }
        }
        input {
          font-size: 14px;
          padding: 0 0.05rem;
          padding-left: 0.5rem;
        }
      }
      .btn {
        width: 0.7rem;
        height: 0.35rem;
        font-size: 12px;
      }
    }
  }
  .box2 {
    border-bottom: 2px solid #242222;
    padding: 0.2rem 0;
    .box2_title {
      font-size: 18px;
      margin-bottom: 0.2rem;
    }
    .btns {
      div {
        width: 1.5rem;
        height: 0.35rem;
        font-size: 14px;
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
          padding: 0.1rem 0;
          font-size: 18px;
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
