import axios from "axios";
import type {
  LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse,
  MeResponse
} from "@/types/api";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: false, // если перейдёшь на HttpOnly-куки — поставь true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// простой авто-рефреш
let isRefreshing = false;
let queue: Array<() => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const status = (error as any)?.response?.status;
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refresh = localStorage.getItem("refresh_token");
          if (!refresh) throw new Error("no refresh");
          const { data } = await api.post<{ access: string }>("/auth/refresh/", { refresh });
          localStorage.setItem("access_token", data.access);
          queue.forEach(fn => fn());
          queue = [];
          return api((error as any).config);
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // TODO: редирект на /login если нужно
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise((resolve) => queue.push(() => resolve(api((error as any).config))));
    }
    return Promise.reject(error);
  }
);

// ---- эндпоинты ----
export const registerUser = (payload: RegisterRequest) =>
  api.post<RegisterResponse>("/auth/register/", payload);

export const loginUser = (payload: LoginRequest) =>
  api.post<LoginResponse>("/auth/login/", payload);

export const getMe = () =>
  api.get<MeResponse>("/auth/me/");
