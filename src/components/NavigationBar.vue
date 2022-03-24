<template>
  <div class="nav_title display_flex">
    <div class="logo_imgbox">
      <img src="../assets/images/logo.png" class="logo" />
    </div>
    <ul class="display_flex menu_ul">
      <li v-for="(item, index) in navarr" :key="index" :class="[index == getMenuIndex ? 'activeClass' : '']" @click="menuClick(index)">
        <span :class="[index == getMenuIndex ? 'txt_activeClass' : '']">{{ $t(item) }}</span>
      </li>
    </ul>
    <div class="right_box display_flex">
      <div class="connect_calss">Connect</div>
      <div class="lang_calss" @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false">
        <span>{{lang}}</span>
        <template>
          <img class="accrow" :class="{ active: showLangSelect }" src="../assets/images/accrow.png" />
          <transition name="select-scaleY" appear>
            <ul class="list" v-show="showLangSelect">
              <li @click="selectLang('English')">
                English
              </li>
              <li @click="selectLang('Chinese')">
                Chinese
              </li>
            </ul>
          </transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      lang:'English',
      showLangSelect:false,
      navarr: [
        "message.nav.txt1",
        "message.nav.txt2",
        "message.nav.txt3",
        "message.nav.txt4",
        "message.nav.txt5",
        "message.nav.txt6",
        "message.nav.txt7",
        "message.nav.txt8",
      ],
    }
  },
  computed: {
    ...mapGetters(["getMenuIndex"]),
  },
  methods:{
    menuClick(index){
      this.$store.commit("setMenuStatus", index)
    },
    selectLang(data){
      this.lang = data
      this.showLangSelect = false
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_title{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 96px;
  padding: 0 49.5px;
  background: #000000;
  justify-content: space-between;
  align-items: center;
  .logo_imgbox{
    width: 190px;
    .logo{
      width: 100%;
      object-fit: contain;
    }
  }
  .menu_ul{
    width: calc(100% - 490px);
    align-items: center;
    margin-left: 27px;
    padding-top: 9px;
    li{
      cursor: pointer;
      margin: 0 24px;
      min-width: 57px;
      height: 50px;
      text-align: center;
      line-height: 47px;
      .txt_activeClass{
        color: #D8D8D8;
        background: linear-gradient(180deg, #78C7D4 0%, #6157A4 100%), linear-gradient(180deg, #00E6FF 0%, #8847F3 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .activeClass{
      background-image: url("../assets/images/menubg.png");
      background-size: 100% 100%;
    }
  }
  .right_box{
    min-width: 190px;
    align-items: center;
    .connect_calss{
      cursor: pointer;
      width: 109px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      background-image: url("../assets/images/connect.png");
      background-size: 100% 100%;
    }
    .lang_calss{
      margin-left: 23px;
      cursor: pointer;
      position: relative;
      .accrow{
        width: 13px;
        margin-left: 5px;
        object-fit: contain;
        transition: all 0.3s;
      }
      .active {
        transform: rotate(-180deg);
      }
      .list {
        width: 100%;
        height: auto;
        background: #082545;
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
        border-radius: 0 0 6px 6px;
        overflow: hidden;
        position: absolute;
        top: 130%;
        left: 0;
        transition: transform 0.2s;
        transform-origin: top center;
        li {
          font-size: 14px;
          padding: 10px;
          &:hover {
            color: #00e7f0;
          }
        }
      }
    }
  }
}
.select-scaleY-enter,
.select-scaleY-leave-to {
  transform: scaleY(0);
}
.select-scaleY-enter-to,
.select-scaleY-leave {
  transform: scaleY(1);
}
// @media screen and (min-width: 1440px) {
//   #app {
//     width: 1440px;
//     height: 100%;
//     margin: 0 auto;
//     background: blue;
//   }
// }
</style>
