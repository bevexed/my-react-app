/*
* 包含 n 个 action creator
* 异步 action
* 同步 action
*/
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from "./action-types";
import {
    reqRegister,
    reqLogin
} from "../api";

// 成功同步 action
const authSuccess = (username, password, type) => ({type: AUTH_SUCCESS, data: {username, password, type}})
// 失败
const errprMsg = (msg) => ({type: ERROR_MSG, data: msg})

// 注册
export const register = (user) => {
    return async dispatch => {
        // 发送注册的异步 ajax 请求
        const result = await reqRegister(user)
        console.log(result);
        if (result.code === 0) {
            // 分发成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errprMsg(result.msg))
        }
    }
}


// 登录
export const login = (user) => {
    return async dispatch => {
        // 发送注册的异步 ajax 请求
        const result = await reqLogin(user)
        if (result.code === 0) {
            // 分发成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errprMsg(result.msg))
        }
    }
}
