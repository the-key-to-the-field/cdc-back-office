import { LoginUser } from "@/models/User";
import apiClient from "@/lib/axiosInstance";
import { serverFetch } from "@/lib/serverFetch";
import axios from "axios";
import { getCookie } from "cookies-next";

export const login = async (body: LoginUser) => {
  const response = await serverFetch({ url: "/login", method: "POST", body });

  return response;
};

export const refreshToken = async () => {
  const refresh_token = getCookie("refresh_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${refresh_token}`,
  };
  console.log("Headers:", headers); // Debugging line

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await axios.get(`${apiUrl}/refresh`, { headers });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  apiClient.defaults.headers.common["Authorization"] = null;
  window.location.href = "/login";
};

export const isTokenExpired = async () => {
  const response = await apiClient.get("/isTokenExpired");
  return response.status !== 200;
};
