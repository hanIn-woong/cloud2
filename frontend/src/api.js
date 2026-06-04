import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: 모든 요청 전에 실행
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log('Payload:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: 모든 응답 후에 실행
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API Response Error] ${error.response.status} ${error.config.url}`, error.response.data);
    } else {
      console.error('[API Network Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
