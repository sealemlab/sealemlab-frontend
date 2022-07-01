<template>
  <div class="bond_page">
    <!-- 背景图 -->
    <div class="box1 font16">
      <img :src="`${$store.state.imgUrl}newbondbg.webp`" class="pc_bond_bg" />
      <!-- <img :src="`${$store.state.imgUrl}new_bond_bg.webp`" class="mobile_bond_bg" /> -->
      <div>
        <img :src="`${$store.state.imgUrl}BOND.webp`" class="bond_img" />
        <ul :class="isEnLang?'en_medium':''">
          <li>
            <div class="txt1">{{ $t("message.bond.txt2_2") }}</div>
            <!-- <div class="line"></div> -->
          </li>
          <li>
            <div class="txt1">{{ $t("message.bond.txt2_1") }}</div>
            <!-- <div class="line"></div> -->
          </li>
          <li>
            <div class="txt1">{{ $t("message.bond.txt2_3") }}</div>
            <!-- <div class="line"></div> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 债券 -->
    <div class="boxs">
      <div class="box2">
        <div class="title mobile_font20 font32" :class="isEnLang?'en_heavy':''">
          <span>{{ $t("message.bond.txt1") }}</span>
        </div>
        <div class="box">
          <!-- 国库  st价格 -->
          <div class="top mobile_font14 font24" :class="isEnLang?'en_Bold':''">
            <div :title='$t("message.bond.txt71")' style="cursor:pointer" @click="quesFun('message.bond.txt71',$event)">
              <span class="has_question_icon">{{ $t("message.bond.txt3") }}</span>
            </div>
            <div><span>$&nbsp;{{treasuryMoney | PriceConversion}}</span></div>
            <div>
              <span>ST{{ $t("message.bond.txt4") }} </span>
            </div>
            <div><span>$&nbsp;{{getUserCoin.stPrice | PriceConversion(4)}}</span></div>
            <div>
              <span>ST-BUSD LP{{ $t("message.bond.txt4") }} </span>
            </div>
            <div><span>$&nbsp;{{getUserCoin.stlpPrice | PriceConversion(4)}}</span></div>
          </div>
          <!-- 表格 -->
          <div class="bottom">
            <!-- 标题 -->
            <ul class="list_title font20" :class="isEnLang?'en_Bold':''">
              <li>
                <span>{{ $t("message.bond.add_txt1") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt35") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt28") }}</span>
              </li>
              <li :title='$t("message.bond.txt72")' style="cursor:pointer" @click="quesFun('message.bond.txt72',$event)">
                <span class="has_question_icon">{{ $t("message.bond.txt36") }}</span>
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
              <li></li>
            </ul>
            <ul class="list_title2 font16" :class="isEnLang?'en_medium':''">
              <li>
                <span>{{ bondinfo.bondName }}</span>
                <span>{{ bondinfo.maxSupplyLp | PriceConversion }}</span>
                <span>{{ bondinfo.baseRate | SquareRoot}} %</span>
                <span>
                  <span class="color2">{{ bondinfo.additional1 | SquareRoot}}%</span>
                  + 
                  <span class="color3">{{ bondinfo.additional2 | SquareRoot}}%</span>
                  + 
                  <span class="color4">{{ bondinfo.additional3 | SquareRoot}}%</span>
                </span>
                <span>{{ bondinfo.cycle }}&nbsp;{{$t("message.bond.txt19")}}</span>
                <span>
                  {{ bondinfo.countTime.d}}&nbsp;:
                  {{ bondinfo.countTime.h }}&nbsp;:
                  {{ bondinfo.countTime.m }}&nbsp;:
                  {{ bondinfo.countTime.s }}
                </span>
                <span>
                  <div class="progressbar" ref="progressbarRefs">
                    <div :style="{ width: bondinfo.percentage }"></div>
                  </div>
                  {{ bondinfo.purchaseRate | PriceConversion}} %
                </span>
                <span :class="isEnLang?'en_Bold':''">
                  <div class="btn_txt mobile_btn disable_bnb" v-if="(bondinfo.maxSupplyLp == bondinfo.soldLpNum || bondinfo.addtimeobj == 0) && bondStatus" @click="BondClick(false)">{{ $t("message.bond.add_txt_disable_btn") }}</div>
                  <div class="btn_txt mobile_btn bg3" v-else @click="BondClick(true)">{{ $t("message.bond.add_txt_btn") }}</div>
                </span>
              </li>
            </ul>
            <div class="add_btn_txt mobile_font16 disable_bnb" :class="isEnLang?'en_Bold':''"  v-if="(bondinfo.maxSupplyLp == bondinfo.soldLpNum || bondinfo.addtimeobj == 0) && bondStatus" @click="BondClick(false)">{{ $t("message.bond.add_txt_disable_btn") }}</div>
            <div class="add_btn_txt bg3 mobile_font16" :class="isEnLang?'en_Bold':''"  v-else @click="BondClick(true)">{{ $t("message.bond.add_txt_btn") }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 仪表盘 -->
    <div class="boxs">
      <!-- 仪表盘切换 -->
      <div class="add_nav font32 mobile_font16" :class="isEnLang?'en_heavy':''">
        <div :class="dashboard?'color3':''" @click="dashboard = true">{{ $t("message.bond.txt60") }}</div>
        <div :class="dashboard?'':'color3'"  @click="dashboard = false">{{ $t("message.bond.txt61") }}</div>
      </div>
      <!-- 利率 -->
      <div class="box3" v-if="dashboard">
        <div class="title font32 mobile_font16" :class="isEnLang?'en_heavy':''">
          <span>{{ $t("message.bond.txt5") }}</span>
        </div>
        <div class="box">
          <div class="text1 font12" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt40") }}</div>
          <ul class="list_title1">
            <!-- 第一个圆 -->
            <li>
              <ul class="list_title2">
                <li :title='$t("message.bond.txt73")' style="cursor:pointer" @click="quesFun('message.bond.txt73',$event)">
                  <span class="has_question_icon color1 font24 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt28") }}</span>
                </li>
                <li></li>
                <li class="round_progressbar">
                  <circle-progressbar 
                    :id="1" 
                    :widthPresent="0.5"
                    barColor="#C7C7C7" 
                    backgroundColor="#5E5E5E"
                    :radius="6" 
                    :progress="baseInterestRateInfo.num4"
                    :isAnimation="false">
                    <span class="color1" v-if="!newBondID">{{$t("message.tip.txt5")}}</span>
                    <span class="color1" v-else>lv{{baseInterestRateInfo.num2}}</span>
                  </circle-progressbar>
                </li>
                <li>
                  <span class="color1 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }} {{baseInterestRateInfo.num1 | SquareRoot}}%</span>
                </li>
                <li>
                  <span class="color1 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }} LV{{baseInterestRateInfo.num2 + 1}}</span>
                </li>
                <li :class="isEnLang?'en_Bold':''">
                  <span class="color1 font18">{{ $t("message.bond.txt43") }}:</span>
                  <span class="color1 font18">&nbsp;${{baseInterestRateInfo.num3 | PriceConversion}}</span>
                </li>
              </ul>
            </li>
            <!-- 第二个圆 -->
            <li>
              <!-- <ul class="list_title2 coming_soon"> -->
              <ul class="list_title2">
                <li :title='$t("message.bond.txt74")' style="cursor:pointer" @click="quesFun('message.bond.txt74',$event)">
                  <span class="has_question_icon color2 font24 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt30") }}</span>
                </li>
                <li>
                  <div class="btn_txt bg1" @click="inviteFun" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt44") }}</div>
                </li>
                <li class="round_progressbar">
                  <circle-progressbar 
                    :id="2" 
                    :widthPresent="0.5"
                    barColor="#F0E2B8" 
                    backgroundColor="#6F6A59"
                    :radius="6" 
                    :progress="inviteBuy.num4"
                    :isAnimation="false">
                    <span class="color2" v-if="!newBondID">{{$t("message.tip.txt5")}}</span>
                    <span class="color2" v-else>lv{{inviteBuy.num2}}</span>
                  </circle-progressbar>
                </li>
                <li>
                  <span class="color2 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }} {{inviteBuy.num1 | SquareRoot}}%</span>
                </li>
                <li>
                  <span class="color2 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }} LV{{inviteBuy.num2 + 1}}</span>
                </li>
                <!-- <li>
                  <span class="color2 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt45") }}:$ {{inviteBuy.num3}}</span>
                </li> -->
                <li :class="isEnLang?'en_Bold':''">
                  <span class="color2 font18">{{ $t("message.bond.txt45") }}:</span>
                  <span class="color2 font18">&nbsp;${{inviteBuy.num3 | PriceConversion}}</span>
                </li>
                <li>
                  <!-- <div @click="showBox =! showBox"><img :src="`${$store.state.imgUrl}accrow.webp`" alt="" /></div>
                  <div v-if="showBox" class="color2">{{ $t("message.bond.txt46") }} xxxx/xx/xx</div> -->
                </li>
              </ul>
            </li>
            <!-- 第三个圆 -->
            <li>
              <ul class="list_title2">
                <li :title='$t("message.bond.txt75")' style="cursor:pointer" @click="quesFun('message.bond.txt75',$event)">
                  <span class="has_question_icon color3 font24 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt29") }}</span>
                </li>
                <li>
                  <div class="btn_txt bg2" @click="inviteFun" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt44") }}</div>
                </li>
                <li class="round_progressbar">
                  <circle-progressbar 
                    :id="3" 
                    :widthPresent="0.5"
                    barColor="#BB9F5A" 
                    backgroundColor="rgba(187,159,90,0.45)"
                    :radius="6" 
                    :progress="invitePledge.num4"
                    :isAnimation="false">
                    <span class="color3" v-if="!newBondID">{{$t("message.tip.txt5")}}</span>
                    <span class="color3" v-else>lv{{invitePledge.num2}}</span>
                  </circle-progressbar>
                </li>
                <li>
                  <span class="color3 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }} {{invitePledge.num1 | SquareRoot}}%</span>
                </li>
                <li>
                  <span class="color3 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }} LV{{invitePledge.num2 + 1}}</span>
                </li>
                <!-- <li>
                  <span class="color3 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt47") }}:$ {{invitePledge.num3}}</span>
                </li> -->
                <li :class="isEnLang?'en_Bold':''">
                  <span class="color3 font18">{{ $t("message.bond.txt47") }}:</span>
                  <span class="color3 font18">&nbsp;${{invitePledge.num3 | PriceConversion}} (≈ {{invitePledge.num5 | PriceConversion}} ST)</span>
                </li>
              </ul>
            </li>
            <!-- 第四个圆 -->
            <li>
              <ul class="list_title2">
                <li :title='$t("message.bond.txt76")' style="cursor:pointer" @click="quesFun('message.bond.txt76',$event)">
                  <span class="has_question_icon color4 font24 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt31") }}</span>
                </li>
                <li>
                  <div class="btn_txt bg3" :class="isEnLang?'en_Bold':''" @click="toPledge">{{ $t("message.bond.txt48") }}</div>
                </li>
                <li class="round_progressbar">
                  <circle-progressbar 
                    :id="4" 
                    :widthPresent="0.5"
                    barColor="#FFEDBC" 
                    backgroundColor="rgba(187,159,90,0.7)"
                    :radius="6" 
                    :progress="Pledge.num4"
                    :isAnimation="false">
                    <span class="color4" v-if="!newBondID">{{$t("message.tip.txt5")}}</span>
                    <span class="color4" v-else>lv{{Pledge.num2}}</span>
                  </circle-progressbar>
                </li>
                <li>
                  <span class="color4 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }} {{Pledge.num1 | SquareRoot}}%</span>
                </li>
                <li>
                  <span class="color4 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }} LV{{Pledge.num2 + 1}}</span>
                </li>
                <!-- <li>
                  <span class="color4 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt49") }}:$ {{Pledge.num3}}</span>
                </li> -->
                <li :class="isEnLang?'en_Bold':''">
                  <span class="color4 font18">{{ $t("message.bond.txt49") }}:</span>
                  <span class="color4 font18">&nbsp;${{Pledge.num3 | PriceConversion}} (≈ {{Pledge.num5 | PriceConversion}} ST)</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="text2 font12" :class="isEnLang?'en_medium':''">
            <p>{{ $t("message.bond.txt50") }}</p>
            <p>{{ $t("message.bond.txt51") }}</p>
          </div>
        </div>
      </div>
      <!-- 你的债券 -->
      <div class="box4" v-if="dashboard">
        <div class="title mobile_font20 font32" :class="isEnLang?'en_heavy':''">
          <span>{{ $t("message.bond.txt8") }}</span>
        </div>
        <div class="box">
          <div class="top font24" :class="isEnLang?'en_Bold':''">
            <div :title='$t("message.bond.txt77")' style="cursor:pointer" @click="quesFun('message.bond.txt77',$event)">
              <!-- Bond balance -->
              <span class="has_question_icon">{{ $t("message.bond.txt52") }}</span>
            </div>
            <div>
              <!-- 获取用户未提取（包括到期可提取及未到期不可提取）的订单ID数组及总USD金额获取用户未提取（包括到期可提取及未到期不可提取）的订单ID数组及总USD金额获取用户未提取（包括到期可提取及未到期不可提取）的订单ID数组及总USD金额 -->
              <span>$ {{NotExtractedBUSDMoney | PriceConversion }} ( ≈ {{ Not_BUSDchangeST | PriceConversion }} ST)</span>
            </div>
            <div :title='$t("message.bond.txt78")' style="cursor:pointer" @click="quesFun('message.bond.txt78',$event)">
              <!-- Claimable -->
              <span class="has_question_icon">{{ $t("message.bond.txt53") }} </span>
            </div>
            <div>
              <!-- 获取用户可提取的订单ID数组及总USD金额 -->
              <span>$ {{userClaimeMoney | PriceConversion }} ( ≈ {{Ready_BUSDchangeST | PriceConversion }} ST)</span>
            </div>
            <div class="add_btnbox">
              <div class="btn_txt bg3 mobile_btn_es" @click="userClaimSt" :class="isEnLang?'en_Bold':''">
                {{ $t("message.bond.txt54") }}
                <BtnLoading :isloading="claimLoading"></BtnLoading>
              </div>
            </div>
            <div class="his font12" @click="tipFun">
              <span>{{ $t("message.bond.txt55") }}</span>
            </div>
          </div>
          <div class="bottom">
            <ul class="list_title font20" :class="isEnLang?'en_Bold':''">
              <li>
                <span>{{ $t("message.bond.txt1") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt56") }}</span>
                <div v-if="domHeight"></div>
              </li>
              <li>
                <span>{{ $t("message.bond.txt28") }}</span>
              </li>
              <li>
                <span class="has_question_icon"  :title='$t("message.bond.txt_81_ques")' style="cursor:pointer" @click="quesFun('message.bond.txt_81_ques',$event)">{{ $t("message.bond.txt57") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt58") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt59") }}</span>
              </li>
            </ul>
            <ul class="list_title2 font16" :class="isEnLang?'en_medium':''" v-if="orderArr.length > 0">
              <li v-for="(item, index) in orderArr" :key="index">
                <span>{{ item.title }}</span>
                <span class="has_select">
                  <div class="small_angle" @click="showBuy(item)">
                  $ {{ item.buyMoney }}
                    &nbsp;
                    <svg t="1654321191240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2336" width="16" height="16"><path d="M454.188 785.022c-145.192-150.177-290.378-300.353-435.422-450.526-59.842-61.836 37.327-154.021 97.313-91.899 129.23 133.647 258.318 267.296 387.548 400.868 133.646-134.287 267.436-268.574 401.083-402.934 60.84-61.123 158.011 31.060 97.244 91.971-150.105 150.89-300.279 301.703-450.454 452.521-24.933 24.934-72.666 25.575-97.311 0z" p-id="2337" fill="#CED3D9"></path></svg>
                  </div>
                  <div class="add_small_angle" v-if="item.status">
                    <span>$ {{item.lpPrice | PriceConversion}} * {{ item.lpAmount | PriceConversion}}</span>
                  </div>
                </span>
                <span>{{ item.bondRate}} %</span>
                <span class="has_select" v-if="item.personalArr[3] == 3000">
                  <div class="small_angle" @click="showRate(item)">
                    {{ item.personalArr[3] | SquareRoot}}%
                    &nbsp;
                    <svg t="1654321191240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2336" width="16" height="16"><path d="M454.188 785.022c-145.192-150.177-290.378-300.353-435.422-450.526-59.842-61.836 37.327-154.021 97.313-91.899 129.23 133.647 258.318 267.296 387.548 400.868 133.646-134.287 267.436-268.574 401.083-402.934 60.84-61.123 158.011 31.060 97.244 91.971-150.105 150.89-300.279 301.703-450.454 452.521-24.933 24.934-72.666 25.575-97.311 0z" p-id="2337" fill="#CED3D9"></path></svg>
                  </div>
                  <div class="add_small_angle" v-if="item.rateStatus">
                    <span class="color2">{{ item.personalArr[0] | SquareRoot}}%</span> + 
                    <span class="color3">{{ item.personalArr[1] | SquareRoot}}%</span> + 
                    <span class="color4">{{ item.personalArr[2] | SquareRoot}}%</span>
                  </div>
                </span>
                <span v-else>
                  <span class="color2">{{ item.personalArr[0] | SquareRoot}}%</span> + 
                  <span class="color3">{{ item.personalArr[1] | SquareRoot}}%</span> + 
                  <span class="color4">{{ item.personalArr[2] | SquareRoot}}%</span>
                </span>
                <span>$ {{ item.usdPayout | PriceConversion}} (≈ {{item.changeSt | PriceConversion}} ST)</span>
                <span v-if="item.countTime" :class="item.timeFinshed?'color4':''">
                  {{ item.countTime.d}}&nbsp;:
                  {{ item.countTime.h }}&nbsp;:
                  {{ item.countTime.m }}&nbsp;:
                  {{ item.countTime.s }}
                </span>
                <span v-else>
                  00 : 00 : 00 : 00
                </span>
              </li>
            </ul>
            <ul class="list_title2 nodata_add font16" v-if="orderArr.length == 0 && loadMoreStatus">
              <li><LoadingAnmation></LoadingAnmation></li>
            </ul>
            <ul class="list_title2 nodata_add font16" v-if="orderArr.length == 0 && !loadMoreStatus">
              <li>
                <svg t="1653726615818" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="84371" width="200" height="200"><path d="M102.4 634.88h13.824c3.584 0 6.656 3.072 6.656 6.656 0 3.584-3.072 6.656-6.656 6.656H102.4v13.824c0 3.584-3.072 6.656-6.656 6.656-2.048 0-3.584-0.512-4.608-2.048-1.536-1.024-2.048-3.072-2.048-4.608v-13.824h-13.824c-3.584 0-6.656-3.072-6.656-6.656 0-3.584 3.072-6.656 6.656-6.656h13.824v-13.824c0-3.584 3.072-6.656 6.656-6.656 3.584 0 6.656 3.072 6.656 6.656v13.824z m901.12-54.784v-13.824c0-2.048-0.512-3.584-2.048-4.608-1.536-1.024-3.072-2.048-4.608-2.048-3.584 0-6.656 3.072-6.656 6.656v13.824h-13.824c-2.048 0-3.584 0.512-4.608 2.048-1.024 1.536-2.048 3.072-2.048 4.608 0 3.584 3.072 6.656 6.656 6.656h13.824v13.824c0 3.584 3.072 6.656 6.656 6.656 3.584 0 6.656-3.072 6.656-6.656V593.92h13.824c3.584 0 6.656-3.072 6.656-6.656 0-3.584-3.072-6.656-6.656-6.656H1003.52z m-496.128 225.28H163.84a13.98784 13.98784 0 0 1-13.824-13.824c0-7.68 6.144-13.824 13.824-13.824h61.952c-4.608-8.192-7.168-17.92-7.168-27.136V354.816c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h40.96V286.72c0-14.336 5.632-28.16 15.872-38.4s24.064-15.872 38.4-15.872h327.68c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v396.288c0 9.728-2.56 19.456-7.168 27.136H819.2c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-163.84v13.824c0 9.728-2.56 19.456-7.168 27.136h7.168c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-71.68c6.144 10.24 5.12 24.064-4.096 33.28-5.12 5.12-12.288 8.192-19.456 8.192s-14.336-3.072-19.456-8.192l-33.28-34.304z m50.176-27.136h43.52c14.848 0 27.136-12.288 27.136-27.136V354.304c0-14.848-11.776-26.624-26.112-26.624H271.872c-14.336 0-26.112 11.776-26.112 26.624v396.8c0 15.36 12.288 27.136 27.136 27.136h207.36l-7.168-7.168c-7.168-6.656-9.728-16.896-7.168-26.624l-12.8-12.8c-39.936 29.696-96.768 23.552-129.536-14.336-32.768-37.888-30.72-94.72 4.608-130.048 35.328-35.328 92.16-37.888 130.048-4.608 37.888 32.768 44.032 89.6 13.824 129.536l12.8 12.8c9.216-2.56 19.456 0 26.624 7.168l46.08 46.08z m97.792-68.608h40.96c14.848 0 27.136-12.288 27.136-27.136V286.72c0-15.36-12.288-27.136-27.136-27.136H368.64c-14.848 0-27.136 12.288-27.136 27.136v13.824h259.584c14.336 0 28.16 5.632 38.4 15.872s15.872 24.064 15.872 38.4v354.816z m-481.28-501.76h20.48c5.632 0 10.24 4.608 10.24 10.24s-4.608 10.24-10.24 10.24h-20.48v20.48c0 5.632-4.608 10.24-10.24 10.24-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168v-20.48h-20.48c-2.56 0-5.12-1.024-7.168-3.072-2.048-2.048-3.072-4.608-3.072-7.168 0-5.632 4.608-10.24 10.24-10.24h20.48v-20.48c0-5.632 4.608-10.24 10.24-10.24s10.24 4.608 10.24 10.24v20.48z m-160.256 583.68c0-7.68 6.144-13.824 13.824-13.824h81.92c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824h-81.92c-3.584 0-7.168-1.536-9.728-4.096-3.072-2.56-4.096-6.144-4.096-9.728z m430.592-88.064c26.624-26.624 26.624-70.144 0-96.768-26.624-26.624-70.144-26.624-96.768 0-26.624 26.624-26.624 70.144 0 96.768 26.624 26.624 70.144 26.624 96.768 0zM300.544 381.952c0-7.68 6.144-13.824 13.824-13.824h150.016c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.608c0-7.68 6.144-13.824 13.312-13.824H532.48c7.68 0 13.312 6.144 13.312 13.824 0 7.68-6.144 13.824-13.312 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728z m0 68.096c0-7.68 6.144-13.824 13.824-13.824H409.6c7.68 0 13.824 6.144 13.824 13.824 0 7.68-6.144 13.824-13.824 13.824H313.856c-3.584 0-7.168-1.536-9.728-4.096s-3.584-6.144-3.584-9.728zM40.96 436.736c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-18.432 40.96-40.96 40.96z m0-20.48c7.168 0 13.824-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m846.336-61.44c-14.848 0-28.16-7.68-35.328-20.48-7.168-12.8-7.168-28.16 0-40.96s20.992-20.48 35.328-20.48c22.528 0 40.96 18.432 40.96 40.96s-17.92 40.96-40.96 40.96z m0-20.48c7.168 0 14.336-4.096 17.92-10.24 3.584-6.144 3.584-14.336 0-20.48-3.584-6.144-10.24-10.24-17.92-10.24-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48z m0 0" fill="#CDCDCD" p-id="84372"></path></svg>
                NoData
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 附属仪表盘内容 -->
      <div class="dashboard_box" v-if="!dashboard">
        <div class="top font24 mobile_font16" :class="isEnLang?'en_heavy':''">
          <span class="color3">{{ $t("message.bond.txt62") }}</span>
          <span @click="tipFun">{{ $t("message.bond.txt63") }}</span>
        </div>
        <div class="content">
          <div>
            <div class="iconbox_">
              <svg t="1653724466948" class="icon" viewBox="0 0 1107 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36756" width="16" height="16">
                <path d="M563.323289 661.336738a330.663562 330.663562 0 1 0-330.531877-330.663562 331.190306 331.190306 0 0 0 330.531877 330.663562z" fill="#CED3D9" p-id="36757"></path>
                <path d="M1106.528066 975.53955c-16.724123-134.319727-137.611877-293.001365-273.38015-373.066457a381.889419 381.889419 0 0 1-539.912627-0.65843C157.335331 679.246035 18.274908 834.635523 0.365611 975.53955a42.797952 42.797952 0 0 0 37.26714 48.065392h1031.628175A43.061324 43.061324 0 0 0 1106.528066 975.53955z" fill="#CED3D9" p-id="36758"></path>
              </svg>
            </div>
            <div>
              <p class="font18 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt64") }}</p>
              <p class="font12" :class="isEnLang?'en_medium':''">{{inviter}}</p>
            </div>
          </div>
          <div @click="copyClick" class="linkdiv">
            <div class="iconbox_">
              <svg t="1653724606480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8184" width="16" height="16">
                <path d="M599.552 696.832l-1.024 1.024c-1.024 1.024-61.952 50.176-93.696 75.776-41.472 33.28-93.184 48.64-145.92 43.008s-100.352-31.232-133.632-72.704c-69.12-84.992-55.808-210.944 29.696-279.552l99.328-80.896-46.08-57.344-99.328 80.896c-116.736 94.72-134.656 266.752-39.936 383.488 45.568 56.32 111.104 91.648 183.296 99.328 9.728 1.024 19.456 1.536 29.184 1.536 62.464 0 121.856-20.992 171.008-60.928l94.208-76.288-45.568-56.32-1.536-1.024zM856.064 232.96c-94.208-116.224-266.24-134.656-383.488-39.936l-90.112 73.216 46.08 57.344 90.112-73.216c84.992-69.12 210.944-55.808 279.552 29.696 69.12 85.504 55.808 210.944-29.696 279.552l-95.744 77.312-1.024 1.024 46.08 57.344 96.768-78.336c56.832-46.08 92.16-111.104 99.84-183.808 8.192-72.192-12.8-143.36-58.368-200.192z" p-id="8185"  fill="#CED3D9"></path>
                <path d="M388.096 667.648l305.664-254.464 1.024-1.024-47.616-56.32-305.664 254.976-1.024 0.512z" p-id="8186" fill="#CED3D9"></path>
              </svg>
            </div>
            <div class="link_">
              <p class="font18 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt65") }}</p>
              <p class="font12" :class="isEnLang?'en_medium':''">{{istrue}}</p>
            </div>
            <div class="copy_img">
              <svg t="1653893405932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18173" width="16" height="16"><path d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z" p-id="18174" fill="#8F8E8E"></path></svg>
            </div>
          </div>
        </div>
        <p class="mobile_font16 font24" :class="isEnLang?'en_heavy':''">{{ $t("message.bond.txt66") }}</p>
        <div class="content">
          <div class="databox" :class="isEnLang?'en_Bold':''" v-for="(item,index) in inviteArr" :key="index">
            <span class="font18 mobile_font14">{{ $t(item.title) }}</span>
            <span class="font35 mobile_font22" v-if="index == 0 || index == 1">
              <span v-if="item.txt">{{$t(item.txt)}}</span>
              <span v-else>{{item.num}}</span>
            </span>
            <span class="font35 mobile_font22" v-else>$ {{item.num | PriceConversion}}</span>
          </div>
        </div>
      </div>
    </div>
    <AddLp :obj="bondinfo" :newBondID="newBondID" :addlpDis="addlpDis" @closeLP="closeLP"></AddLp>
    <InviteProup :invitelink="istrue" :inviteDis="inviteDis" @closeInvite="closeInvite"></InviteProup>
    <MessageBox ref="mychild" :clientX='clientX' :clientY="clientY" :content="datacontent"></MessageBox>
  </div>
