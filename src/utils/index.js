/**
 * @file 常用工具类
 */
//import React from 'react';
import { hashHistory } from 'react-router';
import sha1 from 'sha1';
import md5 from 'md5';
import { User } from '../api';
// 192.168.0.103:8686/ysynet-mobile/login/userLogin?userNo=30089&pwd=3e29d79c1e1d3deb3cfe5b6f90b065ad788154a6&token=vania
const _remote = 'http://192.168.0.103:8686/ysynet-mobile'

/**
 * @summary fetch方法
 * @param {*} param0 
 * @param {url} 路径
 * @param {body} 查询条件
 * @param {success}  成功方法
 * @param {error} 失败方法
 * @param {method} post/get
 * @param {type} content-type
 */
export const fetchData = ({
  url, body, success, error, method, type
}) => {
  const query = typeof body === 'object' ? JSON.stringify(body) : body;
  fetch(`${_remote}${url}`, {
    method: method || 'post',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': type || 'application/x-www-form-urlencoded',
    },
    body: query
  })
    .then(res => {
      switch (res.status) {
        case 997:
        hashHistory.push({pathname: '/login'});
          return alert('非法访问，请重新登录')//message.warn('非法访问，请重新登录');
        case 998:
        hashHistory.push({pathname: '/login'});
          return alert('会话失效，请重新登录')
          //return message.warn('会话失效，请重新登录');
        case 999:
        hashHistory.push({pathname: '/login'});
          return alert('登录失效，请重新登录')
          //return message.warn('登录失效，请重新登录');
        default:
          return res.json();
      }
    })
    .then(data => {
      success(data)
    })
    .catch(e => {
      if (typeof error === 'function') {
        error();
      }
      //message.error('存在异常' + e.message)
    });
}
/**
 * @summary 是否登录校验
 */
export const login = (userNo, password) => {
  return new Promise((resolve, reject) => {
    let arr = [
      md5(password.toString())
      .substring(2, md5(password.toString()).length)
      .toUpperCase(), 'vania'
    ];
    let pwd = '';
    arr.sort().map( (item, index) => {
      return pwd += item;
    })
    fetchData({
      url: `${User.loginCheck}?userNo=${userNo}&pwd=${sha1(pwd)}&token=vania`,//api.CHECK_LOGIN,
      error: err => reject(err),
      success: data => resolve(data)
    })  
  })
}
/**
 * @summary 判断是否允许登录
 */
export const loginCheck = () => {
  return new Promise((resolve, reject) => {
    fetchData({
      url: `${User.sessionCheck}`,
      error: err => reject(err),
      success: data => resolve(data)
    })  
  })
}

/**
 * @summary 注销登录
 */
export const logout = () => {
  return new Promise((resolve, reject) => {
    fetchData({
      url: `${User.logout}`,
      error: err => reject(err),
      success: data => resolve(data)
    })  
  })
}
