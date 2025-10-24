import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

class AxiosInterceptor {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  get: AxiosInstance["get"];
  post: AxiosInstance["post"];
  put: AxiosInstance["put"];
  delete: AxiosInstance["delete"];

  constructor(instanceConfig: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create({
      ...instanceConfig,
      withCredentials: true,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();

    this.get = this.axiosInstance.get.bind(this.axiosInstance);
    this.post = this.axiosInstance.post.bind(this.axiosInstance);
    this.put = this.axiosInstance.put.bind(this.axiosInstance);
    this.delete = this.axiosInstance.delete.bind(this.axiosInstance);
  }

  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                originalRequest._retry = true;
                resolve(this.axiosInstance(originalRequest));
              });
            });
          }

          this.isRefreshing = true;

          try {
            const response = await this.axiosInstance.post<{ accessToken: string }>(
              "/auth/refreshToken",
              {},
              { withCredentials: true }
            );
            const newAccessToken = response.data.accessToken;
            this.setAccessToken(newAccessToken);
            this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
            this.refreshSubscribers = [];
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest._retry = true;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.refreshSubscribers = [];
            this.setAccessToken("");
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  private setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }
}

export const client = new AxiosInterceptor({
  baseURL: import.meta.env.VITE_API_URL,
});
