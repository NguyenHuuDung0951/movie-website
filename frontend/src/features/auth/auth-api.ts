import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { AuthResponse } from "./types";

export const loginApi = async (payload: { email: string; password: string }) => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const registerApi = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const persistToken = (token: string) => {
  Cookies.set("token", token, { expires: 7, sameSite: "lax" });
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  Cookies.remove("token");
  localStorage.removeItem("token");
};
