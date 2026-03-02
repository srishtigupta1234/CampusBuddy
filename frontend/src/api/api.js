import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 👇 Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // This function runs right BEFORE every request is sent.
    // We grab the absolute latest token from localStorage here!
    const token = localStorage.getItem("jwt");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);