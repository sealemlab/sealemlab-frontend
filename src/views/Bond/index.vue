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
            <div class="txt1">{{ $t("message.bond.txt2_1") }}</div>
            <!-- <div class="line"></div> -->
          </li>
          <li>
            <div class="txt1">{{ $t("message.bond.txt2_2") }}</div>
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
            <div><span>$&nbsp;{{treasuryMoney}}</span></div>
            <div>
              <span>ST{{ $t("message.bond.txt4") }} </span>
            </div>
            <div><span>$&nbsp;{{getUserCoin.stPrice}}</span></div>
          </div>
          <!-- 表格 -->
          <div class="bottom">
            <!-- 标题 -->
            <ul class="list_title font20" :class="isEnLang?'en_Bold':''">
              <li>
                <span>{{ $t("message.bond.txt1") }}</span>
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
                <span>{{ bondinfo.maxSupplyLp }}</span>
                <span>{{ bondinfo.baseRate }} %</span>
                <span>
                  <span class="color2">{{ bondinfo.additional1 }} %</span>
                  + 
                  <span class="color3">{{ bondinfo.additional2 }} %</span>
                  + 
                  <span class="color4">{{ bondinfo.additional3 }} %</span>
                </span>
                <span>{{ bondinfo.cycle }}&nbsp;{{$t("message.bond.txt19")}}</span>
                <span>
                  {{ bondinfo.countTime.d}}&nbsp;:
                  {{ bondinfo.countTime.h }}&nbsp;:
                  {{ bondinfo.countTime.m }}&nbsp;:
                  {{ bondinfo.countTime.s }}
                </span>
                <span>
                  <div class="progressbar"><div :style="{ width: bondinfo.purchaseRate }"></div></div>
                  {{ bondinfo.purchaseRate }} %
                </span>
                <span>
                  <div class="btn_txt mobile_btn bg3" :class="isEnLang?'en_Bold':''" @click="BondClick(1)">{{ $t("message.bond.txt1") }}</div>
                </span>
              </li>
            </ul>
            <!-- <ul class="list_title2 nodata_add font16" v-if="bondInfoArr.length == 0 && loadMoreStatus">
              <li><LoadingAnmation></LoadingAnmation></li>
            </ul> -->
            <!-- <ul class="list_title2 nodata_add font16" v-if="bondInfoArr.length == 0 && !loadMoreStatus">
              <li>NoData</li>
            </ul> -->
            <div class="add_btn_txt bg3 mobile_font16" :class="isEnLang?'en_Bold':''" @click="BondClick(1)">{{ $t("message.bond.txt1") }}</div>
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
          <div class="text1 font12">{{ $t("message.bond.txt40") }}</div>
          <ul class="list_title1">
            <li>
              <ul class="list_title2">
                <li :title='$t("message.bond.txt73")' style="cursor:pointer" @click="quesFun('message.bond.txt73',$event)">
                  <span class="has_question_icon color1 font24" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt28") }}</span>
                </li>
                <li></li>
                <li class="round_progressbar">
                  <!-- <RingProgress
                    percentNum="30"
                    size="100"
                    ranking="Coming soon"
                    color="#C7C7C7"
                    backgroundColor="#5E5E5E"
                    fontcolor="#9D9C9C"
                  /> -->
                  <div class="circle-two circle_1">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">
                      <div class="circle_txt color3 font18">{{$t("message.tip.txt5")}}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <span class="color1 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }}1%</span>
                </li>
                <li>
                  <span class="color1 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }}LV2 </span>
                </li>
                <li>
                  <span class="color1 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt43") }} --</span>
                </li>
              </ul>
            </li>
            <!-- 第二个圆 -->
            <li>
              <!-- <ul class="list_title2 coming_soon"> -->
              <ul class="list_title2">
                <li :title='$t("message.bond.txt74")' style="cursor:pointer" @click="quesFun('message.bond.txt74',$event)">
                  <span class="has_question_icon color2 font24" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt30") }}</span>
                </li>
                <li>
                  <div class="btn_txt bg1" @click="inviteFun" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt44") }}</div>
                </li>
                <li class="round_progressbar">
                  <!-- <RingProgress
                    :percentNum="30"
                    size="100"
                    :ranking="'Coming soon'"
                    color="#F0E2B8"
                    backgroundColor="#6F6A59"
                    :fontcolor="'#9F9579'"
                  /> -->
                  <div class="circle-two circle_2">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">
                      <div class="circle_txt color3 font18">{{$t("message.tip.txt5")}}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <span class="color2 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }}0.0%</span>
                </li>
                <li>
                  <span class="color2 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }}LV2</span>
                </li>
                <li>
                  <span class="color2 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt45") }} --</span>
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
                  <span class="has_question_icon color3 font24" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt29") }}</span>
                </li>
                <li>
                  <div class="btn_txt bg2" @click="inviteFun" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt44") }}</div>
                </li>
                <li class="round_progressbar">
                  <!-- <RingProgress
                    :percentNum="30"
                    size="100"
                    :ranking="'Coming soon'"
                    color="#FFD46A"
                    backgroundColor="rgba(187, 159, 90, 0.45)"
                    :fontcolor="'#BB9F5A'"
                  /> -->
                  <div class="circle-two circle_3">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">
                      <div class="circle_txt color3 font18">{{$t("message.tip.txt5")}}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <span class="color3 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }}0.0%</span>
                </li>
                <li>
                  <span class="color3 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }}LV2 </span>
                </li>
                <li>
                  <span class="color3 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt47") }} --</span>
                </li>
              </ul>
            </li>
            <!-- 第四个圆 -->
            <li>
              <ul class="list_title2">
                <li :title='$t("message.bond.txt76")' style="cursor:pointer" @click="quesFun('message.bond.txt76',$event)">
                  <span class="has_question_icon color4 font24" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt31") }}</span>
                </li>
                <li>
                  <div class="btn_txt bg3" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt48") }}</div>
                </li>
                <li class="round_progressbar">
                  <!-- <RingProgress
                    :percentNum="30"
                    size="100"
                    :ranking="'Coming soon'"
                    color="#FFEDBC"
                    backgroundColor="#ECCF83"
                    :fontcolor="'#F5E2A7'"
                  /> -->
                  <div class="circle-two circle_4">
                    <div class="circle-two-l"></div>
                    <div class="circle-two-r"></div>
                    <div class="circle-two-mask">
                      <div class="circle_txt color3 font18">{{$t("message.tip.txt5")}}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <span class="color4 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt41") }}0.0%</span>
                </li>
                <li>
                  <span class="color4 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt42") }}LV2 </span>
                </li>
                <li>
                  <span class="color4 font18" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt49") }} --</span>
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
              <span class="has_question_icon">{{ $t("message.bond.txt52") }}</span>
            </div>
            <div><span>0 ST</span></div>
            <div :title='$t("message.bond.txt78")' style="cursor:pointer" @click="quesFun('message.bond.txt78',$event)">
              <span class="has_question_icon">{{ $t("message.bond.txt53") }} </span>
            </div>
            <div><span>0 ST</span></div>
            <div>
              <div class="btn_txt bg3 mobile_btn_es" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt54") }}</div>
            </div>
            <div class="his font12">
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
                <span>{{ $t("message.bond.txt57") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt58") }}</span>
              </li>
              <li>
                <span>{{ $t("message.bond.txt59") }}</span>
              </li>
            </ul>
            <ul class="list_title2 font16" :class="isEnLang?'en_medium':''">
              <li v-for="(item, index) in Arr2" :key="index">
                <span>{{ item.zq }}</span>
                <span class="has_select">
                  {{ item.gme }}
                  <div class="small_angle" @click="showBuy(item)">＞</div>
                  <ul class="has_select_list" v-if="item.status">
                    <li v-for="(i, ind) in list1" :key="ind">{{ i }}</li>
                  </ul>
                </span>
                <span>{{ item.jclv }}</span>
                <span><span class="color2">{{ item.fjlv1 }}</span> + <span class="color3">{{ item.fjlv2 }}</span> + <span class="color4">{{ item.fjlv3 }}</span></span>
                <span>{{ item.yjklq }}</span>
                <span>{{ item.djs }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 附属仪表盘内容 -->
      <div class="dashboard_box" v-if="!dashboard">
        <div class="top font24 mobile_font16" :class="isEnLang?'en_heavy':''">
          <span class="color3">{{ $t("message.bond.txt62") }}</span>
          <span>{{ $t("message.bond.txt63") }}</span>
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
              <p class="font12" :class="isEnLang?'en_medium':''">0xb2307A91...5198ef7</p>
            </div>
          </div>
          <div>
            <div class="iconbox_">
              <svg t="1653724606480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8184" width="16" height="16">
                <path d="M599.552 696.832l-1.024 1.024c-1.024 1.024-61.952 50.176-93.696 75.776-41.472 33.28-93.184 48.64-145.92 43.008s-100.352-31.232-133.632-72.704c-69.12-84.992-55.808-210.944 29.696-279.552l99.328-80.896-46.08-57.344-99.328 80.896c-116.736 94.72-134.656 266.752-39.936 383.488 45.568 56.32 111.104 91.648 183.296 99.328 9.728 1.024 19.456 1.536 29.184 1.536 62.464 0 121.856-20.992 171.008-60.928l94.208-76.288-45.568-56.32-1.536-1.024zM856.064 232.96c-94.208-116.224-266.24-134.656-383.488-39.936l-90.112 73.216 46.08 57.344 90.112-73.216c84.992-69.12 210.944-55.808 279.552 29.696 69.12 85.504 55.808 210.944-29.696 279.552l-95.744 77.312-1.024 1.024 46.08 57.344 96.768-78.336c56.832-46.08 92.16-111.104 99.84-183.808 8.192-72.192-12.8-143.36-58.368-200.192z" p-id="8185"  fill="#CED3D9"></path>
                <path d="M388.096 667.648l305.664-254.464 1.024-1.024-47.616-56.32-305.664 254.976-1.024 0.512z" p-id="8186" fill="#CED3D9"></path>
              </svg>
            </div>
            <div>
              <p class="font18 mobile_font14" :class="isEnLang?'en_Bold':''">{{ $t("message.bond.txt65") }}</p>
              <p class="font12" :class="isEnLang?'en_medium':''">https://sealemlab.com/?r=ajnpq</p>
            </div>
          </div>
        </div>
        <p class="mobile_font16 font24" :class="isEnLang?'en_heavy':''">{{ $t("message.bond.txt66") }}</p>
        <div class="content">
          <div class="databox" :class="isEnLang?'en_Bold':''" v-for="(item,index) in inviteArr" :key="index">
            <span class="font18 mobile_font14">{{ $t(item.title) }}</span>
            <span class="font35 mobile_font22">{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <AddLp :obj="bondinfo" :newBondID="newBondID" :addlpDis="addlpDis" @closeLP="closeLP"></AddLp>
    <InviteProup :inviteDis="inviteDis" @closeInvite="closeInvite"></InviteProup>
    <MessageBox ref="mychild" :clientX='clientX' :clientY="clientY" :content="datacontent"></MessageBox>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddLp from "./Addlp.vue";
import InviteProup from "./InviteProup.vue";
import MessageBox from "./MessageBox.vue";
import { bondDepository,erc20,token} from 'sealemlab-sdk'
export default {
  components: {
    AddLp,InviteProup,MessageBox
  },
  computed: { ...mapGetters(["getAccount","getIstrue","getNoticeNum","isEnLang","getUserCoin"]) },
  data() {
    return {
      newBondID:-2,//最新债券id
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
        title:'message.bond.txt69',
        num:0
      }],
      dashboard:true,//仪表盘切换
      showBox:false,//展示当前等级失效状态
      addlpDis: false, //一键购买lp弹窗状态
      inviteDis:false,
      showSelect: false,
      // bondInfoArr: [],
      Arr2: [
        {
          zq: "ST-BUSD LP",
          gme: "0",
          jclv: "5%",
          fjlv1: "0%",
          fjlv2: "0%",
          fjlv3: "0%",
          yjklq: "0",
          djs: "00:00:00:00",
          status:false
        },
        // {
        //   zq: "ST-BUSD LP",
        //   gme: "0",
        //   jclv: "1%",
        //   fjlv1: "0%",
        //   fjlv2: "0%",
        //   fjlv3: "0%",
        //   yjklq: "0",
        //   djs: "待领取",
        //   status:false
        // },
      ],
      list1: ["$ 0*0", "$ 0*0"],
      domHeight:false, // 下拉移动端左侧保持一致高度变量
      datacontent:'',
      clientX:0,
      clientY:0,
      counrnull:null,
      bondinfo:{
        bondName:'ST-BUSD LP',
        baseRate:"0",//基础利率
        additional1:'0',//附加利率1
        additional2:'0',//附加利率1
        additional3:'0',//附加利率
        purchaseRate:'0',
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
        num4:0//升级完成率
      },
      inviteBuy:{
        num1:0,//邀请购买利率
        num2:0,//利率等级
        num3:0,//升级所需购买额
        num4:0//升级完成率
      },
      invitePledge:{
        num1:0,//邀请质押利率
        num2:0,//利率等级
        num3:0,//升级所需质押额
        num4:0//升级完成率
      },
      Pledge:{
        num1:0,//质押利率
        num2:0,//利率等级
        num3:0,//升级所需质押额
        num4:0//升级完成率
      },
    };
  },
  watch:{
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.setCountDown()
          this.getBondInfo()
        }else{
          clearInterval(this.counrnull)
          this.bondinfo = {
            bondName:'ST-BUSD LP',
            baseRate:"5",//基础利率
            additional1:'0',//附加利率1
            additional2:'0',//附加利率1
            additional3:'0',//附加利率
            purchaseRate:'0%',
            lp:'',
            maxSupplyLp:0,
            cycle:14,
            addtimeobj:'',
            conclusion:null,
            countTime:{ d:"00",h: "00", m: "00", s: "00" }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getBondInfo(){
      // 获取发行中(还未到结束时间)的债券ID数组
      if(!this.getIstrue)return
      bondDepository().getActiveBonds().then(res => {
        console.log('获取发行中(还未到结束时间)的债券ID数组res[0]: ',res);
        if(res.length > 0){
          this.newBondID = Number(res[0])
          this.getCertainBondInfo(Number(res[0]),data => {
            this.bondinfo = Object.assign(this.bondinfo,data)
          })
          this.getUserRate(this.newBondID)
        }
      })
      // 获取债券总数，总数-1就是最新债券ID
      // bondDepository().getMarketsLength().then(res1 => {
      //   // console.log('获取债券总数，总数-1就是最新债券IDres: ', Number(res1));
      // })
      // 0xBC45dC703694831510bE20A64005e1C39fd34a36(测试)  国库地址
      erc20(token().STLP).balanceOf('0xBC45dC703694831510bE20A64005e1C39fd34a36').then(res => {
        // console.log('国库金额res: ', res);
        this.treasuryMoney = this.$utils.convertBigNumberToNormal(Number(res), 2)
      })
    },
    // 获取某债券的全部信息
    getCertainBondInfo(bondId,calback){
      bondDepository().markets(bondId).then(res => {
        // console.log('获取某债券的全部信息res: ', res);
        let obj = {}
        obj.lp = res.LP
        obj.maxSupplyLp = this.$utils.convertBigNumberToNormal(Number(res.maxSupplyLp), 2) //本期最大供应数量
        obj.maxUseBuylP = this.$utils.convertBigNumberToNormal(Number(res.userMaxLpBuyAmount), 2)//用户最大购买量
        obj.cycle = this.$utils.getBit(Number(res.term) / (24 * 3600))//利息周期
        console.log('利息周期: ', Number(res.term));
        obj.conclusion = Number(res.conclusion) // 结束时间
        obj.soldLpNum = this.$utils.convertBigNumberToNormal(Number(res.soldLpAmount), 2)//已卖出lp数量
        
        obj.purchaseRate = this.$utils.convertBigNumberToNormal(Number(res.soldLpAmount / res.maxSupplyLp), 2)
        calback(obj)
      })
    },
    // 购买利率 邀请质押  邀请购买 基础利率
    getUserRate(bondID){
      // 获取某债券的基础利率等级信息
      bondDepository().getBasicRateLevelInfo(bondID).then(res => {
        console.log('获取某债券的基础利率等级信息res: ', res);
        this.baseInterestRateInfo.num1 = Number(res[0]) / 1e2
        this.baseInterestRateInfo.num2 = Number(res[1]) / 1e2
        this.baseInterestRateInfo.num3 = this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.baseInterestRateInfo.num4 = Number(res[3]) / 1e2
        this.bondinfo.baseRate = this.baseInterestRateInfo.num1 // 基础利率
      })
      // 获取某用户的某期债券的邀请购买利率等级信息；等级有效期至当前期结束
      bondDepository().getUserInviteBuyLevelInfo(this.getAccount,bondID).then(res => {
        console.log('邀请购买利率res1: ', res);
        this.inviteBuy.num1 = Number(res[0]) / 1e2
        this.inviteBuy.num2 = Number(res[1]) / 1e2
        this.inviteBuy.num3 = this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.inviteBuy.num4 = Number(res[3]) / 1e2
        this.bondinfo.additional1 = this.inviteBuy.num1//邀请购买利率
      })
      // 获取某用户的邀请质押利率等级信息
      bondDepository().getUserInviteStakeLevelInfo(this.getAccount).then(res => {
        console.log('邀请质押利率res1: ', res);
        this.invitePledge.num1 = Number(res[0]) / 1e2
        this.invitePledge.num2 = Number(res[1]) / 1e2
        this.invitePledge.num3 = this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.invitePledge.num4 = Number(res[3]) / 1e2
        this.bondinfo.additional2 = this.inviteBuy.num1//邀请质押利率
      })
      // 获取某用户的质押利率等级信息
      bondDepository().getUserStakeLevelInfo(this.getAccount).then(res => {
        console.log('质押利率res1: ', res);
        this.Pledge.num1 = Number(res[0]) / 1e2
        this.Pledge.num2 = Number(res[1]) / 1e2
        this.Pledge.num3 = this.$utils.convertBigNumberToNormal(Number(res[2]), 2)
        this.Pledge.num4 = Number(res[3]) / 1e2
        this.bondinfo.additional3 = this.Pledge.num1//你的质押利率
      })
    },



    quesFun(data,e){
      this.datacontent = data
      this.clientX = e.clientX
      this.clientY = e.clientY
      setTimeout(() => {
        this.$refs.mychild.titleFun()
      },400)
    },
    closeLP() {
      this.addlpDis = false;
    },
    closeInvite() {
      this.inviteDis = false;
    },
    inviteFun(){
      this.inviteDis = true;
    },
    BondClick() {
      this.addlpDis = true
    },
    showBuy(item){
      item.status = !item.status
      this.domHeight = item.status
    },
    // 倒计时
    setCountDown(){
      clearInterval(this.counrnull)
      if(this.bondinfo.addtimeobj){
        clearInterval(this.bondinfo.addtimeobj)
      }
      this.counrnull = setInterval(() => {
        if(this.bondinfo.conclusion){
          clearInterval(this.counrnull)
          this.$utils.customTime(this.bondinfo.conclusion,(data) => {
            // console.log('倒计时返回对象data: ', data);
            this.bondinfo.addtimeobj = data.countdownObject
            this.bondinfo.countTime = data.countTime
          });//结束时间
        }
      },1000)
    }
  },
  mounted(){
    this.getBondInfo()
  }
};
</script>

<style lang="scss" scoped>
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
    >div{
      width: 40%;
      height: 80px;
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
      div{
        p{
          font-weight: 600;
          color: #CED3D9;
          line-height: 22px;
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
  line-height: 34px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #000;
  box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
  border-radius: 4px;
  backdrop-filter: blur(14px);
  margin: 0 auto;
  cursor: pointer;
  // &:hover {
  //   color: #000000;
  //   background: linear-gradient(180deg, #f7e9b9 0%, #f0ce75 100%);
  // }
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
    // background: rgba(187, 159, 90, 0.45);
    .circle-two-l {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      clip: rect(0, 50px, auto, 0);
      &::after {
        content: " ";
        // background: #edd07e;
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
        // background: #edd07e;
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
      width: 90%;
      height: 90%;
      background: #000;
      border-radius: 50%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      margin: auto;
      .circle_txt{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: 600;
      }
    }
  }
  .circle_1{
    background: #5E5E5E;
    .circle-two-l{
      &::after {
        background: #C7C7C7;
      }
    }
    .circle-two-r{
      &::after {
        background: #C7C7C7;
      }
    }
  }
  .circle_2{
    background: #6F6A59;
    .circle-two-l{
      &::after {
        background: #F0E2B8;
      }
    }
    .circle-two-r{
      &::after {
        background: #F0E2B8;
      }
    }
  }
  .circle_3{
    background: rgba(187, 159, 90, 0.45);
    .circle-two-l{
      &::after {
        background: #FFD46A;
      }
    }
    .circle-two-r{
      &::after {
        background: #FFD46A;
      }
    }
  }
  .circle_4{
    background: rgba(236, 207, 131, 0.45);
    .circle-two-l{
      &::after {
        background: #FFEDBC;
      }
    }
    .circle-two-r{
      &::after {
        background: #FFEDBC;
      }
    }
  }
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
        // width: 243px;
        max-width: 200px;
        padding: 0 10px;
        height: 60px;
        background: rgba(163, 159, 148, 0.23);
        border-radius: 14px;
        margin-right: 20px;
        .txt1 {
          width: 100%;
          height: calc(100% - 4px);
          padding: 10px;
          font-weight: 600;
          color: #CED3D9;
          display: flex;
          align-items: center;
          justify-content: center;
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
  padding: 20px;
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
      width: calc(100% / 4);
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
      font-weight: 600;
      color: #CED3D9;
      line-height: 28px;
      padding: 10px 0;
      li {
        width: 160px;
        &:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7){
          text-align: center;
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
        align-items: center;
        padding: 10px 0;
        > span {
          width: 160px;
          &:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7){
            text-align: center;
          }
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
    right: 20px;
  }
  .list_title1 {
    display: flex;
    justify-content: space-between;
    > li {
      width: 23%;
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
            font-weight: 600;
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
          // &:nth-child(4) {
          //   // font-weight: 600;
          // }
          // &:nth-child(5),
          // &:nth-child(6) {
          //   // font-weight: 400;
          // }
          &:nth-child(7) {
            position: relative;
            padding-top: 30px;
            div {
              &:nth-child(1) {
                cursor: pointer;
                // font-size: 20px;
                // transform: rotate(90deg);
                position: absolute;
                left: 50px;
                top: 0;
              }
              &:nth-child(2) {
                font-size: 12px;
                font-weight: 500;
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
    border-bottom: 2px solid #242222;
    padding: 40px 0;
    > div {
      width: calc(100% / 5);
      font-weight: 600;
      color: #eccf83;
      line-height: 33px;
    }
    .his {
      width: fit-content;
      font-weight: 400;
      color: #b79d53;
      line-height: 14px;
      position: absolute;
      right: 0;
      top: 10px;
      cursor: pointer;
    }
  }
  .bottom {
    width: 100%;
    padding: 10px 0;
    .list_title {
      width: 100%;
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #CED3D9;
      line-height: 28px;
      padding: 10px 0;
      li {
        width: 160px;
        &:nth-child(2){
          >div{
            display: none;
          }
        }
        &:nth-child(2),&:nth-child(3),&:nth-child(5){
          text-align: center;
        }
        &:nth-child(4){
          width: 200px;
          text-align: center;
        }
        &:nth-child(6){
          width: 250px;
          text-align: center;
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
        padding: 10px 0;
        > span {
          cursor: pointer;
          width: 160px;
          &:nth-child(2),&:nth-child(3),&:nth-child(5){
            text-align: center;
          }
          &:nth-child(4){
            width: 200px;
            text-align: center;
          }
          &:nth-child(6){
            width: 250px;
            text-align: center;
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
          max-width: 2.3rem;
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
        &:nth-child(2),&:nth-child(4){
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
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0.25rem 0;
      > li {
        width: 50%;
        padding:0;
        display: flex;
        justify-content: flex-end;
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
            min-width: 1.42rem;
            margin-bottom: 10px;
            &:nth-child(1) {
              font-size: 0.14rem;
              font-weight: 600;
              line-height: 33px;
            }
            &:nth-child(2) {
              height: 25px;
              .btn_txt {
                width: 78px;
                height: 25px;
                line-height: 25px;
                font-size: 0.16rem;
                margin: 0;
              }
            }
            &:nth-child(3) {
              padding: 20px 0;
            }
            &:nth-child(7) {
              position: relative;
              padding-top: 30px;
              div {
                &:nth-child(1) {
                  cursor: pointer;
                  position: absolute;
                  left: 50px;
                  top: 0;
                }
                &:nth-child(2) {
                  font-size: 0.12rem;
                  font-weight: 500;
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
        li {
          width: 100%;
          display: flex;
          padding: 0;
          flex-direction: column;
          align-items:flex-end;
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
