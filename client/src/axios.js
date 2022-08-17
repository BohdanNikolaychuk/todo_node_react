import axios from 'axios';

const instans = axios.create({
  baseURL: 'http://localhost:8080',
});

instans.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instans;
