import {wallet, network,sb} from "sacredrealm-sdk";
import BigNumber from "bignumber.js";
import store from "@/store";
export default {
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
  afferentTime(endtime: number, calback: any, type = 'H') {
    if (endtime == 0) {
      if(type === 'S'){
        calback({ s: "00" });
      }else{
        calback({ h: "00", m: "00", s: "00" });
      }
      return;
    }
    let H: any = parseInt((endtime / (60 * 60)).toString());
    let M: any = parseInt(((endtime / 60) % 60).toString());
    let S: any = parseInt((endtime % 60).toString());
    H = H > 9 ? H : "0" + H;
    M = M > 9 ? M : "0" + M;
    S = S > 9 ? S : "0" + S;
    if(type === 'S'){
      calback({ s: S });
    }else{
      calback({ h: H, m: M, s: S });
    }
    endtime = endtime - 1;
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
    str = str.substring(0, strIndex + bit + 1);
    return this.cutZero(str);
  },
  // 一个数乘以1e18   eg:convertNormalToBigNumber('input num',18)
  convertNormalToBigNumber(num: any, decimals = 18, fix = 0) {
    return new BigNumber(num).multipliedBy(new BigNumber(Math.pow(10, decimals)))
      .minus(fix)
      .toFixed(0);
  },
  /**一个数除以1e18,默认保留8位小数*/
  convertBigNumberToNormal(bigNumber:any, bit = 8,decimals = 18) {
    let result = (new BigNumber(bigNumber).dividedBy(new BigNumber(Math.pow(10, decimals))));
    return this.getBit(result,bit)
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
        status:false
      }
      let acc = await wallet.getAccount(data); //链接钱包
      obj.account = acc[0]
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
          store.commit("setnewinfo",  JSON.stringify(obj))
          sessionStorage.setItem("setnewinfo",JSON.stringify(obj))
          resolve(obj)
        }else{
          obj.account = res[0]
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
};
