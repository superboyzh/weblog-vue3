import axios from "axios";
import { getToken } from "@/utils/cookie";

const instance = axios.create({
  baseURL: "/api", // 你的 API 基础 URL
  timeout: 7000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // 如果存在 token，则设置请求头
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    ElMessage.error(error.response.data.message || "请求失败");
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
