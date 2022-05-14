<template>
  <div class="my_nft">
    <p class="title_nft font30">{{$t("message.nft.txt38")}}</p>
    <div class="box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div class="out_box" v-for="(item, index) in nftArr" :key="index" @click="nftFun(item)">
        <div class="onebox" >
          <div class="out_img"><img :src="item.src" class="imgcard" /></div>
          <div class="huxing_bg_box">
            <img :src="`${$store.state.imgUrl}newhuxing.webp`" class="huxing_img" />
            <div class="huxing_content">
              <div class="start">
                <span class="span1 font24">{{item.start}}</span>
                <img :src="`${$store.state.imgUrl}start.webp`" />
              </div>
              <div class="people_type">
                <img :src="`${$store.state.imgUrl}type_cike.webp`" />
                <img :src="`${$store.state.imgUrl}type_cike.webp`" />
              </div>
              <div class="people_type">
                <div class="left_content">
                  <span class="font14">神圣的次开的头</span>
                  <span class="font12"># {{item.id}}</span>
                </div>
                <img :src="`${$store.state.imgUrl}3d.webp`" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_loading font16" v-if="nftArr.length > 10">
        <span v-if="loadMoreStatus">Loading...</span>
        <span v-else-if="!loadMoreStatus">End</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sn, getSourceUrl } from "sacredrealm-sdk";
export default {
  computed: {
    ...mapGetters(["getAccount","getIstrue"])
  },
  data(){
    return{
      loadMoreStatus:true,
      bucy: false,
      nftArr:[],
      // userAllNft:0,// 用户拥有的总装备数
    }
  },
  
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.getAllUserNftInfo(res => {
            console.log('回调函数--用户拥有的总装备数:res: ', res);
            let arr = JSON.parse(localStorage.getItem('nftInfo'))
            // console.log('获取的缓存中的arr: ', arr);
            if(!arr ){
              this.getUserBindbox(0)
              this.loadMoreStatus = true
              return
            }
            if(arr.length < res){
              this.getUserBindbox(arr.length)
              this.loadMoreStatus = true
            }else{
              this.nftArr = JSON.parse(localStorage.getItem('nftInfo'))
            }
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods:{
    loadMore() {
      this.busy = true;
      if(this.loadMoreStatus) {
        this.getUserBindbox(this.nftArr.length)
        this.busy = false
      }
    },
    getUserBindbox(cursor, size = 10){//获取某用户基于指针（从0开始）和数量的装备ID数组，以及最后一个数据的指针
      console.log('每次要加载的数据抬头cursor: ', cursor);
      sn().tokensOfOwnerBySize(this.getAccount, cursor, size).then(res => {
        // console.log('获取某用户基于指针（从0开始）和数量的装备ID数组，以及最后一个数据的指针res: ', res);
        console.log('下一次数据页码:',Number(res[1]))
        if(res[0].length > 0){
          let count = 1;
          let orther_arr = []
          res[0].map(item => {
          let obj = {
            id:'',
            src:'',
            type:'',//职业
            start:'',//星级
            power:'',//战力
            position:'',//部位
            suit:'',//套装
            status:false//状态
          }
          obj.id = Number(item)
          sn().getDatas(Number(item), 'attr').then(res => {
            // console.log('getDatas-----res: ', res);
            obj.start = Number(res[0])
            obj.power = Number(res[1])
            obj.type = Number(res[2])
            obj.position = Number(res[3])
            obj.suit =  Number(res[4])
            obj.src = getSourceUrl(res) + '.png'
          })
          orther_arr.push(obj)
          if (count == res[0].length) {
            this.loadMoreStatus = true
            this.nftArr = this.nftArr.concat(orther_arr)
            localStorage.setItem('nftInfo',JSON.stringify(this.nftArr))
            // console.log('this.nftArr: ', this.nftArr);
          }
          count++
        })
        }else{
          this.loadMoreStatus = false
        }
      })
    },
    nftFun(item){
      console.log('item: ', item);
      // sn().getDatas(129, 'attr').then(res => {
      //   console.log('getDatas-----res: ', res);
      //   let aa = getSourceUrl(res)
      //   console.log('aa: ', aa);
      // })
    },
    getAllUserNftInfo(calback){
      sn().tokensOfOwnerBySize(this.getAccount, 0, 100000000).then(res => {
        // console.log('用户拥有的所有装备数量res: ', Number(res[1]));
        // this.userAllNft = res[1]
        calback(Number(res[1]))
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.my_nft {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title_nft{
    font-weight: 600;
    color: #FFFFFF;
    line-height: 42px;
    margin-bottom: 60px;
  }
  .box{
    width: 100%;
    max-height: 100vh;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .out_box{
      width: 20%;
      padding: 10px;
      .onebox {
        position: relative;
        max-width: 204px;
        width: 100%;
        height: 288px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        background: url($bg_url + 'nftbg.webp') no-repeat;
        background-size: 100% 100%;
        .out_img{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .imgcard {
            // width: 184px;
            height: 184px;
          }
        }
        .huxing_bg_box{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          .huxing_img{
            width: 100%;
          }
          .huxing_content{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 35px 13px 5px;
            .start{
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom:5px;
              .span1{
                font-weight: 800;
                color: #EFB045;
                line-height: 29px;
                margin-right: 5px;
                // background: liner-gradient(180deg, #F1E069 92%, #A87D30 28%, #FEF6C2 70%, #B48533 13%);
                // -webkit-background-clip: text;
                // -webkit-text-fill-color: transparent;
              }
              img{
                width: 24px;
              }
            }
            .people_type{
              margin-top: 10px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img{
                width: 24px;
              }
              .left_content{
                display: flex;
                flex-direction: column;
                span{
                  font-weight: 800;
                  line-height: 18px;
                  &:nth-child(2){
                    margin-top: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.bottom_loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
</style>