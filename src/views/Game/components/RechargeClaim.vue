<template>
  <div class="gamebox">
    <div class="game_title font32" :class="isEnLang?'en_heavy':''">{{ $t("message.gamepage.text38") }}</div>
    <div class="box1" :class="isEnLang?'en_Bold':''">
      <div>
        <div class="label">{{ $t("message.gamepage.text16") }}</div>
        <div class="content">{{ getLogin.mailAccount | mailEllipsis }}</div>
      </div>
      <div>
        <div class="label">{{ $t("message.gamepage.text17") }}</div>
        <div class="content">{{ getLogin.addr | ellipsis }}</div>
      </div>
    </div>
    <!-- 用户sr余额 可提取sr 冻结sr -->
    <div class="add_box1" :class="isEnLang?'en_Bold':''">
      <!-- Wallet Balance -->
      <div>
        <div class="label">{{ $t("message.gamepage.text18") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <div class="balance">{{getUserCoin.busd | PriceConversion}}</div>
            <div class="btn" @click="openRecharge">{{ $t("message.gamepage.text19") }}</div>
            <!-- <div class="btn disable">Coming</div> -->
          </div>
        </div>
      </div>
      <!-- Claimable -->
      <div>
        <div class="label">{{ $t("message.gamepage.text20") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="0" disabled />
            <div class="btn">{{ $t("message.gamepage.text21") }}</div>
            <!-- <div class="btn disable">Coming</div> -->
          </div>
          <!-- {{ $t("message.gamepage.text22") }} -->
          <!-- {{ $t("message.gamepage.text13") }} -->
        </div>
      </div>
      <!-- Locked -->
      <div>
        <div class="label">{{ $t("message.gamepage.txt20_1") }}</div>
        <div class="content">
          <div class="inputbox">
            <div class="left">
              <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
              <span>SR</span>
            </div>
            <input type="number" value="0" class="locked_input" disabled />
          </div>
        </div>
      </div>
    </div>
    <!-- History -->
    <div class="box2 font32">
      <div class="box2_title" :class="isEnLang?'en_heavy':''">{{ $t("message.gamepage.text24") }}</div>
      <div class="btns" :class="isEnLang?'en_Bold':''">
        <!-- claim -->
        <div @click="ClaimFun(true)" :class="{ active: isShowRechargeList }">{{ $t("message.gamepage.text23") }}</div>
        <!-- Recharge -->
        <div @click="ClaimFun(false)" :class="{ active: !isShowRechargeList }">{{ $t("message.gamepage.text19") }}</div>
      </div>
      <div class="btns" :class="isEnLang?'en_medium':''" v-if="isShowRechargeList">
        <div class="_btn" :class="applyHistory?'btn_normal':''" @click="applyHistory = true">{{ $t("message.gamepage.txt40") }}</div>
        <div class="_btn" :class="applyHistory?'':'btn_normal'" @click="applyHistory = false">{{ $t("message.gamepage.txt41") }}</div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="box3">
      <table>
        <thead>
          <tr>
            <th :class="istrue?'thWidth':''">{{ $t("message.gamepage.text25") }}</th>
            <th :class="istrue?'thWidth':''">{{ $t("message.gamepage.text26") }}</th>
            <th :class="istrue?'thWidth':''">{{ $t("message.gamepage.text27") }}</th>
            <th :class="istrue?'thWidth':''" v-if="istrue">{{ $t("message.gamepage.text28") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td :class="istrue?'tdWidth':''">{{item.time}}</td>
            <td :class="istrue?'tdWidth':''">
              <div>
                <img :src="`${$store.state.imgUrl}srlogo.webp`" alt="" />
                <span>{{item.num}}</span>
              </div>
            </td>
            <td :class="istrue?'tdWidth':''" v-if="!item.hash">
              <div class="claim_btn btn_normal font12" :class="isEnLang?'en_Bold':''" v-if="item.status == 1">Claim</div>
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-else-if="item.status == 2">In review</div>
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-else>Review failed</div>
            </td>
            <td :class="istrue?'tdWidth':''" v-if="item.hash">
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-if="item.status == 1">Success</div>
              <div class="claim_txt font16" :class="isEnLang?'en_medium':''" v-if="item.status == 3">Failed</div>
            </td>
            <td :class="istrue?'tdWidth':''" v-if="istrue">
              <div>
                <svg
                  t="1655894703771"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1998"
                  width="16"
                  height="16"
                >
                  <path
                    d="M892 928.1H134c-19.9 0-36-16.1-36-36v-758c0-19.9 16.1-36 36-36h314.1c19.9 0 36 16.1 36 36s-16.1 36-36 36H170v686h686V579.6c0-19.9 16.1-36 36-36s36 16.1 36 36v312.5c0 19.9-16.1 36-36 36z"
                    p-id="1999"
                    fill="#8F8E8E"
                  ></path>
                  <path
                    d="M927.9 131.6v-0.5c-0.1-1.7-0.4-3.3-0.7-4.9 0-0.1 0-0.2-0.1-0.3-0.4-1.7-0.9-3.3-1.5-4.9v-0.1c-0.6-1.6-1.4-3.1-2.2-4.6 0-0.1-0.1-0.1-0.1-0.2-0.8-1.4-1.7-2.8-2.7-4.1-0.1-0.1-0.2-0.3-0.3-0.4-0.5-0.6-0.9-1.1-1.4-1.7 0-0.1-0.1-0.1-0.1-0.2-0.5-0.6-1-1.1-1.6-1.6l-0.4-0.4c-0.5-0.5-1.1-1-1.6-1.5l-0.1-0.1c-0.6-0.5-1.2-1-1.9-1.4-0.1-0.1-0.3-0.2-0.4-0.3-1.4-1-2.8-1.8-4.3-2.6l-0.1-0.1c-1.6-0.8-3.2-1.5-4.9-2-1.6-0.5-3.3-1-5-1.2-0.1 0-0.2 0-0.3-0.1l-2.4-0.3h-0.3c-0.7-0.1-1.3-0.1-2-0.1H640.1c-19.9 0-36 16.1-36 36s16.1 36 36 36h165L487.6 487.6c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5 9.2 0 18.4-3.5 25.5-10.5L856 221v162.8c0 19.9 16.1 36 36 36s36-16.1 36-36V134.1c0-0.8 0-1.7-0.1-2.5z"
                    p-id="2000"
                    fill="#8F8E8E"
                  ></path>
                </svg>
              </div>
            </td>
          </tr>
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
  computed: { 
    ...mapGetters(["getLogin","isEnLang","getUserCoin"]),
    istrue(){
      return !this.isShowRechargeList || !this.applyHistory
    }
  },
  data() {
    return {
      isShowRechargePopup: false,
      isShowRechargeList: true,// calim / recharge
      applyHistory:true,// apply / calim 
      list:[
        {
          time:'2022-12-17 16:23:23',
          num:20,
          status:1,// 1 可提取 2 审核中 3 审核失败
        },
        {
          time:'2022-12-17 16:23:23',
          num:20,
          status:2,// 1 可提取 2 审核中 3 审核失败
        },
        {
          time:'2022-12-17 16:23:23',
          num:20,
          status:3,// 1 可提取 2 审核中 3 审核失败
        },
        {
          time:'2022-12-17 16:23:23',
          num:20,
          status:1,// 1 可提取 2 审核中 3 审核失败
          hash:true
        }
      ]
    };
  },
  created() {
    if (!this.getLogin.loginStatus) this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: this.$t("message.gamepage.text39") }));
  },
  methods: {
    ClaimFun(data){
      this.isShowRechargeList = data
      this.applyHistory = true
    },
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
  margin-bottom: 30px;
}
.box1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    padding-right: 1rem;
    padding-bottom: 2rem;
    font-size: 18px;
    display: flex;
    align-items: center;
    &:nth-child(even) {
      padding-right: 0;
    }
  }
  .label {
    min-width: 200px;
  }
  .content {
    width: calc(100% - 200px);
    font-size: 18px;
    // font-family: SFCompactDisplay-Medium, SFCompactDisplay;
    font-weight: 500;
    display: flex;
    align-items: center;
    .inputbox {
      width: 100%;
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
.add_box1{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 33%;
    padding-right: 1rem;
    padding-bottom: 2rem;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .label {
    min-width: 100px;
  }
  .content {
    width: calc(100% - 100px);
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    .inputbox {
      width: 100%;
      height: 2rem;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
      border-radius: 8px;
      border: 1px solid #373636;
      position: relative;
      display: flex;
      align-items: center;
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
        color: #ced3d9;
        text-align: right;
      }
      .balance{
        width: 100%;
        background: none;
        padding: 0 5.5rem 0 3.5rem;
        font-size: 18px;
        color: #ced3d9;
        text-align: right;
      }
      .locked_input{
        padding: 0 0.8rem 0 3.5rem;
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
  margin-top: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #242222;
  .btns {
    display: flex;
    align-items: center;
    margin-top: 1rem;
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
      border-radius: 4px;
      &.active {
        color: #edd07e;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
        border: 1px solid #373636;
      }
    }
    ._btn{
      color: #CED3D9 ;
      background: linear-gradient(180deg, #6D6D6D 0%, #595858 100%) ;
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
        width: 33%;
        height: 3rem;
        line-height: 3rem;
        font-size: 24px;
        font-weight: 500;
      }
      .thWidth{
        width: 25%;
      }
      td {
        width: 33%;
        padding: 0.5rem 0;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        justify-content: center;
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
        .claim_btn{
          width: 98px;
          height: 34px;
          border-radius: 4px;
          backdrop-filter: blur(14px);
        }
        .claim_txt{
          font-weight: 500;
          color: #CED3D9;
          line-height: 19px;
        }
      }
      .tdWidth{
        width: 25%;
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
      min-width: 1.2rem;
    }
    .content {
      width: calc(100% - 1.2rem);
      font-size: 0.12rem;
      .inputbox {
        width: 100%;
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
