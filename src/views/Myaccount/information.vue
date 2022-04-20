<template>
  <div class="information_page">
    <div class="box">
      <div class="left_content">
        <div class="oneline" v-for="(item, index) in list" :key="index">
          <span class="font20">{{ $t(item.title)}}</span>
          <input :type="index != list.length - 1?'text':'date'" class="input font18" v-model="item.inputValue" v-if="index != 2" />
          <div class="inputbox" v-if="index == 2">
            <div class="add_eye">
              <input type="text" class="input font18" v-model="item.inputValue" />
              <img src="../../assets/images/eye1.png" class="eye_img" />
            </div>
            <div class="input_btn font14">{{$t("message.account.txt8")}}</div>
          </div>
        </div>
        <div class="lin_content font12">
          {{$t("message.account.txt9")}}
        </div>
        <div class="btn font18">
          {{$t("message.account.txt10")}}
        </div>
      </div>
      <div class="left_content right_content">
        <div class="right_line font16">
          <span class="account_status">{{$t("message.account.txt11")}}</span>
          <span class="_status">{{$t("message.account.txt12")}}</span>
        </div>
        <div class="right_line font16">
          <span class="account_status">{{$t("message.account.txt13")}}</span>
          <span class="_status">{{$t("message.account.txt14")}}</span>
        </div>
        <div class="right_line font16">
          <span class="account_status">{{$t("message.account.txt15")}}</span>
          <span class="_status">2017-08-08</span>
        </div>
        <div class="right_line font16">
          <span class="account_status">{{$t("message.account.txt16")}}</span>
          <span class="_status">2017-08-08 20:24:10 记录..</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {
          title:'message.account.txt4',
          inputValue:''
        },
        {
          title:'message.account.txt5',
          inputValue:''
        },
        {
          title:'message.account.txt6',
          inputValue:''
        },
        {
          title:'message.account.txt7',
          inputValue:''
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.information_page{
  width: 90%;
  margin: 0 auto;
  margin-top: 67px;
  .box{
    width: 100%;
    display: flex;
    background: #101010;
    border: 2px solid #242222;
    .left_content{
      flex: 1;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #242222;
      padding: 30px 34px;
      .oneline{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 34px;
        .input{
          width: 78%;
          height: 46px;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 8px;
          border: 1px solid #373636;
          color: #FFFFFF;
          padding: 0 10px;
        }
        .inputbox{
          width: 84%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .add_eye{
            width: calc(100% - 120px);
            position: relative;
            input{
              width: 100%;
              height: 46px;
              background: #171718;
              box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
              border-radius: 8px;
              border: 1px solid #373636;
              color: #FFFFFF;
              padding: 0 10px;
            }
            .eye_img{
              position: absolute;
              right: 0;
              top: 38%;
              width: 26px;
            }
          }
          .input_btn{
            width: 93px;
            height: 34px;
            background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
            border-radius: 4px;
            backdrop-filter: blur(14px);
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            color: #000000;
            line-height: 20px;
          }
        }
      }
      .lin_content{
        width: 100%;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 18px;
        padding-left: 76px;
      }
      .btn{
        width: 330px;
        height: 54px;
        background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
        border-radius: 4px;
        backdrop-filter: blur(14px);
        // margin: 0 auto;
        margin-left: 76px;
        font-weight: 600;
        color: #000000;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right_content{
      border: none;
      .right_line{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 79px;
        .account_status{
          font-weight: 600;
          color: #ECCF83;
          line-height: 22px;
          min-width: 100px;
        }
        ._status{
          font-weight: 400;
          color: #FFFFFF;
          line-height: 22px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>