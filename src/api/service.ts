import axios from "axios";
import qs from 'qs'
const service = axios.create();
service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
    if (response.status == 200) {
      return response.data;
    } else {
      return response;
    }
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
  /**
   *当后台接扣要求传参形式是表单时:
   *post请求的请求头设置:service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
   * 参数形式应为.post(url, qs.stringify(data))  注:qs直接引用,安装axios时已自带
   */
  post(url: string, data?:{}) {
    return new Promise((resolve, reject) => {
      service.post(url, qs.stringify(data)).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }
};
