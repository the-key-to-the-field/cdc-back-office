import axios from "axios";
import { isTokenExpired, refreshToken } from "@/services/authentications";
// import { cookies } from "next/headers";

import {
  getCookie,
  setCookie,
  deleteCookie,
  hasCookie,
  getCookies,
} from "cookies-next";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  async (config) => {
    console.log("request interceptor");
    console.log("all cookies", getCookies());
    const token = getCookie("token");

    console.log("-------------------token--------------", token);
    if (token) {
      console.log("request interceptor 3");
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("response interceptor", response);
    return response;
  },
  async (error) => {
    console.log("error in interceptor", error);
    const originalRequest = error.config;

    // Check if the error is a 401 and the request has not been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("refreshing token error", error);
      //   originalRequest._retry = true;

      try {
        console.log("refreshing token");
        // // Attempt to refresh the token
        // const newToken = await refreshToken();
        // console.log("-------------------newToken--------------", newToken);
        // // Update the token in cookies and headers
        // setCookie("token", newToken.access_token);
        // apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken.access_token}`;
        // originalRequest.headers["Authorization"] = `Bearer ${newToken.access_token}`;
        // // Retry the original request with the new token
        // return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure (e.g., redirect to login)
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;

// export function getCookie(name: string) {
//   if (typeof document !== "undefined") {
//     console.log("Document is defined");
//     console.log("Current cookies:", document.cookie);
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) {
//       const cookieValue = parts.pop()?.split(";").shift();
//       console.log(`Cookie value for ${name}:`, cookieValue);
//       return cookieValue;
//     }
//   }
//   console.log(`Cookie ${name} not found`);
//   return null;
// }
