/*
* 包含 n 个 reducer 函数 根据老的 state 和 指定的 action 返回一个 新的 state
* */

import {combineReducers} from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST
} from "./action-types";
import {getRedirectTo} from "../utils";


// 产生user 状态的 reducer
const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: '' // 需要自动重定向的路由路径
};

function users(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type, header} = action.data;
      return {...action.data, redirectTo: getRedirectTo(type, header)};
    case ERROR_MSG:
      return {...state, msg: action.data};
    case RECEIVE_USER:
      return {...action.data};
    case RESET_USER:
      return {...initUser, msg: action.data};
    default:
      return state
  }
}

// 产生userList
const initUserList = [];

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

// 聊天状态的 Reducer

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0,
};

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG:
      return
    case RECEIVE_MSG_LIST:
      const {users, chatMsgs} = action.data
      return {users, chatMsgs, unReadCount: 0};
    default:
      return state
  }
}


export default combineReducers({
  users,
  userList,
  chat
})

