import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/";

export const axiosPublic = axios.create({
  baseURL,
});

export const axiosSecure = axios.create({
  baseURL,
});

if (typeof window !== "undefined") {
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("access-token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}
