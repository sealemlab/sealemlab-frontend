import {wallet, network,sb,sn,getSourceUrl,erc20,getSigner,token,bondDepository} from "sealemlab-sdk";
import BigNumber from "bignumber.js";
import store from "@/store";
export default {
  // 复制
  copyClick(params: any) {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = params;
    dummy.select(); // 选择对象
    document.execCommand("copy"); // 执行浏览器复制命令
    document.body.removeChild(dummy);
  },
  // 根据浏览器语言  自动切换中英文
  isLang() {
    // @ts-ignore
    const lang = (navigator.systemLanguage ? navigator.systemLanguage : navigator.language).substr(0, 2);
    // console.log('navigator.languag: ', navigator);
    if (lang == "zh") {
      return "ZH";
    } else {
      return "EN";
    }
  },
  // 设置cookie过期时间
  setCookie(key: string, value: any, time: any) {
    const num = new Date(new Date().getTime() + time * 60 * 1000 * 60);
    document.cookie = `${key} = ${value};expires = ` + num.toUTCString() + ";path = /";
  },
  // 获取cookie
  getCookie(name: string) {
    let arr: any = [];
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },
  /** 应用场景:返回秒数,展示对应时间;参数:传入秒数(返回的是秒数对应的时间)*/
  afferentTime(endtime: number, calback: any, type = 'hour',iscountdown = false) {
    if(endtime == 0 && type == 'day'){
      calback({ d:"00",h: "00", m: "00", s: "00" });
      return
    }
    if(endtime == 0 && type == 'hour'){
      calback({ h: "00", m: "00", s: "00" });
      return
    }
    // @ts-ignore
    let timestamp = parseInt(new Date().getTime() / 1000) 
    let neddTime = endtime - timestamp
    // @ts-ignore
    let day = parseFloat(neddTime / (24 * 3600))
    // console.log('当前s数换算下来的天数day: ', day);
    if(type == 'day' && !iscountdown){
      calback(day);
      return
    }
    if(day > 1){
      // let timernull = setInterval(() => {
        let D: any = parseFloat((neddTime / (3600 * 24)).toString());
        let result:any = parseInt((neddTime - (D * 3600 * 24)).toString());
        let H: any = parseInt((result / (60 * 60)).toString());
        let M: any = parseInt(((result / 60) % 60).toString());
        let S: any = parseInt((result % 60).toString());
        D = D > 9 ? D : "0" + D;
        H = H > 9 ? H : "0" + H;
        M = M > 9 ? M : "0" + M;
        S = S > 9 ? S : "0" + S;
        calback({ d:D,h: H, m: M, s: S });
    }else{
        let H: any = parseInt((neddTime / (60 * 60)).toString());
        let M: any = parseInt(((neddTime / 60) % 60).toString());
        let S: any = parseInt((neddTime % 60).toString());
        H = H > 9 ? H : "0" + H;
        M = M > 9 ? M : "0" + M;
        S = S > 9 ? S : "0" + S;
        if(type == 'hour' && iscountdown){
          calback({ h: H, m: M, s: S });
        }else if(type == 'day' && iscountdown){
          calback({ d:"00",h: H, m: M, s: S });
        }
    }
  },
  /** 应用场景:时间戳转相对应的日期格式;参数:时间戳(s);返回值:yy-mm-dd hh:mm:ss */
  timeFormat(timestamp: any, type = 1) {
    let y: any = new Date(timestamp).getFullYear();
    let m: any = new Date(timestamp).getMonth() + 1;
    let d: any = new Date(timestamp).getDate();
    let H: any = new Date(timestamp).getHours();
    let M: any = new Date(timestamp).getMinutes();
    let S: any = new Date(timestamp).getSeconds();
    m = m > 9 ? m : "0" + m;
    d = d > 9 ? d : "0" + d;
    H = H > 9 ? H : "0" + H;
    M = M > 9 ? M : "0" + M;
    S = S > 9 ? S : "0" + S;
    if (type == 1) {
      return y + "-" + m + "-" + d + " " + H + ":" + M + ":" + S;
    } else {
      return y + "-" + m + "-" + d;
    }
  },
  /** 应用场景:返回时间戳,然后倒计时;参数:时间戳(s)*/
  customTime(endtime: any, calback: any) {
    // console.log('endtime: ', endtime);
    // @ts-ignore
    let time = parseInt(new Date().getTime() / 1000)
    
    if(endtime < time){
      calback({countdownObject:0,countTime:{ d:"00",h: "00", m: "00", s: "00" }});
      return
    }
    let timernull = setInterval(() => {
      let neddTime = endtime - time
      if (endtime == time) {
        clearInterval(timernull);
        calback({countdownObject:0,countTime:{ d:"00",h: "00", m: "00", s: "00" }});
        return;
      }
      // @ts-ignore
      let day = parseFloat(neddTime / (24 * 3600))
      // console.log('总共的天数day: ', day);
      if(day > 1){
        // @ts-ignore
        let D: any = parseInt(day)
        // console.log('整数位天数D: ', D);
        // @ts-ignore
        let result:any = parseFloat((day - D) * 24 * 3600);
        // console.log('剩余天数result: ', result);
        let H: any = parseInt((result / (60 * 60)).toString());
        let M: any = parseInt(((result / 60) % 60).toString());
        let S: any = parseInt((result % 60).toString());
        D = D > 9 ? D : "0" + D;
        H = H > 9 ? H : "0" + H;
        M = M > 9 ? M : "0" + M;
        S = S > 9 ? S : "0" + S;
        calback({countdownObject:timernull,countTime:{ d:D,h: H, m: M, s: S }});
      }else{
        let H: any = parseInt((neddTime / (60 * 60)).toString());
        let M: any = parseInt(((neddTime / 60) % 60).toString());
        let S: any = parseInt((neddTime % 60).toString());
        H = H > 9 ? H : "0" + H;
        M = M > 9 ? M : "0" + M;
        S = S > 9 ? S : "0" + S;
        calback({countdownObject:timernull,countTime:{ d:"00",h: H, m: M, s: S }});
      }
      endtime -= 1;
    }, 1000);
  },
  // 截取字符串  已开头字符串中间....尾部字符串显示   eg:wsx....efdf   参数解释str:需要展示的字符串;num:开头结尾需要展示几位
  getSubStr(str: any, num: number) {
    let str1 = str.toString();
    if (str1) {
      const subStr1 = str1.substr(0, num);
      const subStr2 = str1.substr(str1.length - num);
      const subStr = subStr1 + "..." + subStr2;
      return subStr;
    } else {
      return "null";
    }
  },
  // 小数点后边有0  去掉0
  cutZero(old: any) {
    old = old.toString();
    //拷贝一份 返回去掉零的新串
    let newstr = old;
    //循环变量 小数部分长度
    let leng = old.length - old.indexOf(".") - 1;
    //判断是否有效数
    if (old.indexOf(".") > -1) {
      //循环小数部分
      for (let i = leng; i > 0; i--) {
        //如果newstr末尾有0
        if (
          newstr.lastIndexOf("0") > -1 &&
          newstr.substr(newstr.length - 1, 1) == "0"
        ) {
          let k = newstr.lastIndexOf("0");
          //如果小数点后只有一个0 去掉小数点
          if (newstr.charAt(k - 1) == ".") {
            return newstr.substring(0, k - 1);
          } else {
            //否则 去掉一个0
            newstr = newstr.substring(0, k);
          }
        } else {
          //如果末尾没有0
          return newstr;
        }
      }
    }
    return old;
  },
  // 保留小数位数---已调用cutZero函数,截取出来的小数最后有0则去掉0
  getBit(value: any, bit = 2) {
    if (value == 0) return 0;
    let str = value.toString();
    let strIndex = str.indexOf(".");
    if (strIndex === -1) return this.cutZero(str);
    if(bit == 0){
      str = str.substring(0, strIndex);
    }else{
      str = str.substring(0, strIndex + bit + 1);
    }
    
    return this.cutZero(str);
  },
  // 一个数乘以1e18   eg:convertNormalToBigNumber('input num',18)
  convertNormalToBigNumber(num: any, decimals = 18, fix = 0) {
    return new BigNumber(num).multipliedBy(new BigNumber(Math.pow(10, decimals)))
      .minus(fix)
      .toFixed(0);
  },
  /**一个数除以1e18,默认保留8位小数*/
  convertBigNumberToNormal(bigNumber:any, bit = 8,decimals = 18,original = false) {
    let result = (new BigNumber(bigNumber).dividedBy(new BigNumber(Math.pow(10, decimals))));
    if(!original){
      return this.getBit(result,bit)
    }else{
      return result.toPrecision()
    }
  },
  // 统计数据中相同的元素的个数  eg:arr = [0,0,0,1,1,2]  ===> {0:3,1:2,2:1}
  getWordCnt(arr:any){ 
    return arr.reduce(function(prev:any,next:any){ 
      prev[next] = (prev[next] + 1) || 1; 
      return prev; 
    },{}); 
  },
  // 链接钱包方法封装
  connectWallet(data:string){
    return new Promise(async resolve => {
      let obj = {
        account:'',
        chainID:'',
        status:false,
        changeAccount:-1,// 切换账号变量
      }
      let acc = await wallet.getAccount(data); //链接钱包
      obj.account = acc[0]
      obj.changeAccount = 0
      obj.chainID = await wallet.getChainId(); // 连接网络
      let net = network(); // 获取sdk返回的当前的环境
      if(obj.chainID == net.chainId){
        obj.status = true
        store.commit("setnewinfo",  JSON.stringify(obj))
        sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
        resolve(obj)
      }else{
        wallet.addChain()
        resolve(obj)
      }
      wallet.onAccountChanged((res:any) => {
        if(res.length == 0){
          obj.account = ''
          obj.status = false
          obj.changeAccount = -1
          store.commit("setnewinfo",  JSON.stringify(obj))
          sessionStorage.setItem("setnewinfo",JSON.stringify(obj))
          resolve(obj)
        }else{
          obj.account = res[0]
          obj.changeAccount = ++obj.changeAccount
          // console.log("切换账号")
          if(obj.chainID == net.chainId){
            obj.status = true
            store.commit("setnewinfo",  JSON.stringify(obj))
            sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
            resolve(obj)
          }else{
            obj.status = false
            store.commit("setnewinfo",  JSON.stringify(obj))
            sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
            resolve(obj)
          }
        }
      })
      wallet.onChainChanged((res:any) => {
        obj.chainID = res
        if(obj.chainID == net.chainId){
          obj.status = true
          store.commit("setnewinfo",  JSON.stringify(obj))
          sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
          resolve(obj)
        }else{
          obj.status = false
          store.commit("setnewinfo",  JSON.stringify(obj))
          sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
          resolve(obj)
        }
      })
    })
  },
  // 获取用户的盲盒信息
  async newgetUserBoxInfoFun(account: string) {
    if (sessionStorage.getItem("sb_count")) {
      sessionStorage.removeItem("sb_count");
    }
    return new Promise((resolve) => {
      let count = 1;
      sb().tokensOfOwnerBySize(account, 0, 100000000).then(async (res:any) => {//0代表第一次拿数据  100000000代表用户所拥有的全部卡的id
          if (res[0].length == 0) {
            store.commit("setBoxInfo", JSON.stringify([]));
            sessionStorage.setItem("setBoxInfo", JSON.stringify([]));
            resolve(1);
            return;
          }
          let boxInfoArr: any = [];
          res[0].map(async (item: any) => {
            let obj = {
              boxID:0,//盲盒ID
              type:0,//盲盒类型
              status:false//状态
            }
            obj.boxID = Number(item)
            // @ts-ignore
            obj.type = Number(await sb().sbIdToType(item))
            // console.log('obj.type: ', obj.type);
            boxInfoArr.push(obj)
            if (count == res[0].length) {
              store.commit("setBoxInfo", JSON.stringify(boxInfoArr))
              sessionStorage.setItem("setBoxInfo", JSON.stringify(boxInfoArr))
              resolve(count)
            }
            count++
          })
        })
    })
  },
  // 获取用户的装备信息
  getUserBindbox(account:string,cursor:number, size = 10){//获取某用户基于指针（从0开始）和数量的装备ID数组，以及最后一个数据的指针
    return new Promise((resolve) => { 
      sn().tokensOfOwnerBySize(account, cursor, size).then((res:any) => {
        // console.log("公共函数:获取用户的装备信息:",res)
        if(res[0].length > 0){
          this.ProcessingFunction(res[0]).then(data => {
            resolve(data)
          })
        }else{
          resolve([])
        }
      })
    })
  },
  // 处理函数
  ProcessingFunction(arr:any){
    // console.log("处理函数接收到的参数:",arr.length)
    return new Promise((resolve) => {
      let count = 1;
      let orther_arr:any = []
      arr.map(async (item:any) => {
        let obj = {
          id:-1,
          src:'',
          type:-1,//职业
          start:-1,//星级
          power:-1,//战力
          position:-1,//部位
          suit:-1,//套装
          videoSrc:'',//
          status:false//状态
        }
        obj.id = Number(item)
        // console.log("公共函数:处理函数:",obj)
        let fun_arr:any = await sn().getDatas(Number(item), 'attr')
        obj.start = Number(fun_arr[0])
        obj.power = Number(fun_arr[1])
        obj.type = Number(fun_arr[2])
        obj.position = Number(fun_arr[3])
        obj.suit =  Number(fun_arr[4])
        obj.src = getSourceUrl(fun_arr) + '.png'
        obj.videoSrc = getSourceUrl(fun_arr) + '.mp4'
        orther_arr.push(obj)
        // console.log("公共函数:处理函数:",orther_arr)
        if (count == arr.length) {
          resolve(orther_arr)
        }
        count++
      })
    })
  },
  // 函数防抖
  antiShakeFun(callback:any,delay:number){
    // @ts-ignore
    clearTimeout(store.state.timer);  
    // @ts-ignore
    store.state.timer = setTimeout(()=>{
      callback()
    },delay);
  },
  // 是否授权
  isApproveFun(account:string, type:string,contractAdrdess: string) {
    return new Promise(resolve => {
      erc20(type).allowance(account,contractAdrdess).then((res:any) => {
        if (res.toString() > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(() => {
        resolve(false)
      })
    })
  },
  // 去授权
  goApproveFun(type:string, contractAdrdess:string) {
    const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
      return new Promise(resolve => {
        erc20(type).connect(getSigner()).approve(contractAdrdess,TOKEN_amount).then(async res => {
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            resolve(true)
          }else{
            resolve(false)
          }
        }).catch(() => {
          resolve(false)
        })
      })
  },
  // 刷新代币余额
  getUserCoinQuantity(address:any,name:string,account:string){
    erc20(address).balanceOf(account).then((res:any)=> {
      if(name == 'busd'){
        store.commit("setUserCoin",Object.assign(store.state.userCoin,{'busd':this.convertBigNumberToNormal(Number(res),0,18,true)}));
      }else if(name == 'st'){
        store.commit("setUserCoin",Object.assign(store.state.userCoin,{'st':this.convertBigNumberToNormal(Number(res),0,18,true)}));
      }else if(name == 'sr'){
        store.commit("setUserCoin",Object.assign(store.state.userCoin,{'sr':this.convertBigNumberToNormal(Number(res),0,18,true)}));
      }
    })
  },
  // 刷新代币价格
  refreshPrice(type:string,bondID = ''){
    if(type == 'st'){
      bondDepository().getStPrice().then((res:any) => {
        store.commit("setUserCoin",Object.assign(store.state.userCoin,{'stPrice':this.convertBigNumberToNormal(Number(res),0,18,true)}));
      })
    }else if(type == 'stlp'){
      bondDepository().getLpPrice(bondID).then((res:any) => {
        store.commit("setUserCoin",Object.assign(store.state.userCoin,{'stlpPrice':this.convertBigNumberToNormal(Number(res),0,18,true)}));
      })
    }
  }
};
