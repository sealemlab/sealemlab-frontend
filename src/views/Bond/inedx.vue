<template>
  <div class="bond_page">
    <div class="bond_introduce">
      <img :src="`${$store.state.imgUrl}newbondbg.png`" class="bond_bg" />
      <div class="txt_box">
        <img :src="`${$store.state.imgUrl}BOND.png`" class="bond_img" />
        <div class="introducebox font14">
          <div class="onebox">
            <span class="txt1">{{ $t("message.bond.txt2_1") }}</span>
          </div>
          <div class="onebox height_">
            <span class="txt1">{{ $t("message.bond.txt2_2") }}</span>
          </div>
          <div class="onebox height_">
            <span class="txt1">{{ $t("message.bond.txt2_3") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 标题 -->
      <div class="layout_box">
        <span class="font30 text_">{{ $t("message.bond.txt1") }}</span>
        <div class="radious font12">?</div>
      </div>
      <!-- 表格 -->
      <div class="container">
        <ul class="title_box font24">
          <li>
            <span class="font_class">{{ $t("message.bond.txt3") }}</span>
          </li>
          <li>
            <span class="font_class">$123456</span>
          </li>
          <li>
            <span class="font_class"></span>
          </li>
          <li>
            <span class="font_class link_icon">ST {{ $t("message.bond.txt4") }}</span>
          </li>
          <li>
            <span class="font_class">$100000</span>
          </li>
        </ul>
        <ul class="list_title_box font20">
          <li>
            <span class="has_question_icon">{{ $t("message.bond.txt1") }}</span>
          </li>
          <li>
            <span>{{ $t("总量") }}</span>
          </li>
          <li>
            <span>{{ $t("基础利率") }}</span>
          </li>
          <li>
            <span>{{ $t("附加利率") }}</span>
          </li>
          <li>
            <span>{{ $t("利息周期") }}</span>
          </li>
          <li>
            <span>{{ $t("倒计时") }}</span>
          </li>
          <li>
            <span>{{ $t("购买率") }}</span>
          </li>
          <!-- <span class="list_font_class">{{$t("message.bond.txt1")}}</span>
          <span class="list_font_class">{{$t("message.bond.txt4")}}</span>
          <span class="list_font_class">{{$t("message.bond.txt5")}}</span>
          <span class="list_font_class">{{$t("message.bond.txt6")}}</span>
          <div class="list_font_class"></div> -->
        </ul>
        <div class="coin_box">
          <div class="alone_box font16" v-for="(item, index) in coinArr" :key="index">
            <!-- <div class="second_box">
              <span class="line_txt">{{ item.title }}</span>
              <div class="line_radious">
                <span class="line_txt">{{ $t("message.bond.txt7") }}</span>
                <img :src="`${$store.state.imgUrl}link.png`" class="link_img" />
              </div>
            </div> -->
            <span class="coin_class">{{ item.zq }}</span>
            <span class="coin_class">{{ item.zl }}</span>
            <span class="coin_class">{{ item.jclv }}</span>
            <span class="coin_class">{{ item.fjlv }}</span>
            <span class="coin_class">{{ item.lxzq }}{{ $t("message.bond.txt19") }}</span>
            <span class="coin_class">{{ item.djs }}</span>
            <span class="coin_class">
              <div class="progressbar"><div :style="{ width: item.gml }"></div></div>
              {{ item.gml }}
            </span>
            <div class="coin_class">
              <span class="btn_txt font12" @click="BondClick(1)">{{ $t("message.bond.txt1") }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 标题 -->
      <div class="layout_box">
        <span class="font30 text_">{{ $t("message.bond.txt8") }}</span>
        <div class="radious font12">?</div>
      </div>
      <!-- 表格外层标题 -->
      <ul class="list_title font24">
        <li>债券总额</li>
        <li>34.4569 ST</li>
        <li>可领取额度</li>
        <li>全部领取</li>
        <li>历史记录</li>
      </ul>
      <!-- 表格内层标题 -->
      <div class="list_title self_calss_list font20">
        <span class="empty_class color_fff">{{ $t("message.bond.txt1") }}</span>
        <span class="empty_class color_fff">{{ $t("message.bond.txt13") }}</span>
        <span class="empty_class color_fff">{{ $t("message.bond.txt14") }}</span>
        <span class="empty_class color_fff">{{ $t("message.bond.txt15") }}</span>
      </div>
      <!-- 表格 -->
      <div class="outbox_">
        <div class="list_title self_class_expecil font16" v-for="(item, index) in list" :key="index">
          <span class="empty_class">{{ item.title }}</span>
          <span class="empty_class">{{ item.price }}</span>
          <span class="empty_class">{{ item.num }}%</span>
          <span class="empty_class">$ {{ item.day }}</span>
        </div>
      </div>
    </div>
    <AddLp :addlpDis="addlpDis" @closeLP="closeLP"></AddLp>
  </div>
</template>

<script>
import AddLp from "./Addlp.vue";
export default {
  components: {
    AddLp,
  },
  data() {
    return {
      addlpDis: false, //一键购买lp弹窗状态
      coinArr: [
        {
          zq: "ST-BNB",
          zl: "4000",
          jclv: "1%",
          fjlv: "1%+4%+2%",
          lxzq: "14",
          djs: "13:11:23:45",
          gml: "60%",
        },
      ],
      list: [
        {
          title: "ST-BNB",
          price: "1234",
          num: 3,
          day: 5,
        },
        {
          title: "ST-BNB",
          price: "1234",
          num: 3,
          day: 5,
        },
      ],
    };
  },
  methods: {
    closeLP() {
      this.addlpDis = false;
    },
    BondClick(data) {
      this.addlpDis = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.has_question_icon {
  position: relative;
  &::after {
    content: "?";
    text-align: center;
    font-size: 10px;
    font-weight: 400;
    color: #a9a7a7;
    line-height: 12px;
    width: 12px;
    height: 12px;
    border: 1px solid #a9a7a7;
    filter: blur(0px);
    border-radius: 50%;
    position: absolute;
    right: -20px;
    top: -5px;
  }
}
.link_icon {
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: url($bg_url + "link.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: -5px;
    right: -20px;
  }
}
.progressbar {
  display: inline-block;
  margin: 5px 0;
  width: 50px;
  height: 4px;
  background: #787775;
  box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
  border-radius: 2px;
  backdrop-filter: blur(14px);
  div {
    height: 100%;
    background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
    border-radius: 2px;
    backdrop-filter: blur(14px);
  }
}
.bond_page {
  width: 100%;
  .bond_introduce {
    width: 100%;
    position: relative;
    .bond_bg {
      width: 100%;
      min-height: 350px;
    }
    .txt_box {
      position: absolute;
      top: 150px;
      left: 0;
      width: 100%;
      padding: 0 5vw;
      display: flex;
      flex-direction: column;
      .bond_img {
        width: 156px;
      }
      .introducebox {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 30px;
        .onebox {
          padding: 10px;
          width: 200px;
          height: 50px;
          background: rgba(248, 229, 186, 0.23);
          border-radius: 14px;
          text-align: center;
          .txt1 {
            font-weight: 600;
            color: #ffffff;
          }
        }
        .height_ {
          line-height: 30px;
          margin-left: 15px;
        }
      }
      .txt2 {
        font-weight: 400;
        color: #ffffff;
        line-height: 19px;
        margin-bottom: 10px;
      }
    }
  }
  .layout_box {
    width: fit-content;
    position: relative;
    margin: 56px 0;
    .text_ {
      font-weight: bold;
      color: #ffffff;
      line-height: 36px;
    }
    .insert {
      font-weight: 600;
      color: #eccf83;
      line-height: 29px;
    }
    .radious {
      position: absolute;
      right: -20px;
      top: 2px;
      width: 14px;
      height: 14px;
      border: 1px solid #a9a7a7;
      filter: blur(0px);
      font-weight: 400;
      color: #a9a7a7;
      line-height: 15px;
      border-radius: 50%;
      text-align: center;
      // transform: scale(0.5);
    }
  }
  .btn_txt {
    display: inline-block;
    width: 98px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    color: #fff;
    background: #373636;
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
    border-radius: 4px;
    backdrop-filter: blur(14px);
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      color: #000000;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
    }
  }
  .bg_color {
    color: #101010;
    background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
  }
  .empty_class {
    display: inline-block;
    min-width: 25%;
    font-weight: 600;
    color: #a9a7a7;
    line-height: 22px;
  }

  .content {
    width: 90vw;
    background: #101010;
    margin: 0 auto;
    padding: 1px 27px 58px 27px;
    .container {
      width: 100%;
      background: #151515;
      display: flex;
      flex-direction: column;
      padding: 28px 31px;
      .title_box {
        width: 100%;
        padding-bottom: 28px;
        border-bottom: 2px solid #242222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 33px;
        li {
          width: 25%;
        }
        .font_class {
          font-weight: 600;
          color: #eccf83;
          line-height: 33px;
        }
      }
      .list_title_box {
        width: 100%;
        display: flex;
        align-items: center;
        li {
          width: calc(100% / 8);
          font-weight: 600;
          color: #ffffff;
          line-height: 24px;
        }
      }
    }
    .coin_box {
      width: 100%;
      display: flex;
      flex-direction: column;
      .alone_box {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 36px;
        .coin_class {
          width: calc(100% / 8);
          font-weight: 600;
          color: #a9a7a7;
          line-height: 22px;
        }
      }
    }
    .list_title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      padding-bottom: 39px;
      border-bottom: 2px solid #242222;
      .txt_ {
        font-weight: 600;
        color: #eccf83;
        line-height: 29px;
      }
    }
    .self_calss_list {
      margin-top: 39px;
      border: none;
    }
    .self_class_expecil {
      border: none;
    }
    .outbox_ {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
