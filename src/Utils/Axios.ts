import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    meta?: {
      requestStartedAt?: number; // 用于记录请求开始时间
    };
  }
}

// 创建自定义配置的 Axios 实例
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器 (带类型声明)
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (config.url?.endsWith(".json")) {
        config.url += (config.url.includes("?") ? "&" : "?") + `t=${Date.now()}`;
      }

      // 设置请求开始时间
      config.meta = config.meta || {};
      config.meta.requestStartedAt = Date.now();

      return config;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

// 导出配置好的实例
const http = createAxiosInstance();

// 在 axios.ts 中添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 成功响应数据处理
    if (import.meta.env.MODE === "development") {
      console.log(
        `[API] ${response.config.url}`,
        `Duration: ${
          Date.now() - (response.config.meta?.requestStartedAt || 0)
        }ms`
      );
    }
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default http;
