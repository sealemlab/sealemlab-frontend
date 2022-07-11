<template>
  <div class="mobile_market_page">
    <!-- 背景图 -->
    <div class="bg_">
      <div class="change_txt font35 mobile_font28" :class="isEnLang ? 'en_heavy' : ''">
        <span v-if="sellPageStatus && historyStatus">Welcome to NFTs mark</span>
        <span v-else-if="!sellPageStatus">Sell</span>
        <span v-else-if="!historyStatus">History</span>
      </div>
    </div>
    <!-- 数据总结 -->
    <div class="data_display">
      <div class="onebox" v-for="(item, index) in arr2" :key="index">
        <span class="font24" :class="isEnLang ? 'en_Bold' : ''" v-if="index == 0 || index == 1">$ {{
          item.num | PriceConversion
        }}</span>
        <span class="font24" :class="isEnLang ? 'en_Bold' : ''" v-else>{{
          item.num
        }}</span>
        <span class="font16" :class="isEnLang ? 'en_medium' : ''">{{
          item.title
        }}</span>
      </div>
    </div>
    <div class="mobile_top">
      <!-- 筛选 -->
      <div class="filter_box">
        <svg
          t="1655286410673"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="57945"
          :width="getIsMobile ? 16 : 32"
          :height="getIsMobile ? 16 : 32"
        >
          <path
            d="M671.631 408.599v588.449c0 14.892-13.109 26.952-29.285 26.952-16.175 0-29.285-12.061-29.285-26.952V403.949c0-0.864 0.189-1.683 0.274-2.527-0.852-7.057 1.453-14.386 7.247-20.078L886.709 120.14c-5.188-38.51-42.206-68.378-87.168-68.378v-0.352c-1.305 0.157-2.597 0.352-3.953 0.352H151.32c-1.676 0-3.289-0.197-4.884-0.435v0.435c-44.963 0-81.981 29.869-87.168 68.378l266.126 261.204c5.691 5.585 8.031 12.748 7.31 19.683 0.051 0.622 0.211 1.213 0.211 1.845v362.327c0 14.295-13.115 25.881-29.285 25.881-16.175 0-29.285-11.586-29.285-25.881V408.594L7.532 146.72c-0.435-0.427-0.732-0.917-1.133-1.362-0.641-0.718-1.275-1.431-1.83-2.207-0.503-0.713-0.921-1.446-1.344-2.189-0.429-0.753-0.852-1.501-1.195-2.295-0.354-0.821-0.618-1.65-0.875-2.492-0.24-0.776-0.48-1.542-0.635-2.346-0.183-0.933-0.258-1.868-0.32-2.811-0.04-0.544-0.189-1.062-0.189-1.615C0.011 57.938 65.57 0 146.436 0v0.435C148.032 0.197 149.644 0 151.32 0h644.268c1.356 0 2.648 0.195 3.953 0.351V0c80.865 0 146.419 57.938 146.419 129.403 0 0.553-0.144 1.071-0.184 1.617-0.068 0.943-0.137 1.878-0.32 2.811-0.16 0.804-0.4 1.57-0.635 2.346-0.258 0.841-0.521 1.67-0.875 2.492-0.349 0.794-0.772 1.542-1.201 2.295-0.418 0.743-0.835 1.476-1.344 2.189-0.556 0.776-1.185 1.488-1.831 2.207-0.395 0.444-0.691 0.935-1.126 1.362L671.631 408.599z m59.53 33.958c0 14.295 13.11 25.881 29.285 25.881h234.279c16.176 0 29.285-11.586 29.285-25.881s-13.109-25.88-29.285-25.88H760.447c-16.175 0-29.286 11.585-29.286 25.88z m29.28 291.586h234.279c16.176 0 29.285-11.585 29.285-25.88s-13.109-25.881-29.285-25.881H760.441c-16.175 0-29.285 11.586-29.285 25.881s13.11 25.88 29.285 25.88z m234.285 238.096H760.447c-16.175 0-29.285 11.585-29.285 25.88S744.272 1024 760.447 1024h234.279c16.176 0 29.285-11.586 29.285-25.881s-13.109-25.88-29.285-25.88z"
            fill="#CED3D9"
            p-id="57946"
          ></path>
        </svg>
        <span class="mobile_font14" :class="isEnLang ? 'en_Bold' : ''">Filter</span>
      </div>
      <!-- 排序 -->
      <div class="sort_box" :class="[disablehover ? 'clear_hover' : '']">
        <span class="mobile_font14" :class="isEnLang ? 'en_medium' : ''">{{ $t(sortTXT) }}</span>
        <svg
          t="1654321191240"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2336"
          width="16"
          height="16"
        >
          <path
            d="M454.188 785.022c-145.192-150.177-290.378-300.353-435.422-450.526-59.842-61.836 37.327-154.021 97.313-91.899 129.23 133.647 258.318 267.296 387.548 400.868 133.646-134.287 267.436-268.574 401.083-402.934 60.84-61.123 158.011 31.060 97.244 91.971-150.105 150.89-300.279 301.703-450.454 452.521-24.933 24.934-72.666 25.575-97.311 0z"
            p-id="2337"
            fill="#CED3D9"
          ></path>
        </svg>
        <div class="left_content_hover">
          <span
            class="span1 mobile_font14"
            v-for="(ele, index1) in sortByArr"
            :key="index1"
            @click="sortClik(ele)"
          >
            {{ $t(ele.name) }}
          </span>
        </div>
      </div>
      <!-- sell 按钮 -->
      <div class="sell_btn btn_normal mobile_font14" :class="isEnLang ? 'en_Bold' : ''" @click="SellClick">Sell</div>
    </div>
    <div class="mobile_bottom">
      <div class="seach mobile_font14" :class="isEnLang ? 'en_medium' : ''">
        <svg
          t="1655113375644"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="17389"
          width="16"
          height="16"
        >
          <path
            d="M953.474215 908.234504l-152.576516-163.241391c61.92508-74.48211 95.81186-167.36973 95.81186-265.073744 0-229.294809-186.63531-415.930119-416.102133-415.930119-229.294809 0-415.930119 186.63531-415.930119 415.930119s186.63531 415.930119 415.930119 415.930119c60.032925 0 118.00168-12.55703 172.186125-37.327062 16.169326-7.396607 23.221905-26.318159 15.825298-42.315471-7.396607-16.169326-26.318159-23.221905-42.315471-15.825298-45.927768 20.813707-94.951789 31.478582-145.695952 31.478582-194.031917 0-351.94087-157.908953-351.94087-351.94087 0-194.031917 157.908953-351.94087 351.94087-351.94087 194.031917 0 351.94087 157.908953 351.94087 351.94087 0 91.339493-34.918864 177.86259-98.048043 243.743995-12.213002 12.729044-11.868974 33.026709 0.860071 45.239711 1.032085 0.860071 2.236183 1.204099 3.268268 2.064169 0.860071 1.204099 1.376113 2.752226 2.408198 3.956325l165.477574 177.00252c6.192508 6.70855 14.793214 10.148833 23.393919 10.148833 7.912649 0 15.653284-2.92424 21.845792-8.600706C964.827146 941.433227 965.515202 921.135562 953.474215 908.234504z"
            p-id="17390"
            fill="#CED3D9"
          ></path>
        </svg>
        <div class="inputbox">
          <Input
            :fontSize="'14px'"
            :modelValue="SearchInputvalue"
            type="number"
            :placeholder="$t('message.market.txt1')"
            @input="InputClick('search',$event)"
          ></Input>
        </div>
      </div>
      <!-- history 按钮 -->
      <div class="sell_btn btn_normal mobile_font14" :class="isEnLang ? 'en_Bold' : ''">History</div>
    </div>
    <div class="mobile_select" v-if="showSelectStatus">
      <!-- 选择框 -->
      <div
        @click="singleChoiceFun"
        class="sell_content font16"
        :class="isEnLang ? 'en_medium' : ''"
      >
        <div class="radious">
          <div v-if="singleChoice"></div>
        </div>
        Multi-Select
      </div>
      <!-- 全选 -->
      <div
        @click="selectAllClick"
        class="sell_content font16"
        :class="isEnLang ? 'en_medium' : ''"
      >
        <div class="radious">
          <div v-if="selectAll"></div>
        </div>
        Select all/Unselect
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { marketInfo,getSigner,token,getSourceUrl,market,sn,sb,contract } from 'sealemlab-sdk'
export default {
  computed: {
    ...mapGetters(["getIstrue", "getIsMobile", "isEnLang", "getUserCoin", "getNoticeNum", "getAccount", "getAccountStatus"])
  },
  data () {
    return {
      sellPageStatus: true,// sell页面时 为假
      historyStatus: true,// history页面时 为假
      SearchInputvalue:'',
      sortTXT: 'message.market.sortTXT',
      disablehover: false,
      sortByArr: [
        { name: "message.market.txt17", describe: "time_desc" },//最新上架
        { name: "message.market.txt17_1", describe: "time_asc" },
        { name: "message.market.txt18", describe: "price_desc" },//价格 高到低
        { name: "message.market.txt18_1", describe: "price_asc" },
        { name: "message.market.txt19", describe: "start_desc" },// 星级 高到低
        { name: "message.market.txt19_1", describe: "start_asc" },
        { name: "message.market.txt20", describe: "rarity_desc" },// 稀有度 高到低
        { name: "message.market.txt20_1", describe: "rarity_asc" },
      ],
      sortObj: {
        first: 8, //查询结果数量，比如填10，就展示前10个结果
        skip: 0, //跳过结果数量，用于分页，比如填50，相当于从第6页开始
        orderBy: "sellTime", // 排序字段，填字段名，所有字段见下文查询结果
        orderDirection: "desc", // 降序or升序，填desc或asc
        seller: '',// 卖家地址
        nft:(token().SN).toLowerCase(),//nft地址
        token:(token().ST).toLowerCase(), // 代币地址
        price_gte:'',//最小价格
        price_lte:'',//最大价格
        stars:'',
        rarity: '',
        role: '',//职业
        part: '',//部位
        suit: '',//套装
        boxType:'',//盲盒类型
      },
      arr2: [
        { num: 0, title: "Total volume" },
        { num: 0, title: "Floor price" },
        { num: 0, title: "Items" },
        { num: 0, title: "Transactions" },
        { num: 0, title: "Holders" },
      ],
      showSelect:false,
      selectAll:false,//全选按钮
      showSelectStatus:false,// 点击sell 展示选择框
      singleChoice:false,// 选择框选中状态
    }
  },
  methods:{
    InputClick(type,data){
      if(type == 'mint'){
        this.MinInputvalue = data
      }
      if(type == 'max'){
        this.MaxInputvalue = data
      }
      if(type == 'search'){
        this.SearchInputvalue = data
      }
    },
    sortClik (data) {
      this.disablehover = true;
      setTimeout(() => {
        this.disablehover = false;
      }, 600);
      this.sortTXT = data.name
      // switch (data.describe) {
      //   case "time_desc":
      //     this.sortObj.orderBy = "sellTime";
      //     this.sortObj.orderDirection = "desc";
      //     this.encapsulationFun()
      //     break;
      //   case "time_asc":
      //     this.sortObj.orderBy = "sellTime";
      //     this.sortObj.orderDirection = "asc";
      //     this.encapsulationFun()
      //     break;
      //   case "price_desc":
      //     this.sortObj.orderBy = "price";
      //     this.sortObj.orderDirection = "desc";
      //     this.encapsulationFun()
      //     break;
      //   case "price_asc":
      //     this.sortObj.orderBy = "price";
      //     this.sortObj.orderDirection = "asc";
      //     this.encapsulationFun()
      //     break;
      //   case "start_desc":
      //     this.sortObj.orderBy = "stars";
      //     this.sortObj.orderDirection = "desc";
      //     this.encapsulationFun()
      //     break;
      //   case "start_asc":
      //     this.sortObj.orderBy = "stars";
      //     this.sortObj.orderDirection = "asc";
      //     this.encapsulationFun()
      //     break;
      //   case "rarity_desc":
      //     this.sortObj.orderBy = "rarity";
      //     this.sortObj.orderDirection = "desc";
      //     this.encapsulationFun()
      //     break;
      //   case "rarity_asc":
      //     this.sortObj.orderBy = "rarity";
      //     this.sortObj.orderDirection = "asc";
      //     this.encapsulationFun()
      //     break;
      //   default:
      //     break;
      // }
    },
    // 展示选择框
    SellClick(){
      this.showSelectStatus = true
      this.selectAll = false
    },
    // 选择框选中状态
    singleChoiceFun(){
      this.singleChoice = !this.singleChoice
    },
    //全选
    selectAllClick(){
      this.selectAll = !this.selectAll
      this.singleChoice = this.selectAll
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile_market_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  .bg_ {
    width: 100%;
    min-height: 1.3rem;
    background: url($bg_url + "marketbg.webp") no-repeat #000;
    background-size:100% 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .change_txt {
      line-height: 0.4rem;
    }
  }
  .data_display {
    width: 100%;
    margin: 0.25rem auto;
    display: flex;
    flex-wrap: wrap;
    .onebox {
      width: 33%;
      display: flex;
      flex-direction: column;
      margin-right: 0;
      margin-bottom: 0.15rem;
      span {
        &:nth-child(1) {
          font-weight: bold;
          color: #ced3d9;
          line-height: 29px;
        }
        &:nth-child(2) {
          font-weight: 500;
          color: #ced3d9;
          line-height: 19px;
        }
      }
    }
    .back_img {
      width: 0.3rem;
      cursor: pointer;
    }
  }
  .mobile_top{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .filter_box{
      width: 0.97rem;
      height: 0.35rem;
      background: #171718;
      box-shadow: 0px 20px 20px 0px rgba(0,0,0,0.3900), inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
      border-radius: 0.04rem;
      border: 1px solid #373636;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.08rem;
      span{
        margin-left: 0.1rem;
      }
    }
    .sort_box {
      position: relative;
      width: 1.51rem;
      height: 0.35rem;
      background: #171718;
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
        inset 0px 4px 11px 0px #0d0e0e, inset 0px -1px 7px 0px #0d0e0e;
      border-radius: 0.04rem;
      border: 1px solid #373636;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.09rem;
      span {
        font-weight: 500;
        color: #8f8e8e;
      }
      .left_content_hover {
        position: absolute;
        top: 0;
        left: -1px;
        z-index: 9;
        width: 101.5%;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        background: #171718;
        filter: blur(0px);
        border: 1px solid #373636;
        border-top: none;
        border-radius: 0.04rem;
        padding: 0 0.09rem 0.1rem;
        margin-top: 0.34rem;
        line-height: 39px;
        .span1 {
          cursor: pointer;
        }
      }
      &:hover {
        box-shadow: none;
        border-bottom: none;
        border-radius: 0.04rem 0.04rem 0 0;
        .left_content_hover {
          display: flex;
          border-radius: 0 0 0.04rem 0.04rem;
        }
      }
    }
  }
  .sell_btn {
    cursor: pointer;
    width: 0.69rem;
    height: 0.35rem;
    box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
    border-radius: 0.04rem;
    backdrop-filter: blur(14px);
    text-align: center;
    line-height: 0.35rem;
    font-weight: bold;
  }
  .mobile_bottom{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.1rem;
    .seach {
      width: 77%;
      height: 0.35rem;
      background: #2c2b2b;
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39),
        inset 0px 3px 8px 0px rgba(17, 16, 16, 0.5),
        inset 0px -1px 3px 0px rgba(0, 0, 0, 0.5);
      border-radius: 0.2rem;
      border: 1px solid #373636;
      padding-left: 0.1rem;
      font-weight: 500;
      color: #8f8e8e;
      display: flex;
      align-items: center;
      .inputbox {
        margin-left: 0.05rem;
      }
    }
  }
  .mobile_select{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 23%;
    margin-top: 0.1rem;
    .sell_content {
      display: flex;
      align-items: center;
      cursor: pointer;
      .radious {
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;
        border: 1px solid #eccf83;
        font-weight: 500;
        color: #ced3d9;
        line-height: 0.32rem;
        margin-right: 0.07rem;
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
  }
}
</style>