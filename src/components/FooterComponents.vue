<template>
  <!-- 底部 -->
  <div class="footer_box display_flex">
    <div class="footer_content display_flex">
      <img :src="`${$store.state.imgUrl}logo.webp`" class="footer_logo" />
      <div class="onebox display_flex">
        <ul v-for="(item, index) in footerArr" :key="index">
          <li class="font14 en_Regular" v-for="(ele, index1) in item.children" :key="index1">
            {{ $t(ele.title) }}
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
            {title:"message.footer.txt1",link:''},
            {title:"message.footer.txt2",link:''},
            {title:"message.footer.txt3",link:''},
            {title:"message.footer.txt4",link:''},
            {title:"message.footer.txt5",link:''},
            {title:"message.footer.txt6",link:''}
          ]
        },
        {
          id:2,
          children:[
            {title:"message.footer.txt20",link:''},
            {title:"message.footer.txt7",link:''},
            {title:"message.footer.txt8",link:''},
            {title:"message.footer.txt9",link:''},
            {title:"message.footer.txt10",link:''}
          ]
        },
        {
          id:3,
          children:[
            {title:"message.footer.txt11",link:''},
            {title:"message.footer.txt12",link:''},
            {title:"message.footer.txt13",link:''}
          ]
        },
        {
          id:4,
          children:[
            {title:"message.footer.txt14",link:''},
            {title:"message.footer.txt15",link:''},
            {title:"message.footer.txt16",link:''},
            {title:"message.footer.txt17",link:''},
            {title:"message.footer.txt18",link:''},
            {title:"message.footer.txt19",link:''}
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
  background: url($bg_url + 'footerbg.webp') no-repeat #000;
  background-size: 100% 100%;
  .footer_img {
    width: 100%;
    
  }
  .footer_content {
    width: 100%;
    align-items: center;
    justify-content: space-around;
    margin: 20px 0;
    padding: 0 49.5px;
    .footer_logo {
      width: 185px;
      
    }
    .onebox {
      width: inherit;
      justify-content: space-around;
      ul {
        li {
          margin: 14px 0;
          cursor: pointer;
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
@media screen and (max-width: 980px) {
  .footer_box {
    margin-top: 0.5rem;
    padding-top: 0;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background: url($bg_url + "footerbg.webp") no-repeat #000;
    background-size: 100% 100%;
    .footer_img {
      width: 100%;
    }
    .footer_content {
      width: 100%;
      align-items: center;
      justify-content: space-around;
      margin: 0.2rem 0;
      padding: 0 0.2rem;
      .footer_logo {
        width: 0.48rem;
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
        margin-top: 0;
        line-height: 0.12rem;
        letter-spacing: 0.52px;
      }
    }
  }
}
</style>