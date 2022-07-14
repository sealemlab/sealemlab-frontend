<template>
  <div class="self_box" :class="{'self_box_center':selfBoxCentr,'self_box_between':selfBoxBetween,'column':isColumn}">
    <div
      class="out_box_one"
      :class="{'out_center':centr,'children_column':isColumn}"
      v-for="(item, index) in nftArr"
      :key="index"
      @click="nftFun(item)"
    >
      <div class="onebox" v-if="item.isnft">
        <div class="box_out_img">
          <img :src="item.src" class="imgcard" /></div>
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
      <div class="bottom_box" v-if="sellPageStatus && !cancleStatus" @click.stop="userBuyFun(item)">
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
              @click.stop="ApproveFun('busd')"
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
              @click.stop="ApproveFun('st')"
              class="btn add_btnn_loading btn_normal font12"
              :class="isEnLang ? 'en_Bold' : ''"
              v-else
            >
              approve<BtnLoading :isloading="stApproveLoading"></BtnLoading>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_box" v-if="cancleStatus" @click.stop="userCancleFun(item)">
        <div class="left_price">
          <span class="span1 fontsize16"
            >{{ item.price | PriceConversion }} {{ item.price_currency }}</span
          >
        </div>
        <div class="btn btn_normal font12" :class="isEnLang ? 'en_Bold' : ''" v-if="showCancle">
          Cancle<BtnLoading :isloading="item.buyloading"></BtnLoading>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSigner,token,market,sn,sb,contract } from 'sealemlab-sdk'
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
    selfBoxBetween:{
      type:Boolean,
      default:false
    },
    isColumn:{
      type:Boolean,
      default:false
    },// 竖的排
    cancleStatus:{
      type:Boolean,
      default:false
    },// 用户取消挂单按钮显示状态
    showCancle:{
      type:Boolean,
      default:true
    },// 用户取消挂单按钮 默认显示 ()
  },
  computed: {
    ...mapGetters(["isEnLang","getAccount",])
  },
  watch:{
    'nftArr': {
      handler: function (newValue) {
        if (newValue.length > 0) {
          if(this.sellPageStatus){
            this.isApproveFunPage() // 是否授权
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data(){
    return {
      busdallLoading:true,// busd总的loading
      stallLoading:true,//st总loading
      busdApproveLoading:false,//busd授权loading
      stApproveLoading:false,// st授权loading
      busdApprove:false,//busd是否授权
      stApprove:false,//st是否授权
    }
  },
  methods:{
    nftFun(item){
      this.$emit("nftFun",item)
    },
    // 判断是否授权
    isApproveFunPage(){
      this.$utils.isApproveFun(this.getAccount,token().BUSD,contract().Market).then(res => {
        // console.log('busd是否授权res: ', res);
        if(res){
          this.busdApprove = true
          this.busdallLoading = false
        }else{
          this.busdApprove = false
          this.busdallLoading = false
        }
      }).catch(() => {
        this.busdApprove = false
        this.busdallLoading = false
      })
      this.$utils.isApproveFun(this.getAccount,token().ST,contract().Market).then(res => {
        // console.log('st是否授权res: ', res); 
        if(res){
          this.stApprove = true
          this.stallLoading = false
        }else{
          this.stApprove = false
          this.stallLoading = false
        }
      }).catch(() => {
        this.stApprove = false
        this.stallLoading = false
      })
    },
    // 去授权
    ApproveFun(data){
      if(data == 'busd'){
        if(this.busdApproveLoading)return
        this.busdApproveLoading = true
        this.$utils.goApproveFun(token().BUSD,contract().Market).then(res => {
          if(res){
            this.busdApprove = true
            this.busdApproveLoading = false
          }else{
            this.busdApprove = false
            this.busdApproveLoading = false
          }
        }).catch(() => {
          this.busdApprove = false
          this.busdApproveLoading = false
        })
      }else if(data == 'st'){
        if(this.stApproveLoading)return
        this.stApproveLoading = true
        this.$utils.goApproveFun(token().ST,contract().Market).then(res => {
          if(res){
            this.stApprove = true
            this.stApproveLoading = false
          }else{
            this.stApprove = false
            this.stApproveLoading = false
          }
        }).catch(() => {
          this.stApprove = false
          this.stApproveLoading = false
        })
      }
    },
    // 用户购买nft或者盒子
    userBuyFun(item){
      console.log("用户购买")
      if(item.buyloading)return
      item.buyloading = true
      if(item.isnft){
        sn().ownerOf(item.nftId).then(res => {
          if(res != contract().Market){
            item.buyloading = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_out'}));
          }else{
            this.sdkBuyFun(item)
          }
        })
      }else{
        sb().ownerOf(item.nftId).then(res => {
          if(res != contract().Market){
            item.buyloading = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_out'}));
          }else{
            this.sdkBuyFun(item)
          }
        })
      }
    },
    // sdk方法买盒子
    sdkBuyFun(item){
      market().connect(getSigner()).buy([item.nft],[item.nftId],localStorage.getItem('Invitee')).then(async res1 => {
        // console.log('用户购买nft或者盒子res: ', res1);
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res1.hash}));
        const etReceipt = await res1.wait();
        if(etReceipt.status == 1){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
          item.buyloading = false
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
        }else{
          item.buyloading = false
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
        }
      }).catch(() => {
        this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
        item.buyloading = false
      })
    },
    // 取消挂单
    userCancleFun(item){
      console.log('取消挂单item: ', item)
      if(item.buyloading)return
      item.buyloading = true
      if(item.isnft){
        sn().ownerOf(item.nftId).then(res => {
          if(res != contract().Market){
            item.buyloading = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_out'}));
          }else{
            market().connect(getSigner()).cancel([item.nft],[item.nftId]).then(async res1 => {
              // console.log('用户批量取消挂单NFTres: ', res1);
              this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res1.hash}));
              const etReceipt = await res1.wait();
              if(etReceipt.status == 1){
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'取消挂单成功'}));
                item.buyloading = false
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
              }else{
                item.buyloading = false
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
              }
            }).catch(() => {
              item.buyloading = false
              this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
            })
          }
        })
      }else{
        sb().ownerOf(item.nftId).then(res => {
          if(res != contract().Market){
            item.buyloading = false
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_out'}));
          }else{
            market().connect(getSigner()).cancel([item.nft],[item.nftId]).then(async res1 => {
              // console.log('用户批量取消挂单NFTres: ', res1);
              this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_txt8','link':res1.hash}));
              const etReceipt = await res1.wait();
              if(etReceipt.status == 1){
                this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'取消挂单成功'}));
                item.buyloading = false
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
              }else{
                item.buyloading = false
                this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
              }
            }).catch(() => {
              item.buyloading = false
              this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt9'}));
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.self_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.self_box_center{
  justify-content: center;
}
.self_box_between{
  justify-content: space-between;
}
.out_center{
  align-items: center;
}
.column{
  flex-direction: column;
  .children_column{
    width: 100%;
    align-items: center;
  }
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
    .huxing_bg_box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      .huxing_img {
        width: 100%;
        min-height: 50px;
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
@media screen and (max-width: 980px) {
  .self_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .out_box_one {
    width: 49%;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.2rem;
    .onebox {
      position: relative;
      cursor: pointer;
      width: 100%;
      max-width: 100%;
      height: 2.6rem;
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
          height: 1.38rem;
        }
      }
      .huxing_bg_box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .huxing_img {
          width: 100%;
          min-height: 0.5rem;
        }
        .huxing_content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.3rem 0.1rem 0.1rem;
          .start {
            position: absolute;
            top: 0.3rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.05rem;
            .span1 {
              font-weight: 800;
              color: #efb045;
              line-height: 0.29rem;
              margin-right: 0.05rem;
            }
            img {
              width: 0.16rem;
            }
          }
          .people_type {
            margin-top: 0.1rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: 0.16rem;
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
                line-height: 0.14rem;
              }
              .box_3d {
                margin-top: 0.05rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                  font-weight: 800;
                  line-height: 0.14rem;
                  transform: scale(0.95);
                  zoom: 0.9;
                }
                .img_3d {
                  width: 0.2rem;
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
          padding: 0.6rem 0.13rem 0;
          span {
            &:nth-child(1) {
              font-weight: bold;
              color: #ced3d9;
              line-height: 0.16rem;
            }
            &:nth-child(2) {
              font-weight: 500;
              color: #ced3d9;
              line-height: 0.14rem;
              margin-top: 0.08rem;
            }
          }
        }
      }
      .select_border {
        position: absolute;
        right: 0;
        top: 0;
        width: 0.16rem;
        height: 0.16rem;
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
      max-width: 100%;
      margin-top: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      background: url($bg_url + "boxs_border.webp") no-repeat;
      background-size: 100% 100%;
      padding: 0.09rem 0.08rem;
      .left_price {
        display: flex;
        align-items: center;
      }
      .btn {
        padding:0.05rem 0.07rem;
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 0.04rem;
        backdrop-filter: blur(14px);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .add_btnn_loading{
        min-width:0.6rem;
        padding:0.05rem;
      }
    }
  }
}
</style>