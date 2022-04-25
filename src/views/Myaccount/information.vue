<template>
  <div class="information_page">
    <div class="box">
      <div class="left_content">
        <div class="oneline" v-for="(item, index) in list" :key="index">
          <span class="font18 txt_frontend">{{ $t(item.title)}}</span>
          <input :type="index == 0?'text':'password'" class="input font18" v-model="item.inputValue" v-if="index == 0" />
          <div class="inputbox" v-if="index == 1">
            <div class="add_eye">
              <input type="text" class="input font18" v-model="item.inputValue" />
              <img src="../../assets/images/eye1.png" class="eye_img" />
            </div>
            <div class="input_btn font14" @click="changePassword">{{$t("message.account.txt8")}}</div>
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
    <PassProup :codestatus='codestatus' :btntxt="'message.btn_txt1'" :passStatus="passStatus" :title="title" @closePassProup="closePassProup" @sureClick="sureClick"></PassProup>
  </div>
</template>
<script>
import PassProup from '../../components/Password.vue'
export default {
  components:{
    PassProup
  },
  data(){
    return {
      codestatus:true,
      title:"修改密码",//修改密码弹窗标题
      passStatus:false,//修改密码弹窗
      list:[
        // {
        //   title:'message.account.txt4',
        //   inputValue:''
        // },
        {
          title:'message.account.txt5',
          inputValue:''
        },
        {
          title:'message.account.txt6',
          inputValue:''
        },
        // {
        //   title:'message.account.txt7',
        //   inputValue:''
        // }
      ]
    }
  },
  methods:{
    closePassProup(){
      this.passStatus = false
    },
    sureClick(data){
      console.log('父页面获取的参数data: ', data);
      let istrue = data.every(item => {
        return item.status == true
      })
      if(!istrue){
        data.forEach(item => {
          if(item.status && !item.tip_status){
            console.log("当前通过校验")
          }else{
            item.tip_status = true
            item.status = false
          }
        })
      }else{
        console.log("所有校验都通过")
        
      }
    },
    changePassword(){
      console.log("修改密码")
      this.title = '修改密码'
      this.passStatus = true
      this.codestatus = false
    }
  }
}
</script>
<style lang="scss" scoped>
.information_page{
  width: 95%;
  margin: 0 auto;
  margin-top: 67px;
  .box{
    width: 100%;
    display: flex;
    background: #101010;
    // border: 2px solid #242222;
    .left_content{
      width: 55%;
      display: flex;
      flex-direction: column;
      border-right: 2px solid #242222;
      padding: 30px 30px;
      .oneline{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 34px;
        .txt_frontend{
          min-width: 85px;
        }
        .input{
          width: calc(100% - 120px);
          height: 46px;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 8px;
          border: 1px solid #373636;
          color: #FFFFFF;
          padding: 0 10px;
        }
        .inputbox{
          width:calc(100% - 100px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          .add_eye{
            width: 50%;
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
            // width: 93px;
            padding: 0 10px;
            height: 34px;
            background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
            border-radius: 4px;
            backdrop-filter: blur(14px);
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            color: #000000;
            cursor: pointer;
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
        cursor: pointer;
        // margin-left: 76px;
        font-weight: 600;
        color: #000000;
        margin: 0 auto;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right_content{
      width: 45%;
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