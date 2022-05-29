<template>
  <div class="assets_page">
    <div class="box display_flex">
      <div class="mobile_menu">
        <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{$t(item.title)}}</div>
      </div>
      <div class="title_box display_flex">
        <div class="address_box display_flex">
          <span class="font32 mobile_font16" :class="isEnLang?'en_Bold':''">0 NFT</span>
          <span class="font16 margin_top" :class="isEnLang?'en_Bold':''">{{$t("message.user.txt7")}}:0x*********</span>
        </div>
        <div class="add_buybtn font16" :class="isEnLang?'en_medium':''">{{$t("message.user.txt17")}}</div>
        <div class="menu display_flex">
          <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{$t(item.title)}}</div>
        </div>
      </div>
      <NftCompontent></NftCompontent>
    </div> 
  </div>
</template>
<script>
import { sn } from "sealemlab-sdk";
import { mapGetters } from "vuex";
import NftCompontent from '@/components/NftCompontent.vue'
export default {
  components:{
    NftCompontent
  },
  computed: {
    ...mapGetters(["getAccount","getIstrue","getAccountStatus","isEnLang"])
  },
  watch: {
    'getAccountStatus': {
      handler: function (newValue) {
        if(newValue == -1 || newValue == undefined){
          console.log("还未连接钱包 ||  已退出钱包")
          this.isOneLoading = false
          this.loadMoreStatus = true
          this.busy =  false
          this.nftArr = []
        }else if(newValue == 0){
          console.log("已连接钱包")
          this.getAllUserNftInfo(res => {
            console.log('回调函数--用户拥有的总装备数:res: ', res);
            if(res == 0){
              this.nftArr = []
              this.isOneLoading = false
              this.loadMoreStatus = false
              return
            }
            let arr = JSON.parse(localStorage.getItem('nftInfo'))
            if(!arr ){
              console.log("缓存不存在情况")
              this.getUtilsFun()
              return
            }
            if(arr.length < res){
              console.log("缓存小于用户数据--此时获取的缓存数据的长度:",arr.length)
              this.getUtilsFun()
            }else{
              console.log("缓存数据等于用户数据")
              this.nftArr = JSON.parse(localStorage.getItem('nftInfo'))
              this.isOneLoading = false
              this.loadMoreStatus = false
            }
          })
        }else if(newValue > 0){
          console.log("切换账号")
          localStorage.removeItem('nftInfo')
          this.nftArr = []
          this.loadMoreStatus = true
          this.isOneLoading = false
          this.busy = false
          this.$utils.antiShakeFun(() => {
            this.getAllUserNftInfo(res => {
              console.log('回调函数--用户拥有的总装备数:res: ', res);
              if(res == 0){
                this.nftArr = []
                this.isOneLoading = false
                this.loadMoreStatus = false
                return
              }
              let arr = JSON.parse(localStorage.getItem('nftInfo'))
              if(!arr ){
                console.log("缓存不存在情况")
                this.getUtilsFun()
                return
              }
              if(arr.length < res){
                console.log("缓存小于用户数据--此时获取的缓存数据的长度:",arr.length)
                this.getUtilsFun()
              }else{
                console.log("缓存数据等于用户数据")
                this.nftArr = JSON.parse(localStorage.getItem('nftInfo'))
                this.isOneLoading = false
                this.loadMoreStatus = false
              }
            })
          },3000)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data(){
    return{
      menuIndex:0,
      menuArr:[
        {title:'message.user.txt18'},
        {title:'message.user.txt19'},
        {title:'message.user.txt20'},
        {title:'message.user.txt21'},
      ],
      isOneLoading:false,//第一次是否加载
      loadMoreStatus:true,
      busy: false, // 为true则第一次不执行loadmore
      nftArr:[],
      videoStatus:false,
      videoSrc:''
    }
  },
  methods:{
    menuClick(item,index){
      this.menuIndex = index
    },
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus && this.isOneLoading) {
        // console.log("loadmore加载更多")
        this.getUtilsFun(this.nftArr.length)
      }
    },
    nftFun(item){
      console.log('装备信息item: ', item);
      this.videoStatus = true
      this.videoSrc = item.videoSrc
    },
    getAllUserNftInfo(calback){
      sn().tokensOfOwnerBySize(this.getAccount, 0, 100000000).then(res => {
        // console.log('用户拥有的所有装备数量res: ', Number(res[1]));
        // this.userAllNft = res[1]
        calback(Number(res[1]))
      })
    },
    closeProup(){
      this.videoStatus = false
    },
    getUtilsFun(size = 0){
      this.$utils.getUserBindbox(this.getAccount,size).then(res => {
        console.log('此次加载数据的页数:%s使用公共方法获取到的数据:res: ',size,res);
        if(res.length > 0){
          this.loadMoreStatus = true
          this.isOneLoading = true
          this.busy = false
          this.nftArr = this.nftArr.concat(res)
          localStorage.setItem('nftInfo',JSON.stringify(this.nftArr))
        }else{
          this.loadMoreStatus = false
          this.isOneLoading = false
          this.busy = true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.assets_page{
  width: 100%;
  .box{
    width: 100%;
    flex-direction: column;
    .mobile_menu{
      display: none;
    }
    .title_box{
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .address_box{
        flex-direction: column;
        align-items: center;
        .margin_top{
          margin-top: 10px;
        }
      }
      .add_buybtn{
        width: 163px;
        height: 48px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #000000;
      }
      .menu{
        align-items: center;
        .onebox{
          cursor: pointer;
          padding: 0 15px;
          height: 31px;
          background: #000000;
          border: 1px solid rgba(68, 67, 67, 0.47);
          text-align: center;
          line-height: 31px;
        }
        .activeMenu{
          color: #FADD82;
          // background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .assets_page{
    .box{
      .mobile_menu{
        display: flex;
        align-items: center;
        margin-bottom: 0.15rem;
        .onebox{
          cursor: pointer;
          padding: 0 15px;
          height: 31px;
          background: #000000;
          border: 1px solid rgba(68, 67, 67, 0.47);
          text-align: center;
          line-height: 31px;
        }
        .activeMenu{
          color: #FADD82;
          // background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
        }
      }
      .title_box{
        .menu{
          display: none;
        }
        .address_box{
          align-items: flex-start;
          .margin_top{
            margin-top: 0.1rem;
            font-weight: 400;
            color: #DBDADA;
            line-height: 0.18rem;
          }
        }
        .add_buybtn{
          width: 0.66rem;
          height: 0.24rem;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          box-shadow: 0px 15px 10px 0px rgba(42, 37, 30, 0.45);
          border-radius: 0.04rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          color: #000000;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>