/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://www.thesportsdb.com/api/v1/json/3";

class ApiService {
  private static instance = new ApiService();

  static getInstance() {
    return this.instance;
  }

  get(url: string, params?: any, headers?: any) {
    return this.request({ method: "GET", url, headers, params });
  }

  delete(url: string, params?: any, headers?: any, data?: any) {
    return this.request({
      method: "DELETE",
      url,
      headers,
      params,
      data,
    });
  }

  post(url: string, data?: any, headers?: any, params?: any) {
    return this.request({
      method: "POST",
      url,
      data,
      headers,
      params,
    });
  }

  put(
    url: string,
    data?: any,
    useAuthHeaders = true,
    headers?: any,
    params?: any,
  ) {
    return this.request({
      method: "PUT",
      url,
      data,
      headers,
      params,
      useAuthHeaders,
    });
  }

  patch(
    url: string,
    data?: any,
    headers?: any,
    params?: any,
    useAuthHeaders = true,
  ) {
    return this.request({
      method: "PATCH",
      url,
      data,
      headers,
      params,
      useAuthHeaders,
    });
  }

  generateHeaders = (
    additionalHeaders: { [key: string]: any },
    useAuthHeaders: boolean,
  ) => {
    const headers = {
      ...additionalHeaders,
    };

    if (useAuthHeaders && typeof window !== "undefined") {
      headers["X-API-KEY"] = `123`;
    }

    return { ...headers };
  };

  private async request({
    useBaseUrl = true,
    useAuthHeaders = true,
    ...config
  }) {
    try {
      const response = await Axios.request({
        baseURL: useBaseUrl ? BASE_URL : undefined,
        ...config,
        headers: this.generateHeaders(config.headers, useAuthHeaders),
      });
      return response?.data;
    } catch (e) {
      const error = e as any;
      const errorStatus = error?.response?.status;
      if (errorStatus === 401) {
        localStorage.removeItem("auth_token");
      }
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  }
}

export const apiService = ApiService.getInstance();
