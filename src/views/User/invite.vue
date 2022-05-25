<template>
  <div class="invite_page" :class="isEnLang?'en_Bold':'cn_lang'">
    <div class="title_box display_flex">
      <span class="font26 mobile_font16">{{$t("message.user.txt15")}}</span>
      <span class="font26 _txt mobile_font16">10</span>
    </div>
    <div class="ranking demo_font_color">
      <p class="font26 mobile_font16">{{$t("message.user.txt16")}}</p>
      <div class="listbox">
        <div class="topline">
          <div class="title_onebox font18">{{ $t("message.user.txt1") }}</div>
          <div class="onebox">
            <div class="insertbox1 font18">{{ $t("message.user.txt2") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox1 font18">{{ $t("message.user.txt3") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 font18">{{ $t("message.user.txt4") }}</div>
          </div>
        </div>
        <div class="bottomline">
          <div class="boxs" v-for="(item,index) in list" :key="index">
            <div class="title_onebox">
              <div class="champion_box" v-if="index == 0">
                <img :src="`${$store.state.imgUrl}champion1.webp`" class="sort1_img" />
              </div>
              <div class="champion_box" v-else-if="index == 1">
                <img :src="`${$store.state.imgUrl}champion2.webp`" class="sort1_img" />
              </div>
              <div class="champion_box" v-else-if="index == 2">
                <img :src="`${$store.state.imgUrl}champion3.webp`" class="sort1_img" />
              </div>
              <span class="pad_left font16" v-else>{{index + 1}}</span>
            </div>
            <div class="onebox">
              <div class="insertbox1 font16">{{item.address}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox1 font16">{{item.num}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox2 font16">{{item.reward}}</div>
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
    ._txt{
      margin-left: 10px;
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
        font-weight:bold;
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
@media screen and (max-width: 980px) {
  .invite_page{
    width: 100%;
    .title_box{
      justify-content: space-between;
    }
    .ranking{
      margin-top: 0;
      .listbox{
        margin-top: 0;
      }
      p{
        margin: 0.4rem 0;
      }
    }
  }
}
</style>