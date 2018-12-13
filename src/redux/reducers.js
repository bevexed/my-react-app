/*
* 包含 n 个 reducer 函数 根据老的 state 和 指定的 action 返回一个 新的 state
* */

import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

// 产生user 状态的 reducer
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo:'' // 需要自动重定向的路由路径
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data,redirectTo: "/"}
        case ERROR_MSG:
            return {...state, msg: action.data}
        default:
            return state
    }
}


export default combineReducers({
    user
})
// 向外暴露的状态的结构：{xxx:0,yyy:0}

