<template>
  <!-- 底部 -->
  <div class="footer_box display_flex">
    <div class="footer_content display_flex">
      <img src="../assets/images/logo.png" class="footer_logo" />
      <div class="onebox display_flex">
        <ul v-for="(item, index) in footerArr" :key="index">
          <li class="font14 en_Regular" v-for="(ele, index1) in item.children" :key="index1">
            {{ $t(ele) }}
          </li>
        </ul>
      </div>
    </div>
    <div class="footerbox">
      <p class="copyright font14 en_Regular">
        {{$t("message.footer.txt21")}}
      </p>
    </div>
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
            "message.footer.txt1",
            "message.footer.txt2",
            "message.footer.txt3",
            "message.footer.txt4",
            "message.footer.txt5",
            "message.footer.txt6",
          ]
        },
        {
          id:2,
          children:[
            "message.footer.txt20",
            "message.footer.txt7",
            "message.footer.txt8",
            "message.footer.txt9",
            "message.footer.txt10",
          ]
        },
        {
          id:3,
          children:[
            "message.footer.txt11",
            "message.footer.txt12",
            "message.footer.txt13",
          ]
        },
        {
          id:4,
          children:[
            "message.footer.txt14",
            "message.footer.txt15",
            "message.footer.txt16",
            "message.footer.txt17",
            "message.footer.txt18",
            "message.footer.txt19",
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.footer_box {
  margin-top: 50px;
  padding-top: 60px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background: url("../assets/images/footerbg.png") no-repeat #000;
  background-size: 100% 100%;
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
    }
    .onebox {
      width: inherit;
      justify-content: space-around;
      ul {
        li {
          margin: 14px 0;
          letter-spacing: 0.52px;
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
  .footerbox{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .copyright {
      margin-top: 20px;
      line-height: 60px;
      letter-spacing: 0.52px;
    }
  }
}
</style>