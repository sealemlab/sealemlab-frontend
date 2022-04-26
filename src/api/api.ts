import service from "./service";

// const BASE_API = process.env.VUE_APP_BASE_API;
const BASE_API = process.env.VUE_APP_BASE_API;
export default {
  // 注册
  registerFun: (data: any) => {
    return service.get(
      `${BASE_API}/registry`,data
    );
  },
  // 登录
  loginFun: (data: any) => {
    return service.post(
      `${BASE_API}/login`,data
    );
  }
};
