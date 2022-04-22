import axios from "axios";
const service = axios.create();
service.defaults.headers.post["Content-Type"] = "application/json";
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    // if (response.status == 200) {
    //   return response.data.data;
    // } else {
    //   return response;
    // }
    return response
  },
  error => {
    return Promise.resolve(error.response);
  }
);
export default {
  get(url: string, data?:{}) {
    return new Promise((resolve, reject) => {
      service.get(url, { params: data }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },
  // 表单形式对应的参数形式为    .post(url, qs.stringify(data))
  post(url: string, data?:{}) {
    return new Promise((resolve, reject) => {
      service.post(url, data).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }
};
