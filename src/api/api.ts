import service from "./service";

const BASE_API = process.env.VUE_APP_BASE_API;
export default {
  // 注册
  registerFun: (data: any) => {
    return service.post(
      `${BASE_API}/user/create`,data
    );
  },
  // 登录
  loginFun: (data: any) => {
    return service.post(
      `${BASE_API}/user/login`,data
    );
  },
  // 绑定钱包
  bindWallet: (data: any) => {
    return service.post(
      `${BASE_API}/user/verify`,data
    );
  },
};
