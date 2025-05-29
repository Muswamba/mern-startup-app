import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
   withCredentials: false,
});

// Add toek from localStorage to every request
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});
// Handle errors globally
api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response && error.response.status === 401) {
         // Handle unauthorized access, e.g., redirect to login
         console.error("Unauthorized access - redirecting to login");
         window.location.href = "/login";
      } else {
         console.error("API error:", error);
      }
      return Promise.reject(error);
   }
);

export default api;
