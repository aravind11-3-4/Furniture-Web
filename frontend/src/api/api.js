import axios from 'axios';

const API = axios.create({
  // Same-origin in the Vite app so the dev proxy forwards to Spring Boot.
  // Avoids browser CORS failures that look like "server not running".
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const isAuthCall = config.url?.includes('/auth/');
  if (!isAuthCall) {
    const token = localStorage.getItem('furniture_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
