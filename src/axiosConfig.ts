import axios from 'axios';
import { BACKEN_URL } from './config';

// 创建一个 axios 实例
const axiosInstance = axios.create({
    withCredentials: true, // 确保每次请求都发送 cookie
    baseURL: BACKEN_URL, // 替换为你的 API 基础 URL
});

export default axiosInstance;