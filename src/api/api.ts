import service from "./service";

const BASE_API = process.env.VUE_APP_BASE_API;
export default {
  accountRegister: (data: any) => {
    return service.post(`${BASE_API}comm/create`, data);
  },
  accountSendEmail: (data: any) => {
    return service.post(`${BASE_API}comm/sendEmail`, data);
  },
  accountLogin: (data: any) => {
    return service.post(`${BASE_API}comm/uccnLogin`, data);
  },
  accountUpdateInfo: (data: any) => {
    return service.post(`${BASE_API}comm/updateInfo`, data);
  },
  accountForget: (data: any) => {
    return service.post(`${BASE_API}comm/forget`, data);
  },
  accountUpdate: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/update`, data, headers);
  },
  getUserNonce: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/nonce`, data, headers);
  },
  bindWallet: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/verify`, data, headers);
  },
  // 获取用户游戏内代币余额
  getUserSRBalance: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/tokenBalance`, data, headers);
  },
  // 充值记录
  rechargeRecord: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/deposit`, data, headers);
  },
  //提现申请
  applyFun: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/apply`, data, headers);
  },
  //绑定提现订单签名
  withdrawFun: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/withdraw`, data, headers);
  },
  //提现记录
  WithdrawalsRecord: (data: any, headers: any) => {
    return service.postAndHeaders(`${BASE_API}api/user/record`, data, headers);
  },
};
