import axios from "axios";
import { ApiError } from "./api-error";
import { useAuthStore } from "../store/useAuthStore";

console.log("Initializing API with baseURL:", process.env.EXPO_PUBLIC_API_URL);
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// ✅ REQUEST INTERCEPTOR — reads token from Zustand store (no module-level var)
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ❌ RESPONSE ERROR HANDLER — auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.error("API Error:", error.message, error.config?.url, error.response?.data);
    const message = error.response?.data?.message || "Something went wrong";
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(new ApiError(message, status));
  }
);

export const apiClient = {
  get: async <T>(url: string, params?: unknown): Promise<T> => {
    const res = await api.get(url, { params });
    return res.data;
  },

  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const res = await api.post(url, data);
    return res.data;
  },

  patch: async <T>(url: string, data?: unknown): Promise<T> => {
    const res = await api.patch(url, data);
    return res.data;
  },

  put: async <T>(url: string, data?: unknown): Promise<T> => {
    const res = await api.put(url, data);
    return res.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const res = await api.delete(url);
    return res.data;
  },
};
