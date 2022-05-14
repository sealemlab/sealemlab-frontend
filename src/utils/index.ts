export default {
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
};
