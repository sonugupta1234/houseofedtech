import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
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
