<template>
  <div class="pass_proup_page" v-if="passStatus">
    <div class="proup_boxs">
      <p class="propu_title_txt font24">{{title}}</p>
      <div class="proup_content" v-for="(item, index) in arr" :key="index">
        <p class="p1 font16">{{$t(item.title)}}</p>
        <input 
        :type="item.id == 3 || item.id == 4?'password':'text'"
        v-model.trim="item.inputvalue" 
        class="input" v-if="!item.code" 
        @blur="blurEvent(index,item)" 
        @focus="focusEvent(index)"/>
        <div class="inputbox" v-if="item.code">
          <input 
          :type="item.id == 3 || item.id == 4?'password':'text'"
          v-model.trim="item.inputvalue" 
          class="box_input" 
          @blur="blurEvent(index,item)" 
          @focus="focusEvent(index)" />
          <div class="code font14" @click="sendCode">
            {{code_txt}}
          </div>
        </div>
        <div class="input_prompt font12">
          <span :class="{ani_shake:item.tip_status}" v-if="item.tip_status">* {{ item.tip }}</span>
        </div>
      </div>
      <div class="btn font18" @click="sureClick">
        {{$t(btntxt)}}
      </div>
      <img :src="`${$store.state.imgUrl}passclose.png`" class="close_img" @click.stop="closePassProup"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    passStatus: {
      type: Boolean,
      default: false
    },
    content:{
      type: String,
      default: ''
    },
    title:{
      type: String,
      default: ''
    },
    codestatus:{
      type: Boolean,
      default: false
    },
    btntxt:{
      type: String,
      default: 'message.btn_txt1'
    }
  },
  data(){
    return{
      timeer:null,
      code_txt:'发送验证码',
      arr:[],
      RetrievePassword:[
        {
          id:1,
          title:'message.account.txt22',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'输入你的电子邮件',
          tip_status:false,
          status:false
        },
        {
          id:2,
          code:true,
          title:'message.account.txt23',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'请输入验证码',
          tip_status:false,
          status:false
        },
        {
          id:3,
          title:'message.account.txt24',
          inputvalue:'',
          placeholder:'Please enter the email',
          tip:'输入新密码',
          tip_status:false,
          status:false
        },
        {
          id:4,
          title:'message.account.txt25',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'重新输入新密码',
          tip_status:false,
          status:false
        },
      ],
      ChangePassword:[
        {
          id:5,
          title:'message.account.txt26',
          inputvalue:'',
          placeholder:'Please enter the name',
          tip:'输入您当前的密码',
          tip_status:false,
          status:false
        },
        {
          id:3,
          title:'message.account.txt24',
          inputvalue:'',
          placeholder:'Please enter the email',
          tip:'输入新密码',
          tip_status:false,
          status:false
        },
        {
          id:4,
          title:'message.account.txt25',
          inputvalue:'',
          placeholder:'Please enter the content',
          tip:'重新输入新密码',
          tip_status:false,
          status:false
        },
      ]
    }
  },
  watch:{
    passStatus(newvala){
      if(newvala){
        document.body.style.overflow='hidden'
      }else{
        document.body.style.overflow='visible'
        this.RetrievePassword.forEach(item => {
          item.status = item.tip_status = false
          item.inputvalue = ''
        })
        this.ChangePassword.forEach(item => {
          item.status = item.tip_status = false
          item.inputvalue = ''
        })
      }
    },
    codestatus(newvala){
      if(newvala){
        this.arr = this.RetrievePassword
      }else{
        this.arr = this.ChangePassword
      }
    },
  },
  methods: {
    // 弹窗关闭
    closePassProup () {
      this.$emit('closePassProup')
    },
    sureClick(){
      this.$emit('sureClick',this.arr)
    },
    focusEvent(index){
      this.arr[index].tip_status = false
    },
    blurEvent(index,item){
      if(this.arr[index].inputvalue == ''){
        this.arr[index].tip_status = true
        return
      }
      switch(item.id){
        case 1:
          if (!this.$store.state.emailReg.test(this.arr[index].inputvalue)){
            this.arr[index].tip = '请输入正确的邮箱'
            this.arr[index].tip_status = true
            this.arr[index].status = false
          }else{
            this.arr[index].status = true
          }
          break;
        case 2: 
          if (this.arr[index].inputvalue.length < 6){
            this.arr[index].tip = '请输入6位验证码'
            this.arr[index].tip_status = true
            this.arr[index].status = false
          }else{
            this.arr[index].status = true
          }
          break;
        case 3: 
          if (!this.arr[index].inputvalue){
            this.arr[index].tip = '新密码不合法'
            this.arr[index].tip_status = true
            this.arr[index].status = false
          }else{
            this.arr[index].status = true
          }
          break;
        case 4: 
          if (this.arr[this.arr.length-2].inputvalue !== this.arr[this.arr.length-1].inputvalue){
            this.arr[index].tip = '俩次输入密码不一致'
            this.arr[index].tip_status = true
            this.arr[index].status = false
          }else{
            this.arr[index].status = true
          }
          break;
        case 5: 
          if (this.arr[index].inputvalue){
            this.arr[index].tip = '当前密码不正确'
            this.arr[index].tip_status = true
            this.arr[index].status = false
          }else{
            this.arr[index].status = true
          }
          break;
        default:
          break;
      }
    },
    sendCode(){
      if(this.arr[0].inputvalue == ''){
        this.arr[0].tip_status = true
        return
      }
      if(this.timeer)return
      clearInterval(this.timeer)
      this.timeer = setInterval(() => {
        if (this.$store.state.codeTime <= 0) {
          clearInterval(this.timeer);
          this.timeer = null
          this.code_txt = '重新发送';
          return;
        }
        this.code_txt = this.$store.state.codeTime + 's'
        this.$store.state.codeTime -= 1;
      }, 1000);
    }
  }
}
</script>
<style lang="scss" scoped>
.pass_proup_page {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  .proup_boxs{
    position: relative;
    width: 50vw;
    // max-height: 100%;
    height: auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 34px 122px;
    background: #101010;
    border: 2px solid #242222;
    .propu_title_txt{
      font-weight: 600;
      color: #FFFFFF;
      line-height: 33px;
      margin-bottom: 20px;
    }
    .proup_content{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .p1{
        font-weight: 600;
        color: #FFFFFF;
        line-height: 22px;
        margin-bottom: 10px;
      }
      .input{
        background: #171718;
        box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
        border-radius: 8px;
        border: 1px solid #373636;
        height: 44px;
        color: #ffffff;
        margin-top: 15px;
        padding: 0 15px;
      }
      .inputbox{
        width: 100%;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .box_input{
          width: calc(100% - 140px);
          padding: 0 10px;
          background: #171718;
          box-shadow: inset 0px 4px 11px 0px #0D0E0E, inset 0px -1px 7px 0px #0D0E0E;
          border-radius: 8px;
          border: 1px solid #373636;
          height: 44px;
          color: #ffffff;
          padding: 0 15px;
        }
        .code{
          cursor: pointer;
          border-radius: 8px;
          // max-width: 100px;
          width: 93px;
          background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
          border-radius: 4px;
          text-align: center;
          font-weight: 600;
          color: #000000;
          line-height: 34px;
        }
      }
    }
    .btn{
      width: 330px;
      min-height: 54px;
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
    .close_img{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 44px;
      cursor: pointer;
    }
  }
}
</style>