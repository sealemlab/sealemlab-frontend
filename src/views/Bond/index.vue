<template>
  <div class="bond_page">
    <div class="box1 font14">
      <div>
        <img :src="`${$store.state.imgUrl}BOND.png`" class="bond_img" />
      </div>
      <ul>
        <li>
          <div class="txt1">{{ $t("message.bond.txt2_1") }}</div>
          <div class="line"></div>
        </li>
        <li>
          <div class="txt1">{{ $t("message.bond.txt2_2") }}</div>
          <div class="line"></div>
        </li>
        <li>
          <div class="txt1">{{ $t("message.bond.txt2_3") }}</div>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <div class="boxs">
      <div class="box2">
        <div class="title">
          <span class="has_question_icon">{{ $t("message.bond.txt1") }}</span>
        </div>
        <div class="box">
          <div class="top">
            <div>
              <span>{{ $t("message.bond.txt3") }}</span>
            </div>
            <div><span>$45678956</span></div>
            <div>
              <span class="link_icon">ST{{ $t("message.bond.txt4") }} </span>
            </div>
            <div><span>$34.78</span></div>
          </div>
          <div class="bottom">
            <ul class="list_title">
              <li>
                <span class="has_question_icon">{{ $t("message.bond.txt1") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt35") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt28") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt36") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt37") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt38") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt39") }}</span>
              </li>
            </ul>
            <ul class="list_title2">
              <li v-for="(item, index) in Arr1" :key="index">
                <span>{{ item.zq }}</span>
                <span>{{ item.zl }}</span>
                <span>{{ item.jclv }}</span>
                <span>{{ item.fjlv }}</span>
                <span>{{ item.lxzq }}</span>
                <span>{{ item.djs }}</span>
                <span>
                  <div class="progressbar"><div :style="{ width: item.gml }"></div></div>
                  {{ item.gml }}
                </span>
                <span>
                  <div class="btn_txt" @click="BondClick(1)">{{ $t("message.bond.txt1") }}</div>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="box3">
        <div class="title">
          <span class="has_question_icon">{{ $t("message.bond.txt5") }}</span>
        </div>
        <div class="box">
          <div class="text1">{{ $t("message.bond.txt40") }}</div>
          <ul class="list_title1">
            <li>
              <ul class="list_title2">
                <li>
                  <span class="has_question_icon">{{ $t("message.bond.txt28") }}</span>
                </li>
                <li></li>
                <li class="round_progressbar">
                  <div class="circle-two">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">LV1</div>
                  </div>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt41") }}1%</span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt42") }}LV2 </span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt43") }} $300</span>
                </li>
              </ul>
            </li>
            <li>
              <!-- <ul class="list_title2 coming_soon"> -->
              <ul class="list_title2">
                <li>
                  <span class="has_question_icon">{{ $t("message.bond.txt30") }}</span>
                </li>
                <li>
                  <div class="btn_txt">{{ $t("message.bond.txt44") }}</div>
                </li>
                <li class="round_progressbar">
                  <div class="circle-two">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">LV7</div>
                  </div>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt41") }}1.8%</span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt42") }}LV8 </span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt45") }} $300</span>
                </li>
                <li>
                  <div><span>></span></div>
                  <div>{{ $t("message.bond.txt46") }}2022/08/30</div>
                </li>
              </ul>
            </li>
            <li>
              <ul class="list_title2">
                <li>
                  <span class="has_question_icon">{{ $t("message.bond.txt29") }}</span>
                </li>
                <li>
                  <div class="btn_txt">{{ $t("message.bond.txt44") }}</div>
                </li>
                <li class="round_progressbar">
                  <div class="circle-two">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">LV1</div>
                  </div>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt41") }}1%</span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt42") }}LV2 </span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt47") }} $300</span>
                </li>
              </ul>
            </li>
            <li>
              <ul class="list_title2">
                <li>
                  <span class="has_question_icon">{{ $t("message.bond.txt31") }}</span>
                </li>
                <li>
                  <div class="btn_txt">{{ $t("message.bond.txt48") }}</div>
                </li>
                <li class="round_progressbar">
                  <div class="circle-two">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">LV1</div>
                  </div>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt41") }}1%</span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt42") }}LV2 </span>
                </li>
                <li>
                  <span>{{ $t("message.bond.txt49") }} $300</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="text2">
            <p>{{ $t("message.bond.txt50") }}</p>
            <p>{{ $t("message.bond.txt51") }}</p>
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="title">
          <span>{{ $t("message.bond.txt8") }}</span>
        </div>
        <div class="box">
          <div class="top">
            <div>
              <span class="has_question_icon">{{ $t("message.bond.txt52") }}</span>
            </div>
            <div><span>34.4569 ST</span></div>
            <div>
              <span>{{ $t("message.bond.txt53") }} </span>
            </div>
            <div><span>34.4569 ST</span></div>
            <div>
              <div class="btn_txt" @click="BondClick(1)">{{ $t("message.bond.txt54") }}</div>
            </div>
            <div class="his">
              <span>{{ $t("message.bond.txt55") }}</span>
            </div>
          </div>
          <div class="bottom">
            <ul class="list_title">
              <li>
                <span class="has_question_icon">{{ $t("message.bond.txt1") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt56") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt28") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt57") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt58") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt59") }}</span>
              </li>
            </ul>
            <ul class="list_title2">
              <li v-for="(item, index) in Arr2" :key="index">
                <span>{{ item.zq }}</span>
                <span class="has_select">
                  {{ item.gme }}
                  <div class="small_angle">＞</div>
                  <ul class="has_select_list">
                    <li v-for="(i, ind) in list1" :key="ind">{{ i }}</li>
                  </ul>
                </span>
                <span>{{ item.jclv }}</span>
                <span>{{ item.fjlv }}</span>
                <span>{{ item.yjklq }}</span>
                <span>{{ item.djs }}</span>
              </li>
            </ul>
          </div>
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
      showSelect: false,
      Arr1: [
        {
          zq: "ST-BUSD",
          zl: "4000",
          jclv: "1%",
          fjlv: "1%+4%+2%",
          lxzq: "14",
          djs: "13:11:23:45",
          gml: "60%",
        },
      ],
      Arr2: [
        {
          zq: "ST-BUSD",
          gme: "$ 240",
          jclv: "1%",
          fjlv: "1%+4%+2%",
          yjklq: "$280",
          djs: "13:11:23:45",
        },
        {
          zq: "ST-BUSD",
          gme: "$ 240",
          jclv: "1%",
          fjlv: "1%+4%+2%",
          yjklq: "$280",
          djs: "待领取",
        },
      ],
      list1: ["$ 20*12", "$ 40*12"],
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
    top: 0;
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
.btn_txt {
  width: 100px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  font-size: 12px;
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
.small_angle {
  display: inline-block;
  width: fit-content;
  height: fit-content;
  font-size: 12px;
  color: #a9a7a7;
  transform: rotate(90deg);
}
.round_progressbar {
  .circle-two {
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 50%;
    background: #979797;
    .circle-two-l {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      clip: rect(0, 50px, auto, 0);
      &::after {
        content: " ";
        background: #edd07e;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        clip: rect(0, 50px, auto, 0);
        transform: rotate(-180deg);
        animation: circle_two_l linear 2s 2s forwards;
      }
    }
    .circle-two-r {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      clip: rect(0, auto, auto, 50px);
      &::after {
        content: " ";
        background: #edd07e;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        clip: rect(0, auto, auto, 50px);
        transform: rotate(-180deg);
        animation: circle_two_r linear 2s forwards;
      }
    }
    .circle-two-mask {
      width: 95%;
      height: 95%;
      background: #000;
      border-radius: 50%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 600;
      color: #fef1cd;
      line-height: 30px;
    }
  }
}
@keyframes circle_two_l {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-180deg);
  }
}
@keyframes circle_two_r {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}
.bond_page {
  margin-top: 80px;
  width: 100%;
  height: auto;
  // background: url($bg_url + "newbondbg.png") no-repeat;
  // background-size: 100% auto;
}
.box1 {
  width: 100%;
  height: 300px;
  padding: 80px 0 0 100px;
  background: url($bg_url + "newbondbg.png") no-repeat;
  background-size: 100% 100%;
  .bond_img {
    width: 156px;
    height: 42px;
  }
  ul {
    display: flex;
    align-items: center;
    margin-top: 50px;
    li {
      width: 200px;
      height: 60px;
      background: rgba(163, 159, 148, 0.23);
      border-radius: 14px;
      text-align: center;
      margin-right: 20px;
      .txt1 {
        width: 100%;
        height: calc(100% - 4px);
        padding: 10px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .line {
        width: 50%;
        height: 4px;
        margin: 0 auto;
        background: #f0ce75;
        border-radius: 2px;
      }
    }
  }
}
.boxs {
  width: 1200px;
  background: #101010;
  padding: 20px;
  margin: 0 auto;
  .title {
    font-size: 30px;
    font-weight: 600;
    color: #ffffff;
    line-height: 42px;
    margin-bottom: 20px;
  }
  .box {
    width: 100%;
    height: auto;
    background: #000000;
    padding: 10px 0;
  }
}
.box2 {
  padding: 20px 0;
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #242222;
    padding: 20px;
    > div {
      width: calc(100% / 4);
      font-size: 24px;
      font-weight: 600;
      color: #eccf83;
      line-height: 33px;
    }
  }
  .bottom {
    width: 100%;
    padding: 10px 20px;
    .list_title {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      line-height: 28px;
      padding: 10px 0;
      li {
        width: calc(100% / 8);
      }
    }
    .list_title2 {
      font-size: 16px;
      font-weight: 600;
      color: #a9a7a7;
      line-height: 22px;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
        > span {
          width: calc(100% / 8);
        }
      }
    }
  }
}
.box3 {
  padding: 20px 0;
  .box {
    padding: 40px 20px;
    position: relative;
  }
  .text1 {
    font-size: 10px;
    font-weight: 400;
    color: #b79d53;
    line-height: 14px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .list_title1 {
    display: flex;
    justify-content: space-between;
    > li {
      width: 20%;
      padding: 30px 0;
      .list_title2 {
        &.coming_soon {
          .round_progressbar {
            .circle-two {
              background: #666363;
              .circle-two-l {
                &::after {
                  background: #d6d2d2;
                }
              }
              .circle-two-r {
                &::after {
                  background: #d6d2d2;
                }
              }
              .circle-two-mask {
                background: rgba(71, 71, 69, 1);
                color: #8a8a8a;
              }
            }
          }
          li {
            &:nth-child(4) {
              color: #8a8a8a;
            }
            &:nth-child(5),
            &:nth-child(6) {
              color: #8a8a8a;
            }
            &:nth-child(7) {
              div {
                &:nth-child(1) {
                  color: #8a8a8a;
                }
                &:nth-child(2) {
                  color: #8a8a8a;
                }
              }
            }
          }
        }
        li {
          margin-bottom: 10px;
          &:nth-child(1) {
            font-size: 24px;
            font-weight: 600;
            color: #eccf83;
            line-height: 33px;
          }
          &:nth-child(2) {
            height: 25px;
            .btn_txt {
              width: 78px;
              height: 25px;
              line-height: 25px;
              font-size: 10px;
              margin: 0;
            }
          }
          &:nth-child(3) {
            padding: 20px 0;
          }
          &:nth-child(4) {
            font-size: 18px;
            font-weight: 600;
            color: #edd07e;
          }
          &:nth-child(5),
          &:nth-child(6) {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
          }
          &:nth-child(7) {
            position: relative;
            padding-top: 30px;
            div {
              &:nth-child(1) {
                font-size: 20px;
                color: #bababa;
                transform: rotate(90deg);
                position: absolute;
                left: 50px;
                top: 0;
              }
              &:nth-child(2) {
                font-size: 12px;
                font-weight: 500;
                color: #bababa;
                line-height: 17px;
              }
            }
          }
        }
      }
    }
  }
  .text2 {
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #909090;
    line-height: 17px;
  }
}
.box4 {
  padding: 20px 0;
  .box {
    padding: 0 20px;
  }
  .top {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #242222;
    padding: 40px 0;
    > div {
      width: calc(100% / 5);
      font-size: 24px;
      font-weight: 600;
      color: #eccf83;
      line-height: 33px;
    }
    .his {
      width: fit-content;
      font-size: 12px;
      font-weight: 400;
      color: #a9a7a7;
      line-height: 17px;
      position: absolute;
      right: 0;
      top: 10px;
      cursor: pointer;
      &:hover {
        color: #eccf83;
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 10px 0;
    .list_title {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      line-height: 28px;
      padding: 10px 0;
      li {
        width: calc(100% / 6);
      }
    }
    .list_title2 {
      font-size: 16px;
      font-weight: 600;
      color: #a9a7a7;
      line-height: 22px;
      li {
        width: 100%;
        display: flex;
        padding: 10px 0;
        > span {
          width: calc(100% / 6);
        }
      }
    }
  }
}
</style>
