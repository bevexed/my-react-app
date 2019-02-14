/*
* 包含 n 个 action creator
* 异步 action
* 同步 action
*/
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from "./action-types";
import {
  reqRegister,
  reqLogin,
  updateUser
} from "../api";

import {Toast} from 'antd-mobile';

//同步 action
// 成功
const authSuccess = user => ({type: AUTH_SUCCESS, data: user});
// 失败
const errorMsg = msg => {
    Toast.fail(msg, 1);
    return {type: ERROR_MSG, data: msg}
  }
;

const receiveUser = user => ({type: RECEIVE_USER, data: user});
const resetUser = msg => ({type: RESET_USER, data: msg});

// 注册
export const register = (user) => {
  const {password, username, password2, type} = user;
  if (password !== password2) {
    return errorMsg('两次密码不一致')
  }
  if (!username) {
    return errorMsg('请输入用户名')
  }
  if (!type) {
    return errorMsg('请选择用户类型')
  }
  return async dispatch => {
    // 发送注册的异步 ajax 请求
    const result = await reqRegister(user);
    if (result.code === 0) {
      // 分发成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
};


// 登录
export const login = (user) => {
  const {password, username} = user;
  if (!username) {
    return errorMsg('请输入用户名')
  }
  if (!password) {
    return errorMsg('请输入密码')
  }
  return async dispatch => {
    // 发送注册的异步 ajax 请求
    const result = await reqLogin(user);
    if (result.code === 0) {
      // 分发成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
};


// 更新用户数据
export const updateUserData = (user) => {
  return async dispatch => {
    updateUser(user).then(
      res => {
        if (res.code === 0) {
          dispatch(receiveUser(res.data))
        } else {
          dispatch(resetUser(res.msg))
        }
      },
      error => {

      }
    )
  }
};