</template>

<script>
import circleProgressbar from 'vue-circleprogressbar';
import { mapGetters } from "vuex";
import AddLp from "./Addlp.vue";
import InviteProup from "./InviteProup.vue";
import MessageBox from "./MessageBox.vue";
import { bondDepository,erc20,token,getSigner,inviting,stStaking,invitingInfo,util} from 'sealemlab-sdk'
export default {
  components: {
    AddLp,InviteProup,MessageBox,circleProgressbar
  },
  computed: { ...mapGetters(["getAccount","getIsMobile","getIstrue","getNoticeNum","isEnLang","getUserCoin"]),
    istrue(){
      if(process.env.NODE_ENV == "production"){
        return `https://sealemlab.com/#/home?ref=${this.getAccount}`
      }else{
        return `https://test.sealemlab.com/#/home?ref=${this.getAccount}`
      }
    }
  },
  data() {
    return {
      bondStatus:false,// 是否获取到最新bond
      inviter:'',//邀请者
      newBondID:'',//最新债券id
      treasuryMoney:0,//国库金额
      loadMoreStatus:true,//加载中
      inviteArr:[{
        title:'message.bond.txt67',
        num:0
      },{
        title:'message.bond.txt68',
        num:0
      },{
        title:'message.bond.txt69',
        num:0
      },{
        title:'message.bond.add_txt69',
        num:0
      }],
      dashboard:true,//仪表盘切换
      showBox:false,//展示当前等级失效状态
      addlpDis: false, //一键购买lp弹窗状态
      inviteDis:false,
      showSelect: false,
      domHeight:false, // 下拉移动端左侧保持一致高度变量
      datacontent:'',
      clientX:0,
      clientY:0,
      counrnull:null,
      bondinfo:{
        bondName:'ST-BUSD LP',
        baseRate:"300",//基础利率
        additional1:'0',//附加利率1
        additional2:'0',//附加利率1
        additional3:'0',//附加利率
        purchaseRate:'0',
        percentage:0,
        lp:'',
        maxSupplyLp:'',
        cycle:'',
        addtimeobj:'',
        conclusion:null,
        countTime:{ d:"00",h: "00", m: "00", s: "00" }
      },
      baseInterestRateInfo:{
        num1:0,//基础利率
        num2:0,//利率等级
        num3:0,//升级所需流动性
        num4:0,//升级完成率
      },
      inviteBuy:{
        num1:0,//邀请购买利率
        num2:0,//利率等级
        num3:0,//升级所需购买额
        num4:0,//升级完成率
      },
      invitePledge:{
        num1:0,//邀请质押利率
        num2:0,//利率等级
        num3:0,//升级所需质押额
        num4:0,//升级完成率
        num5:0
      },
      Pledge:{
        num1:0,//质押利率
        num2:0,//利率等级
        num3:0,//升级所需质押额
        num4:0,//升级完成率
        num5:0
      },
      orderArr:[],
      NotExtractedBUSDMoney:0,//用户未提取busd总额
      Not_BUSDchangeST:0,//未领取----busd转st的数量
      Ready_BUSDchangeST:0,//已领取---busd转st的数量
      userOrderIDInfo:[],
      claimLoading:false,
      userClaimeMoney:0,
      userTimeOBJ:null,
      lpTimer:null,
      lastBondInfo:{
        bondName:'ST-BUSD LP',
        baseRate:"300",//基础利率
        additional1:'0',//附加利率1
        additional2:'0',//附加利率1
        additional3:'0',//附加利率
        purchaseRate:'0',
        percentage:0,
        lp:'',
        maxSupplyLp:0,
        cycle:14,
        addtimeobj:'',
        conclusion:null,
        countTime:{ d:"00",h: "00", m: "00", s: "00" }
      }
    };
  },
  watch:{
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.loadMoreStatus = true
          this.orderArr = []
          // this.getBondInfo() // 最新债券信息
          this.getUserOrder() // 获取订单信息
          this.getUserInvite() // 邀请人地址
        }else{
          this.orderArr.forEach(item => {
            clearInterval(item.selfTimeOBJ)
          })
          this.bondinfo = this.lastBondInfo
          this.loadMoreStatus = false
          this.orderArr = []
          this.bondStatus = true
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    tipFun(){
      if (!this.getNoticeNum) {
        this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
        this.$store.commit("setNoticeNum", true);
      }
    },
    // 获取当前正在发售的债券
    getBondInfo(){
      // 获取发行中(还未到结束时间)的债券ID数组
      bondDepository().getActiveBonds().then(res => {
        console.log('获取发行中(还未到结束时间)的债券ID数组res[0]: ',res);
        if(res.length > 0){
          this.newBondID = Number(res[0])
          this.bondStatus = true
          this.getCertainBondInfo(Number(res[0]),data => {
            this.bondinfo = Object.assign(this.bondinfo,data)
          })
          this.getUserRate(this.newBondID) // 圆形各等级信息
          this.$utils.refreshPrice('stlp',this.newBondID)
          this.setCountDown() // 债券倒计时
          this.getUserSubordinateMoney() // 用户下属某期债券税前购买金额
          this.bondLoading = false
        }else{
          console.log('没有正在发售的债券')
          this.bondStatus = true
          this.newBondID = ''
          this.bondinfo = this.lastBondInfo
        }
      })
    },
    // 获取国库金额
    getMoney(){
      // 正式情况下  国库地址加ox地址的余额显示
      if(process.env.NODE_ENV == "production"){
        erc20(token().STLP).balanceOf('0xDD64B8826bEb586053e55d586234283d7F186feF').then(res => {
          console.log('销毁地址国库金额res: ', res);
          let money1 = util.formatEther(res) * this.getUserCoin.stlpPrice
          erc20(token().STLP).balanceOf('0x000000000000000000000000000000000000dEaD').then(res1 => {
            console.log('国库金额res: ', res1);
            let money2 = util.formatEther(res1) * this.getUserCoin.stlpPrice // this.$utils.convertBigNumberToNormal(Number(res), 2)
            this.treasuryMoney = Number(money1) + Number(money2)
          })
        })
      }else{
        erc20(token().STLP).balanceOf('0xBC45dC703694831510bE20A64005e1C39fd34a36').then(res => {
          erc20(token().STLP).balanceOf('0xa41F8EFd21eEbA425835bFD6f4B34B0b3b5B45Ab').then(res1 => {
            this.treasuryMoney = this.$utils.convertBigNumberToNormal((Number(res) + Number(res1) * this.getUserCoin.stlpPrice), 2)
          })
        })
      }
    },
    // 获取sdk提供的某债券的全部信息
    getCertainBondInfo(bondId,calback){
      bondDepository().markets(bondId).then(res => {
        // console.log('获取某债券的全部信息res: ', res);
        let obj = {}
        obj.lp = res.LP
        obj.maxSupplyLp = util.formatEther(res.maxSupplyLp) //this.$utils.convertBigNumberToNormal(Number(res.maxSupplyLp), 2) //本期最大供应数量
        obj.maxUseBuylP = util.formatEther(res.userMaxLpBuyAmount) //this.$utils.convertBigNumberToNormal(Number(res.userMaxLpBuyAmount), 2)//用户最大购买量
        obj.cycle = this.$utils.getBit(Number(res.term) / (24 * 3600))//利息周期
        obj.conclusion = Number(res.conclusion) // 结束时间
        obj.soldLpNum = util.formatEther(res.soldLpAmount) //this.$utils.convertBigNumberToNormal(Number(res.soldLpAmount), 2)//已卖出lp数量
        obj.purchaseRate = obj.soldLpNum / obj.maxSupplyLp * 100 //this.$utils.getBit(obj.soldLpNum / obj.maxSupplyLp / 1e2)
        // console.log('进度条数值obj.purchaseRate: ', obj.purchaseRate);
        obj.percentage = this.$refs.progressbarRefs.clientWidth * (obj.purchaseRate / 100) + 'px' // 进度条
        // console.log('进度条的百分比obj.percentage: ',  obj.percentage);
        calback(obj)
      })
    },
    // 购买利率 邀请质押  邀请购买 基础利率
    getUserRate(bondID){
      // 获取某债券的基础利率等级信息
      bondDepository().getBasicRateLevelInfo(bondID).then(res => {
        // console.log('获取某债券的基础利率等级信息res: ', res);
        this.baseInterestRateInfo.num1 = Number(res[0])
        this.baseInterestRateInfo.num2 = Number(res[1])
        this.baseInterestRateInfo.num3 = util.formatEther(res[2]) //this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.baseInterestRateInfo.num4 = this.$utils.getBit(Number(res[3]) / 1e2,0)
        this.bondinfo.baseRate = this.baseInterestRateInfo.num1 // 基础利率
      })
      // 获取某用户的某期债券的邀请购买利率等级信息；等级有效期至当前期结束
      bondDepository().getUserInviteBuyLevelInfo(this.getAccount,bondID).then(res => {
        // console.log('邀请购买利率res1: ', res);
        this.inviteBuy.num1 = Number(res[0])
        this.inviteBuy.num2 = Number(res[1])
        this.inviteBuy.num3 = util.formatEther(res[2]) //this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.inviteBuy.num4 = this.$utils.getBit(Number(res[3]) / 1e2,0)
        this.bondinfo.additional1 = this.inviteBuy.num1//邀请购买利率
      })
      // 获取某用户的邀请质押利率等级信息
      bondDepository().getUserInviteStakeLevelInfo(this.getAccount).then(res => {
        // console.log('邀请质押利率res1: ', res);
        this.invitePledge.num1 = Number(res[0])
        this.invitePledge.num2 = Number(res[1])
        this.invitePledge.num3 = util.formatEther(res[2]) //this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.invitePledge.num4 = this.$utils.getBit(Number(res[3]) / 1e2,0)
        this.invitePledge.num5 = this.invitePledge.num3 / this.getUserCoin.stPrice
        this.bondinfo.additional2 = this.invitePledge.num1//邀请质押利率
      })
      // 获取某用户的质押利率等级信息
      bondDepository().getUserStakeLevelInfo(this.getAccount).then(res => {
        // console.log('质押利率res1: ', res);
        this.Pledge.num1 = Number(res[0])
        this.Pledge.num2 = Number(res[1])
        this.Pledge.num3 = util.formatEther(res[2]) //this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.Pledge.num4 = this.$utils.getBit(Number(res[3]) / 1e2,0)
        this.Pledge.num5 = this.Pledge.num3 / this.getUserCoin.stPrice
        this.bondinfo.additional3 = this.Pledge.num1//你的质押利率
      })
    },
    // 用户订单相关信息
    getUserOrder(){
      // 获取用户未提取（包括到期可提取及未到期不可提取）的订单ID数组及总USD金额
      bondDepository().getUserUnclaimedOrders(this.getAccount).then(res => {
          // this.userOrderIDInfo = res[0]
          this.NotExtractedBUSDMoney = util.formatEther(res[1]) //this.$utils.convertBigNumberToNormal(Number(res[1]), 2)
          this.Not_BUSDchangeST = this.NotExtractedBUSDMoney / this.getUserCoin.stPrice// this.$utils.convertBigNumberToNormal(Number(res[1]) / this.getUserCoin.stPrice, 2)
          if(res[0].length == 0){
            this.orderArr = []
            this.loadMoreStatus = false
          }else{
            let orderCount = 1
            let insetArr = []
            res[0].map(async (item) => {
              let orderObj = {}
              orderObj.orderID = Number(item)
              let sdkObj = await bondDepository().orders(this.getAccount,Number(item))
              let personalInterestRate = await bondDepository().getUserOrderExtraRates(this.getAccount,Number(item))
              // console.log('personalInterestRate: ', personalInterestRate);
              orderObj.bondID = Number(sdkObj.bondId)
              orderObj.title = "ST-BUSD LP"
              orderObj.personalArr = personalInterestRate
              orderObj.lpAmount = util.formatEther(sdkObj.lpAmount) //this.$utils.convertBigNumberToNormal(Number(sdkObj.lpAmount), 2)
              orderObj.lpPrice = util.formatEther(sdkObj.lpPrice) //this.$utils.convertBigNumberToNormal(Number(sdkObj.lpPrice), 2)
              orderObj.buyMoney = this.$utils.getBit(orderObj.lpAmount * orderObj.lpPrice)
              orderObj.usdPayout = util.formatEther(sdkObj.usdPayout) //this.$utils.convertBigNumberToNormal(Number(sdkObj.usdPayout), 2)
              orderObj.changeSt = Number(sdkObj.usdPayout) / 1e18 / this.getUserCoin.stPrice
              orderObj.bondRate = sdkObj.bondRate / 1e2
              orderObj.expiry = Number(sdkObj.expiry)
              orderObj.claimTime = Number(sdkObj.claimTime)
              orderObj.status = false
              orderObj.rateStatus = false
              orderObj.selfTimeOBJ = null
              orderObj.countTime = null
              orderObj.timeFinshed = false // 倒计时完成状态为true
              insetArr.push(orderObj)
              if(orderCount == res[0].length){
                this.orderArr = insetArr.sort((n1,n2) =>{ return n1.orderID - n2.orderID })
                this.loadMoreStatus = false
                this.getUsetTime()
              }
              orderCount++
            })
          }
      })
      // 获取用户可提取的订单ID数组及总USD金额
      bondDepository().getUserClaimableOrders(this.getAccount).then(res => {
        // console.log('获取用户可提取的订单ID数组及总USD金额: ', res);
        this.userOrderIDInfo = res[0]
        this.userClaimeMoney = util.formatEther(res[1])// this.$utils.convertBigNumberToNormal(Number(res[1]), 2)
        this.Ready_BUSDchangeST = this.userClaimeMoney /  this.getUserCoin.stPrice //this.$utils.convertBigNumberToNormal(Number(res[1]) / this.getUserCoin.stPrice, 2)
      })
    },
    // 用户批量提取订单ST收益
    userClaimSt(){
      if(this.userClaimeMoney == 0){
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_calimResult'}));
        return
      }
      if(this.claimLoading)return
      this.claimLoading = true
        console.log('this.userOrderIDInfo: ', this.userOrderIDInfo);
      bondDepository().connect(getSigner()).claim(this.userOrderIDInfo).then(async res => {
        // console.log('提取结果res1: ', res);
        this.$store.commit("setProupStatus", JSON.stringify({'status':true,'isProgress':false,'title':'message.tip.self_calim','link':res.hash}));
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.claimLoading = false
          this.getUserOrder()
          this.$store.dispatch("setProgressInfo", JSON.stringify({'value':100,'title':'message.tip.self_txt7'}));
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
          this.$utils.getUserCoinQuantity(token().BUSD,'busd',this.getAccount)
          this.$utils.getUserCoinQuantity(token().ST,'st',this.getAccount)
        }else{
          this.claimLoading = false
        }
      }).catch(() => {
        this.claimLoading = false
      })
    },
    inviteFun(){
      this.inviteDis = true;
    },
    // 当前债券售卖倒计时
    setCountDown(){
      clearInterval(this.counrnull)
      if(this.bondinfo.addtimeobj){
        clearInterval(this.bondinfo.addtimeobj)
      }
      this.counrnull = setInterval(() => {
        if(this.bondinfo.conclusion){
          clearInterval(this.counrnull)
          this.$utils.customTime(this.bondinfo.conclusion,(data) => {
            // console.log('当前债券售卖倒计时data: ', data);
            this.bondinfo.addtimeobj = data.countdownObject
            this.bondinfo.countTime = data.countTime
          });//结束时间
        }
      },1000)
    },
    // 用户可领取收益倒计时
    getUsetTime(){
      clearInterval(this.userTimeOBJ)
      // this.orderArr.forEach(item => {
      //   if(item.selfTimeOBJ){
      //     clearInterval(item.selfTimeOBJ)
      //   }
      // })
      this.userTimeOBJ = setInterval(() => {
        if(this.orderArr.length > 0){
          clearInterval(this.userTimeOBJ)
          this.orderArr.forEach(item => {
            this.$utils.customTime(item.expiry,(data) => {
              item.selfTimeOBJ = data.countdownObject 
              item.timeFinshed = data.countdownObject == 0?true:false
              item.countTime = data.countTime
            });//结束时间
          })
        }
      },1000)
    },
    // 获取邀请相关信息
    getUserInvite(){
      inviting().userInviter(this.getAccount).then(res => {
        if(res == '0x0000000000000000000000000000000000000000'){
          this.inviter = ''
        }else{
          this.inviter = this.$utils.getSubStr(res,6);
        }
      })
      // 获取某用户的下级的质押的ST数量
      stStaking().affiliateStakedST(this.getAccount).then(res => {
        console.log('获取某用户的下级的质押的ST数量res: ', res);
        this.inviteArr[3].num = this.getUserCoin.stPrice * util.formatEther(res) // this.$utils.convertBigNumberToNormal(Number(res), 2)
      })
      // 获取用户邀请的人数
      invitingInfo.getCounters(10,0,'usersCount','desc',this.getAccount.toLowerCase()).then(res => {
        console.log('获取用户邀请的人数res: ', res);
        if(res.data.counters.length > 0){
          this.inviteArr[0].num = res.data.counters[0].usersCount // 邀请下级数
        }else{
          this.inviteArr[0].num = 0
        }
      })
      // 排行榜
      invitingInfo.getCounters(50,0,'usersCount','desc').then(res => {
        console.log('获取邀请统计信息排行榜res: ', res);
        let arr = res.data.counters
        if(arr.length > 0){
          arr.forEach((item,index) => {
            if(item.inviter.toLowerCase() == this.getAccount.toLowerCase()){
              this.inviteArr[1].num = index + 1
            }else{
              this.inviteArr[1].txt = 'message.bond.txt_out_of_Ranking'
            }
          })
        }
      })
    },
    // 获取用户的下属某期债券的税前购买USD金额
    getUserSubordinateMoney(){
      bondDepository().affiliateEpochUsdPayinBeforeTax(this.getAccount,this.newBondID).then(res => {
        console.log('获取用户的下属某期债券的税前购买USD金额res: ', res);
        this.inviteArr[2].num = util.formatEther(res) //this.$utils.convertBigNumberToNormal(Number(res), 2)
      })
    },
    getNEWPrice(){
      clearInterval(this.lpTimer)
      this.lpTimer = setInterval(() => {
        this.$utils.refreshPrice('st')
        if(this.newBondID){
          this.$utils.refreshPrice('stlp',this.newBondID)
        }
        console.log("1分钟刷新一次价格(st,stlp)")
      },60000)
    },
    toPledge(){
      if (!this.getNoticeNum) {
        this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
        this.$store.commit("setNoticeNum", true);
      }
    },
    closeLP(data) {
      this.addlpDis = false;
      if(data){
        this.loadMoreStatus = true
        this.orderArr = []
        this.getBondInfo()
        this.getUserOrder()
      }
    },
    closeInvite() {
      this.inviteDis = false;
    },
    quesFun(data,e){
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY
      setTimeout(() => {
        this.$refs.mychild.titleFun()
      },400)
    },
    showBuy(item){
      item.status = !item.status
      this.domHeight = item.status
    },
    showRate(item){
      item.rateStatus = !item.rateStatus
    },
    BondClick(data) {
      console.log('data: ', data);
      if(!this.getIstrue){
        this.$store.commit("setwalletstatus", true);
        return
      }
      if(data){
        if(this.bondStatus){
          this.addlpDis = true
        }else{
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_bond'}));
        }
      }else{
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sold'}));
      }
    },
    copyClick(){
      if(this.getIstrue){
        this.$utils.copyClick(this.istrue)
        this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
      }else{
        this.$store.commit("setwalletstatus", true);
      }
    }
  },
  mounted(){
    this.getNEWPrice() // 获取最新st,stlp价格
    this.getBondInfo()
    this.getMoney()
  },
  beforeDestroy(){
    clearInterval(this.lpTimer)
    clearInterval(this.counrnull)
    clearInterval(this.bondinfo.addtimeobj)
    this.orderArr.forEach(item => {
      clearInterval(item.selfTimeOBJ)
    })
  }
};
</script>
<style>
.center_text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
</style>
<style lang="scss" scoped>
.small_angle{
  display: flex;
  align-items: center;
}
.nodata_add{
  margin-top: 20px;
  li{
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
}
.dashboard_box{
  width: 100%;
  display: flex;
  flex-direction: column;
  .top{
    width: 100%;
    height: 130px;
    line-height: 130px;
    span{
      cursor: pointer;
      line-height: 33px;
      font-weight: 600;
      color: #5D5F61;
      &:nth-child(1){
        margin-right: 57px;
        padding: 10px;
        background: #171718;
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39), inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 4px;
        border: 1px solid #373636;
      }
    }
  }
  .content{
    width: 100%;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 48px 125px 0;
    .linkdiv{
      height: auto;
    }
    >div{
      width: 45%;
      min-height: 98px;
      padding: 15px 30px;
      display: flex;
      align-items: flex-start;
      background: #171718;
      box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 8px;
      border: 1px solid #373636;
      margin-bottom: 48px;
      .iconbox_{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        margin-right: 16px;
      }
      .link_{
        width: 90%;
      }
      div{
        cursor: pointer;
        position: relative;
        width: 100%;
        p{
          max-width: 100%;
          font-weight: 600;
          color: #CED3D9;
          line-height: 22px;
          // white-space:pre-line;
          overflow-wrap:break-word;
        }
        .copy_img{
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .databox{
      flex-direction: column;
      margin-bottom: 48px;
      align-items: center;
      justify-content: space-evenly;
      padding-bottom:0;
      font-weight: 600;
      color: #CED3D9;
    }
  }
  >p{
    width: 100%;
    font-weight: 600;
    color: #CED3D9;
    line-height: 42px;
    margin: 36px 0 40px;
  }
}
.add_nav{
  width: 100%;
  border-bottom: 1px solid #242222;
  display: flex;
  align-items: center;
  padding: 0 0 50px;
  div{
    cursor: pointer;
    height: 54px;
    font-weight: 600;
    color: #CED3D9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    &:nth-child(1){
      margin-right: 26px;
    }
  }
}
.progressbar {
  display: inline-block;
  margin: 3px 0;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
  border-radius: 4px;
  backdrop-filter: blur(14px);
  cursor: pointer;
  // &:hover {
  //   color: #000000;
  //   background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
  // }
}
.bond_page {
  margin-top: 80px;
  width: 100%;
  height: auto;
}
.box1 {
  width: 100%;
  position: relative;
  .pc_bond_bg {
    width: 100%;
    min-height: 350px;
  }
  >div{
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    padding: 0 5vw;
    .bond_img {
      width: 117px;
    }
    ul {
      display: flex;
      align-items: center;
      margin-top: 60px;
      li {
        // max-width: 220px;
        padding: 0 8px;
        height: 60px;
        background: rgba(163, 159, 148, 0.23);
        border-radius: 14px;
        margin-right: 20px;
        .txt1 {
          width: 100%;
          height: calc(100% - 4px);
          padding: 10px 0;
          font-weight: 600;
          color: #CED3D9;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space:nowrap;
        }
        // .line {
        //   width: 50%;
        //   height: 4px;
        //   margin: 0 auto;
        //   background: #f0ce75;
        //   border-radius: 2px;
        // }
      }
    }
  }
}
.boxs {
  width: 90vw;
  margin: 0 auto;
  // padding: 20px;
  padding-top: 0;
  .title {
    font-weight: 600;
    color: #CED3D9;
    line-height: 42px;
    margin-bottom: 20px;
  }
  .box {
    width: 100%;
    height: auto;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
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
      width: calc(100% / 6);
      font-weight: 600;
      color: #eccf83;
      line-height: 33px;
      text-align: left;
      &:nth-child(1){
        text-align: left;
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 10px 20px;
    .list_title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      color: #CED3D9;
      line-height: 28px;
      padding: 10px 0;
      li {
        width: calc(100% / 8);
      }
    }
    .list_title2 {
      font-weight: 600;
      color: #a9a7a7;
      line-height: 22px;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        > span {
          width: calc(100% / 8);
        }
      }
    }
    .add_btn_txt{
      display: none;
    }
    .nodata_add{
      width: 100%;
      li{
        width: 100%;
        justify-content: center;
      }
    }
  }
}
.box3 {
  padding: 40px 0 20px;
  .box {
    padding: 40px 20px;
    position: relative;
  }
  .text1 {
    font-weight: 400;
    color: #b79d53;
    line-height: 14px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 13px;
  }
  .list_title1 {
    display: flex;
    justify-content: space-between;
    > li {
      width: 23%;
      padding: 30px 0;
      .list_title2 {
        li {
          margin-bottom: 10px;
          &:nth-child(2){
            margin: 15px 0 20px;
            min-height: 34px;
          }
          &:nth-child(3){
            margin-bottom:25px;
            position: relative;
            width: fit-content;
          }
          // &:nth-last-child(1){
          //   display: flex;
          //   flex-direction: column;
          // }
        }
      }
    }
  }
  .text2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 400;
    color: #909090;
    line-height: 17px;
    p{
      &:nth-child(2){
        max-width: 100%;
      }
    }
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
    justify-content: space-between;
    border-bottom: 2px solid #242222;
    padding: 40px 0;
    > div {
      min-width: 200px;
      font-weight: 600;
      color: #eccf83;
      line-height: 33px;
    }
    .add_btnbox{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn_txt{
        margin: 0;
      }
    }
    .his {
      font-weight: 400;
      color: #b79d53;
      line-height: 14px;
      position: absolute;
      right: 0;
      top: 10px;
      cursor: pointer;
      span{
        width: 100%;
        text-align: right;
        display: inline-block;
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
      justify-content:space-between;
      font-weight: 600;
      color: #CED3D9;
      line-height: 28px;
      padding: 10px 0;
      li {
        width: calc(100% / 6);
        &:nth-child(2){
          >div{
            display: none;
          }
        }
      }
    }
    .list_title2 {
      font-weight: 600;
      color: #a9a7a7;
      line-height: 22px;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        > span {
          cursor: pointer;
          width: calc(100% / 6);
          .add_small_angle{
            margin-top: 10px;
          }
        }
      }
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
@media screen and (max-width: 980px) {
  .bond_page {
    margin-top: 0;
    padding-top: 0.8rem;
    width: 100%;
    height: auto;
  }
  .btn_txt {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.16rem;
    color: #000;
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
    border-radius: 0.04rem;
    backdrop-filter: blur(14px);
    margin: 0 auto;
    cursor: pointer;
  }
  .boxs {
    width: 90vw;
    margin: 0 auto;
    padding:0;
    margin-top: -0.4rem;
    .title {
      font-weight: 600;
      color: #CED3D9;
      line-height: 42px;
      margin-bottom: 20px;
    }
    .box {
      width: 100%;
      height: auto;
      background: #000000;
      padding: 0 0;
    }
  }
  .box1 {
    width: 100%;
    position: relative;
    .pc_bond_bg {
      width: 100%;
      min-height: 2rem;
    }
    >div{
      position: absolute;
      top: 0.2rem;
      left: 0;
      width: 100%;
      padding: 0 0.2rem;
      .bond_img {
        width: 0.52rem;
      }
      ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 0.2rem;
        li {
          width: auto;
          // max-width: 2.3rem;
          padding: 0.05rem;
          height: 0.21rem;
          background: rgba(248, 229, 186, 0.09);
          border-radius: 0.04rem;
          backdrop-filter: blur(14px);
          text-align: left;
          margin-right: 0;
          margin-bottom: 0.05rem;
          .txt1 {
            width: 100%;
            height: auto;
            padding:0;
            font-weight: 600;
            color: #9d9c9c;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .line {
            display: none;
          }
        }
      }
    }
  }
  .box2 {
    padding:0;
    .top {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 2px solid #242222;
      padding: 0.2rem;
      > div {
        width: 50%;
        font-size: 0.14rem;
        font-weight: 600;
        color: #eccf83;
        line-height: 33px;
        &:nth-child(2),&:nth-child(4),&:nth-child(6){
          text-align: right;
        }
      }
    }
    .bottom {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0.1rem 0.2rem;
      padding-bottom: 0.9rem;
      .list_title {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-weight: 600;
        font-size: 0.14rem;
        color: #CED3D9;
        line-height: 0.34rem;
        padding: 0.1rem 0;
        li {
          width: auto;
          &:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7){
            text-align: left;
          }
        }
      }
      .list_title2 {
        font-weight: 600;
        color: #a9a7a7;
        line-height: 0.34rem;
        li {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 0.1rem 0;
          > span {
            width: auto;
            min-width: 1.21rem;
            &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7){
              text-align: right;
            }
          }
          .mobile_btn{
            display: none;
          }
        }
      }
      .add_btn_txt{
        display: block;
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform:translateX(-50%);
        width: 80%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-weight: 600;
        color: #000;
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 0.04rem;
        backdrop-filter: blur(14px);
      }
    }
  }
  .add_nav{
    width: 100%;
    border-bottom: 2px solid #242222;
    display: flex;
    align-items: center;
    padding: 0.6rem 0 0.2rem;
    div{
      cursor: pointer;
      width:auto;
      height: 0.33rem;
      padding: 0;
      font-weight: 600;
      color: #CED3D9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.04rem;
      &:nth-child(1){
        margin-right: 0.1rem;
      }
    }
  }
  .box3 {
    padding:0;
    .box {
      padding: 0.2rem 0.1rem;
      position: relative;
    }
    .text1 {
      font-weight: 400;
      color: #b79d53;
      line-height: 14px;
      cursor: pointer;
      position: absolute;
      top: 0.15rem;
      right: 0.03rem;
    }
    .list_title1 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 0.32rem;
      > li {
        width: 50%;
        padding:0;
        margin-bottom: 0.4rem;
        .list_title2 {
          li {
            margin-bottom: 0.1rem;
            &:nth-child(2){
              margin: 0.15rem 0 0.2rem;
              min-height: 0.25rem;
              .btn_txt{
                width: 0.78rem;
                height: 0.25rem;
                line-height: 0.25rem;
                margin: 0;
              }
            }
            &:nth-child(3){
              margin-bottom:25px;
              position: relative;
              width: fit-content;
            }
          }
        }
      }
    }
    .text2 {
      width: 100%;
      font-size: 0.12rem;
      font-weight: 400;
      color: #909090;
      align-items: flex-start;
      line-height: 0.17rem;
      p{
        &:nth-child(2){
          max-width: 100%;
          width: 100%;
        }
      }
    }
  }
  .box4 {
    padding: 0.2rem 0;
    .box {
      padding: 0 0.1rem;
    }
    .top {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #242222;
      padding: 40px 0;
      > div {
        width:50%;
        min-width: 0.1rem;
        font-size: 0.14rem;
        font-weight: 600;
        color: #eccf83;
        line-height: 33px;
        &:nth-child(2),&:nth-child(4){
          text-align: right;
        }
        &:nth-child(5){
          width: 100%;
          margin-top: 0.2rem;
        }
      }
      .his {
        width: fit-content;
        font-size: 12px;
        font-weight: 400;
        color: #b79d53;
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
      padding: 0.1rem 0;
      display: flex;
      .list_title {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0.14rem;
        font-weight: 600;
        color: #CED3D9;
        line-height: 0.28rem;
        padding:0;
        li {
          width: auto;
          &:nth-child(2){
            >div{
              display: block;
              height: 0.6rem;
            }
          }
          &:nth-child(2),&:nth-child(3),&:nth-child(5){
            text-align: left;
          }
          &:nth-child(4){
            width: auto;
            text-align: left;
          }
          &:nth-child(6){
            width: auto;
            text-align: left;
          }
        }
      }
      .list_title2 {
        font-size: 0.14rem;
        font-weight: 600;
        color: #a9a7a7;
        line-height: 0.28rem;
        &:nth-child(2){
          display: flex;
        }
        li {
          width: 100%;
          display: flex;
          padding: 0;
          flex-direction: column;
          align-items:center;
          > span {
            width: auto;
            min-width: 1.06rem;
            &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(5){
              text-align: right;
            }
            &:nth-child(4){
              width: auto;
              text-align: right;
            }
            &:nth-child(6){
              width: auto;
              text-align: right;
            }
          }
        }
      }
    }
  }
  .dashboard_box{
    width: 100%;
    display: flex;
    flex-direction: column;
    .top{
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      margin: 0.15rem 0;
      span{
        cursor: pointer;
        font-weight: bold;
        color: #CED3D9;
        line-height: 0.14rem;
        color: #5D5F61;
        &:nth-child(1){
          margin-right: 0.5rem;
        }
      }
    }
    .content{
      width: 100%;
      background: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding:0.2rem 0.2rem 0;
      >div{
        width: 100%;
        height: 0.6rem;
        padding: 0.1rem;
        display: flex;
        align-items: flex-start;
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 8px;
        border: 1px solid #373636;
        margin-bottom: 0.2rem;
        // img{
        //   width: 0.2rem;
        //   margin-right: 0.1rem;
        // }
        .iconbox_{
          width: 0.16rem;
          height: 0.16rem;
          display: flex;
          align-items: center;
          margin-right: 0.1rem;
          margin-top: 0.03rem;
        }
        .link_{
          width:85%;
        }
        div{
          p{
            font-weight: 600;
            color: #CED3D9;
            line-height: 22px;
            &:nth-child(2){
              color: #CED3D9;
            }
          }
        }
      }
      .databox{
        flex-direction: column;
        margin-bottom: 0.2rem;
        align-items: center;
        justify-content: space-evenly;
        padding-bottom:0;
      }
    }
    >p{
      width: 100%;
      font-weight: 600;
      color: #CED3D9;
      line-height: 0.3rem;
      margin: 0.4rem 0 0.2rem;
    }
  }
  .progressbar {
    margin: 1px 0;
  }
}
</style>
