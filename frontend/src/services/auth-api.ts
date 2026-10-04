import { api } from "@/lib/api";
import { IAuth } from "@/types/auth-types";

export const login = async (userData: IAuth) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};

export const signup = async (userData: IAuth) => {
  const { data } = await api.post("/auth/signup", userData);
  return data;
};
