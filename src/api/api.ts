import service from "./service";

const BASE_API = process.env.VUE_APP_BASE_API;
export default {
  accountRegister: (data: any) => {
    // email=846733238%40qq.com&password=123456&code=833676
    return service.post(`${BASE_API}comm/create`, data);
  },
  accountSendEmail: (data: any) => {
    // email=846733238%40qq.com&method=1
    return service.post(`${BASE_API}comm/sendEmail`, data);
  },
  accountLogin: (data: any) => {
    // email=846733238%40qq.com&password=123456
    return service.post(`${BASE_API}comm/login`, data);
  },
  accountForget: (data: any) => {
    // email=846733238%40qq.com&newPwd=456789&code=620455
    return service.post(`${BASE_API}comm/forget`, data);
  },
  accountUpdate: (data: any, headers: any) => {
    // email=846733238%40qq.com&newPwd=123123
    return service.postAndHeaders(`${BASE_API}api/user/update`, data, headers);
  },
  // 获取随机数
  getRoundNum: (data: any) => {
    return service.post(`${BASE_API}/user/nonce`, data);
  },
};
