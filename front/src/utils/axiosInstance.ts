// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 API의 기본 URL
  withCredentials: true, // 쿠키 포함
});

export default axiosInstance;
