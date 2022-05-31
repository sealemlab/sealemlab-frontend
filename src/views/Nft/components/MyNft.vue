<template>
  <div class="my_nft">
    <p class="title_nft font32 mobile_font20" :class="isEnLang?'en_heavy':''">{{$t("message.nft.txt38")}}</p>
    <div class="martop"></div>
    <NftCompontent></NftCompontent>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sn } from "sealemlab-sdk";
import NftCompontent from '@/components/NftCompontent.vue'
export default {
  components:{
    NftCompontent
  },
  computed: {
    ...mapGetters(["getAccount","getIstrue","getAccountStatus","isEnLang"])
  },
  data(){
    return{
      isOneLoading:false,//第一次是否加载
      loadMoreStatus:true,
      busy: false, // 为true则第一次不执行loadmore
      nftArr:[],
      videoStatus:false,
      videoSrc:''
    }
  },
  watch: {
    'videoStatus'(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
      }
    },
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
  methods:{
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
};
</script>

<style lang="scss" scoped>
.my_nft {
  width: 100%;
  min-height:100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title_nft{
    position: absolute;
    top: 0;
    left: 0;
    // left: 50%;
    // transform: translateX(-50%);
    font-weight: 600;
    color: #CED3D9;
    line-height: 63px;
  }
  .martop{
    margin-top: 60px;
  }
}
@media screen and (max-width: 980px) {
  .my_nft {
    .title_nft{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 600;
      color: #CED3D9;
      line-height: 0.21rem;
      width: 100%;
      text-align: left;
    }
    .martop{
      margin-top: 0.3rem;
    }
  }
}
</style>