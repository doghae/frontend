import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api', // Vercel 프록시 경로
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
