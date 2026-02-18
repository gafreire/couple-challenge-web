import axios from 'axios';

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in .env');
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;