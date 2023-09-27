import { useUserStore } from '@/store/auth';
import axios from 'axios';

const userStore = useUserStore();

export const axiosInstanceLogin = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
    async function (config) {
        config.headers = config.headers || {}
        if (userStore.isAuthenticated) config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
        return config;
    },
    function (e) {
        console.error("Error de Servidor");
        return Promise.reject(e);
    }
);
