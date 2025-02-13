"use server";
import { cookies } from "next/headers";

import { refreshToken } from "@/services/authentications";

// import router from "next/router";

interface ServerFetchProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  token?: string;
}
let attempt = 0;

export const serverFetch = async ({
  url,
  method,
  body,
}: ServerFetchProps): Promise<any> => {
  let token = (await cookies()).get("token")?.value;

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 401 && attempt < 3) {
        attempt++;
        const res = await refreshToken();

        (await cookies()).set("token", res.data.access_token);

        return serverFetch({ url, method, body });
      } else {
        // throw new Error("Unauthorized");
        // router.push("/login");
        // window.location.href = "/login";

        return;
        // throw new Error("Unauthorized");
      }
    }
  } catch (error) {
    // window.location.href = "/login";
    console.error("Error in serverFetch:", error);
    throw error;
  }
};
