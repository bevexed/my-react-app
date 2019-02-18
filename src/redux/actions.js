/*
* 包含 n 个 action creator
* 异步 action
* 同步 action
*/
import io from 'socket.io-client'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from "./action-types";
import {
  reqRegister,
  reqLogin,
  updateUser,
  getUser,
  reqUserList,
  reqMsgList,
  reqReadMsg
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
export const resetUser = msg => ({type: RESET_USER, data: msg});

const receiveUserList = msg => ({type: RECEIVE_USER_LIST, data: msg});

export const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}});
export const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}});

const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}});

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
      getMsgList(dispatch, result.data._id);
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
      getMsgList(dispatch, result.data._id);
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

// 异步获取用户数据
export const getUserData = () => {
  return async dispatch => {
    getUser().then(
      res => {
        if (res.code === 0) {
          getMsgList(dispatch, res.data._id);
          dispatch(receiveUser(res.data))
        } else {
          dispatch(resetUser(res.msg))
        }
      }
    )
  }
};

// 异步获取 用户列表
export const getUserList = (type) => {
  return async dispatch => {
    reqUserList(type).then(
      res => {
        if (res.code === 0) {
          dispatch(receiveUserList(res.data))
        }
      }
    )
  }
};

// 单例
function initIO(dispatch, userid) {
  if (!io.socket) {
    io.socket = io('ws://' + window.location.host);
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log(chatMsg);
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })
  }
}

// 异步发消息
export const sendMsg = (data) => {
  return dispatch => {
    initIO();
    console.log('a', data);
    io.socket.emit('sendMsg', data)
  }
};

// 获取消息列表
function getMsgList(dispatch, userid) {
  initIO(dispatch, userid);
  reqMsgList().then(
    res => {
      if (res.code === 0) {
        const {users, chatMsgs} = res.data;
        dispatch(receiveMsgList({users, chatMsgs, userid}))
      }
    }
  )
}

// 读取用户消息
export const readMsg = (from, to) => {
  return dispatch => {
    reqReadMsg(from).then(
      res => {
        if (res.code === 0) {
          const count = res.data;
          dispatch(msgRead({count, from, to}))
        }
      }
    )
  }
};
