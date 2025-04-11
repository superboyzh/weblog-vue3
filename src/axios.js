import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 你的 API 基础 URL
  timeout: 7000, // 请求超时时间
});

export default instance;
