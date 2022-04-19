<template>
  <div class="invite_page" :class="isEnLang?'en_Bold':'cn_lang'">
    <div class="title_box display_flex">
      <div class="onebox display_flex" >
        <span class="font26 demo_font_color">邀请总数</span>
        <span class="font26">10</span>
      </div>
      <div class="onebox display_flex">
        <span class="font26 demo_font_color">邀请奖励</span>
        <span class="font26">10323</span>
      </div>
      <div class="btn_box display_flex font20">
        现在邀请
      </div>
    </div>
    <div class="ranking demo_font_color">
      <p class="font26">邀请排行榜</p>
      <div class="listbox">
        <div class="topline">
          <div class="title_onebox fontsize18">{{ $t("message.invite.txt1") }}</div>
          <div class="onebox">
            <div class="insertbox1 fontsize18">{{ $t("message.invite.txt2") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox1 fontsize18">{{ $t("message.invite.txt3") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 fontsize18">{{ $t("message.invite.txt4") }}</div>
          </div>
        </div>
        <div class="bottomline">
          <div class="boxs" v-for="(item,index) in list" :key="index">
            <div class="title_onebox">
              <div class="champion_box" v-if="index == 0">
                <img src="../../assets/images/champion1.png" class="sort1_img" />
              </div>
              <div class="champion_box" v-else-if="index == 1">
                <img src="../../assets/images/champion2.png" class="sort1_img" />
              </div>
              <div class="champion_box" v-else-if="index == 2">
                <img src="../../assets/images/champion3.png" class="sort1_img" />
              </div>
              <span class="pad_left fontsize16" v-else>{{index + 1}}</span>
            </div>
            <div class="onebox">
              <div class="insertbox1 fontsize16">{{item.address}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox1 fontsize16">{{item.num}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox2 fontsize16">{{item.reward}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isEnLang"])
  },
  data(){
    return{
      list:[
        {
          address:"0xdf...dhff",
          num:1000,
          reward:1300
        },{
          address:"0xdf...dhff",
          num:1000,
          reward:1300
        },
        {
          address:"0xdf...dhff",
          num:1000,
          reward:1300
        },{
          address:"0xdf...dhff",
          num:1000,
          reward:1300
        },
        {
          address:"0xdf...dhff",
          num:1000,
          reward:1300
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.invite_page{
  width: 100%;
  .title_box{
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .onebox{
      min-height: 100px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .btn_box{
      padding:0 40px;
      line-height: 50px;
      background:linear-gradient(#A07F3C,#F9DC8C);
      cursor: pointer;
    }
  }
  .ranking{
    width: 100%;
    margin-top: 100px;
    .listbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 60px;
      .topline{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        .onebox{
          flex: 1;
          .insertbox1{
            width: 100%;
            text-align: center;
          }
          .insertbox2{
            width: 100%;
            text-align: right;
          }
        }
        .title_onebox{
          min-width: 80px;
          display: flex;
          .champion_box{
            display: flex;
          }
        }
      }
      .bottomline{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .boxs{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          .onebox{
            flex: 1;
            .insertbox1{
              width: 100%;
              text-align: center;
            }
            .insertbox2{
              width: 100%;
              text-align: right;
            }
          }
          .title_onebox{
            min-width: 80px;
            display: flex;
            color: #ffffff;
            .champion_box{
              display: flex;
            }
            .sort1_img{
              width: 27px;
              object-fit: contain;
            }
            .pad_left{
              padding-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>