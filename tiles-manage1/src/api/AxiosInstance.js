import axios from "axios";
import { logout } from "../utils/AuthHelper"; 

const instance = axios.create({
  baseURL: "https://localhost:<YOUR-PORT>/api",
});

// Request interceptor: Add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      logout(); // token missing = logout
      throw new axios.Cancel("No token - user is logged out");
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor (handle 401)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default instance;
