import request from '@/request';

// 登录
export const login = (data) =>
  request({
    url: '/api/v1/login',
    method: 'POST',
    data,
  });

// 获取当前登录用户的信息
export const getLoginUserInfo = () =>
  request({
    url: '/api/v1/users/info',
    method: 'GET',
  });

// 修改用户密码
export const changePwd = (data) =>
  request({
    url: '/api/v1/users/change_credential',
    method: 'PUT',
    data,
  });

// 重置用户密码
export const resetPwd = (userId) =>
  request({
    url: `/api/v1/users/${userId}/reset_credential`,
    method: 'PUT',
  });

// 获取验证码
export const getVerificationCode = (data) =>
  request({
    url: '/api/v1/users/verification_code',
    method: 'POST',
    data,
  });

// 注册用户
export const register = (data) =>
  request({
    url: '/api/v1/users/register',
    method: 'POST',
    data,
  });

// 忘记密码
export const retrievePwd = (data) =>
  request({
    url: '/api/v1/users/forget_credential',
    method: 'PUT',
    data,
  });
