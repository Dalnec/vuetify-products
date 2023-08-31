import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://192.168.18.65:4000/api/'
});