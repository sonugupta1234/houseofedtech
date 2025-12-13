import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export async function apiRequest<response = any>(
  method: string,
  url: string,
  data?: any,
): Promise<response> {
  try {
    const response = await api({
      method,
      url,
      data,
    });

    return response.data as response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}
