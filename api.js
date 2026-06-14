import axios from 'axios';

// Configured axios instance for future backend connection
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach authentication token if it exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('course_platform_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Basic error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 response and we're on the client side, 
    // it usually means the token is invalid or expired
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear localStorage but avoid a circular dependency with AuthContext
      // by just cleaning storage directly
      localStorage.removeItem('course_platform_token');
      localStorage.removeItem('course_platform_user');
    }
    return Promise.reject(error);
  }
);

export default api;
