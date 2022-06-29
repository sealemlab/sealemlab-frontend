<template>
  <div class="staking_box">
    <!-- 背景图 -->
    <div class="img_bg font16">
      <img :src="`${$store.state.imgUrl}staking.webp`" class="pc_staking_bg" />
      <img
        :src="`${$store.state.imgUrl}mobile_staking.webp`"
        class="mobile_staking_bg"
      />
      <span
        class="span1 font35 mobile_font22"
        :class="isEnLang ? 'en_heavy' : ''"
        >{{ $t("message.stake.txt30") }}</span
      >
      <span
        class="span2 font16 mobile_font12"
        :class="isEnLang ? 'en_medium' : ''"
        >{{ $t("message.stake.txt31") }}</span
      >
      <a
        href="https://lab-sealem.gitbook.io/sealem-lab/basic/staking"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          class="span3 font14 mobile_font12"
          :class="isEnLang ? 'en_medium' : ''"
          >{{ $t("message.stake.txt32") }}</span
        >
      </a>
    </div>
    <!-- 数据 -->
    <div class="dataBox">
      <div class="onebox" v-for="(item, index) in dataArr" :key="index">
        <span class="font24" :class="isEnLang ? 'en_medium' : ''">{{
          $t(item.title)
        }}</span>
        <span
          class="font35 mobile_font16"
          :class="isEnLang ? 'en_heavy' : ''"
          v-if="index == 1"
        >
          {{ item.num | PriceConversion | Thousandths }} SR
        </span>
        <span
          class="font35 mobile_font16"
          :class="isEnLang ? 'en_heavy' : ''"
          v-else
          >$ {{ item.num | PriceConversion | Thousandths }}</span
        >
      </div>
    </div>
    <div class="staking_content_box">
      <div class="out_onebox">
        <div class="onebox">
          <!-- 池子名字 -->
          <div
            class="label font16 mobile_font14"
            :class="isEnLang ? 'en_Bold' : ''"
          >
            {{ $t("message.stake.txt5") }}
          </div>
          <!-- APY 及 池子数据 -->
          <div class="out_top_box">
            <div class="top_box">
              <div class="top_content">
                <img
                  :src="`${$store.state.imgUrl}new_stlogo.webp`"
                  class="logo_img"
                />
                <div class="right_cen">
                  <span class="font16" :class="isEnLang ? 'en_Bold' : ''">{{
                    $t("message.stake.txt6")
                  }}</span>
                  <span
                    class="font32 mobile_font20"
                    :class="isEnLang ? 'en_Bold' : ''"
                    >{{
                      poolInfo.totalStaked | PriceConversion | Thousandths
                    }}</span
                  >
                  <span class="font12" :class="isEnLang ? 'en_medium' : ''"
                    >≈ $
                    {{
                      (poolInfo.totalStaked * getUserCoin.stPrice)
                        | PriceConversion
                        | Thousandths
                    }}</span
                  >
                </div>
              </div>
              <!-- APY -->
              <div class="line_txt">
                <div class="left">
                  <span
                    v-if="apyStatus"
                    @click="AddQuesFun('message.stake.apy_tip', $event)"
                    class="page_has_question_icon font16 span2"
                    :class="isEnLang ? 'en_Bold' : ''"
                    >APY</span
                  >
                  <span
                    v-if="!apyStatus"
                    @click="AddQuesFun('message.stake.apr_tip', $event)"
                    class="page_has_question_icon font16 span2"
                    :class="isEnLang ? 'en_Bold' : ''"
                    >APR</span
                  >
                  <p>
                    <span></span>
                    <span
                      v-if="apyStatus"
                      class="font16 span3"
                      :class="isEnLang ? 'en_Bold' : ''"
                      >{{ APY | MultiplyBySquare }} %</span
                    >
                    <span
                      v-if="!apyStatus"
                      class="font16 span3"
                      :class="isEnLang ? 'en_Bold' : ''"
                      >{{ APR | PriceConversion }} %</span
                    >
                    <svg
                      @click="changeApy"
                      style="cursor: pointer"
                      t="1656322005289"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="12615"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M96 416h832c0.32 0 0.576-0.192 0.896-0.192a30.656 30.656 0 0 0 30.976-30.976C959.808 384.576 960 384.32 960 384a31.424 31.424 0 0 0-14.912-26.368l-188.48-188.48a30.72 30.72 0 1 0-43.456 43.456L852.544 352H96a32 32 0 0 0 0 64zM928 608h-832c-0.32 0-0.576 0.192-0.896 0.192a30.528 30.528 0 0 0-30.976 30.976C64.192 639.424 64 639.68 64 640c0 11.264 6.144 20.672 14.912 26.368l188.48 188.48a30.72 30.72 0 1 0 43.456-43.456L171.456 672H928a32 32 0 0 0 0-64z"
                        p-id="12616"
                        fill="#8F8E8E"
                      ></path>
                    </svg>
                  </p>
                </div>
                <div class="left right" @click="viewContract">
                  <span class="span1 font12">{{
                    $t("message.stake.txt7")
                  }}</span>
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
              </div>
            </div>
          </div>
          <!-- 用户的st余额 -->
          <div class="coin">
            <div class="left">
              <span class="font14" :class="isEnLang ? 'en_medium' : ''">{{
                $t("message.stake.txt8")
              }}</span>
              <div class="num">
                <img
                  :src="`${$store.state.imgUrl}new_stlogo.webp`"
                  class="coin_img"
                />
                <span
                  class="font20 mobile_font16"
                  :class="isEnLang ? 'en_Bold' : ''"
                  >{{ getUserCoin.st | PriceConversion | Thousandths }}</span
                >
              </div>
              <span
                class="font14 span_money"
                :class="isEnLang ? 'en_medium' : ''"
                >$
                {{
                  (getUserCoin.st * getUserCoin.stPrice)
                    | PriceConversion
                    | Thousandths
                }}</span
              >
            </div>
            <div
              class="btn mobile_font16"
              :class="isEnLang ? 'en_Bold' : ''"
              @click="getST"
            >
              {{ $t("message.stake.txt9") }}
            </div>
          </div>
          <!-- 用户质押st -->
          <div class="coin">
            <div class="left">
              <span class="font14" :class="isEnLang ? 'en_medium' : ''">{{
                $t("message.stake.txt10")
              }}</span>
              <div class="num">
                <img
                  :src="`${$store.state.imgUrl}new_stlogo.webp`"
                  class="coin_img"
                />
                <span
                  class="font20 mobile_font16"
                  :class="isEnLang ? 'en_Bold' : ''"
                  >{{
                    poolInfo.userStaked | PriceConversion | Thousandths
                  }}</span
                >
              </div>
              <span
                class="font14 span_money"
                :class="isEnLang ? 'en_medium' : ''"
                >$
                {{
                  (poolInfo.userStaked * getUserCoin.stPrice)
                    | PriceConversion
                    | Thousandths
                }}</span
              >
            </div>
            <div class="Symbol_btn" v-if="poolInfo.userStaked > 0">
              <svg
                t="1656315671397"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10166"
                width="32"
                height="32"
                @click="btnFun('add')"
              >
                <path
                  d="M896.062469 0h-767.625183C57.771791 0 0.499756 57.272035 0.499756 127.937531v767.625183c0 70.665495 57.272035 127.937531 127.93753 127.93753h767.625183c70.665495 0 127.937531-57.272035 127.937531-127.93753v-767.625183c0-70.665495-57.272035-127.937531-127.937531-127.937531zM831.593948 513.149439c-0.499756 17.391508-15.192582 31.084822-32.684041 31.084822H559.726696c-8.795705 0-15.992191 7.196486-15.992191 15.992191v239.183211c0 17.391508-13.693314 32.184285-31.084822 32.684041-18.091166 0.499756-32.883943-13.993167-32.883944-31.984382V560.226452c0-8.795705-7.196486-15.992191-15.992191-15.992191H224.590337c-17.391508 0-32.184285-13.693314-32.684041-31.084822-0.499756-18.091166 13.993167-32.883943 31.984382-32.883944h239.88287c8.795705 0 15.992191-7.196486 15.992191-15.992191V225.090093c0-17.391508 13.693314-32.184285 31.084822-32.684041 18.091166-0.499756 32.883943 13.993167 32.883944 31.984382v239.88287c0 8.795705 7.196486 15.992191 15.992191 15.992191h239.88287c17.991215 0 32.484139 14.792777 31.984382 32.883944z"
                  p-id="10167"
                  fill="#F7E9B9"
                ></path>
              </svg>
              <svg
                t="1656321953305"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11745"
                width="32"
                height="32"
                @click="btnFun('reduce')"
              >
                <path
                  d="M896.062469 0h-767.625183C57.771791 0 0.499756 57.272035 0.499756 127.937531v767.625183c0 70.665495 57.272035 127.937531 127.93753 127.93753h767.625183c70.665495 0 127.937531-57.272035 127.937531-127.93753v-767.625183c0-70.665495-57.272035-127.937531-127.937531-127.937531zM799.609566 544.234261H223.890678c-17.691362 0-31.984383-14.293021-31.984382-31.984383s14.293021-31.984383 31.984382-31.984383h575.718888c17.691362 0 31.984383 14.293021 31.984382 31.984383s-14.293021 31.984383-31.984382 31.984383z"
                  p-id="11746"
                  fill="#F7E9B9"
                ></path>
              </svg>
            </div>
            <div class="btn" v-else>
              <FunBtn
                :allLoading="allLoading"
                :isapprove="isapprove"
                :approveloading="buy_isloading"
                :isloading="buy_isloading"
                :word="'message.stake.txt1'"
                ref="mychild"
                @sonapprove="sonapprove"
                @dosomething="btnFun('add')"
              />
            </div>
          </div>
          <!-- 质押st得到的sr -->
          <div class="coin">
            <div class="left">
              <span class="font14" :class="isEnLang ? 'en_medium' : ''">{{
                $t("message.stake.txt11")
              }}</span>
              <div class="num mobile_font16">
                <img
                  :src="`${$store.state.imgUrl}new_srlogo.webp`"
                  class="coin_img"
                />
                <BtnLoading :isloading="true" v-if="srLoading"></BtnLoading>
                <span
                  class="font20"
                  :class="isEnLang ? 'en_Bold' : ''"
                  v-else-if="poolInfo.userClaimSR == 0"
                  >0.00</span
                >
                <countTo
                  v-else
                  :decimals="2"
                  :startVal="poolInfo.userClaimSR"
                  :endVal="endValue"
                  :duration="2000"
                ></countTo>
              </div>
              <span
                class="font14 span_money"
                :class="isEnLang ? 'en_medium' : ''"
                >$
                {{
                  (endValue * getUserCoin.srPrice)
                    | PriceConversion
                    | Thousandths
                }}</span
              >
            </div>
            <div
              class="btn mobile_font16 btn_normal"
              :class="isEnLang ? 'en_Bold' : ''"
              @click="ClaimFun"
            >
              {{ $t("message.stake.txt12") }}
              <BtnLoading :isloading="SRBtnLoading"></BtnLoading>
            </div>
          </div>
          <p
            class="font14 mobile_font12 tip_"
            @click="AddQuesFun('message.stake.rate_tip', $event)"
            :class="isEnLang ? 'en_medium' : ''"
          >
            <span class="page_has_question_icon">{{
              $t("message.stake.txt14")
            }}</span>
            <span class="userRate">{{ userTaxRate }}%</span>
          </p>
        </div>
      </div>
      <!-- noData -->
      <div class="out_nodata">
        <div class="onebox" :class="isEnLang ? 'en_Bold' : ''">
          <div
            class="label font16 mobile_font14"
            :class="isEnLang ? 'en_Bold' : ''"
          >
            {{ $t("message.stake.txt5_1") }}
          </div>
          <div class="content_nodata">
            <svg
              t="1656313087586"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4604"
              width="200"
              height="200"
            >
              <path
                d="M102.4 896a409.6 51.2 0 1 0 819.2 0 409.6 51.2 0 1 0-819.2 0Z"
                fill="#8F8E8E"
                opacity=".1"
                p-id="4605"
              ></path>
              <path
                d="M101.376 817.152c0 8.704 6.656 15.36 15.36 15.36s15.36-6.656 15.36-15.36-6.656-15.36-15.36-15.36c-8.192 0-15.36 7.168-15.36 15.36zM921.6 842.752c-15.36 4.096-18.944 7.168-23.04 23.04-4.096-15.36-7.168-18.944-23.04-23.04 15.36-4.096 18.944-7.68 23.04-23.04 4.096 15.36 7.168 18.944 23.04 23.04zM276.48 136.704c-19.456 5.12-23.552 9.216-29.184 29.184-5.12-19.456-9.216-23.552-29.184-29.184 19.456-5.12 23.552-9.216 29.184-29.184 5.632 19.456 9.728 23.552 29.184 29.184zM182.272 765.44c-21.504 5.632-26.112 10.24-31.744 31.744-5.632-21.504-10.24-26.112-31.744-31.744 21.504-5.632 26.112-10.24 31.744-31.744 6.144 21.504 10.752 26.112 31.744 31.744zM215.04 197.12c-39.936 10.24-48.128 18.944-58.88 58.88-10.24-39.936-18.944-48.128-58.88-58.88 39.936-10.24 48.128-18.944 58.88-58.88 10.24 39.424 18.944 48.128 58.88 58.88z"
                fill="#8F8E8E"
                opacity=".5"
                p-id="4606"
              ></path>
              <path
                d="M760.32 473.088v4.608l37.376 35.84 145.92-71.168-131.584 84.48v41.472l20.992-20.48v-0.512l0.512 0.512 20.992 20.48L967.68 430.592v-5.12z"
                fill="#8F8E8E"
                opacity=".2"
                p-id="4607"
              ></path>
              <path
                d="M768 808.96h-35.84v-77.824c0-83.456-48.128-159.232-120.832-196.096 72.704-36.864 120.832-113.152 120.832-196.096V261.12h35.84c8.704 0 15.36-6.656 15.36-15.36s-6.656-15.36-15.36-15.36H256c-8.704 0-15.36 6.656-15.36 15.36s6.656 15.36 15.36 15.36h35.84v77.824c0 83.456 48.128 159.232 120.832 196.096-72.704 36.864-120.832 113.152-120.832 196.096V808.96h-35.84c-8.704 0-15.36 6.656-15.36 15.36s6.656 15.36 15.36 15.36h512c8.704 0 15.36-6.656 15.36-15.36s-6.656-15.36-15.36-15.36z m-445.44 0v-77.824c0-83.456 55.808-158.208 135.68-181.76 6.656-2.048 10.752-7.68 10.752-14.848s-4.608-12.8-10.752-14.848C378.368 496.64 322.56 421.888 322.56 338.944V261.12h378.88v77.824c0 83.456-55.808 158.208-135.68 181.76-6.656 2.048-10.752 7.68-10.752 14.848s4.608 12.8 10.752 14.848c79.872 23.552 135.68 98.304 135.68 181.76v76.8H322.56z"
                fill="#8F8E8E"
                opacity=".5"
                p-id="4608"
              ></path>
              <path
                d="M662.528 701.44H517.12V497.152l38.912-11.264c56.832-16.896 98.304-65.536 108.032-122.368H360.448c9.728 57.344 51.2 105.472 108.032 122.368l38.912 11.264V701.44H361.472c-2.048 9.728-3.072 19.968-3.072 29.696v41.984h307.2v-41.984c0-9.728-1.024-19.968-3.072-29.696z"
                fill="#8F8E8E"
                opacity=".2"
                p-id="4609"
              ></path>
            </svg>
            <span class="font12" :class="isEnLang ? 'en_medium' : ''">{{
              $t("message.stake.txt15")
            }}</span>
          </div>
        </div>
      </div>
      <div class="seize_a_seat"></div>
    </div>
    <Unstake
      :unStakedStatus="unStakedStatus"
      @closeUnstake="closeUnstake"
    ></Unstake>
    <StakedProup
      :totalStaked="poolInfo.totalStaked"
      :rate="rate"
      :APY="APY"
      :openPoolStatus="openPoolStatus"
      :stakedStatus="stakedStatus"
      @close="close"
    ></StakedProup>
    <MessageBox
      ref="mychildAdd"
      :clientX="clientX"
      :clientY="clientY"
      :content="datacontent"
    ></MessageBox>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MessageBox from "@/views/Bond/MessageBox.vue";
