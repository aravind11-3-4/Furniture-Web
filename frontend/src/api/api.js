import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('furniture_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
