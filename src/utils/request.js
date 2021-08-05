import axios from "axios";
import router from "@/router/index";
import { env } from "@/utils/index";
// 业务成功码
const SUCCESS_CODE = 20000;

// 设置请求默认请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
// 创建axios实例
const service = axios.create({
  baseURL: env.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 携带 cookie
  timeout: 1000 * 15, // 请求超时时间15秒
});

// 请求头，headers 信息
axios.defaults.headers["token"] = localStorage.getItem("token") || "";

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发起请求之前做一些操作
    // 请求中携带token, headers['X-Token']是一个自定义请求头，需要根据实际业务情况进行替换
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers["X-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过自定义代码确定请求状态
   * 也可以通过HTTP状态码判断
   */
  (response) => {
    if (typeof response.data !== "object") {
      alert("服务端异常！");
      return Promise.reject(response);
    }

    // 自定义状态码不是20000，认为请求异常
    if (response.data.code !== SUCCESS_CODE) {
      alert(response.data.message || "Error");
      // 50008: 不合法的token; 50012: 其它地方登录; 50014: token过期;
      const tokenErrCodes = [50008, 50012, 50014];
      if (tokenErrCodes.includes(response.data.code)) {
        // 重新登录
        router.push({ name: "Login" });
      }
      return Promise.reject(new Error(response.data.message || "Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      // 请求已发出，服务器返回的 http 状态码不是 2xx，例如：400，500，对应上面的 1
      if (error.response.status === 401) {
        // 重新登录
        router.push({ name: "Login" });
      } else {
        const errMsg = getResponseErrorMsg(error);
        alert(errMsg);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应，例如：断网
      // 请求超时
      if (
        error.code === "ECONNABORTED" &&
        error.message.indexOf("timeout") !== -1
      ) {
        alert("请求超时");
      }
      // 网络异常
      if (error.message === "Network Error") {
        alert("网络异常");
      }
    } else {
      alert("未知错误");
      // 请求被取消或者发送请求时异常
    }
    return Promise.reject(error);
  }
);

// 响应异常status映射
function getResponseErrorMsg(error) {
  const statusMap = new Map([
    [400, "错误请求"],
    [401, "未授权~，请重新登录"],
    [403, "当前操作没有权限"],
    [404, "访问资源不存在"],
    [408, "请求超时"],
    [500, "服务器异常,请稍后再试哦~"],
    [501, "此请求方法不被服务器支持"],
    [502, "网关错误"],
    [503, "服务不可用"],
    [504, "网关超时"],
    [505, "http版本不支持该请求"],
  ]);

  const errorMsg = statusMap.get(error.response.status) || `连接错误${error.response.status}`;
  return errorMsg;
}

export default service;
