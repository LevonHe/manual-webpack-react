import axios from 'axios';
import { message } from 'antd';
import CookieService from '@/util/CookieService';
import { baseUrl } from '@/config/baseUrl';

const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
    Pragma: 'no-cache',
  },
});

// request interceptors
service.interceptors.request.use(
  async (config) => {
    if (
      config.url.indexOf('login') === -1 &&
      config.url.indexOf('verification_code') === -1 &&
      config.url.indexOf('register') === -1 &&
      config.url.indexOf('forget_credential') === -1
    ) {
      const token = CookieService.getCookie('Jarvis-Token');
      if (!token) {
        config.url = '';
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';
      }
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (
      response.status !== 200 &&
      res.status !== 200 &&
      response.status !== 201 &&
      res.status !== 201 &&
      response.status !== 204 &&
      res.status !== 204
    ) {
      message.error(res.message);
      return false;
    }
    return res;
  },
  (err) => {
    if (err.response && err.response.data) {
      if (err.response.data.errorCode === 1060109) {
        // token 无效，返回登录页面
        window.location.href = window.location.protocol + '//' + window.location.host + '/login';
      }
      return Promise.reject(err.response.data);
    }
    return Promise.reject(err);
  }
);

export default service;
