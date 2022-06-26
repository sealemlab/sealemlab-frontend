<template>
  <div class="assets_page">
    <div class="box display_flex">
      <div class="mobile_menu">
        <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{$t(item.title)}}</div>
      </div>
      <div class="title_box display_flex">
        <div class="address_box display_flex">
          <span class="font32 mobile_font16" :class="isEnLang?'en_Bold':''">0 NFT</span>
          <div class="add_address_metamask">
            <span class="font16" :class="isEnLang?'en_Bold':''">{{$t("message.user.txt7")}}:0x*********</span>
            <img :src="`${$store.state.imgUrl}add.webp`" class="add_img" />
          </div>
        </div>
        <div class="add_buybtn font16" @click="toBuy" :class="isEnLang?'en_medium':''">{{$t("message.user.txt17")}}</div>
        <div class="menu display_flex">
          <div class="onebox font14" :class="{ activeMenu: menuIndex == index }" v-for="(item, index) in menuArr" :key="index" @click="menuClick(item,index)">{{$t(item.title)}}</div>
        </div>
      </div>
      <NftCompontent></NftCompontent>
    </div> 
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import NftCompontent from '@/components/NftCompontent.vue'
export default {
  components:{
    NftCompontent
  },
  computed: {
    ...mapGetters(["getNoticeNum","getAccount","getIstrue","getAccountStatus","isEnLang"])
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
    }
  },
  methods:{
    menuClick(item,index){
      this.menuIndex = index
    },
    toBuy(){
      if (!this.getNoticeNum) {
        this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
        this.$store.commit("setNoticeNum", true);
      }
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
        .add_address_metamask{
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          .add_img{
            width: 11px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
      .add_buybtn{
        cursor: pointer;
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
          font-weight: 400;
          color: #DBDADA;
          line-height: 0.18rem;
          .add_address_metamask{
            margin-top: 0.1rem;
            .add_img{
              width: 0.11rem;
              margin-left: 0.1rem;
              cursor: pointer;
            }
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