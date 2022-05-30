<template>
  <div class="invite_page" :class="isEnLang?'en_Bold':'cn_lang'">
    <!-- <div class="title_box display_flex font32" :class="isEnLang?'en_heavy':''">
      <span class="mobile_font16">{{$t("message.user.txt15")}}</span>
      <span class="_txt mobile_font16">10</span>
    </div> -->
    <div class="ranking">
      <p class="font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.user.txt16")}}</p>
      <div class="listbox">
        <div class="topline font24 mobile_font14">
          <div class="title_onebox">{{ $t("message.user.txt1") }}</div>
          <div class="onebox">
            <div class="insertbox1">{{ $t("message.user.txt2") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox1">{{ $t("message.user.txt3") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2">{{ $t("message.user.txt4") }}</div>
          </div>
        </div>
        <div class="bottomline font16" :class="isEnLang?'en_medium':''">
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
              <span class="pad_left" v-else>{{index + 1}}</span>
            </div>
            <div class="onebox">
              <div class="insertbox1">{{item.address}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox1">{{item.num}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox2">{{item.reward}}</div>
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
    .listbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 60px;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 8px;
      border: 1px solid rgba(68, 67, 67, 0.47);
      padding: 37px 27px;
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
            color: #CED3D9;
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
      .listbox{
        margin-top: 0;
        padding: 0.2rem;
        .topline{
          .onebox{
            white-space: nowrap;
          }
        }
        .bottomline{
          .boxs{
            margin-bottom: 0.15rem;
          }
        }
      }
      p{
        margin: 0 0 0.2rem;
      }
    }
  }
}
</style>