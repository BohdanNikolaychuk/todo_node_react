import axios from 'axios';

const instans = axios.create({
  baseURL: 'http://localhost:8080',
});

instans.interceptors.request.use(async (config) => {
  config.headers = config.headers ?? {};

  config.headers.Authorization = window.localStorage.getItem('userToken');

  return config;
});

export default instans;
