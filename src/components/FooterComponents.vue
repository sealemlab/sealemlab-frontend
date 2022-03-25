<template>
  <!-- 底部 -->
  <div class="footer_box display_flex">
    <img src="../assets/images/footer_img.png" class="footer_img" />
    <div class="footer_content display_flex">
      <img src="../assets/images/logo.png" class="footer_logo" />
      <div class="onebox display_flex">
        <ul v-for="(item, index) in footerArr" :key="index">
          <li v-for="(ele, index1) in item.children" :key="index1">
            {{ ele }}
          </li>
        </ul>
      </div>
    </div>
    <p class="copyright">COPYRIGHT © 2022 Sacred Realm, All rights Reserved</p>
  </div>
</template>
<script>
export default {
  data(){
    return{
      footerArr:[
        {
          id:1,
          children:[
            'ABOUT','White','Paper','Project','Overview','FAQ','Token','Metrics','Game','Instructions',
          ]
        },
        {
          id:2,
          children:[ 'SOCIAL','Telegram','Twitter','Discord','Medium']
        },
        {
          id:3,
          children:['DEVELOPERS','Github','Bug','Bounty','Audits']
        },
        {
          id:4,
          children:['OTHERS','Official','Token','Help','Center','Team','SSR $5.20','SR $5.20']
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.footer_box {
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
  .footer_img {
    width: 100%;
    object-fit: contain;
  }
  .footer_content {
    width: 100%;
    align-items: center;
    justify-content: space-around;
    margin: 20px 0;
    padding: 0 49.5px;
    .footer_logo {
      width: 185px;
      object-fit: contain;
      // margin-right: 100px;
    }
    .onebox {
      width: inherit;
      justify-content: space-around;
      ul {
        // margin-right: 20px;
        li {
          margin: 5px 0;
          // font-size: 14px;
          // font-family: TrajanPro-Regular;
          // color: #D8D8D8;
          // line-height: 32px;
          // -webkit-text-stroke: 1px #979797;
          // text-stroke: 1px #979797;
          // -webkit-background-clip: text;
          // -webkit-text-fill-color: transparent;
          &:nth-child(1) {
            font-size: 18px;
            font-family: TrajanPro-Bold, TrajanPro;
            font-weight: bold;
            color: #ffffff;
            line-height: 23px;
            background: linear-gradient(
              180deg,
              #825f35 0%,
              #fadd82 51%,
              #876333 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }
  .copyright {
    font-size: 14px;
    font-family: CaslonBook;
    color: #ffffff;
    line-height: 60px;
  }
}
</style>