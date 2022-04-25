import service from "./service";

// const BASE_API = process.env.VUE_APP_BASE_API;
const BASE_API = process.env.VUE_APP_BASE_API;
export default {
  registerFun: (data: any) => {
    return service.post(
      `${BASE_API}/login`,data
    );
  }
};
