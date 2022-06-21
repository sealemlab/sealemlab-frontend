<template>
  <div class="self_box" :class="selfBoxCentr?'self_box_center':''">
    <div
      class="out_box_one"
      :class="centr?'out_center':''"
      v-for="(item, index) in nftArr"
      :key="index"
      @click="nftFun(item)"
    >
      <div class="onebox" v-if="item.isnft">
        <div class="out_img"><img :src="item.src" class="imgcard" /></div>
        <div class="huxing_bg_box">
          <img :src="`${$store.state.imgUrl}huxing6.webp`" class="huxing_img" />
          <div class="huxing_content">
            <div class="start">
              <span class="span1 font24">{{ item.stars }}</span>
              <img :src="`${$store.state.imgUrl}start.webp`" />
            </div>
            <div class="people_type">
              <div class="leftimgbox" v-if="item.role == 1">
                <img :src="`${$store.state.imgUrl}type_jds.webp`" />
                <span class="font12">{{ $t("message.nft.txt9") }}</span>
              </div>
              <div class="leftimgbox" v-if="item.role == 2">
                <img :src="`${$store.state.imgUrl}type_cike.webp`" />
                <span class="font12">{{ $t("message.nft.txt11") }}</span>
              </div>
              <div class="leftimgbox" v-if="item.role == 3">
                <img :src="`${$store.state.imgUrl}type_wushi.webp`" />
                <span class="font12">{{ $t("message.nft.txt10") }}</span>
              </div>
              <div class="leftimgbox" v-if="item.role == 4">
                <img :src="`${$store.state.imgUrl}type_zs.webp`" />
                <span class="font12">{{ $t("message.nft.txt8") }}</span>
              </div>
              <div class="leftimgbox">
                <img
                  :src="`${$store.state.imgUrl}power1.webp`"
                  v-if="item.power <= 20"
                />
                <img
                  :src="`${$store.state.imgUrl}power2.webp`"
                  v-else-if="item.power <= 40 && item.power > 20"
                />
                <img
                  :src="`${$store.state.imgUrl}power3.webp`"
                  v-else-if="item.power <= 60 && item.power > 40"
                />
                <img
                  :src="`${$store.state.imgUrl}power4.webp`"
                  v-else-if="item.power <= 80 && item.power > 60"
                />
                <img
                  :src="`${$store.state.imgUrl}power5.webp`"
                  v-else-if="item.power <= 100 && item.power > 80"
                />
                <span class="font12">{{ item.power }}</span>
              </div>
            </div>
            <div class="people_type">
              <div class="left_content">
                <span class="font14 scale_box">
                  {{
                    $t(
                      `message.nft.type${item.role}.suit${item.suit}.position${item.part}`
                    )
                  }}
                </span>
                <div class="box_3d">
                  <span class="font12"># {{ item.nftId }}</span>
                  <img
                    :src="`${$store.state.imgUrl}new_3dimg.webp`"
                    class="img_3d"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="select_border" v-if="item.showSelect">
          <div v-if="item.selectStatus"></div>
        </div>
      </div>
      <div class="onebox" v-else>
        <div class="box_out_img">
          <img :src="item.src" class="imgcard" />
        </div>
        <div class="huxing_bg_box">
          <img :src="`${$store.state.imgUrl}huxing6.webp`" class="huxing_img" />
          <div class="box_id">
            <span class="font14" :class="isEnLang ? 'en_Bold' : ''">{{
              item.title
            }}</span>
            <span class="font12" :class="isEnLang ? 'en_medium' : ''"
              >#{{ item.nftId }}</span
            >
          </div>
        </div>
        <div class="select_border" v-if="item.showSelect">
          <div v-if="item.selectStatus"></div>
        </div>
      </div>
      <div
        class="bottom_box"
        v-if="sellPageStatus"
        @click.stop="userBuyFun(item)"
      >
        <div class="left_price">
          <span class="span1 fontsize16"
            >{{ item.price | PriceConversion }} {{ item.price_currency }}</span
          >
        </div>
        <div v-if="item.price_currency == 'BUSD'">
          <div class="btn add_btnn_loading btn_normal" v-if="busdallLoading">
            <BtnLoading :isloading="true"></BtnLoading>
          </div>
          <div v-else>
            <div
              class="btn btn_normal font12"
              :class="isEnLang ? 'en_Bold' : ''"
              v-if="busdApprove"
            >
              buy<BtnLoading :isloading="item.buyloading"></BtnLoading>
            </div>
            <div
              @click="ApproveFun('busd')"
              class="btn add_btnn_loading btn_normal font12"
              :class="isEnLang ? 'en_Bold' : ''"
              v-else
            >
              approve<BtnLoading :isloading="busdApproveLoading"></BtnLoading>
            </div>
          </div>
        </div>
        <div v-if="item.price_currency == 'ST'">
          <div class="btn add_btnn_loading btn_normal" v-if="stallLoading">
            <BtnLoading :isloading="true"></BtnLoading>
          </div>
          <div v-else>
            <div
              class="btn btn_normal font12"
              :class="isEnLang ? 'en_Bold' : ''"
              v-if="stApprove"
            >
              buy<BtnLoading :isloading="item.buyloading"></BtnLoading>
            </div>
            <div
              @click="ApproveFun('st')"
              class="btn add_btnn_loading btn_normal font12"
              :class="isEnLang ? 'en_Bold' : ''"
              v-else
            >
              approve<BtnLoading :isloading="stApproveLoading"></BtnLoading>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props:{
    nftArr:{
      type:Array,
      default:() => {
        return []
      }
    },
    sellPageStatus:{
      type:Boolean,
      default:false
    },
    centr:{
      type:Boolean,
      default:false
    },
    selfBoxCentr:{
      type:Boolean,
      default:false
    },
  },
  computed: {
    ...mapGetters(["isEnLang"])
  },
  methods:{
    nftFun(item){
      this.$emit("nftFun",item)
    }
  }
}
</script>
<style lang="scss" scoped>
.self_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
}
.self_box_center{
  justify-content: center;
}
.out_center{
  align-items: center;
}
.out_box_one {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .onebox {
    position: relative;
    cursor: pointer;
    width: 100%;
    max-width: 204px;
    height: 292px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url($bg_url + "nftbg6.webp") no-repeat;
    background-size: contain;
    .box_out_img {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .imgcard {
        height: 184px;
      }
    }
    .box_out_img {
      width: 100%;
    }
    .huxing_bg_box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      .huxing_img {
        width: 100%;
      }
      .huxing_content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 47px 13px 10px;
        .start {
          position: absolute;
          top: 42px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 5px;
          .span1 {
            font-weight: 800;
            color: #efb045;
            line-height: 29px;
            margin-right: 5px;
          }
          img {
            width: 24px;
          }
        }
        .people_type {
          margin-top: 7px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 24px;
          }
          .leftimgbox {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .left_content {
            width: 100%;
            display: flex;
            flex-direction: column;
            .scale_box {
              white-space: nowrap;
              zoom: 0.8;
              font-weight: 800;
              line-height: 14px;
            }
            .box_3d {
              margin-top: 5px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                font-weight: 800;
                line-height: 14px;
                transform: scale(0.95);
                zoom: 0.9;
              }
              .img_3d {
                width: 30px;
              }
            }
          }
        }
      }
      .box_id {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 90px 13px 0;
        span {
          &:nth-child(1) {
            font-weight: bold;
            color: #ced3d9;
            line-height: 16px;
          }
          &:nth-child(2) {
            font-weight: 500;
            color: #ced3d9;
            line-height: 14px;
            margin-top: 8px;
          }
        }
      }
    }
    .select_border {
      position: absolute;
      right: 0;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #eccf83;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 50%;
        height: 50%;
        background: #eccf83;
        border-radius: 50%;
      }
    }
  }
  .bottom_box {
    width: 100%;
    max-width: 204px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background: url($bg_url + "boxs_border.webp") no-repeat;
    background-size: 100% 100%;
    padding: 9px 8px;
    .left_price {
      display: flex;
      align-items: center;
    }
    .btn {
      padding:5px 15px;
      box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
      border-radius: 4px;
      backdrop-filter: blur(14px);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .add_btnn_loading{
      min-width:65px;
      padding:5px;
    }
  }
}
</style>