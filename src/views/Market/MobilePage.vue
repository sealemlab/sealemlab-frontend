<template>
  <div class="mobile_market_page">
    
  </div>
</template>
<script>
import OrderDetails from "./PendingOrderDetails.vue";
import { mapGetters } from "vuex";
import { marketInfo,getSigner,token,getSourceUrl,market,sn,sb,contract } from 'sealemlab-sdk'
export default {
  components: {
    OrderDetails
  },
  computed: {
    ...mapGetters(["getIstrue", "getIsMobile", "isEnLang", "getUserCoin", "getNoticeNum", "getAccount", "getAccountStatus"])
  },
  data () {
    return {
      isOneLoading:false,//第一次是否加载
      loadMoreStatus:true,
      busy: false, // 为true则第一次不执行loadmore

      busdallLoading:true,// busd总的loading
      stallLoading:true,//st总loading
      busdApproveLoading:false,//busd授权loading
      stApproveLoading:false,// st授权loading
      busdApprove:false,//busd是否授权
      stApprove:false,//st是否授权
      priceCoin:'ST',
      NftandBoxarr: { isnft: false, isbox: false, arr: [] },// 选择以后的盲盒或者nft数据
      orderStatus: false,// sell弹窗详情页面状态
      selectAll: false,//全选
      showSelect: false,//展示选择框
      sellPageStatus: true,// sell页面时 为假
      historyStatus: true,// history页面时 为假
      videoStatus: '',
      nftArr: [],
      sortTXT: 'message.market.sortTXT',
      disablehover: false,
      SearchInputvalue: '',
      MinInputvalue: '',
      MaxInputvalue: '',
      arr2: [
        { num: 0, title: "Total volume" },
        { num: 0, title: "Floor price" },
        { num: 0, title: "Items" },
        { num: 0, title: "Transactions" },
        { num: 0, title: "Holders" },
      ],
      coinArr:[
        {title:'ST'},
        {title:'BUSD'}
      ],
      navArr: [
        {
          id: 1,
          title: 'Game',
          showStatus: false,
          arr: [
            {
              title: 'Sacred Realm',
              status: true
            }
          ]
        },
        {
          id: 2,
          title: 'Type',
          showStatus: true,
          arr: [
            {
              title: 'Mystery Box',
              status: false,
              disable:false
            },
            {
              title: 'NFT',
              status: true,
              disable:true
            }
          ]
        },
        {
          id: 3,
          title: 'Price',
          showStatus: false,
          arr: [
            {
              title: 'ST',
              status: false
            },
          ]
        },
        {
          id: 5,
          title: 'Character',
          showStatus: false,
          arr: [
            { title: 'Gladiator', status: false,content:1 },
            { title: 'Assassin', status: false,content:2 },
            { title: 'Wizard', status: false,content:3 },
            { title: 'Fighter', status: false, content:4 }
          ]
        },
        {
          id: 6,
          title: 'Suit',
          showStatus: false,
          arr: [
            { title: 'Sacred light', status: false,content:1 },
            { title: 'Ancient mysteries', status: false,content:2 },
            { title: 'Iron', status: false,content:3 },
            { title: 'Conquerors silence', status: false,content:4 }
          ]
        },
        {
          id: 7,
          title: 'Part',
          showStatus: false,
          arr: [
            { title: 'Weapon', status: false,content:1},
            { title: 'Helm', status: false,content:2},
            { title: 'Plate', status: false,content:3},
            { title: 'Gauntlet', status: false,content:4},
            { title: 'Boots', status: false,content:5},
            { title: 'Belt', status: false,content:6},
            { title: 'Necklace', status: false,content:7},
            { title: 'Ring', status: false,content:8},
          ]
        },
        {
          id: 8,
          title: 'Stars',
          showStatus: false,
          arr: [
            { title: '4', status: false,content:4 },
            { title: '5', status: false,content:5 },
            { title: '6', status: false,content:6 },
            { title: '7', status: false,content:7},
            { title: '8', status: false,content:8 },
          ]
        },
        {
          id: 9,
          title: 'Rarity',
          showStatus: false,
          arr: [
            { title: 'Normal', status: false,content:1 },
            { title: 'Medium', status: false,content:2 },
            { title: 'Rare', status: false,content:3 },
            { title: 'Epic', status: false,content:4 },
            { title: 'Legend', status: false,content:5 }
          ]
        }
      ],
      historyArr: [
        {
          id: 1,
          title: 'Game',
          showStatus: true,
          arr: [
            {
              title: 'Sacred Realm',
              status: true
            }
          ]
        },
        {
          id: 2,
          title: 'Selling'
        },
        {
          id: 3,
          title: 'Selled'
        },
        {
          id: 4,
          title: 'Bought'
        },
      ],
      selectArr: [],
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
      userNftAndBoxArr:[],//获取回来用户的盒子跟nft信息数组
      filterInfo:{
        type:'',
        children:'',
        value:''
      }, //左侧菜单栏 筛选时候传的信息
      dataInfo:{
        first: 4,
        skip: 0,
        orderBy: 'transactions',
        orderDirection: 'desc',
        nft: '',
        token: '',
      },
      navOldArr:[
        {
          id: 1,
          title: 'Game',
          showStatus: false,
          arr: [
            {
              title: 'Sacred Realm',
              status: true
            }
          ]
        },
        {
          id: 2,
          title: 'Type',
          showStatus: true,
          arr: [
            {
              title: 'Mystery Box',
              status: false,
              disable:false
            },
            {
              title: 'NFT',
              status: true,
              disable:true
            }
          ]
        },
        {
          id: 3,
          title: 'Price',
          showStatus: false,
          arr: [
            {
              title: 'ST',
              status: false
            },
          ]
        },
        {
          id: 5,
          title: 'Character',
          showStatus: false,
          arr: [
            { title: 'Gladiator', status: false,content:1 },
            { title: 'Assassin', status: false,content:2 },
            { title: 'Wizard', status: false,content:3 },
            { title: 'Fighter', status: false, content:4 }
          ]
        },
        {
          id: 6,
          title: 'Suit',
          showStatus: false,
          arr: [
            { title: 'Sacred light', status: false,content:1 },
            { title: 'Ancient mysteries', status: false,content:2 },
            { title: 'Iron', status: false,content:3 },
            { title: 'Conquerors silence', status: false,content:4 }
          ]
        },
        {
          id: 7,
          title: 'Part',
          showStatus: false,
          arr: [
            { title: 'Weapon', status: false,content:1},
            { title: 'Helm', status: false,content:2},
            { title: 'Plate', status: false,content:3},
            { title: 'Gauntlet', status: false,content:4},
            { title: 'Boots', status: false,content:5},
            { title: 'Belt', status: false,content:6},
            { title: 'Necklace', status: false,content:7},
            { title: 'Ring', status: false,content:8},
          ]
        },
        {
          id: 8,
          title: 'Stars',
          showStatus: false,
          arr: [
            { title: '4', status: false,content:4 },
            { title: '5', status: false,content:5 },
            { title: '6', status: false,content:6 },
            { title: '7', status: false,content:7},
            { title: '8', status: false,content:8 },
          ]
        },
        {
          id: 9,
          title: 'Rarity',
          showStatus: false,
          arr: [
            { title: 'Normal', status: false,content:1 },
            { title: 'Medium', status: false,content:2 },
            { title: 'Rare', status: false,content:3 },
            { title: 'Epic', status: false,content:4 },
            { title: 'Legend', status: false,content:5 }
          ]
      }]
    }
  },
  watch: {
    'getAccountStatus': {
      handler: function (newValue) {
        if (newValue == 0) {
          this.loadMoreStatus = true
          this.integrationBoxAnsNft() // 获取用户的nft跟盒子
          this.isApproveFunPage() // 是否授权
        } else if (newValue > 0) {
          this.loadMoreStatus = true
          localStorage.removeItem('nftInfo')
          this.nftArr = []
          this.$utils.antiShakeFun(() => {
            this.integrationBoxAnsNft()
            this.isApproveFunPage()
          }, 2000)()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 用户购买nft或者盒子
    userBuyFun(item){
      // console.log('item: ', item);
      if(item.isnft){
        sn().ownerOf(item.nftId).then(res => {
          // console.log('res: ', res);
          if(res != contract().Market){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_out'}));
          }else{
            // console.log("买盒子")
            if(item.buyloading)return
            item.buyloading = true
            this.sdkBuyFun(item)
          }
        })
      }else{
        // console.log("买盒子")
        sb().ownerOf(item.nftId).then(res => {
          // console.log('res: ', res);
          if(res != contract().Market){
            this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_sell_out'}));
          }else{
            if(item.buyloading)return
            item.buyloading = true
            this.sdkBuyFun(item)
          }
        })
      }
    },
    // sdk方法买盒子
    sdkBuyFun(item){
      market().connect(getSigner()).buy([item.nft],[item.nftId],localStorage.getItem('Invitee')).then(async res1 => {
        // console.log('用户购买nft或者盒子res: ', res1);
        const etReceipt = await res1.wait();
        if(etReceipt.status == 1){
          this.$store.commit("setNoticeStatus", JSON.stringify({'status':true,'word':'message.tip.self_txt7'}));
          item.buyloading = false
        }else{
          item.buyloading = false
        }
      }).catch(() => {
        item.buyloading = false
      })
    },
    goSellFun () {
      this.NftandBoxarr.isnft = this.NftandBoxarr.isbox = false
      this.NftandBoxarr.arr = []
      this.nftArr.forEach(item => {
        if (item.selectStatus) {
          this.NftandBoxarr.arr.push(item)
          if (item.isnft) {
            this.NftandBoxarr.isnft = true
          } else {
            this.NftandBoxarr.isbox = true
          }
        }
      })
      // console.log('this.NftandBoxarr: ', this.NftandBoxarr);
      if (this.NftandBoxarr.arr.length > 0) {
        this.orderStatus = true
      } else {
        this.$store.commit("setNoticeStatus", JSON.stringify({ 'status': true, 'word': 'message.tip.self_select' }));
      }
    },
    // 进入histor页面
    historyClick () {
      this.historyStatus = false
    },
    historyNavClick(item,index){
      console.log('item,index: ', item,index);
      switch(item.id){
        case 2:
          console.log('id--2');
          break;
        case 3:
          console.log('id--3');
          break;
        case 4:
          console.log('id--4');
          break;
        default:
          break;
      }
    },
    showItem (item) {
      item.showStatus = !item.showStatus
    },
    itemClick (item, item1, index) {
      item.arr.forEach(element => {
        element.status = false
      });
      switch(item.id){
        case 1:
          console.log("id为1")
          item1.status = true
          return
        case 2:
          console.log("id为2")
          if(index == 0){
            item1.status = true
            if(item1.disable)return
            item1.disable = true
            this.navArr[1].arr[1].disable = false

            this.deleteItem('box')
            this.navArr.push({id: 4,title: 'Mystery Box',showStatus: false,arr: [{ title: 'Common mystery box',status:true }]},)
            
            if(!this.sellPageStatus){
              this.clearStstus()
              this.filterArr(Object.assign(this.filterInfo,{type:'box',children:'',value:''}))
            }else{
              this.sortObj.nft = (token().SB).toLowerCase()
              this.sortObj.token = (token()[this.priceCoin]).toLowerCase()
              this.encapsulationFun()

              this.dataInfo.nft = (token().SB).toLowerCase()
              this.dataInfo.token = (token()[this.priceCoin]).toLowerCase()
              this.getMarketStatistics(this.dataInfo)

              let newSortObj = JSON.parse(JSON.stringify(this.sortObj))
              this.getMarketInfo(Object.assign(newSortObj,{orderBy: "price", orderDirection: "asc"})).then(newres => {
                if(newres.status == 1){
                  this.arr2[1].num = 0.00
                }else{
                  this.arr2[1].num = newres.arr[0].price
                }
              }).catch(() => {
                this.arr2[1].num = 0.00
              })
            }
          }else if(index == 1){
            item1.status = true
            this.navArr[1].arr[0].disable = false
            if(item1.disable)return
            item1.disable = true

            this.deleteItem('nft')
            this.navArr.push(
              {
                id: 5,
                title: 'Character',
                showStatus: false,
                arr: [
                  { title: 'Gladiator', status: false,content:1 },
                  { title: 'Assassin', status: false,content:2 },
                  { title: 'Wizard', status: false,content:3 },
                  { title: 'Fighter', status: false, content:4 }
                ]
              },
              {
                id: 6,
                title: 'Suit',
                showStatus: false,
                arr: [
                  { title: 'Sacred light', status: false,content:1 },
                  { title: 'Ancient mysteries', status: false,content:2 },
                  { title: 'Iron', status: false,content:3 },
                  { title: 'Conquerors silence', status: false,content:4 }
                ]
              },
              {
                id: 7,
                title: 'Part',
                showStatus: false,
                arr: [
                  { title: 'Weapon', status: false,content:1},
                  { title: 'Helm', status: false,content:2},
                  { title: 'Plate', status: false,content:3},
                  { title: 'Gauntlet', status: false,content:4},
                  { title: 'Boots', status: false,content:5},
                  { title: 'Belt', status: false,content:6},
                  { title: 'Necklace', status: false,content:7},
                  { title: 'Ring', status: false,content:8},
                ]
              },
              {
                id: 8,
                title: 'Stars',
                showStatus: false,
                arr: [
                  { title: '4', status: false,content:4 },
                  { title: '5', status: false,content:5 },
                  { title: '6', status: false,content:6 },
                  { title: '7', status: false,content:7},
                  { title: '8', status: false,content:8 },
                ]
              },
              {
                id: 9,
                title: 'Rarity',
                showStatus: false,
                arr: [
                  { title: 'Normal', status: false,content:1 },
                  { title: 'Medium', status: false,content:2 },
                  { title: 'Rare', status: false,content:3 },
                  { title: 'Epic', status: false,content:4 },
                  { title: 'Legend', status: false,content:5 }
                ]
              },
            )
            
            if(!this.sellPageStatus){
              this.clearStstus()
              this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'',value:''}))
            }else{
              this.sortObj.nft = (token().SN).toLowerCase()
              this.sortObj.token = (token()[this.priceCoin]).toLowerCase()
              this.encapsulationFun()
              
              this.dataInfo.nft = (token().SN).toLowerCase()
              this.dataInfo.token = (token()[this.priceCoin]).toLowerCase()
              this.getMarketStatistics(this.dataInfo)
  
              let newSortObj = JSON.parse(JSON.stringify(this.sortObj))
              this.getMarketInfo(Object.assign(newSortObj,{orderBy: "price", orderDirection: "asc"})).then(newres => {
                if(newres.status == 1){
                  this.arr2[1].num = 0.00
                }else{
                  this.arr2[1].num = newres.arr[0].price
                }
              }).catch(() => {
                this.arr2[1].num = 0.00
              })
            }
            
          }
          break;
        case 3:
          console.log("id为3")
          break;
        case 4:// 盒子类型
          console.log("id为4")
          item1.status = true
          return
        case 5://英雄
          console.log("id为5")
          this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'role',value:item1.content}))
          this.sortObj.role = item1.content
          this.encapsulationFun()
          break;
        case 6:// 套装
          console.log("id为6")
          this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'suit',value:item1.content}))
          this.sortObj.suit = item1.content
          this.encapsulationFun()
          break;
        case 7:// 部位
          console.log("id为7")
          this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'part',value:item1.content}))
          this.sortObj.part = item1.content
          this.encapsulationFun()
          break;
        case 8://星级
          console.log("id为8")
          this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'stars',value:item1.content}))
          this.sortObj.stars = item1.content
          this.encapsulationFun()
          break;
        case 9:// 稀有度
          console.log("id为9")
          this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'power',value:item1.content}))
          this.sortObj.rarity = item1.content
          this.encapsulationFun()
          break;
        default:
          break;
      }
      this.addSelect(item,item1,index)
      item1.status = true
    },
    // 添加筛选项(带x的,可以关闭)
    addSelect(item,item1,index){
      this.selectArr.forEach((data, index) => {
        if (data.id == item.id) {
          this.selectArr.splice(index, 1)
        }
      })
      let obj = {}
      obj.title = item1.title
      obj.id = item.id
      obj.index = index
      obj.selectItem = true
      this.selectArr.unshift(obj)
    },
    // 删除nft/box 所对应的子选项
    deleteItem(type){
      if(type == 'box'){
        this.navArr.forEach((ele, i) => {
          if (ele.id == 5) {
            this.navArr.splice(i, 5)
          }
        })
      }else if(type == 'nft'){
        this.navArr.forEach((ele, i) => {
          if (ele.id == 4) {
            this.navArr.splice(i, 1)
          }
        })
      }
    },
    // 筛选展示对应的数组
    filterArr(filterInfo){
      if(!this.sellPageStatus){
        if(filterInfo.type == 'box'){
          let need_boxArr = this.userNftAndBoxArr.filter(item => {
            return !item.isnft
          })
          this.nftArr = need_boxArr
        }
        if(filterInfo.type == 'nft'){
          let need_NftArr = this.userNftAndBoxArr.filter(item => {
            return item.isnft
          })
          if(!filterInfo.children){
            this.nftArr = need_NftArr
          }else{
            this.nftArr = need_NftArr.filter(item => {
              return item[filterInfo.children] == filterInfo.value
            })
          }
        }
      }
    },
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
    closeSelect (item, index) {
      // console.log('item, index: ', item, index);
      if (item.selectItem) {
        this.navArr.forEach(ele => {
          if (ele.id == item.id) {
            ele.arr[item.index].status = false
          }
        })
      }
      if (item.id == 2) {
        this.navArr.forEach((a, i) => {
          if (a.id == 4) {
            this.navArr.splice(i, 1)
          }
          if (a.id == 5) {
            this.navArr.splice(i, 5)
          }
        })
        if(!this.sellPageStatus){
          this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'',value:''}))
        }
      }
      this.selectArr.splice(index, 1)
    },
    clearBtn () {
      this.selectArr = []
      this.navArr = JSON.parse(JSON.stringify(this.navOldArr))
      if(!this.sellPageStatus){
        this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'',value:''}))
      }else{
        this.sortObj = {
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
        }
        this.encapsulationFun()
      }
    },
    sortClik (data) {
      this.disablehover = true;
      setTimeout(() => {
        this.disablehover = false;
      }, 600);
      this.sortTXT = data.name
      switch (data.describe) {
        case "time_desc":
          this.sortObj.orderBy = "sellTime";
          this.sortObj.orderDirection = "desc";
          this.encapsulationFun()
          break;
        case "time_asc":
          this.sortObj.orderBy = "sellTime";
          this.sortObj.orderDirection = "asc";
          this.encapsulationFun()
          break;
        case "price_desc":
          this.sortObj.orderBy = "price";
          this.sortObj.orderDirection = "desc";
          this.encapsulationFun()
          break;
        case "price_asc":
          this.sortObj.orderBy = "price";
          this.sortObj.orderDirection = "asc";
          this.encapsulationFun()
          break;
        case "start_desc":
          this.sortObj.orderBy = "stars";
          this.sortObj.orderDirection = "desc";
          this.encapsulationFun()
          break;
        case "start_asc":
          this.sortObj.orderBy = "stars";
          this.sortObj.orderDirection = "asc";
          this.encapsulationFun()
          break;
        case "rarity_desc":
          this.sortObj.orderBy = "rarity";
          this.sortObj.orderDirection = "desc";
          this.encapsulationFun()
          break;
        case "rarity_asc":
          this.sortObj.orderBy = "rarity";
          this.sortObj.orderDirection = "asc";
          this.encapsulationFun()
          break;
        default:
          break;
      }
    },
    selectCoin(data) {
      this.disablehover = true;
      setTimeout(() => {
        this.disablehover = false;
      }, 600);

      this.priceCoin = data.title
      this.sortObj.token = (token()[this.priceCoin]).toLowerCase()
      this.encapsulationFun()

      this.dataInfo.token = (token()[this.priceCoin]).toLowerCase()
      this.getMarketStatistics(this.dataInfo)

      let newSortObj = JSON.parse(JSON.stringify(this.sortObj))
      this.getMarketInfo(Object.assign(newSortObj,{orderBy: "price", orderDirection: "asc"})).then(newres => {
        // console.log('newres: ', newres);
        if(newres.status == 1){
          this.arr2[1].num = 0.00
        }else{
          this.arr2[1].num = newres.arr[0].price
        }
      }).catch(() => {
        this.arr2[1].num = 0.00
      })
    },
    nftFun (item) {
      if (this.showSelect) {
        item.selectStatus = !item.selectStatus
      } else {
        if (item.isnft) {
          this.videoStatus = true
          this.videoSrc = item.videoSrc
        }
      }
    },
    sellPageClick () {
      this.sellPageStatus = false
      this.filterArr(Object.assign(this.filterInfo,{type:'nft',children:'',value:''}))
      this.clearBtn()
    },
    inputAppply(){
      this.selectArr.forEach((item,i) => {
        if(item.priceStatus){
          this.selectArr.splice(i,1)
        }
      })
      let obj = {}
      obj.priceStatus = true
      obj.title = this.priceCoin + ' Min: ' + this.MinInputvalue + ' to ' + 'Max: ' + this.MaxInputvalue
      this.selectArr.unshift(obj)

      this.sortObj.price_gte = this.MinInputvalue
      this.sortObj.price_lte = this.MaxInputvalue
      this.sortObj.token = (token()[this.priceCoin]).toLowerCase()
      this.encapsulationFun()
    },
    // 全选按钮
    selectAllClick(){
      this.selectAll = !this.selectAll
      if(this.selectAll){
        this.showSelect = true
        this.nftArr.forEach(item => {
          item.showSelect = true
          item.selectStatus = true
        })
      }else{
        this.showSelect = false
        this.nftArr.forEach(item => {
          item.showSelect = false
          item.selectStatus = false
        })
      }
    },
    // 是否展示选择框方法
    showSelectClick () {
      this.showSelect = !this.showSelect
      this.selectAll = false
      this.nftArr.forEach(item => {
        item.showSelect = this.showSelect
        item.selectStatus = false
      })
    },
    // 清空挂单时候选择的选择框以及 按钮的选中状态
    clearStstus(){
      this.selectAll = this.showSelect = false
      this.nftArr.forEach(item => {
        item.showSelect = false
        item.selectStatus = false
      })
    },
    enterClick(){
      // console.log('enter事件')
      this.selectArr.forEach((item,i) => {
        if(item.searchStatus){
          this.selectArr.splice(i,1)
        }
      })
      let obj = {}
      obj.searchStatus = true
      obj.title = this.SearchInputvalue
      this.selectArr.unshift(obj)
    },
    // 返回市场页面
    backClick () {
      this.clearBtn()
      this.showSelect = false
      this.sellPageStatus = this.historyStatus = true
      this.navArr = this.navOldArr
      this.sortObj = {
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
      }
      this.encapsulationFun()
    },
    closeOrder (data) {
      if (data) {
        // this.nftArr.forEach(item => {
        //   item.showSelect = true
        //   item.selectStatus = false
        // })
        this.integrationBoxAnsNft()
      }
      this.orderStatus = false
    },
    // 整合盲盒数据跟nft数据
    integrationBoxAnsNft () {
      this.userNftAndBoxArr = []
      let userBoxArr = JSON.parse(sessionStorage.getItem("setBoxInfo"))
      let userNftArr = JSON.parse(localStorage.getItem("nftInfo"))
      if (userNftArr) {
        sn().tokensOfOwnerBySize(this.getAccount, 0, 100000000).then(res2 => {
          // console.log("公共函数:获取用户的装备信息:",res2)
          if(userNftArr.length != res2[0].length){
            this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res3 => {
              this.userNftAndBoxArr =  res3.concat(userBoxArr)
            })
          }else{
            this.userNftAndBoxArr =  userNftArr.concat(userBoxArr)
          }
          // this.loadMoreStatus = false
        })
      } else {
        this.$utils.getUserBindbox(this.getAccount, 0, 10000000).then(res => {
          // console.log('用户有的总的nft的数量res: ', res);
          if (res.length > 0) {
            this.userNftAndBoxArr = res.concat(userBoxArr)
            localStorage.setItem('nftInfo', JSON.stringify(res))
            // this.loadMoreStatus = false
          } else {
            this.userNftAndBoxArr = userBoxArr
            // this.loadMoreStatus = false
          }
        })
      }
    },
    // 获取市场信息
    getMarketInfo(sortObj){
      // console.log('直接给sdk传的参数sortObj: ', sortObj);
      return new Promise(resolve => {
        marketInfo.getSellInfos(
          sortObj.first,
          sortObj.skip,
          sortObj.orderBy,
          sortObj.orderDirection,
          sortObj.seller,
          sortObj.nft,
          sortObj.token,
          sortObj.price_gte,
          sortObj.price_lte,
          sortObj.stars,
          sortObj.rarity,
          sortObj.role,
          sortObj.part,
          sortObj.suit,
          sortObj.boxType
          ).then(res => {
          // console.log('sdk获取市场NFT成交信息res: ', res);
          if (res.data.sellInfos.length > 0) {
            const arr = JSON.parse(JSON.stringify(res.data.sellInfos));
            arr.forEach((element) => {
              element.price = util.formatEther(element.price) //this.$utils.convertBigNumberToNormal(Number(element.price),0,18,true)
              element.isnft = (element.nft).toLowerCase() == (token('production').SN).toLowerCase()?true:false
              element.buyloading = false
              if((element.token).toLowerCase() == (token().ST).toLowerCase()){
                element.price_currency = 'ST'
              }else if((element.token).toLowerCase() == (token().BUSD).toLowerCase()){
                element.price_currency = 'BUSD'
              }else{
                element.price_currency = '0X'
              }
              if(element.isnft){
                element.src = getSourceUrl([element.stars,element.power,element.role,element.part,element.suit]) + '.png'
                element.videoSrc = getSourceUrl([element.stars,element.power,element.role,element.part,element.suit]) + '.mp4'
              }else{
                element.title = 'Mysterybox'
                element.src = '//cdn.sealemlab.com/sealemlab_assets_test/images/mybox1.webp'
              }
            });
            resolve({ status: 0, arr: arr, msg: "Success" });
          } else {
            resolve({ status: 1, msg: "No data" });
          }
        })
      })
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
    // 加载更多
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus && this.isOneLoading) {
        // console.log("loadmore加载更多")
        this.encapsulationFun(false)
      }
    },
    // 排序--筛选--封装函数
    encapsulationFun(istrue = true){
      // console.log("筛选")
      if(!this.sellPageStatus)return
      if(istrue){
        this.sortObj.skip = 0
        this.nftArr = []
      }
      this.loadMoreStatus = true
      this.getMarketInfo(this.sortObj).then((res) => {

        console.log('筛选以后的结果res: ', res);
        this.sortObj.skip += this.sortObj.first;
        istrue = false
        if (res.status == 0) {
          this.nftArr = this.nftArr.concat(res.arr)
          this.loadMoreStatus = true
          this.isOneLoading = true
          this.busy = false
        } else if (res.status == 1) {
          this.loadMoreStatus = false
          this.isOneLoading = false
          this.busy = true
        }
      }).catch(() => {
        this.nftArr = [];
        this.isOneLoading = false
        this.busy = true
      });
    },
    // 市场的统计信息
    getMarketStatistics(obj){
      if(!this.sellPageStatus)return
      marketInfo.getCounters(obj.first,
      obj.skip,
      obj.orderBy,
      obj.orderDirection,
      obj.nft,
      obj.token).then(res => {
        // console.log('获取市场NFT统计信息res: ', res);

        this.arr2[3].num = res.data.counters[0].transactions
        this.arr2[2].num = res.data.counters[0].items
        this.arr2[0].num = res.data.counters[0].volume / 1e18
      }).catch(() => {
        console.log('市场统计信息err: ');
      })
    }
  },
  mounted(){
    this.encapsulationFun(false)

    // 地板价
    this.getMarketInfo({
        first: 8, //查询结果数量，比如填10，就展示前10个结果
        skip: 0, //跳过结果数量，用于分页，比如填50，相当于从第6页开始
        orderBy: "price", // 排序字段，填字段名，所有字段见下文查询结果
        orderDirection: "asc", // 降序or升序，填desc或asc
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
      }).then(newres => {
        if(newres.status == 1){
          this.arr2[1].num = 0.00
        }else{
          this.arr2[1].num = newres.arr[0].price
        }
      }).catch(() => {
        this.arr2[1].num = 0.00
      })
    // 市场统计 ----
    this.dataInfo.nft = (token().SN).toLowerCase()
    this.dataInfo.token = (token()[this.priceCoin]).toLowerCase()
    this.getMarketStatistics(this.dataInfo)
  }
}
</script>
<style lang="scss" scoped>
.mobile_market_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  
}
@media screen and (max-width: 980px) {
  .mobile_market_page {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>