import StakedProup from './StakeProup.vue'
import Unstake from './Unstake.vue'
import { stStaking, token, contract, getSigner, stStakingInfo, bondDepository } from 'sealemlab-sdk'
export default {
  computed: { ...mapGetters(["getProduction", "getAccountStatus", "getAccount", "getIsMobile", "getNoticeNum", "isEnLang", "getUserCoin"]), },
  data () {
    return {
      apyStatus: true,
      APY: 0,
      APR: 0,
      userTaxRate: 0,
      endValue: 0,
      openPoolStatus: false,
      srLoading: true,
      SRBtnLoading: false,
      STBtnLoading: false,
      dataArr: [
        { title: "message.stake.txt2", num: 0 },
        { title: "message.stake.txt4", num: 0 },
        { title: "message.stake.txt3", num: 0 },
      ],
      datacontent: '',
      clientX: 0,
      clientY: 0,
      poolInfo: {
        totalStaked: 0,
        userStaked: 0,
        userClaimSR: 0
      },
      allLoading: true,
      buy_isloading: false, // 按钮loading
      isapprove: false, //是否授权
      setIntervalOBJ: null,
      stakedStatus: false,// 质押弹窗
      unStakedStatus: false,// 解除质押弹窗
      userSrYieldTimer: null,
      rate: 0, // 用户的质押利率
      approveTimer: null
    }
  },
  components: {
    MessageBox, StakedProup, Unstake
  },
  watch: {
    'getAccountStatus': {
      handler: function (newValue) {
        if (newValue == -1 || newValue == undefined) {
          this.allLoading = this.srLoading = false
          clearInterval(this.userSrYieldTimer)
        } else if (newValue == 0) {
          this.allLoading = true
          this.getUserInfo()
          this.getCurrencyETFun()
          this.isApproveFun()
        } else if (newValue > 0) {
          // Object.assign(this.poolInfo,{
          //   userStaked: 0,
          //   userClaimSR: 0
          // })
          this.poolInfo.userStaked = 0
          this.poolInfo.userClaimSR = 0
          this.isApproveFun()
          this.allLoading = true
          this.$utils.antiShakeFun(() => {
            this.getUserInfo()
            this.getCurrencyETFun()
          }, 2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    changeApy () {
      this.apyStatus = !this.apyStatus
    },
    btnFun (data) {
      if (data == 'add') {
        this.stakedStatus = true
      } else if (data == 'reduce') {
        this.unStakedStatus = true
      }
    },
    close (data) {
      if (data) {
        this.getUserInfo()
        this.getSdkInfo()
        this.getCurrencyETFun()
      }
      this.stakedStatus = false
    },
    closeUnstake (data) {
      if (data) {
        this.getUserInfo()
        this.getSdkInfo()
        this.getCurrencyETFun()
      }
      this.unStakedStatus = false
    },
    // 判断授权
    isApproveFun () {
      clearInterval(this.approveTimer)
      this.approveTimer = setInterval(() => {
        if (this.$refs.mychild) {
          clearInterval(this.approveTimer)
          this.$refs.mychild.isApproveFun(token().ST, contract().STStaking).then((res) => {
            // console.log('是否授权res: ', res);
            if (res) {
              this.isapprove = true;
            } else {
              this.isapprove = false;
            }
            this.allLoading = false
          }).catch(() => {
            this.isapprove = this.allLoading = false
          })
        }
        // console.log("判断授权函数",this.$refs.mychild)
      }, 1000)
    },
    // 去授权
    sonapprove () {
      if (this.allLoading) return
      if (this.buy_isloading) return;
      this.buy_isloading = true;
      this.$refs.mychild.goApproveFun(token().ST, contract().STStaking)
        .then((res) => {
          // console.log('授权结果res: ', res);
          this.buy_isloading = false;
          if (res) {
            this.isapprove = true;
            // if(!this.getNoticeNum){
            //   this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
            //   this.$store.commit("setNoticeNum",true)
            // }
          } else {
            this.isapprove = false;
          }
          this.allLoading = false
        })
    },
    AddQuesFun (data, e) {
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY + 5
      setTimeout(() => {
        this.$refs.mychildAdd.titleFun()
      }, 400)
    },
    getSdkInfo () {
      // 池子总产出
      stStaking().srPerBlock().then(res => {
        // console.log('池子总产出res: ', res);
        this.dataArr[1].num = res / 1e18 * 28800
      })
      // 获取池子是否已开启
      stStaking().openStatus().then(res => {
        this.openPoolStatus = res
      })
      // 获取质押池APR（年度百分比利率），已经乘了100，所以只需要在返回结果后面加上百分号%
      console.log('this.getUserCoin.stPrice, this.getUserCoin.srPrice): ', this.getUserCoin, this.getUserCoin.srPrice);
      stStakingInfo.getApr(this.getUserCoin.stPrice,this.getUserCoin.srPrice).then(res => {
        if(isNaN(res)){
          this.APR = 'Infinity'
          this.APY = 'Infinity'
        }else{
          this.APR = res
          console.log('合约直接返回Apr::::', res);
          this.APY = Math.pow((1 + res / 100 / 365), 365) - 1
          console.log('算出来的ApY::::', this.APY);
        }
      }).catch(() => {
        this.APY = 0
        this.APR = 0
      })
      // 获取池子总质押ST数量
      stStaking().stakedST().then(res => {
        // console.log('获取池子总质押ST数量: ', res);
        this.dataArr[0].num = res / 1e18 * this.getUserCoin.stPrice
        this.poolInfo.totalStaked = this.$utils.convertBigNumberToNormal(Number(res), 0, 18, true)
      })
    },
    getUserInfo () {
      // 获取某用户的质押的ST数量
      stStaking().userStakedST(this.getAccount).then(res => {
        if (res / 1e18 < 1e-8) {
          this.poolInfo.userStaked = 0
        } else {
          this.poolInfo.userStaked = this.$utils.convertBigNumberToNormal(Number(res), 0, 18, true)
        }
      })

      // 获取用户总SR奖励数量（已提取+可提取）
      stStaking().getTokenTotalRewards(this.getAccount).then(res => {
        // console.log('获取用户总SR奖励数量（已提取+可提取）: ', res);
        this.dataArr[2].num = res / 1e18 * this.getUserCoin.srPrice
      })

      // 获取用户提现时要扣的税率
      stStaking().getUserTaxRate(this.getAccount).then(res => {
        console.log('获取用户提现时要扣的税率 ', res);
        this.userTaxRate = res / 100
      })

      // 获取某用户的质押利率等级信息
      bondDepository().getUserStakeLevelInfo(this.getAccount).then(res => {
        // console.log('质押利率res1: ', res);
        this.rate = Number(res[0]) / 1e4
      })
    },
    // 实时刷新可提取的sr数量
    getCurrencyETFun () {
      // console.log("实时获取sr产量函数")
      clearInterval(this.userSrYieldTimer)
      this.userSrYieldTimer = setInterval(() => {
        stStaking().getTokenRewards(this.getAccount).then(res => {
          // console.log('获取用户可提取SR数量', Number(res / 1e18));
          if (res / 1e18 < 1e-8) {
            this.poolInfo.userClaimSR = 0
            this.srLoading = false
          } else {
            let nums = this.$utils.convertBigNumberToNormal(Number(res), 2)
            this.poolInfo.userClaimSR = this.endValue
            this.endValue = Number(nums)
            // console.log('this.endValue: ', this.endValue);
            this.srLoading = false
          }
          if (this.endValue != 0 && this.poolInfo.userStaked == 0) {
            let nums = this.$utils.convertBigNumberToNormal(Number(res), 2)
            this.poolInfo.userClaimSR = this.endValue
            this.endValue = Number(nums)
            // console.log('清空定时器this.endValue: ', this.endValue);
            clearInterval(this.userSrYieldTimer)
          }
        })
      }, 3000)
    },
    ClaimFun () {
      if (this.poolInfo.userClaimSR == 0 && this.endValue == 0) return
      if (this.SRBtnLoading) return
      this.SRBtnLoading = true
      stStaking().connect(getSigner()).harvestToken().then(async res => {
        // console.log('res: ', res);
        this.$store.commit("setProupStatus", JSON.stringify({ 'status': true, 'isProgress': false, 'title': 'message.stake.txt_claim', 'link': res.hash }));
        const etReceipt = await res.wait();
        if (etReceipt.status == 1) {
          this.$store.dispatch("setProgressInfo", JSON.stringify({ 'value': 100, 'title': 'message.tip.self_txt7' }));
          this.SRBtnLoading = false
          this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.stake.txt22' }));
          this.getCurrencyETFun()
        } else {
          this.SRBtnLoading = false
        }
      }).catch(() => {
        this.SRBtnLoading = false
      })
    },
    getST () {
      window.open(`https://pancakeswap.finance/swap?outputCurrency=${token().ST}`)
    },
    viewContract () {
      window.open(`${this.$store.state.BSC_BROWSER}address/${contract().STStaking}`)
    }
  },
  mounted () {
    this.getSdkInfo()
  },
  destroyed () {
    clearInterval(this.userSrYieldTimer)
  },
}
</script>
<style lang="scss" scoped>
.staking_box {
  width: 100vw;
  padding-bottom: 40px;
  .img_bg {
    width: 100%;
    position: relative;
    .pc_staking_bg {
      width: 100%;
      min-height: 350px;
    }
    .mobile_staking_bg {
      display: none;
    }
    .span1 {
      position: absolute;
      left: 5vw;
      top: 25%;
      font-weight: 800;
      color: #ffffff;
      line-height: 41px;
      background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .span2 {
      position: absolute;
      left: 5vw;
      top: 45%;
      max-width: 40vw;
      font-weight: 500;
      color: #ced3d9;
      line-height: 22px;
    }
    .span3 {
      position: absolute;
      left: 5vw;
      top: 66%;
      font-weight: 500;
      color: #eccf83;
      cursor: pointer;
      line-height: 16px;
    }
  }
  .dataBox {
    width: 90vw;
    margin: 0 auto;
    margin-top: 95px;
    height: 181px;
    background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .onebox {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:nth-child(1) {
          font-weight: 500;
          color: #ced3d9;
          line-height: 22px;
        }
        &:nth-child(2) {
          font-weight: 800;
          color: #ced3d9;
          line-height: 41px;
          margin-top: 25px;
        }
      }
    }
  }
  .staking_content_box {
    width: 90vw;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .out_onebox {
      width: 344px;
      // height: 539px;
      padding: 2px;
      border-radius: 12px;
      background: linear-gradient(
        135deg,
        rgba(149, 127, 93, 0.19) 0%,
        rgba(226, 202, 169, 0.58) 46%,
        rgba(237, 213, 180, 0.13) 68%,
        rgba(131, 102, 77, 0.21) 100%
      );
      .onebox {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        padding: 0 8px;
        background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
        display: flex;
        flex-direction: column;
        .label {
          width: 135px;
          height: 31px;
          background: linear-gradient(
            311deg,
            rgba(242, 215, 140, 0) 0%,
            #f3da92 100%
          );
          backdrop-filter: blur(0px);
          font-weight: bold;
          color: #111010;
          line-height: 31px;
          text-align: center;
          margin-left: -10px;
        }
        .out_top_box {
          width: 100%;
          height: 136px;
          margin-top: 13px;
          border-radius: 5px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            rgba(234, 206, 129, 0.16) 0%,
            #d4ba74 53%,
            rgba(188, 164, 101, 0.15) 100%
          );
          .top_box {
            width: 100%;
            height: 100%;
            background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
            border-radius: 5px;
            padding: 11px 10px;
            .top_content {
              display: flex;
              align-items: center;
              justify-content: center;
              .logo_img {
                width: 66px;
                margin-right: 36px;
              }
              .right_cen {
                display: flex;
                flex-direction: column;
                font-weight: bold;
                color: #ced3d9;
                line-height: 22px;
                span {
                  &:nth-child(2) {
                    margin: 8px 0;
                  }
                  &:nth-child(3) {
                    font-weight: 500;
                  }
                }
              }
            }
            .line_txt {
              width: 100%;
              padding: 0 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 5px;
              .left {
                display: flex;
                align-items: center;
                font-weight: bold;
                color: #ced3d9;
                line-height: 22px;
                .span1 {
                  font-weight: 500;
                  color: #8f8e8e;
                  line-height: 22px;
                  margin-right: 3px;
                }
                .span2 {
                  margin-right: 15px;
                }
                .span3 {
                  margin-right: 8px;
                }
                p {
                  display: flex;
                  align-items: center;
                  margin-left: 5px;
                }
              }
              .right {
                cursor: pointer;
              }
            }
          }
        }
        .coin {
          width: 100%;
          display: flex;
          margin-top: 27px;
          padding: 0 14px;
          justify-content: space-between;
          .left {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            color: #ced3d9;
            line-height: 22px;
            .num {
              display: flex;
              align-items: center;
              font-weight: bold;
              color: #ced3d9;
              line-height: 22px;
              margin-top: 5px;
              .coin_img {
                width: 28px;
                margin-right: 3px;
              }
            }
            .span_money {
              color: #8f8e8e;
              margin-top: 5px;
            }
          }
          .btn {
            cursor: pointer;
            width: 130px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            border: 1px solid #918256;
          }
          .Symbol_btn {
            cursor: pointer;
            width: 130px;
            display: flex;
            justify-content: space-between;
          }
        }
        .out_btn {
          cursor: pointer;
          width: 206px;
          min-height: 40px;
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 4px;
          backdrop-filter: blur(14px);
          font-weight: 600;
          color: #0e0d0d;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          margin-top: 34px;
        }
        .tip_ {
          width: 100%;
          padding: 0 14px;
          margin: 12px auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          color: #ced3d9;
          line-height: 22px;
          .userRate {
            width: 130px;
          }
        }
      }
    }
    .out_nodata {
      width: 344px;
      height: 557px;
      padding: 2px;
      border-radius: 12px;
      background: linear-gradient(
        135deg,
        rgba(149, 127, 93, 0.19) 0%,
        rgba(226, 202, 169, 0.58) 46%,
        rgba(237, 213, 180, 0.13) 68%,
        rgba(131, 102, 77, 0.21) 100%
      );
      .onebox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
        .label {
          width: 135px;
          height: 31px;
          background: linear-gradient(
            311deg,
            rgba(151, 150, 145, 0) 0%,
            #3e3e3c 100%
          );
          backdrop-filter: blur(0px);
          font-weight: bold;
          color: #8f8e8e;
          line-height: 31px;
          text-align: center;
          margin-left: -1px;
        }
        .content_nodata {
          width: 100%;
          padding-top: 50px;
          // height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span {
            color: #8f8e8e;
          }
        }
      }
    }
    .seize_a_seat {
      width: 344px;
    }
  }
  .page_has_question_icon {
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      width: 12px;
      height: 12px;
      filter: blur(0px);
      background: url(//cdn.sealemlab.com/sealemlab_assets_test/images/ques_new.webp)
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: -15px;
      top: 0;
    }
  }
}
@media screen and (max-width: 980px) {
  .staking_box {
    width: 100vw;
    padding: 1rem 5vw 0;
    .img_bg {
      width: 100%;
      position: relative;
      .pc_staking_bg {
        display: none;
      }
      .mobile_staking_bg {
        display: block;
        width: 100%;
      }
      .span1 {
        position: absolute;
        left: 5vw;
        top: 4%;
        font-weight: 800;
        color: #ffffff;
        line-height: 0.2rem;
        background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .span2 {
        position: absolute;
        left: 5vw;
        top: 25%;
        max-width: 80vw;
        font-weight: 500;
        color: #ced3d9;
        line-height: 0.15rem;
      }
      .span3 {
        position: absolute;
        left: 5vw;
        top: 75%;
        font-weight: 500;
        color: #eccf83;
        cursor: pointer;
        line-height: 0.12rem;
      }
    }
    .dataBox {
      width: 90vw;
      margin: 0 auto;
      margin-top: 0.48rem;
      height: 0.88rem;
      background: linear-gradient(311deg, #121212 0%, #0c0c0c 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 0.04rem;
      border: 1px solid rgba(68, 67, 67, 0.47);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .onebox {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          &:nth-child(1) {
            font-weight: 500;
            color: #ced3d9;
            line-height: 0.14rem;
          }
          &:nth-child(2) {
            font-weight: 800;
            color: #ced3d9;
            line-height: 0.2rem;
            margin-top: 0.05rem;
          }
        }
      }
    }
    .staking_content_box {
      width: 90vw;
      margin: 0 auto;
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: space-between;
      .out_onebox {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 0.2rem;
        height: auto;
        min-height: 4.2rem;
        padding: 2px;
        border-radius: 0.12rem;
        background: linear-gradient(
          135deg,
          rgba(149, 127, 93, 0.19) 0%,
          rgba(226, 202, 169, 0.58) 46%,
          rgba(237, 213, 180, 0.13) 68%,
          rgba(131, 102, 77, 0.21) 100%
        );
        .onebox {
          width: 100%;
          min-height: 4.2rem;
          border-radius: 0.12rem;
          padding: 0 0.06rem;
          background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
          display: flex;
          flex-direction: column;
          .label {
            width: 0.87rem;
            height: 0.23rem;
            background: linear-gradient(
              311deg,
              rgba(242, 215, 140, 0) 0%,
              #f3da92 100%
            );
            backdrop-filter: blur(0px);
            font-weight: bold;
            color: #111010;
            line-height: 0.23rem;
            text-align: center;
            margin-left: -0.06rem;
          }
          .out_top_box {
            width: 100%;
            height: 1rem;
            margin-top: 0.08rem;
            border-radius: 0.05rem;
            padding: 2px;
            background: linear-gradient(
              135deg,
              rgba(234, 206, 129, 0.16) 0%,
              #d4ba74 53%,
              rgba(188, 164, 101, 0.15) 100%
            );
            .top_box {
              width: 100%;
              height: 100%;
              background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
              border-radius: 0.05rem;
              padding: 0.1rem;
              .top_content {
                display: flex;
                align-items: center;
                justify-content: center;
                .logo_img {
                  width: 0.43rem;
                  margin-right: 0.27rem;
                }
                .right_cen {
                  display: flex;
                  flex-direction: column;
                  font-weight: bold;
                  color: #ced3d9;
                  line-height: 0.12rem;
                  span {
                    &:nth-child(2) {
                      margin: 0.08rem 0;
                    }
                    &:nth-child(3) {
                      font-weight: 500;
                      color: #8f8e8e;
                    }
                  }
                }
              }
              .line_txt {
                width: 100%;
                padding: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 5px;
                .left {
                  display: flex;
                  align-items: center;
                  font-weight: bold;
                  color: #ced3d9;
                  line-height: 22px;
                  .span1 {
                    font-weight: 500;
                    color: #8f8e8e;
                    line-height: 0.22rem;
                    margin-right: 3px;
                  }
                  .span2 {
                    margin-right: 0.19rem;
                  }
                  p {
                    margin-left: 0.05rem;
                  }
                }
              }
            }
          }
          .coin {
            width: 100%;
            display: flex;
            margin-top: 0.25rem;
            padding: 0 0.08rem;
            justify-content: space-between;
            .left {
              display: flex;
              flex-direction: column;
              font-weight: 500;
              color: #ced3d9;
              line-height: 22px;
              .num {
                display: flex;
                align-items: center;
                font-weight: bold;
                color: #ced3d9;
                line-height: 22px;
                margin-top: 5px;
                .coin_img {
                  width: 0.19rem;
                  margin-right: 3px;
                }
              }
            }
            .btn {
              cursor: pointer;
              width: 1.1rem;
              height: 0.3rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0.04rem;
              border: 1px solid #918256;
            }
            .Symbol_btn {
              cursor: pointer;
              width: 1.1rem;
              display: flex;
              justify-content: space-between;
            }
          }
          .out_btn {
            cursor: pointer;
            width: 1.5rem;
            height: 0.26rem;
            box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
            border-radius: 0.04rem;
            backdrop-filter: blur(14px);
            font-weight: 600;
            color: #0e0d0d;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            margin-top: 0.25rem;
          }
          .tip_ {
            width: 100%;
            display: flex;
            padding: 0 0.1rem;
            justify-content: space-between;
            align-items: center;
            font-weight: 500;
            color: #8f8e8e;
            line-height: 0.12rem;
            .userRate {
              width: 1.1rem;
            }
          }
        }
      }
      .out_nodata {
        width: 90%;
        margin: 0 auto;
        height: 4.58rem;
        // min-height: 4.58rem;
        padding: 2px;
        border-radius: 0.12rem;
        background: linear-gradient(
          135deg,
          rgba(149, 127, 93, 0.19) 0%,
          rgba(226, 202, 169, 0.58) 46%,
          rgba(237, 213, 180, 0.13) 68%,
          rgba(131, 102, 77, 0.21) 100%
        );
        .onebox {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          background: linear-gradient(132deg, #0e0e0e 0%, #0b0a0a 100%);
          .label {
            width: 0.87rem;
            height: 0.23rem;
            background: linear-gradient(
              311deg,
              rgba(151, 150, 145, 0) 0%,
              #3e3e3c 100%
            );
            backdrop-filter: blur(0px);
            font-weight: bold;
            color: #8f8e8e;
            line-height: 0.23rem;
            text-align: center;
            margin-left: 0;
          }
          .content_nodata {
            width: 100%;
            padding-top: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              color: #8f8e8e;
            }
          }
        }
      }
      .seize_a_seat {
        display: none;
      }
    }
  }
  .page_has_question_icon {
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      width: 0.1rem;
      height: 0.1rem;
      filter: blur(0px);
      background: url(//cdn.sealemlab.com/sealemlab_assets_test/images/ques_new.webp)
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: -15px;
      top: 0;
    }
  }
}
</style>